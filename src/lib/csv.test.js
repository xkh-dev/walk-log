import assert from 'node:assert/strict';
import test from 'node:test';
import { csvToWalks, walksToCsv } from './csv.js';

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

test('exporting then importing formula-like walk text returns the original values', () => {
  const walk = {
    id: 'walk-id',
    userId: '',
    date: '2026-11-11',
    createdAt: '2026-11-11T00:00:00.000Z',
    whereType: '',
    whenType: '',
    duration: 30,
    whoType: '@friend',
    city: '=city',
    place: '+place',
    companion: '-companion',
    schemaVersion: 1,
  };

  assert.deepEqual(csvToWalks(walksToCsv([walk])), [walk]);
});

test('CSV round trips keep preset city values unchanged', () => {
  const walk = { id: 'walk-id', city: 'Москва' };

  const [importedWalk] = csvToWalks(walksToCsv([walk]));
  assert.equal(importedWalk.city, walk.city);
});

test('import removes an export marker only before formula characters', () => {
  const csv = [
    'id,city,place,companion,whoType',
    "walk-id,'=city,'+place,'-companion,'@friend",
    "walk-2,'ordinary,' space,'!value,'",
  ].join('\n');

  assert.deepEqual(csvToWalks(csv).map((walk) => [
    walk.city,
    walk.place,
    walk.companion,
    walk.whoType,
  ]), [
    ['=city', '+place', '-companion', '@friend'],
    ["'ordinary", "' space", "'!value", "'"],
  ]);
});
