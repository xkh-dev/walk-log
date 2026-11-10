# Stats reference

The Stats screen turns loaded walks into totals and patterns. Check this reference before changing its calculations or explaining them.

## Totals

- Walk count is the number of loaded walk records.
- Total walking time is the sum of each walk's `duration`.
- The displayed distance is an estimate based on a relaxed pace of 4 km/h: total minutes divided by 60, then multiplied by 4. It isn't measured distance.

## Walk patterns

- Time-of-day distribution counts walks with a `whenType` value and shows each category as a share of the categorized walks.
- Place-type summary counts walks with a `whereType` value. Categories with no walks are hidden, and the most frequent category appears first.

Walks with no time or place category remain in the total walk count and are omitted from that category's distribution. The screen doesn't use location tracking.

## Related

- [Data model](data-model.md)
- [Product brief](product-brief.md)
- [Roadmap](roadmap.md)
- [Documentation index](README.md)
