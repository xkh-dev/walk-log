# 002: Optional sign-in and storage by session

This record explains why storage changes with sign-in state and how local walks move to an account. It is for contributors changing sign-in, sync, or storage behavior.

## Status

Accepted

## Date

2026-11-08

## Context

Walk logging should not require an account. Signed-in users also need walks to be available across sessions. The tradeoff was discussed in [issue #43](https://github.com/xkh-dev/walk-log/issues/43) and implemented in [PR #51](https://github.com/xkh-dev/walk-log/pull/51).

## Options

- Require an account before someone can log a walk.
- Keep browser storage as the source of truth and sync it in the background while signed in.
- Use browser storage while signed out; use Supabase after sign-in.

## Decision

Keep sign-in optional. Signed-out walks stay in browser storage. On sign-in, transfer them to Supabase with their existing IDs and remove only IDs confirmed in the account. Signed-in reads and writes use Supabase.

## Consequences

- People can use the app without an account.
- Signed-in operations depend on a working connection; the web app does not queue signed-in changes offline.
- Signing out does not copy account walks into the signed-out `walks` key.
- Local-first sync remains a separate possibility for a native client; it is not current web behavior.

## Related

- [Supabase for authentication and walk storage](001-supabase-for-auth-and-storage.md)
- [Display-only cache](004-display-only-cache.md)
- [Data model](../data-model.md)
