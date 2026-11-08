import * as localWalks from './storage';
import * as remoteWalks from './remoteWalks';

export async function moveLocalWalks() {
  const walks = localWalks.getWalks();
  if (walks.length === 0) return { moved: 0, kept: 0 };

  await remoteWalks.importWalks(walks);
  const confirmedIds = await remoteWalks.getWalkIds(walks.map((walk) => walk.id));
  const confirmedIdSet = new Set(confirmedIds);
  const moved = walks.filter((walk) => confirmedIdSet.has(walk.id)).length;

  localWalks.removeWalks(confirmedIds);
  return { moved, kept: walks.length - moved };
}
