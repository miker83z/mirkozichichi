# Introduzione alla Crittografia: slide interattive (novembre 2026)

Lecture on IT security and cryptography for the UniBo law seminar "Blockchain e Smart Contract: aspetti giuridici e tecnologici", rebuilt from `assets/tutor/slides/sicurezzagiur2024.pdf` as an interactive [Slidev](https://sli.dev) deck. Same topics, same order, in Italian, with live demos and legal notes for law students.

The folder starts with `_`, so Jekyll ignores it; only the build output in `slides/sicurezzagiur2026/` and the PDF in `assets/tutor/slides/` are published with the website.

## Commands

Run them in this folder (Node 22.22+; tested with Node 26).

| Command | What it does |
|---|---|
| `npm install` | installs Slidev and the fonts; `npx playwright install chromium` once for the PDF |
| `npm run dev` | opens the deck at http://localhost:3030; presenter view (notes, timer, next slide) at http://localhost:3030/presenter |
| `npm run pdf` | writes the student handout (slides + appendix) to `../../assets/tutor/slides/sicurezzagiur2026.pdf` |
| `npm run pdf:slides` | slides only, without the appendix, to `../../assets/tutor/slides/sicurezzagiur2026-slides.pdf` |
| `npm run build` | static deck for the website in `../../slides/sicurezzagiur2026/` (served at https://mirkozichichi.me/slides/sicurezzagiur2026/) |
| `npm run check-links` | checks every external link in the slides and data files |

While presenting: arrow keys or space to move, `o` for the overview, `g` to go to a slide number. Typing inside a demo does not move the slides.

## Layout of the project

- `slides.md`: the deck for the lecture; `dispensa.md`: the same slides plus the appendix, for the PDF. Both import the files in `pages/`, one per section ("Capo"), in the order of the 2024 deck.
- `pages/99-appendice.md`: reading lists, glossary, credits (PDF only).
- `components/`: the interactive demos (Vue). Each file starts with a comment that lists its props. In the PDF every demo shows a finished, explained state.
- `data/notizie.ts`: the news cards of the opening slide; `data/password-comuni.ts`: the list used by the password demos.
- `layouts/`: `capo` (section dividers) and `copertina` (title slide).
- Diagrams: `components/Schema*.vue`, built from the `Sv*` blocks (box, arrow, person, document, key, padlock); each step appears with a click (`v-click` on SVG groups). Every paragraph and list on the slides also appears with a click; the PDF shows each slide complete.
- Legal references for the lecturer (formerly the "Per il giurista" notes) are in the speaker notes, visible in the presenter view.
- Opening news: each attack has its own slide with `SchemaAttacco` (who attacks, how, what it hits, the property violated, the defence). When a news item changes, update its card in `data/notizie.ts`, its slide in `pages/00-apertura.md` and the summary map `components/SchemaNotizie.vue`.
- Acronyms not spelled out anywhere in the slides get a footnote: a `<div class="sigle">` at the end of the slide, one `<p v-click="n">` per line, where `n` is the click that reveals the acronym (no `v-click` if it is in the title). If you add or remove clicks on such a slide, recheck `n`.
- `style.css`: colours, fonts (bundled, no Google Fonts), shared classes.
- `VERIFICA.md` and `verifica/`: the fact-check of every claim, with sources, and what to recheck before the lecture.

## Privacy

The deck loads nothing from other websites: fonts and images are bundled, links open only when clicked, and the demos (hashes, keys, signatures, codes) run entirely in the browser. This keeps the website's privacy notice true.

## Dependency overrides

`package.json` forces patched versions of two packages that Slidev pulls in but this deck never ships: `dompurify` (used by the Monaco code editor, disabled here) and `image-size` (used by `pptxgenjs` for PowerPoint export, not used here; it moves to the 2.x major, so `slidev export --format pptx` may not work). Drop the `overrides` once Slidev depends on fixed versions, and check with `npm audit`.

## Updating for a new edition

1. Refresh the news in `pages/00-apertura.md` and `data/notizie.ts`, and the items listed under "Da ricontrollare" in `VERIFICA.md`.
2. Run `npm run check-links`, `npm run pdf` and `npm run build`, then look at the PDF.
3. Commit the sources, `slides/sicurezzagiur2026/` and the PDF together.
