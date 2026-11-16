---
name: new-issue
description: Create a task issue from the description you provide
disable-model-invocation: true
---
# Create a task issue

Turn the description you provide into one focused issue that follows `.github/ISSUE_TEMPLATE/task.md`, a trimmed Google design doc. Search for a matching open issue first. If one exists, report it instead of creating a duplicate.

Write the body in plain planning style, following `.github/instructions/docs.instructions.md`:

- **Context**: one to three sentences on why the change matters. Link related issues and docs inline.
- **Goals**: outcomes someone can check in the app or the pull request, such as "Reloading in dark mode shows no light flash." Don't list implementation steps here.
- **Non-goals**: what the work leaves out on purpose, with the issue it belongs to when there is one.
- **Design**: include only when the approach isn't obvious. Describe the approach, affected files, and Figma links.
- **Alternatives considered**: include only when there was a real choice. If the choice affects future work, suggest an ADR.

Delete unused optional sections and all template comments. Don't repeat repository-wide rules, such as passing checks or adding no dependencies. `.github/copilot-instructions.md` already covers them. Don't write instructions to an agent or a chat reply.

Preserve an exact title you provide. Otherwise, write a concise title using the commit title rules in `.github/commit-instructions.md`.

Before any GitHub write command, check `gh auth status` and show the exact command. Create the issue in `xkh-dev/walk-log`, add it to the `Steps` project, and set its Status to `Back, Log`. Follow `.github/copilot-instructions.md` for project IDs and issue creation details. Verify the issue and project status, then report the issue link.

## Related

- [Task issue template](../../ISSUE_TEMPLATE/task.md)
- [Copilot instructions](../../copilot-instructions.md)
