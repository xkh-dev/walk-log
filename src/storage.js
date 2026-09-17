import { SCHEMA_VERSION } from './constants';

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
  const walksToAdd = [];
  let skipped = 0;

  importedWalks.forEach((walk) => {
    const isValidId = typeof walk.id === 'string'
      && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(walk.id);
    const dateParts = typeof walk.date === 'string' ? walk.date.split('-').map(Number) : [];
    const parsedDate = dateParts.length === 3
      ? new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]))
      : null;
    const isValidDate = typeof walk.date === 'string'
      && /^\d{4}-\d{2}-\d{2}$/.test(walk.date)
      && parsedDate
      && parsedDate.getUTCFullYear() === dateParts[0]
      && parsedDate.getUTCMonth() === dateParts[1] - 1
      && parsedDate.getUTCDate() === dateParts[2];
    const isValidCreatedAt = typeof walk.createdAt === 'string'
      && !Number.isNaN(Date.parse(walk.createdAt));
    const isValidDuration = typeof walk.duration === 'number'
      && Number.isFinite(walk.duration)
      && walk.duration >= 0;
    const isSupportedSchema = walk.schemaVersion === SCHEMA_VERSION;

    if (!isValidId || !isValidDate || !isValidCreatedAt || !isValidDuration
      || !isSupportedSchema || ids.has(walk.id)) {
      skipped += 1;
      return;
    }

    ids.add(walk.id);
    walksToAdd.push({ ...walk, userId: walk.userId || '' });
  });

  if (walksToAdd.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...walks, ...walksToAdd]));
  }

  return { added: walksToAdd.length, skipped };
}
