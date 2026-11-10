# Learning log

This log records concepts introduced or used by merged pull requests. It is for contributors who want to understand the reasoning behind the implementation.

## 2026-11-10 · Pull request checks

- **Concept**: A GitHub Actions workflow can run the same dependency installation, production build, and lint commands for every pull request. Where: `.github/workflows/ci.yml`. Read more: [Building and testing Node.js](https://docs.github.com/actions/automating-builds-and-tests/building-and-testing-nodejs).

## 2026-11-08 · Session-aware storage and account security

- **Concept**: Selecting the storage adapter from the current session keeps screens independent of whether walks live in browser storage or Supabase. Where: `src/lib/walks.js`. Read more: [Optional sign-in and storage by session](decisions/002-optional-sign-in-and-storage.md).
- **Concept**: A per-user display cache can show the last known walks while the app refreshes from Supabase without becoming another write source. Where: `src/lib/WalksProvider.jsx`. Read more: [Display-only cache](decisions/004-display-only-cache.md).
- **Concept**: WebAuthn passkeys provide an account sign-in method tied to a site's origin, while email links remain available as an alternative. Where: `src/pages/Account.jsx`. Read more: [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).
- **Concept**: Row-level security lets Postgres enforce walk ownership for every client query instead of relying on the UI to hide another user's rows. Where: `supabase/schema.sql`. Read more: [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security) (#52).
- **Concept**: A stable ID, idempotent upsert, and read-back check let sign-in transfer local walks without removing data before the account confirms it. Where: `src/lib/moveLocalWalks.js`. Read more: [Supabase JavaScript upsert](https://supabase.com/docs/reference/javascript/upsert) (#51).

## 2026-11-07 · Remote walk access

- **Concept**: A dedicated adapter keeps Supabase reads and writes separate from browser storage, while an explicit field map translates camelCase app fields to snake_case database columns. Where: `src/lib/remoteWalks.js`. Read more: [Data model](data-model.md).

## 2026-11-06 · Magic links and session state

- **Concept**: A magic link can authenticate without a password, and an auth-state listener keeps React screens in step with the Supabase session. Where: `src/lib/useSession.js` and `src/pages/Account.jsx`. Read more: [Supabase auth state changes](https://supabase.com/docs/reference/javascript/auth-onauthstatechange).

## 2026-10-31 · Supabase setup

- **Concept**: A browser client configured with the project URL and publishable key provides managed authentication and data access without exposing a service-role key. Where: `src/lib/supabase.js`. Read more: [Initialize the Supabase client](https://supabase.com/docs/reference/javascript/initializing).

## Related

- [Architecture and data flow](architecture.md)
- [Data model](data-model.md)
- [Documentation index](README.md)
