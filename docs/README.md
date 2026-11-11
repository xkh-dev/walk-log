# Documentation index

Browse this index to find project documentation, implementation guidance, and repository rules. It excludes vendored files under `.agents/`.

## Overview

- [Documentation index](README.md) — this directory of project documentation.
- [Repository overview](../README.md) — current features, privacy, technology, and local setup.
- [Product brief](product-brief.md) — product purpose, intended audience, and boundaries.
- [Roadmap](roadmap.md) — shipped behavior and explicitly planned work.
- [Case study](case-study.md) — the product's implementation choices and tradeoffs.

## Explanation

- [Architecture and data flow](architecture.md) — how sessions, walk storage, migration, and caching fit together.
- [Supabase for auth and storage](decisions/001-supabase-for-auth-and-storage.md) — why signed-in walks use a managed backend.
- [Optional sign-in and storage by session](decisions/002-optional-sign-in-and-storage.md) — why storage changes with sign-in state.
- [Magic links and passkeys](decisions/003-magic-link-and-passkeys.md) — why email links and passkeys are both available.
- [Display-only cache](decisions/004-display-only-cache.md) — why the signed-in cache isn't a storage source.
- [Source folders by responsibility](decisions/005-folders-by-code-responsibility.md) — why screens, shared UI, and non-UI code are separated.

## Reference

- [Data model](data-model.md) — walk fields, persistence, CSV format, and schema mapping.
- [Design system](design-system.md) — CSS tokens, depth, themes, and component conventions.
- [Stats plan](stats-plan.md) — calculations and limits in the current Stats screen.
- [ADR template](decisions/template.md) — required sections for a new decision record.

## How-to

- [Contributing](../CONTRIBUTING.md) — branch, commit, pull request, and review workflow.
- [Manual testing](testing.md) — signed-out, signed-in, migration, and passkey checks.
- [Developer tooling](tooling.md) — local app, environment, Supabase, and GitHub CLI setup.

## Learning

- [Learning log](learning-log.md) — concepts introduced or used by merged pull requests.

## Repository guidance

- [Copilot instructions](../.github/copilot-instructions.md) — product, code, privacy, and contribution rules.
- [Markdown writing rules](../.github/instructions/docs.instructions.md) — style and structure for project Markdown.
- [Commit message instructions](../.github/commit-instructions.md) — commit title and body conventions.
- [Pull request template](../.github/pull_request_template.md) — pull request summary and checklist.
- [Task issue template](../.github/ISSUE_TEMPLATE/task.md) — planning format for issue scope, completion, notes, and exclusions.
- [Start-task skill](../.github/skills/start-task/SKILL.md) — implement an issue through checks, squash merge, and cleanup.
- [New-issue skill](../.github/skills/new-issue/SKILL.md) — create a task issue and add it to the Steps project.
- [Write-ADR skill](../.github/skills/write-adr/SKILL.md) — draft the next numbered architecture decision record.

## Related

- [Repository overview](../README.md)
- [Contributing](../CONTRIBUTING.md)
