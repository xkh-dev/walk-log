# Learning log

Browse the concepts introduced or used by merged pull requests; each entry points you to relevant code and further reading.

## 2026-11-11 · Add reusable repository prompts (#58)

- **Reusable prompt files**: Markdown files in `.github/prompts/` make repeatable workflows available as VS Code chat commands you can invoke by name. Read more: [Prompt files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files).

## 2026-11-11 · Spreadsheet-safe CSV round trips (#57)

- **Spreadsheet-safe CSV text**: Text that spreadsheet software might parse as a formula can be marked on export and restored on import only when the marker is followed by a formula character. Where: `src/lib/csv.js`. Read more: [OWASP CSV Injection](https://owasp.org/www-community/attacks/CSV_Injection).

## 2026-11-10 · Pull request checks (#55)

- **Continuous integration**: A GitHub Actions workflow can run the same dependency installation, production build, and lint commands for every pull request. Where: `.github/workflows/ci.yml`. Read more: [Building and testing Node.js](https://docs.github.com/actions/automating-builds-and-tests/building-and-testing-nodejs).

## 2026-11-08 · Session-aware storage and account security (#52, #51)

- **Storage adapter**: Selecting an adapter from the current session keeps screens independent of whether walks live in browser storage or Supabase. Where: `src/lib/walks.js`. Read more: [Optional sign-in and storage by session](decisions/002-optional-sign-in-and-storage.md).
- **Display-only cache**: A per-user cache can show the last known walks while the app refreshes from Supabase without becoming another write source. Where: `src/lib/WalksProvider.jsx`. Read more: [Display-only cache](decisions/004-display-only-cache.md).
- **WebAuthn passkeys**: Passkeys provide an account sign-in method tied to a site's origin, while email links remain available as an alternative. Where: `src/pages/Account.jsx`. Read more: [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).
- **Row-level security**: Postgres can enforce walk ownership for every client query instead of relying on the UI to hide another user's rows. Where: `supabase/schema.sql`. Read more: [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).
- **Idempotent upsert**: A stable ID, upsert, and read-back check let sign-in transfer local walks without removing data before the account confirms it. Where: `src/lib/moveLocalWalks.js`. Read more: [Supabase JavaScript upsert](https://supabase.com/docs/reference/javascript/upsert).

## 2026-11-07 · Remote walk access (#52)

- **Data adapter**: A dedicated adapter keeps Supabase reads and writes separate from browser storage, while an explicit field map translates camelCase app fields to snake_case database columns. Where: `src/lib/remoteWalks.js`. Read more: [Data model](data-model.md).

## 2026-11-06 · Magic links and session state (#51)

- **Magic-link authentication**: A magic link can authenticate without a password, and an auth-state listener keeps React screens in step with the Supabase session. Where: `src/lib/useSession.js` and `src/pages/Account.jsx`. Read more: [Supabase auth state changes](https://supabase.com/docs/reference/javascript/auth-onauthstatechange).

## 2026-10-31 · Supabase setup (#52)

- **Publishable client key**: A browser client configured with the project URL and publishable key provides managed authentication and data access without exposing a service-role key. Where: `src/lib/supabase.js`. Read more: [Initialize the Supabase client](https://supabase.com/docs/reference/javascript/initializing).

## Related

- [Architecture and data flow](architecture.md)
- [Data model](data-model.md)
- [Documentation index](README.md)
