# 003: Email links and passkeys

This record explains why the app supports both email sign-in links and passkeys. It is for contributors changing the account sign-in experience.

## Status

Accepted

## Date

2026-11-08

## Context

The app needed a browser sign-in method that did not make an account a prerequisite for logging. Email links were implemented first; passkey support was later added as an option in the Account screen.

## Options

- Offer email sign-in links only.
- Require passkeys for account access.
- Keep email links available and offer passkeys as an additional method.

## Decision

Keep email links and offer passkey sign-in when the browser exposes the WebAuthn API. Signed-in users can add or remove their passkeys from the Account screen.

## Consequences

- A passkey is not required to use an account.
- Email remains an alternative if a passkey is unavailable or removed.
- A passkey is bound to the site origin where it is registered; localhost and a production domain require separate registration.
- The client uses Supabase Auth's passkey integration. Check its current browser and domain requirements before changing it.

## Related

- [Supabase for authentication and walk storage](001-supabase-for-auth-and-storage.md)
- [Account screen](../../src/pages/Account.jsx)
- [Manual testing](../testing.md)
