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

export function updateWalk(id, changes) {
  const walks = getWalks();
  const updatedWalks = walks.map((walk) => (
    walk.id === id ? { ...walk, ...changes } : walk
  ));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWalks));
}

export function deleteWalk(id) {
  const walks = getWalks();
  const remainingWalks = walks.filter((walk) => walk.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remainingWalks));
}

export function importWalks(importedWalks) {
  const walks = getWalks();
  const ids = new Set(walks.map((walk) => walk.id));
  const walksToAdd = importedWalks.map((walk) => {
    const importedWalk = { ...walk };
    if (ids.has(importedWalk.id)) importedWalk.id = crypto.randomUUID();
    ids.add(importedWalk.id);
    return importedWalk;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...walks, ...walksToAdd]));
  return walksToAdd.length;
}
