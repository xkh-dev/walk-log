import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSession } from '../lib/useSession';

function Account() {
  const session = useSession();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [passkeyStatus, setPasskeyStatus] = useState('idle');
  const supportsPasskeys = typeof window !== 'undefined'
    && typeof window.PublicKeyCredential !== 'undefined';

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
    try {
      const { error } = await supabase.auth.registerPasskey();
      setPasskeyStatus(error ? 'error' : 'success');
    } catch {
      setPasskeyStatus('error');
    }
  }

  if (session) {
    return (
      <section>
        <Link to="/">Back</Link>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        {supportsPasskeys && (
          <div>
            <button
              className="pill"
              onClick={handlePasskeyRegistration}
              disabled={passkeyStatus === 'working'}
            >
              {passkeyStatus === 'working' ? 'Adding…' : 'Add a passkey'}
            </button>
            {passkeyStatus === 'success' && <p role="status">Passkey added.</p>}
            {passkeyStatus === 'error' && <p role="alert">Couldn't add a passkey. Try again.</p>}
          </div>
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