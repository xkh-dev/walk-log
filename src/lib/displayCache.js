const WALKS_CACHE_PREFIX = 'walks-cache:';
const PASSKEYS_CACHE_PREFIX = 'passkeys-cache:';

export function passkeysCacheKey(userId) {
  return `${PASSKEYS_CACHE_PREFIX}${userId}`;
}

export function readPasskeysCache(userId) {
  const raw = localStorage.getItem(passkeysCacheKey(userId));
  if (raw === null) return null;

  const passkeys = JSON.parse(raw);
  if (!Array.isArray(passkeys)) throw new Error('Cached passkeys must be an array.');
  return passkeys;
}

export function writePasskeysCache(userId, passkeys) {
  localStorage.setItem(passkeysCacheKey(userId), JSON.stringify(passkeys));
}

export function clearDisplayCaches() {
  const keysToRemove = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(WALKS_CACHE_PREFIX) || key?.startsWith(PASSKEYS_CACHE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
