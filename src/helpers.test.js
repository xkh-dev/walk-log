import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDate,
  formatDuration,
  formatMonthDate,
  formatWeekdayLabels,
  getCityLabel,
} from './helpers.js';

test('formatDuration keeps existing English duration text', () => {
  const cases = [
    [5, '5m'],
    [15, '15 minutes'],
    [30, '30 minutes'],
    [45, '45 minutes'],
    [60, '1 hour'],
    [120, '2 hours'],
    [75, '1h 15m'],
  ];

  for (const [minutes, expected] of cases) {
    assert.equal(formatDuration(minutes), expected);
  }
});

test('date formatters use the existing English date styles', () => {
  const date = new Date(2024, 0, 7, 12);
  assert.equal(formatDate(date), 'Sun, Jan 7');
  assert.equal(formatMonthDate(date), 'January 2024');
  assert.deepEqual(formatWeekdayLabels(), ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
});

test('getCityLabel translates preset labels and preserves custom values', () => {
  assert.equal(getCityLabel('Москва'), 'Москва');
  assert.equal(getCityLabel('My Custom City'), 'My Custom City');
  assert.equal(getCityLabel(''), '');
});
