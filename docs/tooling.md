# Developer tooling

Set up the web app or run repository checks with this guide; it covers environment variables, Supabase, and GitHub CLI.

## Run the app

Install Node.js and npm using versions supported by the Vite version declared in `package.json`. From the repository root, copy the example environment file, add your Supabase project values, install packages, and start Vite:

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local`. Vite exposes `VITE_` variables to browser code, so use only a publishable key. Never put a service-role or secret key in this file. `.env.local` is ignored by Git.

## Check changes

Run the production build and JavaScript linter before opening a pull request. The pull request CI workflow installs locked dependencies, builds the app, and runs the linter:

```bash
npm ci
npm run build
npm run lint
npm test
```

GitHub Actions also runs the CSV export regression test for every pull request.

The documentation workflow runs markdownlint and checks Markdown links. You can run the same Markdown lint locally:

```bash
npx --yes markdownlint-cli2 --config .markdownlint.jsonc 'README.md' 'CONTRIBUTING.md' '.github/**/*.md' 'docs/**/*.md'
```

## GitHub CLI

Install GitHub CLI and sign in through its browser flow:

```bash
gh auth login --hostname github.com --web --git-protocol https
gh auth status
```

Use `gh` for repository issues, pull requests, and project-board work. Check `gh <command> --help` when a command or flag is unfamiliar. Never paste an access token into chat or commit one to the repository.

## Database and Supabase

The app uses a Supabase project for authentication and signed-in walk storage. The database schema and row-level security policies are in [`supabase/schema.sql`](../supabase/schema.sql). The browser client uses the project URL and publishable key; it doesn't use a secret key.

Ask before changing the database schema, row-level security, or authentication settings. Keep approved schema changes reproducible in the repository and update the [data model](data-model.md).

## Copilot in VS Code

- Open the repository folder in VS Code and sign in to GitHub Copilot.
- Review proposed commands and edits before approving them.
- Follow the repository's [Copilot instructions](../.github/copilot-instructions.md) and [Markdown writing rules](../.github/instructions/docs.instructions.md).
- Do not share tokens, passwords, or real `.env.local` values in chat.

## Related

- [Repository overview](../README.md)
- [Contributing](../CONTRIBUTING.md)
- [Data model](data-model.md)
- [Documentation index](README.md)
