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