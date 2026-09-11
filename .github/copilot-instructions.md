# Walk, Log — Copilot instructions

Walk, Log is a contemplative walk journal. People log walks (where, when, how long, with whom) to build a personal record and notice gentle patterns — never to compete, score, or be nudged.

## Product principles (do not violate)
- No streaks, points, badges, goals, or motivational/competitive language. Ever.
- Logging must feel effortless: optional fields, fast, no guilt.
- Privacy by default. Phase 1 is local-only: no auth, no geolocation.
- The walk comes first, the app second — calm, spacious, unobtrusive.
- Preserve the user's own words; never rewrite their entries.

## Tech
- Vite + React, plain JavaScript (no TypeScript for now). ESLint.
- Phase 1: data in browser local storage, no backend.

## Design system — use it, never bypass it
- All colors, shadows, radii come from CSS variables in `src/theme.css`. Never hardcode a color or shadow — use tokens (`--bg`, `--bg-light`, `--text`, `--shadow-s/m/l`, `--shadow-inset`, `--radius-pill`).
- Depth: layered backgrounds by lightness; no borders (contrast + shadow define edges); interactive elements are raised (`--shadow-s`), pressed/selected states are recessed (`--shadow-inset`). Light comes from above.
- Two themes exist as token sets: light (default) and dark (optional). Anything you build must work in both via tokens.

## Working style
- Read the relevant file (and any relevant `/docs` file) before editing.
- Make the smallest focused change. No large unsolicited refactors.
- Match existing patterns and naming (e.g. `whereType`, `whenType`, `whoType`).
- State assumptions briefly; keep explanations short.

See `/docs` for the product brief, roadmap, stats plan, and design system.
