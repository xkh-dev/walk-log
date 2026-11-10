# 005: Organize source folders by code responsibility

This record explains why source files are grouped by their role rather than by the route that uses them. It is for contributors adding screens, shared UI, or data behavior.

## Status

Accepted

## Date

2026-11-07

## Context

The app has route-specific screens, reusable interface elements, and non-UI logic for storage, authentication, and walk data. Grouping all of those by route would mix shared UI and data access with individual screens.

## Options

- Group every file by route or feature, including shared UI and data logic.
- Keep route screens, reusable components, and non-UI code in separate areas.

## Decision

Organize `src/` by code responsibility:

- [`src/pages/`](../../src/pages/) contains route-level screens.
- [`src/components/`](../../src/components/) contains reusable UI.
- [`src/lib/`](../../src/lib/) contains non-UI code, including storage, authentication, CSV handling, and walk data access.
- Shared constants, helpers, entry points, and CSS remain at the `src/` root.

Routes are declared in [`src/App.jsx`](../../src/App.jsx).

## Consequences

- Screens can use shared components and data-access hooks without owning their implementations.
- Non-UI behavior can be reused without tying it to a route.
- Place new files according to their responsibility, not the screen that first uses them.

## Related

- [Architecture and data flow](../architecture.md)
- [Copilot instructions](../../.github/copilot-instructions.md)
- [Documentation index](../README.md)
