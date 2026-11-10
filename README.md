# Walk, Log

If you want a quick picture of Walk, Log or need to run it locally, this overview covers the app, its privacy boundaries, and setup.

## Features

- Log, edit, and delete walks. Place, time of day, and companion details are optional.
- Browse walk history in a calendar and list.
- Review walk totals and patterns in time of day and place type.
- Import and export walks as CSV.
- Use the app without an account; signed-out walks stay in this browser.
- Optionally sign in with an email link or passkey. Signed-in walks are stored in Supabase and are available across sessions.
- Move local walks into the account after sign-in without changing their IDs.

## Data and privacy

The app doesn't use geolocation. Signed-out walks are stored in browser `localStorage`. When you sign in, Supabase is the source of truth for your walks. A separate local cache can display the last known account walks while the app loads current data; the cache isn't uploaded.

## Tech

- React, Vite, JavaScript, and React Router
- Supabase Auth and Postgres for optional sign-in and signed-in walk storage
- Browser `localStorage` for signed-out walks and the display-only cache
- CSS custom properties for the design system

## Run locally

Install Node.js and npm. Copy `.env.example` to `.env.local`, then set the Supabase project URL and publishable key in `.env.local`. Use only the publishable key in this browser app; never put a service-role or secret key in a `VITE_` variable.

```bash
cp .env.example .env.local
npm install
npm run dev
```

The development server prints the local URL. To check a change, run:

```bash
npm run build
npm run lint
```

## Related

- [Documentation index](docs/README.md)
- [Product brief](docs/product-brief.md)
- [Data model](docs/data-model.md)
- [Architecture and data flow](docs/architecture.md)
