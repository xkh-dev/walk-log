import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clearDisplayCaches,
  passkeysCacheKey,
  readPasskeysCache,
  writePasskeysCache,
} from './displayCache.js';

function withLocalStorage(run) {
  const originalStorage = globalThis.localStorage;
  const values = new Map();
  globalThis.localStorage = {
    get length() {
      return values.size;
    },
    getItem(key) {
      return values.get(key) ?? null;
    },
    key(index) {
      return [...values.keys()][index] ?? null;
    },
    removeItem(key) {
      values.delete(key);
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };

  try {
    run(values);
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = originalStorage;
  }
}

test('stores passkeys in a separate per-user display cache', () => {
  withLocalStorage((values) => {
    const passkeys = [{ id: 'key-1', friendly_name: 'Laptop' }];
    values.set('walks', '[{"id":"walk-1"}]');

    writePasskeysCache('user-1', passkeys);

    assert.equal(passkeysCacheKey('user-1'), 'passkeys-cache:user-1');
    assert.deepEqual(readPasskeysCache('user-1'), passkeys);
    assert.equal(values.get('walks'), '[{"id":"walk-1"}]');
  });
});

test('clears display caches without removing local walks', () => {
  withLocalStorage((values) => {
    values.set('walks', '[{"id":"walk-1"}]');
    values.set('walks-cache:user-1', '[]');
    values.set('walks-cache:user-2', '[]');
    values.set('passkeys-cache:user-1', '[]');
    values.set('passkeys-cache:user-2', '[]');
    values.set('other-value', 'keep');

    clearDisplayCaches();

    assert.equal(values.has('walks-cache:user-1'), false);
    assert.equal(values.has('walks-cache:user-2'), false);
    assert.equal(values.has('passkeys-cache:user-1'), false);
    assert.equal(values.has('passkeys-cache:user-2'), false);
    assert.equal(values.get('walks'), '[{"id":"walk-1"}]');
    assert.equal(values.get('other-value'), 'keep');
  });
});
