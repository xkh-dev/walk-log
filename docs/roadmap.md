# Roadmap

Check this roadmap to distinguish shipped web behavior from work that's still planned; future ideas aren't commitments or current features.

## Current web app

The current web app lets people create, edit, and delete walks; browse a calendar and list; review totals and time-of-day and place-type summaries; and import or export CSV.

The app works without an account using browser storage. You can sign in with an email link or passkey if you choose. Signed-in walks use Supabase, and local walks are transferred after the account confirms their IDs.

## Planned work

### Production domain

Configure public hosting, HTTPS, Supabase redirect URLs, passkey origins, and email delivery. The work is tracked in [issue #53](https://github.com/xkh-dev/walk-log/issues/53).

### Native iOS and local-first sync

Explore a native iOS client that keeps a local copy of signed-in walks and syncs changes when a connection is available. This is separate from the current web app and is tracked in [issue #44](https://github.com/xkh-dev/walk-log/issues/44).

## Related

- [Repository overview](../README.md)
- [Architecture and data flow](architecture.md)
- [Product brief](product-brief.md)
- [Documentation index](README.md)
