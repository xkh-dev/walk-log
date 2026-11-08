import { SCHEMA_VERSION } from '../constants';

export function getWalksToImport(importedWalks, existingWalks) {
  const ids = new Set(existingWalks.map((walk) => walk.id));
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

  return { added: walksToAdd.length, skipped, walksToAdd };
}
