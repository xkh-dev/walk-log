# Commit messages

Write like a person keeping a short log, not like a release note.

## Title
- Imperative, sentence case: "Add CSV export", "Fix local walk dates".
- No prefix (no feat:, chore:), no period at the end.
- Under 60 characters.
- Name the feature as the user sees it (Log form, All Walks, sign-in), not file names.
- Use "+" to join two small related changes: "Make CSV imports idempotent + add userId".

## Body
- Only when the title isn't enough. One or two plain sentences: what changed and why.
- No bullet lists, headings, bold or emoji.
- Don't list every file or restate the diff.
- Avoid filler words: enhance, improve, streamline, robust, seamless, comprehensive, leverage, ensure.

## Issue references
- Last lines, one per line.
- "Closes #N" when the commit finishes the issue.
- "Refs #N" when it's only part of it.

## Examples
Connect app to Supabase
Fix local walk dates and avoid UTC day shifts
Add magic link sign-in

Account screen with email sign-in and sign-out. useSession keeps the signed-in state up to date across the app.

Closes #42
Refs #26
