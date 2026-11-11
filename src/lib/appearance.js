export const APPEARANCE_CHANGE_EVENT = 'walk-log-appearance-change';
export const APPEARANCE_STORAGE_KEY = 'walk-log-appearance';
export const APPEARANCE_OPTIONS = ['system', 'light', 'dark'];

export function getAppearancePreference() {
  try {
    const preference = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);
    return APPEARANCE_OPTIONS.includes(preference) ? preference : 'system';
  } catch (error) {
    console.error('Unable to read the saved appearance preference.', error);
    return 'system';
  }
}

export function setAppearancePreference(preference) {
  if (!APPEARANCE_OPTIONS.includes(preference)) {
    throw new Error(`Unknown appearance preference: ${preference}`);
  }

  window.dispatchEvent(new CustomEvent(APPEARANCE_CHANGE_EVENT, { detail: preference }));
  window.localStorage.setItem(APPEARANCE_STORAGE_KEY, preference);
}
