import { APP_LOCALE, formatNumber, t, tp } from './strings/index.js';
import { CITIES } from './constants.js';

const shortDateFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});
const monthDateFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  month: 'long',
  year: 'numeric',
});
const weekdayFormatter = new Intl.DateTimeFormat(APP_LOCALE, { weekday: 'short' });

export function todayLocal(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDuration(minutes) {
  if (minutes > 0 && minutes < 60 && minutes % 15 === 0) {
    return tp('duration.minutes', minutes);
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0 && hours > 0) {
    return tp('duration.hours', hours);
  }
  if (minutes < 60) return t('duration.compactMinutes', { minutes: formatNumber(minutes) });
  return t('duration.hoursAndMinutes', {
    hours: formatNumber(hours),
    minutes: formatNumber(remainingMinutes),
  });
}

export function formatDate(date) {
  return shortDateFormatter.format(date);
}

export function formatMonthDate(date) {
  return monthDateFormatter.format(date);
}

export function formatWeekdayLabels() {
  return Array.from({ length: 7 }, (_, index) => (
    weekdayFormatter.format(new Date(2024, 0, 7 + index))
  ));
}

export function getCityLabel(city) {
  if (!city) return '';
  const presetCity = CITIES.find((option) => option.value === city);
  return presetCity ? t(presetCity.label) : city;
}

export function getRecentPlaces(walks, limit = 6) {
  const seen = new Set();

  return [...walks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((walk) => (typeof walk.place === 'string' ? walk.place.trim() : ''))
    .filter((place) => {
      if (!place || seen.has(place)) return false;
      seen.add(place);
      return true;
    })
    .slice(0, limit);
}

export function getRecentCompanions(walks, limit = 6) {
  const seen = new Set();

  return [...walks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((walk) => (typeof walk.companion === 'string' ? walk.companion.trim() : ''))
    .filter((companion) => {
      if (!companion || seen.has(companion)) return false;
      seen.add(companion);
      return true;
    })
    .slice(0, limit);
}

export function getPlaceTypeMap(walks) {
  const placeTypes = new Map();

  [...walks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((walk) => {
      const place = typeof walk.place === 'string' ? walk.place.trim() : '';
      if (place && !placeTypes.has(place)) {
        placeTypes.set(place, walk.whereType || null);
      }
    });

  return placeTypes;
}