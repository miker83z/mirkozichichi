# Blockchain & Smart Contracts: slide interattive (novembre 2026)

Lecture on blockchain, smart contracts and digital coins for the UniBo law seminar "Blockchain e Smart Contract: aspetti giuridici e tecnologici", rebuilt from the 2025 deck (`25.11.UNIBO-smart-contracts.pdf`) as an interactive [Slidev](https://sli.dev) deck, in Italian, for law students. The theme follows the 2025 deck (dark navy, flowing-line covers, the IOTA logo), with one layout for every content slide.

It opens with the first 30 slides of `../sicurezzagiur2026` (news, attacks, Capo I on security), reuses that deck's hash and signature diagrams and demos, adds crypto notions with their theory (Byzantine generals, Nakamoto consensus, seed phrases, AMMs, stablecoins…) and a class activity on a real IOTA test network, done from the students' phones. The programming-language slides of 2025 are gone, at the lecturer's request.

The folder starts with `_`, so Jekyll ignores it; only the build output in `slides/smartcontractgiur2026/` (deck and class app) and the PDF in `assets/tutor/slides/` are published with the website.

## Commands

Run them in this folder (Node 22.22+; tested with Node 26).

| Command | What it does |
|---|---|
| `npm install` | installs Slidev, the fonts and the IOTA SDK; `npx playwright install chromium` once for the PDF |
| `npm run dev` | opens the deck at http://localhost:3030; presenter view at http://localhost:3030/presenter |
| `npm run pdf` | writes the student handout (slides + appendix) to `../../assets/tutor/slides/smartcontractgiur2026.pdf` |
| `npm run build` | the deck and the class app for the website, in `../../slides/smartcontractgiur2026/` |
| `npm run check-links` | checks every external link in the slides and data files |
| `npm run aula:dev` | the class app alone, at http://localhost:3050/slides/smartcontractgiur2026/aula/ |
| `npm run aula:test` | the Move unit tests of the class contract (needs the IOTA CLI: `brew install iotaledger/tap/iota`) |

## Layout of the project

- `slides.md` (lecture) and `dispensa.md` (PDF, with the appendix) import the files in `pages/`, one per section ("Capo"), in the order of the 2025 deck: `00-apertura` and `01-sicurezza` come from sicurezzagiur2026.
- `layouts/`: `copertina` (title), `capo` (section dividers), `chiusura` (closing); every other slide uses the default layout. `components/Correnti.vue` draws the flowing lines and dots.
- `slide-bottom.vue`: the footer, and on the smart contract slides a strip at the top right with the seven parts of a platform (frontmatter `piattaforma: n`, optional `voce: k`), in place of the 2025 deck's repeated checklist.
- `style.css`: the theme. The colour tokens keep the names of the sicurezzagiur2026 deck (`--carta`, `--inchiostro`, `--rubrica`…), so the same diagrams work here.
- `components/Schema*.vue`: the diagrams, built from the `Sv*` blocks; each step appears with a click. `components/Piattaforma.vue` is the recurring checklist of the 2025 deck. Demos: `HashPlayground`, `SignatureDemo`, `GiocoMining` (the miners' game, one turn per click), `SeedPhrase` (BIP-39, Italian list in `data/bip39-italiano.ts`), `Amm` (x · y = k), `Halving`, `PremioMiner` (every node checks the miner's reward), `CongelaStablecoin` (what USDC's and USDT's issuers can freeze or wipe, as in their contracts), `Lavagna` (live board of the class contract). `BlocchiVeri` and `DefiTvl` show real data copied on 10/11/2026 (mempool.space, DefiLlama), so the slides make no requests.
- `archivio/`: diagrams and demos no longer on the slides (Merkle trees, ledger models, zero-knowledge, MEV…), kept for future editions; Slidev ignores this folder.
- Acronyms not spelled out on the slides get a footnote (`<div class="sigle">`, one `<p v-click="n">` per line, `n` = the click that reveals the acronym).
- Legal references for the lecturer are in the speaker notes (presenter view).
- `VERIFICA.md` and `verifica/`: the fact-check, with sources, and what to recheck before the lecture.

## The class activity (replaces iotaplay.app, which no longer exists)

- `aula/move/`: the Move package `aula`: the class coin AULA (`aula::aula`: a shared `Rubinetto` mints 10 AULA once per address and keeps a public register of nicknames; `invia` sends AULA to a nickname) and the class vote (`aula::voto`: shared `Sondaggio`, one vote per address, polls created by the holder of the `AdminCap`). Tests in `aula/move/tests`.
- `aula/config.json`: network, RPC, faucet page, package and `Rubinetto` IDs. Published on the IOTA **devnet** on 10/11/2026 with the CLI address in `~/.iota/iota_config` (it owns the `AdminCap` and the `UpgradeCap`).
- `aula/app/`: the mobile web app (Vite + `@iota/iota-sdk`): a throwaway key in the browser, a link to the official faucet page with the address filled in (the faucet asks for a captcha), join, vote, send AULA. `?faucet=<url>` points it to another faucet page.
- `components/Lavagna.vue`: the live board on the projector; it contacts the network only after "Collega".

Before the lecture:
1. `iota client active-env` must be `devnet`; check the contract still exists (devnet can be reset): open the app, or `iota client object <Rubinetto id>`. If it is gone: fund the CLI address from the faucet, then `node scripts/aula-pubblica.mjs` (publishes and rewrites `aula/config.json`) and `npm run build`, then recreate the poll with the command in step 2 and update the date in the speaker notes.
2. The 2026 class poll (created on 10/11/2026, closed after the lecture on 12/11/2026 with 2, 2, 0, 0 votes): «Che cosa impedisce di riscrivere un blocco già confermato?», four answers, the right one is the second (see the speaker notes). The app lists an open poll as step 5, after sending AULA, and hides the card once it is closed; the board on the token slide shows only joins and transfers. To ask another question, e.g. for the next lecture: `node scripts/aula-sondaggio.mjs "Domanda?" "Risposta 1" "Risposta 2"` (the app and the board show the latest poll); to close the latest one after the lecture: `node scripts/aula-sondaggio.mjs --chiudi`.
3. Try the faucet from a phone on the university network.

## Privacy

The deck loads nothing from other websites. The class app, and the board once connected, talk to the IOTA Foundation's public devnet servers (RPC and faucet); the app keeps a test key in the browser's local storage. This is stated in the website's privacy notice.

## Dependency overrides

As in sicurezzagiur2026: `dompurify` and `image-size` are forced to patched versions (`overrides` in `package.json`); drop them once Slidev depends on fixed versions.
