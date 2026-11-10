---
name: new-issue
description: Create a task issue from the description you provide
disable-model-invocation: true
---
# Create a task issue

Turn the description you provide into one focused issue using `.github/ISSUE_TEMPLATE/task.md`. Keep the issue body in plain planning style; don't write instructions to an agent or a chat reply. Search for a matching issue first. Preserve an exact title you provide; otherwise write a concise title using the commit title rules in `.github/commit-instructions.md`.

Before any GitHub write command, check `gh auth status` and show the exact command. Create the issue in `xkh-dev/walk-log`, add it to the `Steps` project, and set its Status to `Back, Log`. Follow `.github/copilot-instructions.md` for project IDs and issue creation details. Verify the issue and project status, then report the issue link.

## Related

- [Task issue template](../ISSUE_TEMPLATE/task.md)
- [Copilot instructions](../copilot-instructions.md)
