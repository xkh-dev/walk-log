# Walk, Log data model

This reference defines the walk record and how the app stores and transfers it. Use it when changing walk fields, CSV handling, or the database schema.

## Walk fields

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | string (UUID) | yes | Stable identity for this walk. Keep it when editing or transferring a record. |
| `userId` | string or null | no | Supabase owner when returned from the account; local records may omit it or use an empty value. Writes do not send it. |
| `date` | string (`YYYY-MM-DD`) | yes | Local calendar day of the walk. |
| `createdAt` | string (ISO 8601 UTC) | yes | Instant the record was saved; used to order walks. |
| `duration` | number (minutes) | yes | Walk duration. New walks default to 30 minutes. |
| `whereType` | string or null | no | Place category from `WHERE_TYPES`. |
| `whenType` | string or null | no | Time-of-day category from `WHEN_TYPES`. |
| `whoType` | string or null | no | Companion category from `WHO_TYPES`. |
| `city` | string | no | City value; defaults to an empty string. |
| `place` | string | no | Free-text place; defaults to an empty string. |
| `companion` | string | no | Free-text companion; defaults to an empty string. |
| `schemaVersion` | number | yes | Import format version. The current version is `1`. |

Only `id`, `date`, `createdAt`, `duration`, and `schemaVersion` are required for an imported walk. The app keeps the other details optional.

## Dates and identity

Build `date` from local date parts so a walk stays on its local calendar day. Do not create it with `toISOString()`, which converts the time to UTC. `createdAt` represents an instant and is stored as a UTC timestamp.

Keep a walk's UUID stable for its lifetime. CSV imports and sign-in migration use that ID to identify a record and avoid duplicates.

## Storage by session

- Signed out, the app reads and writes the `walks` array in browser `localStorage`.
- Signed in, the Supabase `public.walks` table is the source of truth.
- The `walks-cache:<userId>` localStorage key is a display-only cache for signed-in walks. It is not read as a storage source and is never uploaded.
- On sign-in, the app uploads local walks using their existing IDs and removes only IDs confirmed in the account. If an upload or confirmation fails, the local data remains.

See [architecture and data flow](architecture.md) for how the provider coordinates these paths.

## CSV import and export

The CSV columns, in order, are `id`, `userId`, `date`, `createdAt`, `whereType`, `whenType`, `duration`, `whoType`, `city`, `place`, `companion`, and `schemaVersion`.

Import validation checks the UUID, date, timestamp, duration, and supported schema version. Rows with invalid values or IDs that already exist are skipped. Re-importing the same walk does not create another record.

When exporting, the app prefixes text that could be interpreted as a spreadsheet formula with an apostrophe. This protects the exported file without changing the saved walk or its Supabase record.

## Supabase mapping

App fields use camelCase. The database uses snake_case; [`src/lib/remoteWalks.js`](../src/lib/remoteWalks.js) maps between them. The canonical table definition and row-level security policies are in [`supabase/schema.sql`](../supabase/schema.sql). Do not duplicate the SQL schema here.

The database has a nullable `updated_at` column reserved for future sync work; the current app does not set it. See the [roadmap](roadmap.md) for planned work.

## Related

- [Architecture and data flow](architecture.md)
- [Manual testing](testing.md)
- [Supabase schema](../supabase/schema.sql)
- [Documentation index](README.md)
