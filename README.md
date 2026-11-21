# My English 3000

A simple Korean-language English study site. Open `index.html` through any static HTTP server. No build or dependencies are required.

## Daily publication

- `data/manifest.js` assigns `window.ENGLISH_MANIFEST`: ordered entries with unique `day`, Singapore calendar `date` (`YYYY-MM-DD`), and `file` (`data/day-NN.js`). Day 01 is 2026-11-18.
- Each lesson assigns `window.ENGLISH_LESSONS[N]` to 30 cards: 10 `phrasal` and 20 `vocab`. Keep the existing schema and three translated examples per card.
- Read the current remote manifest and lessons before editing. If the target date already exists, verify it and do not create another day or duplicate commit. Fill missing dates in order; do not overwrite published lessons.
- Normalize terms with Unicode NFKC, trim, lowercase and collapsed whitespace; new lessons must not repeat any existing term. Days 01–03 are preserved verbatim, including their pre-existing repetitions.
- Update only the new `data/day-NN.js` and `data/manifest.js` during normal daily publication. Commit them together to `main`, checking the remote head again immediately before publishing. Never force push.
- Do not generate Anki `.apkg`/`.tsv`, PDF, CSV, ZIP, or other downloadable lesson files. The site automatically discovers days; no daily HTML edits are needed.
- Run `node scripts/validate.cjs` before publication. Confirm the commit on GitHub and check Cloudflare's check run plus the production manifest/lesson before reporting deployment success. A commit alone is not proof of deployment.

## Deployment

The existing production site is https://my-english-3000.ultraman0115.workers.dev/ and is connected through **Cloudflare Workers Builds** (not a confirmed Pages project). Preserve `wrangler.jsonc`; `.assetsignore` must allow `data/` and `_headers`. A push to the connected `main` branch triggers the existing integration.

This is also a static site compatible with Cloudflare Pages: repository root, no framework/build command, output directory `.`. Use a connected Pages project's actual settings if one exists; do not create a second project for routine updates.

## Detailed lesson contract (Day 04 onward)

Keep the core card fields and three original English/Korean example pairs. Add `grammar`, `pronunciation: {stress, practice}` and `etymology: {status, text, source?, checked?}` to each new card. `verified` requires a source actually read plus its ISO verification date; summarize in original Korean. If the origin cannot be established, use `unverified` and state that explicitly; do not invent an origin from a mnemonic. Day 04 vocabulary origins were checked against the individual Etymonline entries on 2026-11-21. Its ten multiword expressions have explicitly unverified historical origins.

Add `visual: [term, situation, action, result, comparisonCaption]` to 5–10 core cards per day. Use short labels (at most 20 characters for the three diagram nodes). `learning.js` renders safe, accessible SVGs without injected markup. Its supplemental six diagrams per legacy day preserve Days 01–03 byte-for-byte; Day 04 has eight concepts. IPA basics and sound-specific lip/tongue/error guidance are shared across every day. Normal (0.95) and slow (0.65) TTS rates use the saved selected English voice; exact timing depends on the browser/OS voice engine. Do not replace the user's voice preference.

The daily author should prioritize useful US conversational/workplace English at intermediate-to-advanced level, verify idiomatic use, and check all previous terms (including inflected duplicates). `weigh up` is retained from the published Day 04 and labeled chiefly British, with US alternatives. `touch base with` is retained and labeled an idiom within the multiword-expression group.

Run `node scripts/validate.cjs` before committing the new day and manifest together. A valid source URL is a structural check, not proof that an etymological claim is correct: the author must read the source. Do not add tomorrow's lesson early or duplicate today's existing lesson.
