const CSV_FIELDS = [
  'id',
  'createdAt',
  'date',
  'duration',
  'whereType',
  'whenType',
  'whoType',
  'city',
  'place',
  'companion',
];

function escapeCell(value) {
  const cell = value == null ? '' : String(value);
  return /[",\n\r]/.test(cell) ? `"${cell.replaceAll('"', '""')}"` : cell;
}

export function walksToCsv(walks) {
  return [
    CSV_FIELDS.join(','),
    ...walks.map((walk) => CSV_FIELDS.map((field) => escapeCell(walk[field])).join(',')),
  ].join('\n');
}

function parseRows(csv) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && nextCharacter === '\n') index += 1;
      row.push(cell);
      if (row.some((value) => value !== '')) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }

  row.push(cell);
  if (row.some((value) => value !== '')) rows.push(row);
  return rows;
}

export function csvToWalks(csv) {
  const rows = parseRows(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((values) => {
    const walk = headers.reduce((result, header, index) => {
      if (CSV_FIELDS.includes(header)) result[header] = values[index] || '';
      return result;
    }, {});

    return {
      ...walk,
      id: walk.id || crypto.randomUUID(),
      createdAt: walk.createdAt || new Date().toISOString(),
      date: walk.date || new Date().toISOString().slice(0, 10),
      duration: Number(walk.duration) || 0,
    };
  });
}