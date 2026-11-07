# Walk, Log — Copilot instructions

Walk, Log is a contemplative walk journal. People log walks (where, when, how long, with whom) to build a personal record and notice gentle patterns — never to compete, score, or be nudged.

## Product principles (do not violate)

- No streaks, points, badges, goals, or motivational/competitive language. Ever.
- Logging must feel effortless: optional fields, fast, no guilt. Never block saving because a field is empty.
- Walk first, log later. Walks are often logged after they happen; don't add pressure to log in the moment.
- Privacy by default. The app works without an account; signing in is optional. No geolocation.
- The walk comes first, the app second — calm, spacious, unobtrusive.
- Preserve the user's own words; never rewrite their entries.

## Tech

- Vite + React, plain JavaScript (no TypeScript for now), React Router, and Oxlint.
- `npm run build` runs the Vite build; `npm run lint` runs Oxlint.
- Supabase is used for magic-link auth. The Supabase client and session hook live in `src/lib/`.
- Walks are currently stored in browser `localStorage` through `src/lib/storage.js`. `src/lib/remoteWalks.js` contains a Supabase adapter, but walk screens do not use it yet; signed-in walk sync is not implemented.
- Target sync behavior: signed-out walks use localStorage; signed-in walks use Supabase only. Treat this as planned behavior, not current behavior.

## Structure

- `src/pages/` — screens with their own route in `src/App.jsx`
- `src/components/` — reusable UI used inside pages
- `src/lib/` — non-UI code (storage, Supabase, CSV, session, and walk data access)
- Keep `src/constants.js`, `src/helpers.js`, CSS files, `src/App.jsx`, and `src/main.jsx` at the `src/` root.
- Put new files where they belong by this rule, not by how they're navigated.

## Design system — use it, never bypass it

- Use the CSS variables in `src/theme.css` for colors, shadows, and radii. Do not hardcode these values. Available tokens include `--bg-dark`, `--bg`, `--bg-light`, `--text`, `--text-muted`, `--primary`, `--day-untyped`, `--shadow-s`, `--shadow-m`, `--shadow-l`, `--shadow-inset`, `--radius-panel`, and `--radius-pill`.
- Depth: layered backgrounds by lightness; no borders (contrast + shadow define edges); interactive elements are raised (`--shadow-s`), pressed/selected states are recessed (`--shadow-inset`). Light comes from above.
- Light is the default theme; dark is an optional alternate token set. Anything you build must work in both via tokens.
- Reuse existing components (`PillGroup`, `WalkCard`) before making new ones.

## Data

- Current walk screens use `src/lib/storage.js` directly. When adding or wiring sync, put the storage choice behind `src/lib/walks.js` (create it if needed); screens should use that shared interface, not call `storage.js` or `remoteWalks.js` directly.
- App fields are camelCase, DB columns snake_case. Keep the mapping in `src/lib/remoteWalks.js`.
- Never include `userId` in Supabase write payloads. The database must derive `user_id` from the authenticated user (`auth.uid()`).
- A walk's `id` is stable for its lifetime. Never give an existing walk a new `id`; remote writes use upserts by `id`.
- `date` is the local walk day (`YYYY-MM-DD`), built from local date parts, never `toISOString()`. `createdAt` is a UTC timestamp. If adding `updatedAt` for sync, it must also be a UTC timestamp.
- Changing the walk format: bump `schemaVersion`, handle older versions on import, and update `docs/data-model.md`.

## Database

- There is currently no `supabase/` schema or migration directory. `docs/data-model.md` describes the walk model and includes a planned Supabase schema sketch.
- Before adding schema changes, ask first. Keep schema changes reproducible in the repo and update `docs/data-model.md`.
- Enable RLS on every table exposed through the Data API, with policies matching its access model. For user-owned walks, restrict access to the authenticated user's rows using `auth.uid()`; update policies need both `USING` and `WITH CHECK`.

## Security and privacy

- Only use the publishable key in the client. Never expose a service-role or secret key.
- Never commit `.env.local`, tokens, or passwords.
- Don't log walk contents (place, companion) to the console in committed code.
- No analytics, trackers, or third-party scripts without asking.

## Errors

- Await every save, edit, and delete before navigating or closing a sheet.
- On failure, show a short calm message and keep what the user entered. Never fail silently.

## Accessibility

- Use `<button>` for actions and React Router `<Link>` for navigation. Every input needs a label.
- Provide comfortable tap targets. Don't rely on color alone.

## Working style

- Read the relevant file and any relevant `/docs` file before editing. Docs may describe planned work; check the current code before treating it as implemented.
- Make the smallest focused change. No large unsolicited refactors.
- Match existing patterns and naming (e.g. `whereType`, `whenType`, `whoType`). Use single quotes, semicolons, and `export default` at the bottom.
- No new dependencies without asking.
- State assumptions briefly; keep explanations short.

## Ask before

- Deleting or migrating user data
- Changing the database schema, RLS, or auth settings
- Pushing to GitHub

## Before committing

- Run `npm run build` and `npm run lint`; fix what breaks.
- Commit messages follow `.github/commit-instructions.md`.
- List what to test by hand in your summary.

See `/docs` for the product brief, roadmap, stats plan, data model, and design system.
