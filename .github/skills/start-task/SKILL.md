---
name: start-task
description: Implement an issue, run checks, and hand over commit and pull request steps
disable-model-invocation: true
---
# Start a task from an issue

Given an issue number:

1. Before changing anything, check `git branch --show-current` and `git status --porcelain`. The branch must be `main` and status output must be empty, including for staged, unstaged, and untracked files. If either check fails, explain why and stop without fetching, switching branches, or editing files.
2. Read the issue and inspect the current repository instructions. Treat the issue's Goals as the checks the change must meet, and don't implement anything listed under Non-goals. In issues written before this format, treat "Done when" as Goals, "Scope" as Design, and "Not included" or "Out of scope" as Non-goals.
3. Pull the latest `main` with a fast-forward-only update, then create a branch named by the rule in `CONTRIBUTING.md`.
4. Implement the issue with focused changes.
5. Update relevant documentation using the docs map in `.github/copilot-instructions.md`.
6. Add a learning-log entry when the change introduces or relies on a concept worth studying. Use the concept's name as the bold label and end the heading with the PR number.
7. Run the relevant tests and checks, then report the result for every goal and what to test by hand.
8. End with a numbered handover guide for the user. Do not commit, push, open a pull request, wait for pull request checks, merge, or delete branches. Fill in the commands and text for this task:
   1. Check changes with `git status --short`, `git diff --check`, and `git diff`.
   2. Stage only the reviewed files; include an exact `git add` command listing their paths.
   3. Include a ready-to-copy `git commit -m "<title>" -m "<body>"` command. Follow `.github/commit-instructions.md` and include the issue reference in the body.
   4. Include the exact `git push -u origin <branch>` command.
   5. Provide a PR title that follows `.github/commit-instructions.md` and a copyable PR description using every heading and checklist item, in order, from `.github/pull_request_template.md`. Fill in the details, include `Closes #<number>`, and accurately report goal checks and manual testing.
   6. Explain that the user should wait for required checks, then squash-merge the PR.
   7. Provide a cleanup command using the actual branch name to switch to `main`, pull it with `--ff-only`, and delete the merged branch with `git branch -D`. Explain that squash merging can make `git branch -d` refuse deletion.

## Related

- [Copilot instructions](../../copilot-instructions.md)
- [Contributing](../../../CONTRIBUTING.md)
- [Pull request template](../../pull_request_template.md)
