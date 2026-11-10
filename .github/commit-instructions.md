# Commit messages

Use these conventions to write a short, useful record of each change.

## Title

- Use the imperative and sentence case: "Add CSV export", "Fix local walk dates".
- Do not add a prefix (`feat:`, `chore:`) or a period at the end.
- Keep the title under 60 characters.
- Name the feature as a user sees it, not a file name.
- Use "+" to join two small related changes.

## Body

- Add a body only when the title does not explain the change.
- Use one or two plain sentences describing what changed and why.
- Do not use bullets, headings, bold text, or emoji.
- Do not list every file or restate the diff.
- Avoid filler words such as "enhance", "improve", "streamline", "robust", "seamless", "comprehensive", "leverage", and "ensure".

## Issue references

Put references at the end, one per line. Use `Closes #N` when the commit completes the issue and `Refs #N` when it is only related.

## Examples

```text
Connect app to Supabase
Fix local walk dates and avoid UTC day shifts
Add magic link sign-in
```

## Related

- [Contributing](../CONTRIBUTING.md)
- [Pull request template](pull_request_template.md)
