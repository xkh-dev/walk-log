# Walk, Log — Data Model

The single source of truth for what a "walk" is, how it's identified, and how it's
stored — now (local) and later (Supabase). Read this before changing the schema,
the CSV format, or the storage layer.

## The Walk

| Field         | Type                     | Required | Meaning |
|---------------|--------------------------|----------|---------|
| `id`          | string (UUID)            | yes      | Stable, globally-unique identity for this walk. Never reused, never reassigned. |
| `userId`      | string \| null           | no       | Owner. Empty (`null`/`""`) today; filled once accounts exist. |
| `date`        | string `"YYYY-MM-DD"`     | yes      | The **local calendar day** the walk belongs to (a civil date). |
| `createdAt`   | string (ISO 8601, UTC)   | yes      | The exact **instant** the record was saved. Used for ordering. |
| `duration`    | number (minutes)         | yes      | Length of the walk. Defaults to 30. |
| `whereType`   | string \| null           | no       | One of `WHERE_TYPES`: park, city, woods, mountains, coast, rural. |
| `whenType`    | string \| null           | no       | One of `WHEN_TYPES`: morning, noon, evening, night. |
| `whoType`     | string \| null           | no       | One of `WHO_TYPES`: by-yourself, with-someone. |
| `city`        | string                   | no       | City (from dropdown), e.g. "Москва". Default `""`. |
| `place`       | string                   | no       | Free-text place name, e.g. "Ботанический сад". Default `""`. |
| `companion`   | string                   | no       | Who they walked with. Default `""`. |
| `schemaVersion` | number                 | yes      | Format version, for safe import/migration. Starts at `1`. |

## Identity conventions

- An entity's **own** primary key is `id`. A walk has `id`; `/log/:id` uses it.
- When referencing a walk **from elsewhere**, use `walkId` (e.g. a future `photos`
  row). When referencing a user, use `userId`.
- `id` is a UUID (`crypto.randomUUID()`), so it's already unique across all devices
  and users without any coordination — the foundation for multi-user later.

## Dates: `date` vs `createdAt`

These answer different questions and must not be merged:
- `date` — *which calendar day* (local). Built from local parts, never `toISOString()`.
  Used for grouping and the calendar.
- `createdAt` — *the exact moment saved* (UTC). Built with `toISOString()`.
  Used to order multiple walks within the same day.

## Optional by design

Only `id`, `date`, `createdAt`, `duration`, and `schemaVersion` are required.
Everything the user *chooses* (where/when/who/place/companion) is optional — the
product never forces a field. Display code must handle `null`/`""` gracefully
(e.g. `colorForWalk` returns `null` → use the neutral color).

## Storage

- **Now:** browser `localStorage`, key `"walks"`, a JSON array of Walk objects.
- **Later (Phase 4):** a Supabase `walks` table, one row per walk, owned by `userId`.

## Import / export (CSV)

- Columns, stable order: `id, userId, date, createdAt, whereType, whenType,
  duration, whoType, city, place, companion, schemaVersion`.
- Import is **idempotent**: dedupe by `id` — skip any walk whose `id` already
  exists. Never reassign UUIDs. Re-importing your own export changes nothing.
- Never dedupe by content — two real walks can share every field but the `id`.
- Validate rows on import; skip malformed rows without corrupting storage.

## Planned (not built yet)

- `photos: string[]` — up to 2 per walk (Phase 6).
- `updatedAt` (ISO, UTC) — for sync conflict resolution once cross-device exists.
- `userId` populated on sign-in; existing local walks get the user's id on first sync.

## Planned Supabase table (Phase 4 sketch)

    create table walks (
      id            uuid primary key,
      user_id       uuid references auth.users not null,
      date          date not null,
      created_at    timestamptz not null,
      updated_at    timestamptz,
      duration      int not null default 30,
      where_type    text,
      when_type     text,
      who_type      text,
      city          text default '',
      place         text default '',
      companion     text default ''
    );
    -- Row-level security: a user can read/write only rows where user_id = auth.uid()

Note the naming shift: JS uses camelCase (`whereType`); Postgres conventionally uses
snake_case (`where_type`). The client layer maps between them.
