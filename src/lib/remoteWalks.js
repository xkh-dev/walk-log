import { supabase } from './supabase';

// app field → DB column
const FIELDS = {
  id: 'id',
  date: 'date',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  duration: 'duration',
  whereType: 'where_type',
  whenType: 'when_type',
  whoType: 'who_type',
  city: 'city',
  place: 'place',
  companion: 'companion',
  schemaVersion: 'schema_version',
};

// app walk → DB row (only fields that are set, so partial changes work too)
function toRow(walk) {
  const row = {};
  Object.entries(FIELDS).forEach(([appKey, dbKey]) => {
    if (walk[appKey] !== undefined) row[dbKey] = walk[appKey];
  });
  return row;
}

// DB row → app walk
function fromRow(row) {
  const walk = { userId: row.user_id };
  Object.entries(FIELDS).forEach(([appKey, dbKey]) => {
    walk[appKey] = row[dbKey];
  });
  return walk;
}

export async function getWalks() {
  const { data, error } = await supabase.from('walks').select('*');
  if (error) throw error;
  return data.map(fromRow);
}

export async function saveWalk(walk) {
  const { error } = await supabase.from('walks').upsert(toRow(walk));
  if (error) throw error;
}

export async function updateWalk(id, changes) {
  const { error } = await supabase.from('walks').update(toRow(changes)).eq('id', id);
  if (error) throw error;
}

export async function deleteWalk(id) {
  const { error } = await supabase.from('walks').delete().eq('id', id);
  if (error) throw error;
}