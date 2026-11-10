# Contributing

This guide helps you make a focused change to Walk, Log and prepare it for review. Keep logging optional, protect personal walk data, and preserve the calm product experience.

## Branch and pull request workflow

1. Start from the latest `main` and create a focused branch. Use a short name and include an issue number when there is one.
2. Keep commits scoped to the change. Do not commit directly to `main`.
3. Open a pull request when the work is ready. Describe what changed and why, link related issues, and record any decisions made while resolving ambiguity.
4. Address review feedback and wait for required checks before merging.

Use the [pull request template](.github/pull_request_template.md). Write `Closes #N` when the pull request completes an issue or `Refs #N` when it is related but does not complete it.

## Commit messages

Follow the [commit message instructions](.github/commit-instructions.md). Keep that file as the source of truth for title and body formatting.

## Before opening a pull request

- Run `npm run build` and `npm run lint`.
- Complete the relevant [manual checks](docs/testing.md) for user-facing changes.
- Review the diff for secrets, unrelated changes, and undocumented behavior.
- Update the relevant docs using the [docs map](.github/copilot-instructions.md#docs).
- Add a [learning log](docs/learning-log.md) entry when the change introduces or relies on a concept worth studying.

## Before merging

- Confirm the pull request checks pass.
- Verify that the change follows the product and privacy rules in the [Copilot instructions](.github/copilot-instructions.md).
- Get approval before changing the database schema, row-level security, auth settings, or migrating or deleting user data.

## Related

- [Documentation index](docs/README.md)
- [Manual testing](docs/testing.md)
- [Developer tooling](docs/tooling.md)
