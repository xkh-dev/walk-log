import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { useSession } from '../useSession';

function Account() {
  const session = useSession();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setStatus(error ? 'error' : 'sent');
  }

  if (session) {
    return (
      <section>
        <Link to="/stats">Back</Link>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
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
      <Link to="/stats">Back</Link>
      <p>Sign in with your email. Walks are stored on this device for now; syncing isn't available yet.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send link'}
        </button>
      </form>
      {status === 'error' && <p>Couldn't send the link. Try again in a few minutes.</p>}
    </section>
  );
}

export default Account;