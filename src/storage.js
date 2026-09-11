const STORAGE_KEY = 'walks';

// read every saved walk (or an empty list if there are none yet)
export function getWalks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// add one walk to the saved list
export function saveWalk(walk) {
  const walks = getWalks();     // 1. read what's there
  walks.push(walk);             // 2. add the new one
  localStorage.setItem(STORAGE_KEY, JSON.stringify(walks)); // 3. write it all back
}
