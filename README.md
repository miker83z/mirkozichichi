# My personal website

https://mirkozichichi.me

Built with Jekyll and the [Hydeout](https://github.com/fongandrew/hydeout) theme, published by GitHub Pages.

- Lists (publications, talks, tutoring, projects, home page sections) live in `_data/*.yml`;
  `_includes/entry-list.html` and `_includes/entry-row.html` render them.
- Preview locally with Ruby 3.3: `bundle install`, then `bundle exec jekyll serve` and open http://127.0.0.1:4000.
- Interactive lecture slides (Slidev) have their sources in `_slides/<deck>/`, which Jekyll ignores; each deck's
  `npm run build` writes the static version to `slides/<deck>/` and `npm run pdf` the handout to `assets/tutor/slides/`.
  See `_slides/sicurezzagiur2026/README.md` and `_slides/smartcontractgiur2026/README.md` (the latter also has a
  Move smart contract and a phone app for a class exercise on the IOTA test network).
