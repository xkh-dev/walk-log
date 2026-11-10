# 004: A display-only cache for signed-in walks

If you change loading or caching behavior, use this ADR to understand why the per-user cache is for display only.

## Status

Accepted

## Date

2026-11-08

## Context

The shared provider needed to reuse walk data across screens and display the last known account data while it refreshes from Supabase. The cache behavior was tracked in [issue #50](https://github.com/xkh-dev/walk-log/issues/50).

## Options

- Wait for a Supabase request on every screen visit.
- Add a general-purpose client cache library.
- Keep one per-user browser cache for display, then refresh from Supabase.

## Decision

Use a separate localStorage key for each signed-in user's display cache. Supabase remains the source of truth for signed-in reads and writes.

## Consequences

- The provider can display the last known walks while it refreshes from Supabase.
- Successful refreshes and walk changes update provider state and the cache.
- The cache is never used as a storage source or uploaded, and it is removed on sign-out.
- The cache doesn't make signed-in operations available offline.

## Related

- [Architecture and data flow](../architecture.md)
- [Optional sign-in and storage by session](002-optional-sign-in-and-storage.md)
- [Data model](../data-model.md)
