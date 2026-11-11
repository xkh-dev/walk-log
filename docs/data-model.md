# Walk, Log data model

When you change walk fields, CSV handling, or the database schema, use this reference to check what each record means and how the app stores and transfers it.

## Walk fields

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | string (UUID) | yes | Stable identity for this walk. Keep it when editing or transferring a record. |
| `userId` | string or null | no | Supabase owner when returned from the account; local records may omit it or use an empty value. Writes don't send it. |
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
- The `walks-cache:<userId>` localStorage key is a display-only cache for signed-in walks. It isn't read as a storage source and is never uploaded.
- On sign-in, the app uploads local walks using their existing IDs and removes only IDs confirmed in the account. If an upload or confirmation fails, the local data remains.

See [architecture and data flow](architecture.md) for how the provider coordinates these paths.

## Database capacity and plan usage

The Supabase Free plan includes 500 MB of database size, 1 GB of file storage, 5 GB of egress, and 50,000 monthly active users. Check the [current Supabase pricing](https://supabase.com/pricing) before making a capacity decision because plan limits can change.

The dashboard usage report checked on 2026-11-12 showed:

- Database size: 27 MB of 500 MB (about 5.4%).
- Monthly active users: 1 of 50,000.
- Egress: 0 GB of 5 GB.
- File storage: 0 GB of 1 GB.
- Log ingestion: 0.01 GB of 1 GB.
- Log query: 0.27 GB of 100 GB.

This is a dated snapshot, not a live quota reading. Recheck the dashboard before inviting users. Database size includes the database's fixed Postgres and Supabase overhead, such as system data, Auth and Storage metadata, and installed extensions. At the time of this estimate, the project had five walk rows, so most of the measured 27 MB was fixed overhead rather than walk data.

A typical walk row contains a few hundred bytes of values. Allow about 1 KB per walk for a rough estimate that includes row and index overhead; free-text fields can make individual rows larger. With roughly 470 MB remaining, that estimate allows for hundreds of thousands of additional walks. At one walk per day, that is centuries for one person or more than a decade for 100 people logging daily. Treat this as an upper-bound estimate, not a target: other data and operational headroom also use space. A few empty tables add only a small amount; row and index sizes matter more than table count.

### Planned data

- **Co-walking (#41):** A connection row with two user IDs, a status, and a date is estimated at about 100–200 bytes. Thousands of connections should remain under 1 MB.
- **Weather (#49):** Store weather fields on `walks`, since each walk has one weather record. Estimate about 50–100 bytes per walk.
- **Quotes:** A shared list of 1,000 short quotes is estimated at about 0.5 MB. Quotes stored per walk grow with walk notes. Decide whether they need a separate table when the feature is defined.

These are planning estimates, not measured database sizes. Revisit them when a feature's fields and typical text lengths are defined.

### Capacity and availability risks

Files such as photos and audio use Supabase Storage, which has a separate Free-plan limit. High-volume records such as analytics events or GPS points can grow the database quickly. Keep files out of Postgres and don't store location points.

Supabase may pause Free projects with low activity over a seven-day period. A paused project can be restored from the dashboard, but its API is unavailable until it is restored. See Supabase's [production availability guidance](https://supabase.com/docs/guides/deployment/going-into-prod#free-plan). Revisit this availability risk before inviting users.

## CSV import and export

The CSV columns, in order, are `id`, `userId`, `date`, `createdAt`, `whereType`, `whenType`, `duration`, `whoType`, `city`, `place`, `companion`, and `schemaVersion`.

Import validation checks the UUID, date, timestamp, duration, and supported schema version. Rows with invalid values or IDs that already exist are skipped. Re-importing the same walk doesn't create another record.

When exporting, the app prefixes text that could be interpreted as a spreadsheet formula with an apostrophe. Import removes that marker only when it is immediately followed by `=`, `+`, `-`, or `@`, so exporting and re-importing a walk preserves its text without changing the saved walk or its Supabase record.

## Supabase mapping

App fields use camelCase. The database uses snake_case; [`src/lib/remoteWalks.js`](../src/lib/remoteWalks.js) maps between them. The canonical table definition and row-level security policies are in [`supabase/schema.sql`](../supabase/schema.sql). Do not duplicate the SQL schema here.

The database has a nullable `updated_at` column reserved for future sync work; the current app doesn't set it. See the [roadmap](roadmap.md) for planned work.

## Related

- [Architecture and data flow](architecture.md)
- [Manual testing](testing.md)
- [Supabase schema](../supabase/schema.sql)
- [Documentation index](README.md)
