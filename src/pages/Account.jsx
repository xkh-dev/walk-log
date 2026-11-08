import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSession } from '../lib/useSession';

function formatPasskeyDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

async function fetchPasskeys() {
  const { data, error } = await supabase.auth.passkey.list();
  if (error) throw error;
  if (!data) throw new Error('Passkey list was empty.');
  return data;
}

function Account() {
  const session = useSession();
  const userId = session?.user?.id;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
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
        setPasskeyMessage("Passkey wasn't added. You can try again any time.");
        return;
      }
      setPasskeyList((current) => current.userId === userId
        ? { ...current, items: [...current.items, data] }
        : current);
      setPasskeyStatus('idle');
      setPasskeyMessage('Passkey added.');
    } catch {
      setPasskeyStatus('idle');
      setPasskeyMessage("Passkey wasn't added. You can try again any time.");
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
    if (!window.confirm('Remove this passkey? You can still sign in by email.')) return;

    setRemovingPasskeyId(passkeyId);
    setPasskeyMessage('');
    try {
      const { error } = await supabase.auth.passkey.delete({ passkeyId });
      if (error) {
        setPasskeyMessage("Passkey couldn't be removed. Try again.");
        return;
      }
      setPasskeyList((current) => current.userId === userId
        ? { ...current, items: current.items.filter((passkey) => passkey.id !== passkeyId) }
        : current);
      setPasskeyMessage('Passkey removed.');
    } catch {
      setPasskeyMessage("Passkey couldn't be removed. Try again.");
    } finally {
      setRemovingPasskeyId(null);
    }
  }

  if (session) {
    return (
      <section>
        <Link to="/">Back</Link>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        {supportsPasskeys && (
          <section className="account-passkeys">
            <h2>Passkeys</h2>
            {passkeysStatus === 'loading' && (
              <p className="walks-status" role="status">Loading passkeys…</p>
            )}
            {passkeysStatus === 'error' && (
              <div>
                <p className="walks-status" role="status">Couldn't load passkeys. Try again.</p>
                <button className="pill" onClick={handlePasskeyListRetry}>Try again</button>
              </div>
            )}
            {passkeysStatus === 'loaded' && (
              <>
                {passkeys.length > 0 && (
                  <ul className="account-passkey-list">
                    {passkeys.map((passkey) => (
                      <li className="account-passkey-row" key={passkey.id}>
                        <div>
                          <p className="account-passkey-name">{passkey.friendly_name || 'Passkey'}</p>
                          <p className="account-passkey-date">{formatPasskeyDate(passkey.created_at)}</p>
                        </div>
                        <button
                          className="pill"
                          onClick={() => handlePasskeyRemoval(passkey.id)}
                          disabled={removingPasskeyId !== null || passkeyStatus === 'working'}
                        >
                          {removingPasskeyId === passkey.id ? 'Removing…' : 'Remove'}
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
                    ? 'Adding…'
                    : passkeys.length > 0 ? 'Add another passkey' : 'Add a passkey'}
                </button>
              </>
            )}
            {passkeyMessage && <p className="walks-status" role="status">{passkeyMessage}</p>}
          </section>
        )}
      </section>
    );
  }

  if (status === 'sent') {
    return (
      <section>
        <p>Check your email for a sign-in link.</p>
        <button onClick={() => setStatus('idle')}>Use a different email</button>
      </section>
    );
  }

  return (
    <section>
      <Link to="/">Back</Link>
      <p>Sign in with your email. Walks are stored on this device for now; syncing isn't available yet.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="pills">
          <button className="pill" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send link'}
          </button>
          {supportsPasskeys && (
            <button
              className="pill"
              type="button"
              onClick={handlePasskeySignIn}
              disabled={passkeyStatus === 'working'}
            >
              {passkeyStatus === 'working' ? 'Signing in…' : 'Sign in with passkey'}
            </button>
          )}
        </div>
      </form>
      {status === 'error' && <p>Couldn't send the link. Try again in a few minutes.</p>}
      {supportsPasskeys && passkeyStatus === 'error' && (
        <p role="alert">Couldn't sign in with a passkey. Try again.</p>
      )}
    </section>
  );
}

export default Account;