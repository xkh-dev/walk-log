import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export function useSession() {
  const [session, setSession] = useState();

  useEffect(() => {
    let active = true;
    let hasAuthEvent = false;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      hasAuthEvent = true;
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: sessionData, error }) => {
      if (error) {
        console.error('Could not read the current session.', error);
        return;
      }
      if (active && !hasAuthEvent) setSession(sessionData.session);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return session;
}