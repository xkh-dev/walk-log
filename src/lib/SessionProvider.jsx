import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import { SessionContext } from './sessionContext';
import { t } from '../strings';

export function SessionProvider({ children }) {
  const [sessionState, setSessionState] = useState({
    session: null,
    ready: false,
    error: '',
  });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    let hasAuthEvent = false;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      hasAuthEvent = true;
      setSessionState({ session, ready: true, error: '' });
    });

    supabase.auth.getSession().then(({ data: sessionData, error }) => {
      if (error) {
        console.error('Could not read the current session.', error);
        if (active && !hasAuthEvent) {
          setSessionState((current) => ({ ...current, error: t('errors.loadSession') }));
        }
        return;
      }
      if (active && !hasAuthEvent) {
        setSessionState({ session: sessionData.session, ready: true, error: '' });
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [retryCount]);

  const retry = useCallback(() => {
    setSessionState((current) => ({ ...current, error: '' }));
    setRetryCount((current) => current + 1);
  }, []);
  const contextValue = useMemo(() => ({ ...sessionState, retry }), [retry, sessionState]);

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
