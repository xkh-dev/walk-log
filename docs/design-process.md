# Design process

This is how the look of Walk, Log came together, including the ideas I dropped along the way. I'm keeping all of them here, because each one taught me something the next one needed.

## Where I started

- I wanted to start a personal design material I can reuse in future apps, beginning with Walk, Log because it's small.
- From my earlier design system for PCP, I kept the method: structure, tables, spacing rules, and a note on how to use the file. I didn't keep its look.
- References I love: Arc, Mailbox, VSCO, Must, desktop Spotify, T-Bank, and the old asmallstudio website. Most are flat designs from the late 2010s. I feel minimalism is fading now, and I wanted something still minimal that lets a little of the real world in.
- What I took from them:
  - Must and VSCO: the interface stays quiet, so the content brings the color.
  - T-Bank: the cardholder is made of the interface itself, and it holds something real.
  - Arc: a chosen color frames the content, and the content rises out of it.

## 1. Green felt and paper cards

The idea was a grainy green ground, like felt, with cream paper cards on top. Felt was the app, paper was yours, and choosing something turned it from felt into paper.

It didn't work, because a green ground swallows the woods, the place that matters most. Any single color would clash with one of the places. I still like the word "felt", though.

## 2. The walk card

Walk, Log didn't have a real-world object to copy, so I invented one: the walk card. The Log screen became a tuner, with a small card at the top that changes as you choose things.

What stayed from this step:

- Every walk is unique, even in the same place at the same time a year later, because the place and the person change. So every card is unique too.
- A card comes from two things: the walk, and you at that moment.
- A card is frozen when it's saved, so an old card keeps its look.
- Walking more makes a card different, never better.
- A card has three sizes: full, miniature, and a calendar day.
- The Log screen stays a full-height sheet, with the preview at the top and the controls close to your thumb. The same screen works for a quick log and a careful one, with one tap to save or as much detail as you want.
- My hypothesis: when you see the walk take shape while logging, it feels like making something, not filling in a form.

I also argued with myself about whether collecting is gamification. I decided it isn't. Ranking is. Nothing here is rarer or better than anything else, and there's nothing to complete.

## 3. Fat block icons

Before any references, I tried icons built from solid blocks with small gaps, some corners round and some sharp, all on one grid. It was construction by rules, not drawing, which suits me since I'm not an illustrator.

I also decided that light comes from the top left. Light from straight above lights both sides the same and looks flat. Light from one side gives things volume. I kept one idea for later: on the card, the light could follow the sun, coming from the left in the morning and the right in the evening.

## 4. Material blocks

Inspired by Minecraft, each place became one material block, and the card was that block repeated. The icon and the material were the same thing.

What I learned:

- Grass and leaves change with the seasons, so the blocks had to look right all year and in any climate.
- I can't guess the season from the date. I don't know where someone lives, and winter doesn't always mean snow. Weather can add a layer only when there's real weather data.
- So places became things that are there all year: a spruce, a bench, a building, a fence, a wave, a peak.
- Drawing the spruce taught me the basics: a pixel grid, light from the top left, an outline in a darker shade instead of black, yellowish highlights and bluish shadows, and an outline that takes the light.

It didn't work, because rows of trees on a colored background looked like a game level. Honestly, it looked like Flappy Bird.

## 5. Round dots

Round dots instead of square pixels, in a loose print that drifts while you log. Saving freezes it, so each card is unique.

It didn't work, because the gaps between the dots looked perforated, and I still didn't know why the print was there at all.

## 6. Knitting and a quilt

A Nordic knit pattern, then one fabric per place, then a year of walks sewn into a quilt. My reference was my green and brown woven shopper, which reminds me of a sweater I had as a child.

The rule was that each place gets one basic geometry, so no two overlap: vertical stripes for woods, horizontal for coast, a grid for urban, diagonals for rural, zigzags for heights, dots for park, and a plain weave when no place is chosen.

I even found some grounding for it. Tim Ingold's *Lines: A Brief History* connects walking, weaving, and writing. The word "text" comes from the Latin for "to weave". People sew memory quilts from fabric that belongs to a time in their life.

It didn't work, because I still couldn't say why a walk would be fabric. Each step made sense on its own, but none of it came from walking.

## 7. Stamps

Every walk leaves its own stamp. You set the seal while you log, and saving presses it onto your page.

### Stamps people already love

- **Japanese station stamps.** Since 1931, train stations in Japan have kept a free stamp with a local design, and people of all ages collect them in small notebooks. The old ink pads often leave faint or uneven prints, and that's part of the charm.
- **Journaling stamps.** People use rubber stamps in their diaries and planners to mark a day, the weather, or a mood. Japanese stationery brands make whole lines of them.
- **Library stamps.** A date stamped on the card inside a book every time someone borrowed it. Over time, the card filled up with dates from different readers.
- **Event stamps.** An ink mark on your wrist at a concert or a party that says you were there that night.

### Why stamps fit

- A stamp never prints the same way twice, so every walk being unique feels natural.
- Setting a seal before pressing it is what logging already is.
- Saving has a real moment: the press.
- While you edit, the seal is flat and digital. Once you save, it turns into something physical: a stamp in real ink. That's the shift away from pure minimalism I was looking for.

### How it's different from travel stamp apps

Travel stamp apps give each place one fixed stamp and count your progress, like "31 of 249 countries". Walk, Log stamps the moment instead. The same park on two evenings leaves two different stamps, and nothing is counted.

### How a stamp is made

- **Place:** each place has its own seal shape. The shapes aren't decided yet.
- **Time of day:** it changes the ink color. I chose the ink over the paper, because paper changes between Light and Dark mode and the ink stays readable on both. Each ink needs a light and a dark version.
- **Walking with someone:** either a double border, which is simpler, or two stamps pressed slightly apart, each one unique. Two stamps could later connect to cowalkers.
- **No text, not even a date.** Different countries write dates differently, so the date sits next to the stamp as normal text, and the app formats it for each person. The stamp itself never needs translating.

### The press

- Every stamp gets a small random value when it's saved. It sets the tilt, a slight offset, and how evenly the ink lands, so the same seal never prints the same way twice.
- The app saves only what it can't work out later: a snapshot of you at that moment, and that random value. It never saves the drawing itself, which keeps storage small and draws the same stamp on every device.
- When you save, the sheet slides down, the seal flips over, presses onto the page, and lifts away, leaving the stamp. With Reduce Motion on, the stamp just appears.

### MECE rule

Each input shows up in exactly one way, and no two inputs share one. No two places share a shape. You can read a walk from its stamp, and you can't mistake one place for another.

### Still open

- The six seal shapes.
- What sits inside the seal.
- Whether duration shows on the stamp at all. A long walk shouldn't look more complete than a short one.
- Where the stamp lands: a page, a card, or something else.

## Related

- [Case study](case-study.md)
- [Design system](design-system.md)
- [Product brief](product-brief.md)
