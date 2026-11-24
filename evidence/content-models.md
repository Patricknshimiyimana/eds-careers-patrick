# Content models

Written before coding. One table per block: what the author writes, and what the block shows.

## hero (adapted from the boilerplate)

| Hero |
| --- |
| image · Heading 1 · one paragraph · a **bold** link (becomes the button) |

Shows the heading, text and button on top of the image, with a dark overlay for contrast.

## teaser (from module 07)

| Teaser (dark) | |
| --- | --- |
| image | **bold** eyebrow paragraph · heading · text · link |

`dark` variant is optional. Home has three teasers in one section.

## jobs (new)

| Jobs |
| --- |
| link to the sheet, e.g. `/en/jobs-data.json` |

Sheet columns (one sheet per language): `Role`, `Location`, `Team`, `Link` (path to the job page, may be empty).
Shows one card per row: role (linked when `Link` is set) and labels for location and team. A labelled `<select>` above the list filters by location, with an "all locations" option. When no job matches, a short message is shown. Rows without `Role` are skipped.

## latest-pages (from module 09)

| Latest pages |
| --- |
| how many pages (default 3) |

Reads the current language's query index (`/<lang>/query-index.json`), newest first, skipping the current page and the language home page.

## columns, fragment (boilerplate)

`Columns` on About and in the footer. `Fragment` with `/<lang>/fragments/newsletter` at the end of every page.

## Header and footer documents

Nav: three sections (brand | Jobs, Company ▾ with About and Life | EN, IT). The header code marks the current page and points EN/IT to the same page in the other language.

## Placeholders (keys read by the code, both languages)

| Key | EN | IT |
| --- | --- | --- |
| filterLocation | Location | Sede |
| allLocations | All locations | Tutte le sedi |
| noJobs | No open positions for this location. | Nessuna posizione aperta per questa sede. |
