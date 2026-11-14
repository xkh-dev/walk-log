import en from './en.js';

export const APP_LOCALE = 'en-US';
const numberFormatter = new Intl.NumberFormat(APP_LOCALE, { useGrouping: false });

export function formatNumber(value) {
  return numberFormatter.format(value);
}

export function t(key, values = {}) {
  const value = key.split('.').reduce((current, part) => current?.[part], en);
  if (typeof value !== 'string') {
    throw new Error(`Unknown UI string: ${key}`);
  }

  return value.replace(/\{(\w+)\}/g, (placeholder, name) => {
    if (!Object.hasOwn(values, name)) {
      throw new Error(`Missing value "${name}" for UI string "${key}".`);
    }
    return String(values[name]);
  });
}

export function tp(key, count) {
  const plural = new Intl.PluralRules(APP_LOCALE).select(count);
  return t(`${key}.${plural}`, { count: formatNumber(count) });
}
