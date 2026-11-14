# Design system

Shared tokens keep the light and dark themes consistent. If you're styling the app or building a component, this reference explains the conventions to follow.

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
- Layered backgrounds and shadows define surfaces; the interface doesn't use borders for panel edges.
- Interactive elements use raised shadows. Pressed and selected states use inset shadows.
- Cards use deeper shadows than controls; stats bars and inputs read as recessed.
- Keep selected controls distinguishable with more than color, such as an inset shadow and stronger text weight.

## Themes

The app follows the device's appearance by default. In Settings, you can choose Light, Dark, or System. The choice is saved in this browser's local storage; System follows live device appearance changes. The active theme also sets `color-scheme` for native controls and scrollbars.

Use the theme variables for shared interface colors, shadows, and radii. Place and time category colors are semantic data colors rather than theme tokens; keep their labels readable against either theme.

## Component conventions

- Keep option values in shared constants and render repeated options with stable keys.
- Use the existing shared components before adding another implementation.
- Keep shared color, elevation, and shape in theme tokens; keep component-specific spacing near the component styles.
- Keep app code in JavaScript, consistent with the current project.

See [`src/constants.js`](../src/constants.js), [`src/components/`](../src/components/), and [`src/pages/`](../src/pages/) for examples.

## Interface text and locale

English interface text lives in [`src/strings/en.js`](../src/strings/en.js), grouped by screen or shared use. Use `t('screen.key')` from [`src/strings/index.js`](../src/strings/index.js) to read a string; pass an object for placeholders, such as `t('account.signedInAs', { email })`. Add new copy to the relevant group rather than embedding it in a component.

Use the shared formatters in [`src/helpers.js`](../src/helpers.js) for dates and durations. They use the app locale from the strings module. Keep category codes in [`src/constants.js`](../src/constants.js) and add their display labels under `categories` in the English strings file; labels must not replace the values saved with a walk.

## Related

- [Product brief](product-brief.md)
- [Copilot instructions](../.github/copilot-instructions.md)
- [Documentation index](README.md)
