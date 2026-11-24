---
name: write-step-summary
description: Draft or refresh a Step summary from merged pull requests and project issues
disable-model-invocation: true
---
# Draft a Step summary

Given a Step number:

1. Read `docs/steps/template.md`, `.github/instructions/docs.instructions.md`, and the existing Step summaries.
2. Find project 2, the Steps project owned by `xkh-dev`, with `gh project list --owner xkh-dev --format json`.
3. Confirm the Step iteration field with `gh project field-list 2 --owner xkh-dev --format json`, then read the Step values from `gh project item-list 2 --owner xkh-dev --limit 500 --format json`. Match the iteration whose title starts with the supplied number followed by `.`. The iteration's `startDate` and `duration` are in the item-list output; calculate the inclusive end date as `startDate + duration - 1 day`.
4. Derive the output name from the iteration: zero-pad the Step number to two digits, kebab-case the title after the number, period, and space prefix, and write `docs/steps/<NN>-<step-name>.md`. For example, Step 4 named `4. Frontend and docs` becomes `04-frontend-and-docs.md`.
5. Preserve the user's text in `Goal`, `Outcome`, `Other work`, `Retro`, and every destination written after `→` in an existing summary. Never fill in `Outcome`; leave it for the user to record `met`, `partly met`, or `not met`, plus why. On first creation, leave `Goal`, `Outcome`, `Other work`, and all three `Retro` subsections empty.
6. Refresh `Done` from merged pull requests:

   - Run `gh pr list --repo xkh-dev/walk-log --state merged --search "merged:<start>..<end>" --json number,title,url,body,mergedAt,closingIssuesReferences`.
   - Read every returned pull request with `gh pr view <number> --repo xkh-dev/walk-log --json number,title,url,body,mergedAt,closingIssuesReferences,files`. Use its description, not only its title, to decide where and how to list its changes.
   - Read linked issues with `gh issue view <number> --repo xkh-dev/walk-log --json number,title,url,body,closedAt,stateReason`. Use the issue Context, not only the issue title, for linked issue context.
   - Under `### For walkers`, start with one italic line that sums up what changed for people using the app. Then give each walker-facing change a sentence-case heading that starts with a verb, such as `Use a dark theme`, followed by one calm sentence explaining what it means for the walker and ending with a link to its pull request. Don't use exclamation marks. Sort entries into this section based on what each pull request description says it changed; split a pull request across both sections if it includes both kinds of work.
   - Under `### Behind the scenes`, list documentation, tooling, workflow, and code-structure changes, one plain line per change, with a link to the pull request.
   - Include each linked issue once in its corresponding pull request entry, using the issue Context to explain the work. Link the issue in that line without adding a separate duplicate entry; keep the pull request link last in every `For walkers` sentence. For a closed issue without a merged pull request, add one plain linked line under `Behind the scenes` using its Context.
   - If an issue isn't linked by a pull request, find it with `gh issue list --repo xkh-dev/walk-log --state closed --search "closed:<start>..<end> reason:completed" --json number,title,url,body,closedAt` and add it under `Done`. The `reason:completed` qualifier excludes issues closed as not planned.

7. Refresh `## Decisions` from the `Decisions made` section in each merged pull request description. Write one line per decision, skip `None`, and link each line to its pull request or to the relevant ADR when that pull request added one. Identify added ADRs in the pull request's `files` and link to the ADR file.
8. Refresh `Not done` from `gh project item-list 2 --owner xkh-dev --limit 500 --format json`. Include open items assigned to the matching Step iteration and status that isn't `Done`. Link each item and add `→ ?`. When an existing destination follows `→` for the same issue or pull request, preserve that destination instead of `?`. Don't move items on the board.
9. When refreshing an existing summary, update the italic overview line in `For walkers`, but preserve all other user-written content. Keep existing headings and descriptions, `Behind the scenes` entries, decisions, and the text in `Goal`, `Outcome`, `Other work`, and `Retro`; add missing entries without duplicating linked work. Preserve destinations after `→`. Never fill in `Outcome`.
10. Keep the summary in present or past tense and follow `.github/instructions/docs.instructions.md`. Don't add story points, counts, or competitive language. Never rewrite existing prose outside the generated `Done`, `Decisions`, and `Not done` content, except for the `For walkers` overview line.

## Related

- [Step summary template](../../../docs/steps/template.md)
- [Documentation index](../../../docs/README.md)
