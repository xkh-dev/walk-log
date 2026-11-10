# Contributing

When you change Walk, Log, use this workflow to keep the work focused and prepare it for review. Keep logging optional, protect personal walk data, and preserve the calm product experience.

## Branch and pull request workflow

1. Start from the latest `main` and create a focused branch. Use `<issue-number>-short-name` when there's an issue; otherwise use a short descriptive name.
2. Keep commits scoped to the change. Don't commit directly to `main`.
3. Open a pull request when the work is ready. Describe what changed and why, link related issues, and record any decisions made while resolving ambiguity.
4. Address review feedback and wait for required checks before merging. Pull requests merge with squash, using the PR title as the single commit title.

Use the [pull request template](.github/pull_request_template.md). Every PR description includes `Closes #N` when it finishes the issue or `Refs #N` when it's part of it. GitHub only closes issues with `Closes`, `Fixes`, or `Resolves`. PR titles follow the [commit title rules](.github/commit-instructions.md#title), never the branch name. Issues use the [task issue template](.github/ISSUE_TEMPLATE/task.md); don't put chat replies or status updates in issue bodies.

## Commit messages

Follow the [commit message instructions](.github/commit-instructions.md). Keep that file as the source of truth for title and body formatting.

## Before opening a pull request

- Run Markdown linting, `npm run build`, `npm run lint`, and `npm test`.
- Complete the relevant [manual checks](docs/testing.md) for user-facing changes.
- Review the diff for secrets, unrelated changes, and undocumented behavior.
- Update the relevant docs using the [docs map](.github/copilot-instructions.md#docs).
- Add a [learning log](docs/learning-log.md) entry when the change introduces or relies on a concept worth studying.
- The pull request workflow checks Markdown and links.

## Reusable Copilot commands

- `/start-task <issue-number>` — read an issue, implement it on a numbered branch, update docs and the learning log, open a linked PR, wait for checks, merge, and clean up.
- `/new-issue <description>` — create a task issue from your description with the task template and add it to the Steps project.
- `/write-adr <decision>` — draft the next numbered ADR using `docs/decisions/template.md`.

## Before merging

- Confirm the pull request checks pass.
- Verify that the change follows the product and privacy rules in the [Copilot instructions](.github/copilot-instructions.md).
- Get approval before changing the database schema, row-level security, auth settings, or migrating or deleting user data.

## Related

- [Documentation index](docs/README.md)
- [Manual testing](docs/testing.md)
- [Developer tooling](docs/tooling.md)
