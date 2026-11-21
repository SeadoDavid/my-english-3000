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
