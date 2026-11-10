# 001: Supabase for authentication and walk storage

This ADR records why signed-in walks use Supabase. If you change authentication or account storage, check this tradeoff first.

## Status

Accepted

## Date

2026-10-31

## Context

The web app needed optional accounts and a way to make signed-in walks available across sessions without requiring a custom server. The decision was tracked in [issue #25](https://github.com/xkh-dev/walk-log/issues/25).

## Options

- Keep all walks in browser storage and defer accounts.
- Build and operate a custom authentication and data service.
- Use a managed backend with authentication and a database.

## Decision

Use Supabase Auth and Postgres for accounts and signed-in walk storage. Signed-out use remains available without an account.

## Consequences

- The web app depends on Supabase for signed-in sessions and walk storage.
- Row-level security scopes each account's database access to its authenticated user.
- The browser uses a publishable key; it doesn't contain a service-role key.
- The schema is maintained in [`supabase/schema.sql`](../../supabase/schema.sql), and field mapping lives in [`src/lib/remoteWalks.js`](../../src/lib/remoteWalks.js).

## Related

- [Optional sign-in and storage by session](002-optional-sign-in-and-storage.md)
- [Data model](../data-model.md)
- [Architecture and data flow](../architecture.md)
