# Connected Province Health

A plain-language, playable guide to the ideal Philippine **Province-wide / City-wide Health System** under the Universal Health Care Act (RA 11223). It is built on the idea of **"Connected, not Integrated"** and shows AI as the tool that helps every town close its gaps and get ahead.

It is written for families, health workers, mayors, governors and Health Boards. The DOH Health Sector Enterprise Architecture is the backbone, available in a "technical view".

## What's in it (first working version)

| Page | What you can do |
|---|---|
| **Start here** | Meet the people (Rosa, Lorna, Gov. Santos...), flip the "It is not / It is" cards, and break a system in the *Connected vs Integrated* simulator |
| **Explore the province** | Tap places on an illustrated province; show how care, money and information move; see AI helpers and who builds what; zoom from country to clinic; follow Rosa's journey; open the DOH technical view |
| **Close the gap with AI** | Pick a city, an average town or a remote island town; race the usual path against the AI path; use the equalizer slider; open nine gap cards |

Still to come: Journeys, Follow the Money, Roadmap, Glossary.

## Open it

- **Online / GitHub Pages**: serve the repository root (`index.html`). In GitHub: *Settings → Pages → Deploy from branch*.
- **Offline (workshops, USB)**: `dist/connected-province-health.html` is one self-contained file. Copy it anywhere and double-click it. Without internet it uses system fonts.
- **Edit content**: all text lives in `assets/js/content.js`. After editing, run `python3 tools/build.py` to refresh the files in `dist/`.

## Files

```
index.html               the app (start, map, gap views)
assets/css/styles.css    look and feel (light and dark)
assets/js/content.js     all words, places, people, gaps, illustrative numbers
assets/js/app.js         interactions
tools/build.py           bundles everything into dist/
docs/references.md       checked legal and policy references
PLAN.md                  the plan and decisions
```

## Notes

The province, the city, the people and all numbers are fictional examples. This is not an official DOH publication.
