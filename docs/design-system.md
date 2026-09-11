# Design System — Walk, Log

## Tokens
All visual values live as CSS variables in `src/theme.css`. Components consume tokens; they never hardcode colors, shadows, or radii. Re-skinning = changing tokens.

- Background layers (stepped lightness, same hue): `--bg-dark` (page), `--bg` (panels/cards), `--bg-light` (raised interactive).
- Text: `--text`, `--text-muted`. Accent: `--primary`.
- Elevation shadows (each = top highlight + contact shadow + ambient shadow): `--shadow-s`, `--shadow-m`, `--shadow-l`.
- Recessed / pressed: `--shadow-inset`.
- Shape: `--radius-pill`.
- Colors use OKLCH so lightness steps are perceptually even and themes are easy to derive.

## Depth language
- Light comes from above.
- No borders — contrast between layers plus shadow defines edges.
- Interactive elements are raised (`--shadow-s`); their pressed and selected states are recessed (`--shadow-inset`).
- Cards use `--shadow-m`/`-l`; stats visuals and inputs read as recessed.

## Themes
- Light is the default (`:root`); dark is an optional alternate set of the same variables (a Phase 3 setting).
- Everything must work in both themes by using tokens, never fixed colors.

## React conventions
- A component is a function that returns JSX; local state via `useState`.
- Lists of options live in arrays, rendered with `.map()` and a unique `key`.
- Keep naming consistent: `whereType`, `whenType`, `whoType`.
- A component's shared identity (color, shadow, radius) comes from tokens; size/padding stay per-use, not baked into the shared style.
- JavaScript only for now (no TypeScript).
