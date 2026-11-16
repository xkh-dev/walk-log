---
name: start-task
description: Implement an issue through a checked and merged pull request
disable-model-invocation: true
---
# Start a task from an issue

Given an issue number:

1. Read the issue and inspect the current repository instructions. Treat the issue's Goals as the checks the change must meet, and don't implement anything listed under Non-goals. In issues written before this format, treat "Done when" as Goals, "Scope" as Design, and "Not included" or "Out of scope" as Non-goals.
2. Fetch the latest `main` and create a branch from it named `<number>-short-name`.
3. Implement the issue with focused changes.
4. Update relevant documentation using the docs map in `.github/copilot-instructions.md`.
5. Add a learning-log entry when the change introduces or relies on a concept worth studying. Use the concept's name as the bold label and end the heading with the PR number.
6. Run the relevant tests and checks, then confirm each goal. In the pull request, list any goal you couldn't verify, and say what to check by hand.
7. Open a pull request using `.github/pull_request_template.md`, use a title that follows `.github/commit-instructions.md` (not the branch name), and include `Closes #<number>`.
8. Wait for all required checks. Fix failures, push the fixes, and wait for checks to pass.
9. Merge the pull request with squash merging.
10. Delete the branch, pull the latest `main`, and report the pull request, checks, merge, and any decisions made.

## Related

- [Copilot instructions](../../copilot-instructions.md)
- [Contributing](../../../CONTRIBUTING.md)
- [Pull request template](../../pull_request_template.md)
