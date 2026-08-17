# Contributing

Suggestions are welcome. The bar is deliberately narrow, because a list that includes everything is the same as no list at all.

## Adding something to the list

Open a pull request that edits `README.md`. One item per pull request unless they are closely related.

An entry should be a link, a short description of what the thing does, and nothing else. No marketing copy. If a project is unmaintained but still the best available option, say so in the description rather than leaving it out.

What gets accepted:

- The link resolves. This is checked, and dead links are the most common reason a PR is closed.
- The project does something a reader of this list would plausibly want.
- The description says what it is, not how good it is. "Reads MIFARE Classic tags on Android" is useful. "The ultimate powerful solution" is not.
- If it is archived, dormant, or superseded, the description says so.

What does not:

- Your own commercial product, unless it is genuinely open source and genuinely useful. Submitting your own work is fine; submitting an advert is not.
- Link shorteners, referral links, affiliate links.
- Projects with no README or no commits in several years, unless nothing better exists.
- Anything whose main purpose is cloning access credentials you do not own.

## On the security tools

Attack tools are listed because you cannot make good decisions about which chip to use without knowing what is broken. They are for hardware you own or are authorised to test. Pull requests that frame them otherwise will be closed.

## Fixing things

Corrections are more valuable than additions. If a link has died, a description is wrong, or a code sample no longer runs against a current library version, that is worth a PR on its own.

The code samples in `docs/` and `examples/` should run against current library versions. Two things to watch for, because both appear in a lot of material elsewhere on the internet:

- Web NFC has no `NDEFWriter`. It was removed before the API shipped. Use `NDEFReader` for both reading and writing.
- nfcpy 1.0 removed the `nfc.ndef` module. Records come from the separate `ndeflib` package now, and messages are assigned with `tag.ndef.records = [...]`.

## The web app

`web/index.html` is deliberately a single file with no build step and no dependencies. Keep it that way. It should work when opened from a local web server with no network connection.

Web NFC only works in Chrome and Edge on Android, over HTTPS or localhost, and only from inside a user gesture. Changes need testing on a real device with a real tag; a desktop browser cannot exercise the write path at all.

## Style

Descriptions are sentences, lowercase after the dash, and short. British or American spelling both fine, just be consistent within an entry.
