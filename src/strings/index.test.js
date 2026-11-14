import test from 'node:test';
import assert from 'node:assert/strict';
import { t, tp } from './index.js';

test('t resolves grouped strings and fills placeholders', () => {
  assert.equal(t('account.signedInAs', { email: 'walk@example.com' }), 'Signed in as walk@example.com');
});

test('t reports unknown keys and missing placeholder values', () => {
  assert.throws(() => t('account.missing'), /Unknown UI string/);
  assert.throws(() => t('account.signedInAs'), /Missing value "email"/);
});

test('tp uses English singular and plural forms', () => {
  assert.equal(tp('duration.minutes', 1), '1 minute');
  assert.equal(tp('duration.minutes', 2), '2 minutes');
});
