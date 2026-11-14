import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as walksApi from './walks';
import { moveLocalWalks } from './moveLocalWalks';
import { useSession } from './useSession';
import { WalksContext } from './useWalks';
import { t } from '../strings';

const CACHE_PREFIX = 'walks-cache:';

function cacheKey(userId) {
  return `${CACHE_PREFIX}${userId}`;
}

function sortWalks(walks) {
  return [...walks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function readCache(userId) {
  const raw = localStorage.getItem(cacheKey(userId));
  if (raw === null) return null;

  const walks = JSON.parse(raw);
  if (!Array.isArray(walks)) throw new Error('Cached walks must be an array.');
  return walks;
}

export function WalksProvider({ children }) {
  const session = useSession();
  const userId = session?.user?.id ?? null;
  const authReady = session !== undefined;
  const [walks, setWalks] = useState([]);
  const [walksOwner, setWalksOwner] = useState();
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState('');
  const walksRef = useRef(walks);
  const sessionRef = useRef(session);
  const previousUserId = useRef(null);
  const movedLocalWalksUserId = useRef(null);
  const requestId = useRef(0);
  const mutationVersion = useRef(0);

  const commitWalks = useCallback((nextWalks, ownerId) => {
    const sortedWalks = sortWalks(nextWalks);
    walksRef.current = sortedWalks;
    setWalks(sortedWalks);
    setWalksOwner(ownerId);
    setReady(true);

    if (!ownerId) return;

    try {
      localStorage.setItem(cacheKey(ownerId), JSON.stringify(sortedWalks));
    } catch {
      setLoadError(t('errors.updateWalksCache'));
    }
  }, []);

  const refresh = useCallback(async () => {
    const currentSession = sessionRef.current;
    if (currentSession === undefined) return;

    const currentUserId = currentSession?.user?.id ?? null;
    const thisRequest = ++requestId.current;
    const versionAtStart = mutationVersion.current;
    setLoadError('');

    try {
      const freshWalks = await walksApi.getWalks(currentSession);
      if (thisRequest !== requestId.current || versionAtStart !== mutationVersion.current) return;
      commitWalks(freshWalks, currentUserId);
    } catch {
      if (thisRequest !== requestId.current || versionAtStart !== mutationVersion.current) return;
      setWalksOwner(currentUserId);
      setLoadError(t('errors.loadWalks'));
    }
  }, [commitWalks]);

  useEffect(() => {
    if (!authReady) return;
    sessionRef.current = session;

    requestId.current += 1;
    mutationVersion.current += 1;

    const priorUserId = previousUserId.current;
    let signOutError = '';
    if (priorUserId && !userId) {
      try {
        localStorage.removeItem(cacheKey(priorUserId));
      } catch {
        signOutError = t('errors.clearWalksCache');
      }
    }
    previousUserId.current = userId;

    if (!userId) {
      try {
        const localWalks = sortWalks(walksApi.getWalks(sessionRef.current));
        walksRef.current = localWalks;
        setWalks(localWalks);
        setWalksOwner(null);
        setReady(true);
        setLoadError(signOutError);
      } catch {
        setWalks([]);
        walksRef.current = [];
        setWalksOwner(null);
        setReady(false);
        setLoadError(t('errors.readWalks'));
      }
      return;
    }

    try {
      const cachedWalks = readCache(userId);
      if (cachedWalks) {
        const sortedCachedWalks = sortWalks(cachedWalks);
        walksRef.current = sortedCachedWalks;
        setWalks(sortedCachedWalks);
        setWalksOwner(userId);
        setReady(true);
        setLoadError('');
      } else {
        walksRef.current = [];
        setWalks([]);
        setWalksOwner(userId);
        setReady(false);
        setLoadError('');
      }
    } catch {
      walksRef.current = [];
      setWalks([]);
      setWalksOwner(userId);
      setReady(false);
      setLoadError(t('errors.readWalksCache'));
    }

    void refresh();
  }, [authReady, refresh, session, userId]);

  useEffect(() => {
    if (!authReady) return;
    if (!userId) {
      movedLocalWalksUserId.current = null;
      return;
    }
    if (movedLocalWalksUserId.current === userId) return;
    movedLocalWalksUserId.current = userId;

    void (async () => {
      try {
        const result = await moveLocalWalks();
        if (result.moved > 0) await refresh();
      } catch {
        // Keep failures out of the UI; the next app session will retry.
      }
    })();
  }, [authReady, refresh, userId]);

  const assertSessionReady = () => {
    if (sessionRef.current === undefined) throw new Error('The session is not ready.');
  };

  const saveWalk = useCallback(async (walk) => {
    assertSessionReady();
    const operationSession = sessionRef.current;
    const operationUserId = operationSession?.user?.id ?? null;
    await walksApi.saveWalk(walk, operationSession);
    mutationVersion.current += 1;
    if ((sessionRef.current?.user?.id ?? null) !== operationUserId) return;
    setLoadError('');
    commitWalks([...walksRef.current, walk], operationUserId);
  }, [commitWalks]);

  const updateWalk = useCallback(async (id, changes) => {
    assertSessionReady();
    const operationSession = sessionRef.current;
    const operationUserId = operationSession?.user?.id ?? null;
    await walksApi.updateWalk(id, changes, operationSession);
    mutationVersion.current += 1;
    if ((sessionRef.current?.user?.id ?? null) !== operationUserId) return;
    setLoadError('');
    commitWalks(
      walksRef.current.map((walk) => (walk.id === id ? { ...walk, ...changes } : walk)),
      operationUserId,
    );
  }, [commitWalks]);

  const deleteWalk = useCallback(async (id) => {
    assertSessionReady();
    const operationSession = sessionRef.current;
    const operationUserId = operationSession?.user?.id ?? null;
    await walksApi.deleteWalk(id, operationSession);
    mutationVersion.current += 1;
    if ((sessionRef.current?.user?.id ?? null) !== operationUserId) return;
    setLoadError('');
    commitWalks(walksRef.current.filter((walk) => walk.id !== id), operationUserId);
  }, [commitWalks]);

  const importWalks = useCallback(async (importedWalks) => {
    assertSessionReady();
    const operationSession = sessionRef.current;
    const operationUserId = operationSession?.user?.id ?? null;
    const result = await walksApi.importWalks(importedWalks, operationSession, walksRef.current);
    mutationVersion.current += 1;
    if ((sessionRef.current?.user?.id ?? null) !== operationUserId) return result;
    setLoadError('');
    commitWalks([...walksRef.current, ...result.walks], operationUserId);
    return result;
  }, [commitWalks]);

  const currentUserId = session?.user?.id ?? null;
  const ownsWalks = authReady && walksOwner === currentUserId;
  const contextValue = useMemo(() => ({
    walks: ownsWalks ? walks : [],
    ready: ownsWalks && ready,
    loadError: ownsWalks ? loadError : '',
    saveWalk,
    updateWalk,
    deleteWalk,
    importWalks,
    refresh,
  }), [deleteWalk, importWalks, loadError, ownsWalks, ready, refresh, saveWalk, updateWalk, walks]);

  return (
    <WalksContext.Provider value={contextValue}>
      {children}
    </WalksContext.Provider>
  );
}

export default WalksProvider;
