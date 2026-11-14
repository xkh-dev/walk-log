import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSession } from '../lib/useSession';
import { getAppearancePreference, setAppearancePreference } from '../lib/appearance';
import { formatDate } from '../helpers';
import { t } from '../strings';

const APPEARANCE_OPTIONS = ['light', 'dark', 'system'];

function AppearanceSetting() {
  const [preference, setPreference] = useState(getAppearancePreference);
  const [message, setMessage] = useState('');

  function handleChange(value) {
    setPreference(value);
    setMessage('');
    try {
      setAppearancePreference(value);
    } catch {
      setMessage(t('account.appearance.saveError'));
    }
  }

  return (
    <section className="account-passkeys account-appearance" aria-labelledby="appearance-heading">
      <h2 id="appearance-heading">{t('account.appearance.title')}</h2>
      <div className="pills" role="group" aria-labelledby="appearance-heading">
        {APPEARANCE_OPTIONS.map((value) => (
          <button
            key={value}
            className={preference === value ? 'pill selected' : 'pill'}
            type="button"
            aria-pressed={preference === value}
            onClick={() => handleChange(value)}
          >
            {t(`account.appearance.${value}`)}
          </button>
        ))}
      </div>
      {message && <p className="walks-status" role="status">{message}</p>}
    </section>
  );
}

async function fetchPasskeys() {
  const { data, error } = await supabase.auth.passkey.list();
  if (error) throw error;
  if (!data) throw new Error('Passkey list was empty.');
  return data;
}

function Account() {
  const navigate = useNavigate();
  const session = useSession();
  const userId = session?.user?.id;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [signOutError, setSignOutError] = useState(false);
  const [passkeyStatus, setPasskeyStatus] = useState('idle');
  const [passkeyList, setPasskeyList] = useState({
    userId: null,
    status: 'loading',
    items: [],
  });
  const [passkeyMessage, setPasskeyMessage] = useState('');
  const [removingPasskeyId, setRemovingPasskeyId] = useState(null);
  const passkeyListMatchesUser = passkeyList.userId === userId;
  const passkeys = passkeyListMatchesUser ? passkeyList.items : [];
  const passkeysStatus = passkeyListMatchesUser ? passkeyList.status : 'loading';
  const supportsPasskeys = typeof window !== 'undefined'
    && typeof window.PublicKeyCredential !== 'undefined';

  useEffect(() => {
    if (!userId) return undefined;

    let active = true;
    fetchPasskeys()
      .then((data) => {
        if (!active) return;
        setPasskeyList({ userId, status: 'loaded', items: data });
      })
      .catch(() => {
        if (active) setPasskeyList({ userId, status: 'error', items: [] });
      });

    return () => {
      active = false;
    };
  }, [userId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setStatus(error ? 'error' : 'sent');
  }

  async function handlePasskeySignIn() {
    setPasskeyStatus('working');
    try {
      const { error } = await supabase.auth.signInWithPasskey();
      setPasskeyStatus(error ? 'error' : 'idle');
    } catch {
      setPasskeyStatus('error');
    }
  }

  async function handlePasskeyRegistration() {
    setPasskeyStatus('working');
    setPasskeyMessage('');
    try {
      const { data, error } = await supabase.auth.registerPasskey();
      if (error || !data) {
        setPasskeyStatus('error');
        setPasskeyMessage(t('account.passkeys.addError'));
        return;
      }
      setPasskeyList((current) => current.userId === userId
        ? { ...current, items: [...current.items, data] }
        : current);
      setPasskeyStatus('idle');
      setPasskeyMessage(t('account.passkeys.added'));
    } catch {
      setPasskeyStatus('idle');
      setPasskeyMessage(t('account.passkeys.addError'));
    }
  }
  async function handlePasskeyListRetry() {
    setPasskeyList({ userId, status: 'loading', items: [] });
    try {
      setPasskeyList({ userId, status: 'loaded', items: await fetchPasskeys() });
    } catch {
      setPasskeyList({ userId, status: 'error', items: [] });
    }
  }

  async function handlePasskeyRemoval(passkeyId) {
    if (!window.confirm(t('account.passkeys.removeConfirm'))) return;

    setRemovingPasskeyId(passkeyId);
    setPasskeyMessage('');
    try {
      const { error } = await supabase.auth.passkey.delete({ passkeyId });
      if (error) {
        setPasskeyMessage(t('account.passkeys.removeError'));
        return;
      }
      setPasskeyList((current) => current.userId === userId
        ? { ...current, items: current.items.filter((passkey) => passkey.id !== passkeyId) }
        : current);
      setPasskeyMessage(t('account.passkeys.removed'));
    } catch {
      setPasskeyMessage(t('account.passkeys.removeError'));
    } finally {
      setRemovingPasskeyId(null);
    }
  }

  async function handleSignOut() {
    setSignOutError(false);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) setSignOutError(true);
    } catch {
      setSignOutError(true);
    }
  }

  return (
    <main className="settings-page">
      <button className="back-button" type="button" onClick={() => navigate(-1)}>{t('account.back')}</button>
      <header className="settings-header">
        <h1>{t('account.settings')}</h1>
      </header>
      {session ? (
        <section>
          <p>{t('account.signedInAs', { email: session.user.email })}</p>
          <button className="pill" type="button" onClick={handleSignOut}>{t('account.signOut')}</button>
          {signOutError && <p className="walks-status" role="alert">{t('account.signOutError')}</p>}
          {supportsPasskeys && (
            <section className="account-passkeys">
              <h2>{t('account.passkeys.title')}</h2>
              {passkeysStatus === 'loading' && (
                <p className="walks-status" role="status">{t('account.passkeys.loading')}</p>
              )}
              {passkeysStatus === 'error' && (
                <div>
                  <p className="walks-status" role="status">{t('account.passkeys.loadError')}</p>
                  <button className="pill" onClick={handlePasskeyListRetry}>{t('shared.tryAgain')}</button>
                </div>
              )}
              {passkeysStatus === 'loaded' && (
                <>
                  {passkeys.length > 0 && (
                    <ul className="account-passkey-list">
                      {passkeys.map((passkey) => (
                        <li className="account-passkey-row" key={passkey.id}>
                          <div>
                            <p className="account-passkey-name">{passkey.friendly_name || t('account.passkeys.defaultName')}</p>
                            <p className="account-passkey-date">{formatDate(new Date(passkey.created_at))}</p>
                          </div>
                          <button
                            className="pill"
                            onClick={() => handlePasskeyRemoval(passkey.id)}
                            disabled={removingPasskeyId !== null || passkeyStatus === 'working'}
                          >
                            {removingPasskeyId === passkey.id ? t('account.passkeys.removing') : t('account.passkeys.remove')}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    className="pill"
                    onClick={handlePasskeyRegistration}
                    disabled={passkeyStatus === 'working' || removingPasskeyId !== null}
                  >
                    {passkeyStatus === 'working'
                      ? t('account.passkeys.adding')
                      : passkeys.length > 0
                        ? t('account.passkeys.addAnother')
                        : t('account.passkeys.add')}
                  </button>
                </>
              )}
              {passkeyMessage && <p className="walks-status" role="status">{passkeyMessage}</p>}
            </section>
          )}
          <AppearanceSetting />
        </section>
      ) : status === 'sent' ? (
        <section>
          <p>{t('account.email.sent')}</p>
          <button className="pill" type="button" onClick={() => setStatus('idle')}>{t('account.email.changeEmail')}</button>
          <AppearanceSetting />
        </section>
      ) : (
        <section>
          <p>{t('account.email.intro')}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="account-email">{t('account.email.label')}</label>
            <input
              id="account-email"
              type="email"
              required
              placeholder={t('account.email.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="pills">
              <button className="pill" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t('account.email.sending') : t('account.email.sendLink')}
              </button>
              {supportsPasskeys && (
                <button
                  className="pill"
                  type="button"
                  onClick={handlePasskeySignIn}
                  disabled={passkeyStatus === 'working'}
                >
                  {passkeyStatus === 'working'
                    ? t('account.passkeys.signingIn')
                    : t('account.passkeys.signIn')}
                </button>
              )}
            </div>
          </form>
          {status === 'error' && <p>{t('account.email.sendError')}</p>}
          {supportsPasskeys && passkeyStatus === 'error' && (
            <p role="alert">{t('account.passkeys.signInError')}</p>
          )}
          <AppearanceSetting />
        </section>
      )}
    </main>
  );
}

export default Account;