# Connected Province Health

A plain-language, playable guide to the ideal Philippine **Province-wide / City-wide Health System** under the Universal Health Care Act (RA 11223). It is built on the idea of **"Connected, not Integrated"** and shows AI as the tool that helps every town close its gaps and get ahead.

It is written for families, health workers, mayors, governors and Health Boards. The DOH Health Sector Enterprise Architecture is the backbone, available in a "technical view".

## What's in it

| Page | What you can do |
|---|---|
| **Start here** | Take the 5-minute guided tour, or jump to your own to-do list by role. Meet the people (Rosa, Lorna, Gov. Santos...), flip the "It is not / It is" cards, and break a system in the *Connected vs Integrated* simulator |
| **Explore the province** | Tap places on an illustrated province; show how care, money and information move; see AI helpers and who builds what; zoom from country to clinic; follow Rosa's journey; open the DOH technical view |
| **Close the gap with AI** | Pick a city, an average town or a remote island town; race the usual path against the AI path; use the equalizer slider; open nine gap cards |
| **Journeys** | Walk five people (a safe birth, blood pressure, an emergency, TB, a dengue outbreak) through each step, today vs connected with AI, and watch trips, days and costs add up |
| **Money** | Move money into the Special Health Fund, switch on pooling and AI claim checks, and see what reaches care and what it buys |
| **Roadmap** | Compare the usual order with the leapfrog plan, tap any line to see the decision it needs, who decides, what must come first and the legal basis, and find your stage |
| **Your part** | Pick your role (Governor or Mayor, Health Board, health office, facility head, health worker, family) and get a short list: what to do, with whom, by when, what it costs, and how you know it is done. Print your list, or all lists with a one-page summary |
| **Glossary** | Search 29 terms in plain language, and see the laws and documents behind the explainer |

## Open it

- **Online / GitHub Pages**: serve the repository root (`index.html`). In GitHub: *Settings → Pages → Deploy from branch*.
- **Offline (workshops, USB)**: `dist/connected-province-health.html` is one self-contained file. Copy it anywhere and double-click it. Without internet it uses system fonts.
- **Edit content**: all text lives in `assets/js/content.js`, `assets/js/content2.js` and `assets/js/content3.js`. After editing, run `python3 tools/build.py` to refresh the files in `dist/`.

## Files

```
index.html               the app (start, map, gap views)
assets/css/styles.css    look and feel (light and dark)
assets/js/content.js     words for start, map and gap pages
assets/js/content2.js    words for journeys, money, roadmap, glossary, references
assets/js/content3.js    words for Your part (role to-do lists), the guided tour, roadmap decisions, print summary
assets/js/app.js         interactions
tools/build.py           bundles everything into dist/
docs/references.md       checked legal and policy references
PLAN.md                  the plan and decisions
```

## Notes

The province, the city, the people and all numbers are fictional examples. This is not an official DOH publication.

Everything about AI is labelled **Future**: it shows what could happen, not tools in use or measured results. The role to-do lists are suggested first steps, not official guidance, and describe costs in words rather than invented peso amounts.
