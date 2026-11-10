import assert from 'node:assert/strict';
import test from 'node:test';
import { walksToCsv } from './csv.js';

test('prefixes formula-like text in CSV exports', () => {
  const csv = walksToCsv([
    {
      id: 'walk-id',
      city: ' = 1 + 1',
      place: '\t@value',
      whenType: '+value',
      whoType: '-value',
      companion: 'A quiet path',
    },
  ]);

  assert.match(csv, /,' = 1 \+ 1,/);
  assert.match(csv, /,'\t@value,/);
  assert.match(csv, /,'\+value,/);
  assert.match(csv, /,'-value,/);
  assert.match(csv, /,A quiet path,/);
});

test('does not change walk data when exporting', () => {
  const walk = { id: 'walk-id', place: '= 1 + 1' };
  const original = { ...walk };

  walksToCsv([walk]);

  assert.deepEqual(walk, original);
});
