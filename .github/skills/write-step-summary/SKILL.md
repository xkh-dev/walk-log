---
name: write-step-summary
description: Draft or refresh a Step summary from project history and pasted notes
disable-model-invocation: true
---
# Draft a Step summary

Given a Step number and optional notes pasted after it:

1. Read `docs/steps/template.md`, `.github/instructions/docs.instructions.md`, and the existing Step summaries.
2. Find project 2, the Steps project owned by `xkh-dev`, with `gh project list --owner xkh-dev --format json`.
3. Confirm the Step iteration field with `gh project field-list 2 --owner xkh-dev --format json`, then read the Step values from `gh project item-list 2 --owner xkh-dev --limit 500 --format json`. Match the iteration whose title starts with the supplied number followed by `.`. The iteration's `startDate` and `duration` are in the item-list output; calculate the inclusive end date as `startDate + duration - 1 day`. Write both dates in the summary's `**Dates:**` line in `YYYY-MM-DD` format.
4. Derive the output name from the iteration: zero-pad the Step number to two digits, kebab-case the title after the number, period, and space prefix, and write `docs/steps/<NN>-<step-name>.md`. For example, Step 4 named `4. Frontend and docs` becomes `04-frontend-and-docs.md`.
5. Read any notes pasted after the step number. Sort their work into the appropriate `Done` subsection based on what changed: shipped changes walkers would notice go under `For walkers`, Figma, design, or research work goes under `Design and research`, and docs, tooling, workflow, or code-structure work goes under `Behind the scenes`. Write one line per item in `Design and research` starting with a verb, and include a link when the notes provide one. Format items in the other subsections as specified below.
6. If the notes clearly cover `Goal`, `Outcome`, or `Retro` (for example, they use `goal:`, `outcome:`, or `retro:`), write those sections from the notes. Keep the user's meaning and wording, fixing only grammar and format. Never infer these sections from the repository, GitHub, or other sources. If notes don't cover a section, preserve its existing content or leave it empty on first creation. Never fill `Outcome` unless the notes clearly provide it.
7. Refresh `Done` from merged pull requests and completed issues:

   - Run `gh pr list --repo xkh-dev/walk-log --state merged --search "merged:<start>..<end>" --limit 500 --json number,title,url,body,mergedAt,closingIssuesReferences`.
   - Read every returned pull request with `gh pr view <number> --repo xkh-dev/walk-log --json number,title,url,body,mergedAt,closingIssuesReferences,files`. Use its description, not only its title, to decide where and how to list its changes.
   - Read linked issues with `gh issue view <number> --repo xkh-dev/walk-log --json number,title,url,body,closedAt,stateReason`. Use the issue Context, not only the issue title, for linked issue context.
   - Under `### For walkers`, start with one italic line that sums up what changed for people using the app. Then give each walker-facing change a sentence-case heading that starts with a verb, such as `Use a dark theme`, followed by one calm sentence explaining what it means for the walker and ending with a link to its pull request or, when there isn't one, its issue or note link. Don't use exclamation marks.
   - Under `### Design and research`, list Figma, design, and research work one line per item. Start each line with a verb and include a link when one exists.
   - Under `### Behind the scenes`, list documentation, tooling, workflow, and code-structure changes one line per item, with a link to the pull request when one exists.
   - Sort every pull request, completed issue, and pasted note into the subsection matching what it changed. Split mixed pull requests or notes across subsections when needed.
   - Include each issue closed by a listed pull request once, with that pull request, using the issue Context to explain why. Include the issue link in the corresponding line without duplicating the entry.
   - Find completed issues not linked by a listed pull request with `gh issue list --repo xkh-dev/walk-log --state closed --search "closed:<start>..<end> reason:completed" --limit 500 --json number,title,url,body,closedAt` and sort them into `Done` using their Context. The `reason:completed` qualifier excludes issues closed as not planned.

8. Refresh `## Decisions` from the `Decisions made` section in each merged pull request description. Write one line per decision, skip `None`, and link each line to its pull request or to the relevant ADR when that pull request added one. Identify added ADRs in the pull request's `files` and link to the ADR file.
9. Refresh `Not done` from `gh project item-list 2 --owner xkh-dev --limit 500 --format json`. Include open issue items assigned to the matching Step iteration, verifying each issue is open with `gh issue view <number> --repo xkh-dev/walk-log --json state`. Link each issue and add `→ ?`. When an existing destination follows `→` for the same issue, preserve that destination instead of `?`. Don't move items on the board.
10. When refreshing an existing summary, refresh `Done`, `Decisions`, and `Not done`, but keep everything that came from earlier notes, including note-derived entries in `Done` and the content of `Goal`, `Outcome`, and `Retro`. Keep destinations written after `→`. Add newly supplied notes without duplicating existing notes or GitHub work: match existing entries by their source links or meaning, preserve the earlier note wording, and add a missing GitHub link to that entry when relevant. Update the italic overview line in `For walkers` each time. Never fill in `Goal`, `Outcome`, or `Retro` from the repository or GitHub.
11. Keep the summary in present or past tense and follow `.github/instructions/docs.instructions.md`. Don't add story points, counts, or competitive language. Preserve each note's meaning and wording, fixing only grammar and format.

## Related

- [Step summary template](../../../docs/steps/template.md)
- [Documentation index](../../../docs/README.md)
