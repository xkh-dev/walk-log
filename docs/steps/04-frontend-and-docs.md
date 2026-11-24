# Step 4: Frontend and docs

**Dates:** 2026-11-11 – 2026-11-24

## Goal

Outcome:

## Done

### For walkers

*A dark theme, an easier way into Settings, and screens that stay still while they load.*

#### Use a dark theme

Choose Light, Dark, or System in Settings, and the app remembers your choice whether or not you're signed in. ([#63](https://github.com/xkh-dev/walk-log/pull/63), closes [#29](https://github.com/xkh-dev/walk-log/issues/29))

#### Open Settings from the home screen

A round button next to "Walk, Log" opens Settings, where sign-in, passkeys, and appearance now live together. ([#65](https://github.com/xkh-dev/walk-log/pull/65))

#### Sign in with a clearer email field

The email field in Settings is full width, matches both themes, and shows a visible focus ring. ([#68](https://github.com/xkh-dev/walk-log/pull/68))

#### See screens load without jumping

The saved theme and sign-in state appear right away, and the All Walks calendar keeps its size while walks load. ([#70](https://github.com/xkh-dev/walk-log/pull/70), closes [#67](https://github.com/xkh-dev/walk-log/issues/67))

### Design and research

- Chose stamps as the walk card direction: every walk leaves a unique impression, you set the stamp while logging, and saving presses it onto your page.
- Researched four stamp traditions as references: Japanese station stamps, journaling stamps, library stamps, and event stamps.
- Matched each place to a seal outline: park is a circle, urban a square, woods a tall arch, coast a wide rectangle, heights a triangle, and rural a house-shaped pentagon.
- Chose ink color to show the time of day, with four inks for morning, noon, evening, and night in both themes.
- Designed the save animation: the sheet slides down, the seal flips, presses onto the card, and lifts away to leave the stamp.
- Chose a full-height modal sheet for Log, because logging is an action you finish, not a place you go. ([#79](https://github.com/xkh-dev/walk-log/issues/79))
- Checked Supabase capacity and estimated storage per walk and for planned features. ([#64](https://github.com/xkh-dev/walk-log/pull/64))

### Behind the scenes

- Moved Copilot prompts to skills, so Copilot loads them when a task needs them. ([#59](https://github.com/xkh-dev/walk-log/pull/59))
- Moved all UI text into an English strings file, ready for translation later. ([#66](https://github.com/xkh-dev/walk-log/pull/66), closes [#28](https://github.com/xkh-dev/walk-log/issues/28))
- Switched issues to a design doc format with checkable goals and non-goals. ([#71](https://github.com/xkh-dev/walk-log/pull/71), closes [#69](https://github.com/xkh-dev/walk-log/issues/69))
- Changed `/start-task` to stop at a handover, so I commit, push, and merge myself. ([#73](https://github.com/xkh-dev/walk-log/pull/73), closes [#72](https://github.com/xkh-dev/walk-log/issues/72))
- Fixed the `/start-task` description in the docs index. ([#74](https://github.com/xkh-dev/walk-log/pull/74))
- Wrote up the design process, from a plain form to stamps, including the ideas I dropped. ([#82](https://github.com/xkh-dev/walk-log/pull/82), [#83](https://github.com/xkh-dev/walk-log/pull/83), [#84](https://github.com/xkh-dev/walk-log/pull/84))
- Fixed links in the pull request template. ([#85](https://github.com/xkh-dev/walk-log/pull/85))

## Decisions

- The appearance choice is stored in the browser and works signed in or out. System follows the device. ([#63](https://github.com/xkh-dev/walk-log/pull/63))
- The project stays on the Supabase Free plan for now. Revisit the inactivity-pause risk before inviting users. ([#64](https://github.com/xkh-dev/walk-log/pull/64))
- Settings keeps the existing `/account` route. Only its presentation changed. ([#65](https://github.com/xkh-dev/walk-log/pull/65))
- Preset city values stay stable when stored. Their labels come from the strings file. ([#66](https://github.com/xkh-dev/walk-log/pull/66))
- The email field uses existing theme tokens instead of new ones. ([#68](https://github.com/xkh-dev/walk-log/pull/68))
- Screen changes stay immediate, with no animation. The calendar always has 42 cells, so loading and loaded states match. ([#70](https://github.com/xkh-dev/walk-log/pull/70))
- Branch names use a two-to-four-word slug from the issue title. ([#73](https://github.com/xkh-dev/walk-log/pull/73))
- The design process is written down, keeps every dropped idea with its reason, and leaves open questions open. ([#84](https://github.com/xkh-dev/walk-log/pull/84))
- Log stays a full-height modal sheet. Sheet behavior moves to [#87](https://github.com/xkh-dev/walk-log/issues/87), and the ADR is [#80](https://github.com/xkh-dev/walk-log/issues/80). ([#79](https://github.com/xkh-dev/walk-log/issues/79))

## Not done

- [#33 View: Settings. Default city](https://github.com/xkh-dev/walk-log/issues/33) → Step 5
- [#86 Stamps: Seals, inks, and the press](https://github.com/xkh-dev/walk-log/issues/86) → Step 5
- [#21 Design: Walk card system](https://github.com/xkh-dev/walk-log/issues/21) → continues as an epic
- [#75 Walk card: Generation rules](https://github.com/xkh-dev/walk-log/issues/75) → Back, Log
- [#23 Log: Card preview](https://github.com/xkh-dev/walk-log/issues/23) → Back, Log
- [#34 Stats: Distance comparisons](https://github.com/xkh-dev/walk-log/issues/34) → Back, Log
- [#17 Demo page](https://github.com/xkh-dev/walk-log/issues/17) → Back, Log

## Retro

### Worked

- Shipping small frontend changes one at a time, each with its own PR: the dark theme, the Settings entry, the clearer email field, and stable loading.
- Doing design, docs, and issue drafts while Copilot credits were low. The ideas are on the board, ready for code in December.
- Trying ideas quickly and dropping them without regret. Writing down why each one moved on turned the dead ends into part of the story.
- Looking for a real-world reference. Stamps gave real reasons for uniqueness, tuning, and the moment of saving, which no invented material did.
- I tried MECE rule: each input shows up in exactly one way.
- Writing decisions down as issue comments, like the Log sheet in #79.
- Doing git myself, including in the VS code UI and the GitHub web. I learned to commit, push, and so on by myself. I learned to read lint errors by line number.

### Didn't work

- I planned too much, and most of the open items never started.
- I drew materials (pixel trees, dots, knitting, fabric) before I could say why a walk would look like that. None of it came from walking, so none of it held.
- The direction changed faster than the issues. #75, #77, and #78 went out of date, and #33 sat In Progress for 11 days without a branch.
- Three PRs (#82, #83, #85) went in with empty descriptions.

### Change next step

- Before drawing anything, ask how it connects to walking, and look for a real-world reference first.
- Research before screens: finish [#86](https://github.com/xkh-dev/walk-log/issues/86), rewrite [#75](https://github.com/xkh-dev/walk-log/issues/75) for stamps, then design [#23](https://github.com/xkh-dev/walk-log/issues/23).
- When the direction changes, update or close the affected issues and statuses the same day.
- Fill in every PR description, preview Markdown before opening a PR, and turn on automatic branch deletion.
- Write the step summary before planning the next step.

## Related

- [Step summary template](template.md)
- [Documentation index](../README.md)
