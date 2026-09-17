# Walk, Log 🌳

> A quiet place to remember your walks. No streaks, no goals — just the practice.

**Status:** 🚧 In active development · Phase 1 (MVP)

<!-- Add a screenshot here once the UI is further along — it matters a lot: -->
<!-- ![Walk, Log — the log form](docs/screenshot.png) -->

## Why

People who walk to think and process life have nowhere made for it. Notes apps bury walks among to-do lists, journals feel bloated for walks alone, and fitness apps judge and motivate — the opposite of what a contemplative walker wants.

Walk, Log is a dedicated, non-judgmental space that captures *just enough* to reveal patterns, without any pressure to perform. The walk comes first; the app second.

→ Full reasoning in [`docs/product-brief.md`](docs/product-brief.md).

## What it does

**Now**
- Log a walk in seconds: where (place + type), when (date + time of day), how long, and who with.

**Planned**
- A stats view that reflects your habits back gently — where you go, when you walk, your seasonal rhythm — never a scoreboard.
- Local-first storage with CSV import/export.
- Quote of the week, walk history, photos, and a dark theme.

→ Full plan in [`docs/roadmap.md`](docs/roadmap.md) and [`docs/stats-plan.md`](docs/stats-plan.md).

## Data

I'll right something about data here later. For now:

→ Details in [`docs/data-model.md`](docs/data-model.md).

## Design

A depth-based interface built on a token-driven design system: all color, elevation, and shape come from CSS custom properties (OKLCH), so the whole app re-skins from one place. Light theme by default, dark as an option — both from a single set of variables.

→ Details in [`docs/design-system.md`](docs/design-system.md).

## Tech

- **React + Vite** (JavaScript)
- **CSS custom properties** for the design system
- **Browser local storage** — no backend in Phase 1

## Run locally

```bash
git clone https://github.com/xkh-dev/walk-log.git
cd walk-log
npm install
npm run dev
