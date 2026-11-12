# Walk, Log: a walk journal without performance framing

Read this case study to see how Walk, Log balances a personal walk record with optional accounts and the product decisions behind that implementation.

## Product boundary

Walk, Log records where, when, how long, and with whom someone walked. Context fields remain optional. The app avoids goals, streaks, and geolocation so logging doesn't become a performance task.

## Keep logging available without an account

Signed-out walks stay in browser storage. If someone signs in, the app transfers those records to the account using their existing IDs, then removes only IDs confirmed by Supabase. Signed-in reads and writes use Supabase, so an account isn't an offline copy.

This separates the choice to log a walk from the choice to create an account. See [ADR 002](decisions/002-optional-sign-in-and-storage.md) and the [data model](data-model.md).

## Use database ownership rules

Supabase provides authentication and account-backed storage without a custom application server. The `walks` table uses row-level security policies scoped to the authenticated user. The client omits `user_id` from writes so the database assigns ownership.

The tradeoff is that signed-in walk operations depend on a connection and the database policies must stay aligned with the access model. See [ADR 001](decisions/001-supabase-for-auth-and-storage.md) and the [schema](../supabase/schema.sql).

## Keep the cache narrow

The app displays a per-user cache while refreshing signed-in walks from Supabase. It isn't a storage source, isn't uploaded, and is cleared on sign-out. This improves the transition between screens without introducing offline sync or a general caching dependency.

See [ADR 004](decisions/004-display-only-cache.md) and [architecture and data flow](architecture.md).

## Keep sign-in methods optional

Email links remain available alongside passkey sign-in. Passkeys can be added or removed from Settings when the browser supports the required API. A passkey is bound to the site origin where it was registered, so localhost and a production domain require separate registration.

See [ADR 003](decisions/003-magic-link-and-passkeys.md).

## What remains planned

Production-domain setup is tracked in [issue #53](https://github.com/xkh-dev/walk-log/issues/53). Local-first sync for a native iOS app is a separate possibility in [issue #44](https://github.com/xkh-dev/walk-log/issues/44); it isn't part of the current web behavior. The [roadmap](roadmap.md) separates shipped behavior from planned work.

## Related

- [Product brief](product-brief.md)
- [Architecture and data flow](architecture.md)
- [Roadmap](roadmap.md)
- [Documentation index](README.md)
