# Manual testing

These checklists help you verify signed-out, signed-in, migration, and passkey behavior in a browser. Use separate browser profiles so each session has independent cookies and local storage.

## Set up isolated sessions

1. Start the app with `npm run dev` and open its local URL in two browser profiles.
2. Sign in to the account in one profile.
3. Keep the second profile signed out. A private window can work, but close it when you finish to clear its temporary site data.

Use the same hostname in both profiles. `localhost` and `127.0.0.1` are different origins and do not share browser storage.

## Signed out

- [ ] Confirm you can use the app without signing in.
- [ ] Log a walk with only the required fields and leave optional details empty.
- [ ] Reload and confirm the walk remains available.
- [ ] Edit the walk, reload, and confirm the change remains.
- [ ] Delete the walk and confirm it is gone.
- [ ] Export a CSV, remove the test walk, import the file, and confirm it returns.
- [ ] Export a walk with formula-like text in a text field and confirm a spreadsheet displays it as text without changing the saved walk.
- [ ] Confirm the signed-out walk does not appear in the signed-in profile.

## Signed in

- [ ] Send an email sign-in link and confirm it returns to the app.
- [ ] Log, edit, and delete a walk; confirm each save completes before navigation or closing.
- [ ] Reload and confirm the account's walks load.
- [ ] Sign out and confirm account walks are not copied into the signed-out `walks` key.
- [ ] Sign in again and confirm account walks are available.

## Move local walks on sign-in

- [ ] In the signed-out profile, log a uniquely identifiable test walk.
- [ ] Sign in to the account used in the other profile.
- [ ] Confirm the local walk appears with the account's existing walks.
- [ ] Reload and confirm it remains available.
- [ ] If you inspect local storage, confirm the transferred ID is no longer in the `walks` key. The `walks-cache:<userId>` key is only a display cache.
- [ ] Close the private window or clear the separate profile's site data when finished.

Only IDs confirmed in the account should be removed from local storage. Do not manually delete database records as part of routine checks.

## Passkeys

Use a browser and device that support WebAuthn:

- [ ] While signed in, add a passkey from the Account screen.
- [ ] Confirm it appears in the list with a name and date.
- [ ] Sign out and sign in with the passkey.
- [ ] Confirm email sign-in remains available.
- [ ] Remove the passkey and confirm email sign-in still works.
- [ ] Cancel registration or sign-in and confirm the app remains usable.

A passkey is tied to its registered site origin. Register separate passkeys for localhost and the production domain.

## Related

- [Architecture and data flow](architecture.md)
- [Data model](data-model.md)
- [Contributing](../CONTRIBUTING.md)
- [Documentation index](README.md)
