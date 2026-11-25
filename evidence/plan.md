# Capstone plan: folder structure

Careers microsite in two languages. Same paths in each language, so the language switch can swap `/en/` for `/it/`.
The folders are created in da.live (https://da.live/#/patricknshimiyimana/eds-careers-patrick).

```
/                          language choice (English / Italiano), noindex
/metadata                  bulk metadata sheet (nav/footer per language, article template, noindex, default image)
/redirects                 redirects sheet (e.g. /careers → /en/jobs)
/en/                       Home: hero, three teasers, latest pages
/en/jobs                   Jobs list (jobs block → /en/jobs-data.json)
/en/jobs/<role-slug>       job pages, at least two (template: article)
/en/about                  About: columns
/en/life                   second page for the header dropdown
/en/nav                    header: brand | Jobs, Company ▾ (About, Life) | EN, IT
/en/footer                 footer: columns + copyright
/en/fragments/newsletter   newsletter fragment, on every page
/en/placeholders           interface texts (sheet)
/en/jobs-data              jobs sheet: Role, Location, Team, Link
/it/…                      the same tree, translated (same paths)
/drafts/…                  test pages, preview only
```

Decisions:

- Header dropdown: **Company** with About and Life at the company.
- One jobs sheet per language, so role and location names can be translated.
