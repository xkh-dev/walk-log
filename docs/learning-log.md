# Learning log

This log records concepts introduced or used by merged pull requests. It is for contributors who want to understand the reasoning behind the implementation.

## 2026-11-08 · 43 schema (#52)

- **Concept**: Row-level security lets Postgres enforce walk ownership for every client query instead of relying on the UI to hide another user's rows. Where: `supabase/schema.sql`. Read more: [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 2026-11-08 · Move local walks into the account on sign-in (#51)

- **Concept**: An idempotent upsert plus a read-back check lets sign-in transfer existing walks without changing their IDs or deleting local copies before the account confirms them. Where: `src/lib/moveLocalWalks.js`. Read more: [Supabase JavaScript upsert](https://supabase.com/docs/reference/javascript/upsert).

## Related

- [Architecture and data flow](architecture.md)
- [Data model](data-model.md)
- [Documentation index](README.md)
