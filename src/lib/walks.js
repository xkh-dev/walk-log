import * as localWalks from './storage';
import * as remoteWalks from './remoteWalks';
import { getWalksToImport } from './importWalks';

function isSignedIn(session) {
  return Boolean(session?.user?.id);
}

export function getWalks(session) {
  return isSignedIn(session) ? remoteWalks.getWalks() : localWalks.getWalks();
}

export function saveWalk(walk, session) {
  return isSignedIn(session)
    ? remoteWalks.saveWalk(walk)
    : localWalks.saveWalk(walk);
}

export function updateWalk(id, changes, session) {
  return isSignedIn(session)
    ? remoteWalks.updateWalk(id, changes)
    : localWalks.updateWalk(id, changes);
}

export function deleteWalk(id, session) {
  return isSignedIn(session)
    ? remoteWalks.deleteWalk(id)
    : localWalks.deleteWalk(id);
}

export async function importWalks(importedWalks, session, existingWalks) {
  if (!isSignedIn(session)) return localWalks.importWalks(importedWalks);

  const result = getWalksToImport(importedWalks, existingWalks);
  if (result.walksToAdd.length > 0) {
    await remoteWalks.importWalks(result.walksToAdd);
  }
  return { added: result.added, skipped: result.skipped, walks: result.walksToAdd };
}
