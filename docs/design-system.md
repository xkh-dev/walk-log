# Design system

This reference describes the shared visual tokens and UI conventions. Use it when changing styles or building a component so the light and dark token sets remain consistent.

## Tokens

Visual values live in [`src/theme.css`](../src/theme.css). Use CSS variables instead of hardcoding shared colors, shadows, or radii.

- Background layers use `--bg-dark`, `--bg`, and `--bg-light`.
- Text uses `--text` and `--text-muted`; the accent uses `--primary`.
- `--day-untyped` provides the neutral walk color.
- `--shadow-s`, `--shadow-m`, and `--shadow-l` create raised surfaces; `--shadow-inset` marks recessed or selected surfaces.
- `--radius-panel` and `--radius-pill` define shared shapes.

The colors use OKLCH so the lightness steps remain perceptually consistent.

## Depth

- Light comes from above.
- Layered backgrounds and shadows define surfaces; the interface does not use borders for panel edges.
- Interactive elements use raised shadows. Pressed and selected states use inset shadows.
- Cards use deeper shadows than controls; stats bars and inputs read as recessed.

## Themes

The default token set is light. `src/theme.css` also defines a dark token set under `body.dark`. Components should use the variables so either set can be applied. The app does not currently expose a theme switch in its screens.

## Component conventions

- Keep option values in shared constants and render repeated options with stable keys.
- Use the existing shared components before adding another implementation.
- Keep shared color, elevation, and shape in theme tokens; keep component-specific spacing near the component styles.
- Keep app code in JavaScript, consistent with the current project.

See [`src/constants.js`](../src/constants.js), [`src/components/`](../src/components/), and [`src/pages/`](../src/pages/) for examples.

## Related

- [Product brief](product-brief.md)
- [Copilot instructions](../.github/copilot-instructions.md)
- [Documentation index](README.md)
