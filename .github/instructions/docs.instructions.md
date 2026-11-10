---
applyTo: "**/*.md"
---

# Writing docs for Walk, Log

## Who reads these docs

- The author, weeks later, learning how the code works and why
- A future employer reviewing the project
- Coding agents building the next feature

Write for someone who is smart but hasn't seen the code or the conversation that produced it.

## Principles

- Describe what is true on main now. Plans live only in `docs/roadmap.md`, clearly marked as planned.
- Teach, don't just describe. Explain why a part exists and what concept it uses, then link to the file.
- One source of truth per topic. Link to it instead of repeating it:
  - Fields and schema: `data-model.md`
  - Data flow: `architecture.md`
  - Why: `decisions/`
  - Process: `CONTRIBUTING.md`
- Right-size. Every doc has a reader and a moment it gets read. Prefer a new section in an existing doc over a new file.
- Verify against the code before writing. If unsure, read the file; never guess names, paths, or behavior.

## Style

Follow the Google developer documentation style guide:

- Second person ("you"), active voice, present tense.
- Sentence-case headings. One H1 per file.
- Short sentences, one idea each. Lead with what the reader needs.
- Numbered lists for steps, bullets for unordered points, tables only to compare.
- Code font for code, file names, commands, fields, and environment variables.
- Descriptive link text, never "here". Use relative links between docs.
- Absolute dates (2026-11-08), never "today" or "recently".

Walk, Log voice on top of that: calm and plain. No marketing words, exclamation marks, or hype ("powerful", "seamless", "robust"), and no filler ("simply", "just", "easy").

## Doc set

Organize docs by purpose (Diátaxis):

- Explanation: `architecture.md`, `decisions/`, `product-brief.md`, `case-study.md`
- Reference: `data-model.md`, `design-system.md`, `stats-plan.md`
- How-to: `CONTRIBUTING.md`, `testing.md`, `tooling.md`
- Overview: root `README.md`, `docs/README.md` (index)
- Learning: `learning-log.md`

New doc types need a clear reader and a place in this list.

## Every doc

- Open with one or two sentences that explain what the doc covers and who it's for.
- End with a "Related" list linking to the docs it depends on.
- Don't leave TODOs or placeholders on main.

## Architecture and explanations

- Start with the big picture, then the parts.
- Use a Mermaid diagram for data flow.
- For each part, explain what it does, why it's built this way (link the ADR), and where it is in the code using relative links.

## ADRs

- Write an ADR when you choose between real options, such as a library, approach, or tradeoff.
- Name each file `NNN-short-title.md` and number files in order. Use `template.md`.
- Include the sections Status, Date, Context, Options, Decision, and Consequences. Keep it about one screen.
- Never rewrite an accepted ADR. Write a new one and set the old one's Status to "Replaced by NNN".

## Learning log

Every PR that introduces or relies on a concept adds an entry, newest first:

```markdown
## YYYY-MM-DD · PR title (#N)

- **Concept**: One plain sentence on what it is and why it's used here. Where: `path/to/file.js`. Read more: [official documentation](https://example.com).
```

Concepts are things worth studying (upsert, RLS, React context, stale-while-revalidate), not every line changed.

## Don't

- Don't mention who or what wrote a doc.
- Don't restate code line by line. Explain intent and link to it.
- Don't document `.agents/` or `node_modules`.
- Don't add counts or states that silently go stale unless the doc is updated whenever they change.

## Related

- [Documentation index](../../docs/README.md)
- [Copilot instructions](../copilot-instructions.md)
