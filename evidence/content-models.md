# Content models

## hero (standalone, adapted from the boilerplate)

| Hero                                         |
| -------------------------------------------- |
| [image: team at work]                        |
| # Build the web with us                      |
| We are a small team building fast EDS sites. |
| **[See open positions](/en/jobs)**           |

- One row, one cell. In order: image, Heading 1, one paragraph, one **bold** link (the lines above are all inside that one cell).
- The bold link becomes the button.
- Shows the heading, text and button on top of the image, with a dark overlay for contrast.
- Only the image and heading are required.

## teaser (standalone, from module 07)

| Teaser (dark) |                                                         |
| ------------- | ------------------------------------------------------- |
| [image]       | **Our teams**                                           |
|               | ## Small teams, real ownership                          |
|               | One author, one developer and one designer per project. |
|               | [Meet the team](/en/about)                              |

- One row, two cells: left = the image, right = the text (the right-hand lines are all inside one cell).
- Right cell, in order: an optional **bold** paragraph (eyebrow), a Heading 2, a short paragraph, a link (call to action).
- `(dark)` variant is optional. Home has three teasers in one section.

## jobs (configuration-style, new)

| Jobs                                     |
| ---------------------------------------- |
| [/en/jobs-data.json](/en/jobs-data.json) |

- One row, one cell: a link (or plain text path) to the language's jobs sheet.
- Shows a "Location" select (all locations plus one option per location in the sheet), then one card per job: the role as a heading (linked when `Link` is set) and labels for location and team.
- When no job matches the filter, a short message is shown. Texts come from the placeholders `filterLocation`, `allLocations`, `noJobs`.

## latest-pages (configuration-style, from module 09)

| Latest pages |
| ------------ |
| 3            |

- One row, one cell: how many pages to show. Empty or not a number = 3.
- Shows cards (image, title, description) for the newest pages in `/<lang>/query-index.json`, without the current page and the language home page.

## columns (collection, boilerplate)

| Columns                            |                         |         |
| ---------------------------------- | ----------------------- | ------- |
| ## How we work                     | ## Where we are         | [image] |
| Small teams, short feedback loops. | Milan, Rome and remote. |         |

- One row, one cell per column (2–3 columns); each cell can hold several lines. Used on About and in the footer.

## fragment (boilerplate)

| Fragment                                             |
| ---------------------------------------------------- |
| [/en/fragments/newsletter](/en/fragments/newsletter) |

- One cell with the link to the fragment, at the end of every page.
- The fragment document is plain content: a Heading 2, one sentence, a **bold** "Subscribe" link.

## metadata (on every page)

| Metadata    |                                                       |
| ----------- | ----------------------------------------------------- |
| Title       | Open positions                                        |
| Description | All open positions at Codeland, by location and team. |

- Two columns, key / value. Title and Description on every page; the root page also has `Robots | noindex`.

## Header document (`/<lang>/nav`)

Three sections separated by section breaks (`---`), no block table:

```
[Careers at Codeland](/en/)
---
- [Jobs](/en/jobs)
- Company
  - [About](/en/about)
  - [Life at Codeland](/en/life)
---
- [EN](/en/)
- [IT](/it/)
```

`Company` has no link: its nested list makes it the dropdown. The code points EN/IT to the same page in the other language.

## Sheets

`/<lang>/jobs-data` (one row per job; rows without `Role` are skipped, `Link` may be empty):

| Role                | Location | Team        | Link                        |
| ------------------- | -------- | ----------- | --------------------------- |
| Front-end developer | Milan    | Engineering | /en/jobs/frontend-developer |
| Content author      | Rome     | Content     | /en/jobs/content-author     |
| UX designer         | Remote   | Design      |                             |

`/<lang>/placeholders` (columns `Key` and `Text` in each language's sheet; both languages shown side by side here):

| Key            | Text (EN)                            | Text (IT)                                 |
| -------------- | ------------------------------------ | ----------------------------------------- |
| filterLocation | Location                             | Sede                                      |
| allLocations   | All locations                        | Tutte le sedi                             |
| noJobs         | No open positions for this location. | Nessuna posizione aperta per questa sede. |

`/metadata` (root, bulk metadata):

| URL         | nav     | footer     | template | Robots  |
| ----------- | ------- | ---------- | -------- | ------- |
| /en/\*\*    | /en/nav | /en/footer |          |         |
| /it/\*\*    | /it/nav | /it/footer |          |         |
| /\*/jobs/\*\* |       |            | article  |         |
| /drafts/\*\* |        |            |          | noindex |

`/redirects` (root):

| Source   | Destination |
| -------- | ----------- |
| /careers | /en/jobs    |
