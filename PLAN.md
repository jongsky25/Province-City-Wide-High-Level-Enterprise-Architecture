# Plan: Connected Province/City-Wide Health System — Interactive Enterprise Architecture

Status: **Draft for review** (planning phase, no pages built yet)

---

## 1. Goal

Build a set of dynamic, clickable HTML pages that explain the **ideal high-level enterprise architecture (EA)** of a Philippine **Province-wide / City-wide Health System (P/CWHS)** as envisioned by the **Universal Health Care (UHC) Act (RA 11223)**. The pages should:

- Explain in **plain language** what the architecture is, and what it is **not**
- Show how the parts **work together**, through clicking, toggling and step-by-step "play" scenarios
- Put forward one idea throughout: **"Connected, not Integrated"**
- Show how **AI** supports each part, with safeguards

## 2. The core idea: "Connected, not Integrated"

| | "Integrated" (what we avoid) | "Connected" (what we want) |
|---|---|---|
| Picture | One big system everyone must move into | Many systems that can talk to each other |
| Ownership | Central owner controls everything | Each LGU, hospital or RHU keeps its own system and data stewardship |
| Change | Replace what works, one vendor | Keep what works and plug it in through shared standards |
| Failure | One outage stops everyone | One outage stays local; the rest keep running |
| Analogy | One giant mall that every store must move into | Roads, bridges and traffic rules that connect independent towns |

What makes "connected" work is a thin **shared layer**: common IDs, registries, data standards (e.g. HL7 FHIR / PH Core), a health information exchange, consent rules and governance agreements. **Services, money and people work as one network. The software does not have to be one system.**

Note: the UHC Act uses the word *integration* (integrating local health systems into P/CWHS). The pages will explain that the Act's **management and financial integration** (one network, one Special Health Fund, one health board) is best served by **technical connection** rather than one monolithic IT system. This framing is our interpretation and will be labelled that way.

## 3. Research scope (study phase)

Primary legal and policy anchors to study and cite. Exact issuance numbers and section references will be checked before they are used on the pages:

| Reference | What we take from it |
|---|---|
| **RA 11223 – UHC Act** and its **IRR** | P/CWHS (Sec. 19), Health Care Provider Networks, primary care and gatekeeping, Special Health Fund (Sec. 20), Health Information Systems (Sec. 36), PhilHealth population coverage, HTA, health promotion |
| **DOH AO on LHS integration into P/CWHS** (and related UHC AOs) | Management and technical integration, local health boards, LHS maturity levels |
| **RA 7160 – Local Government Code** + **Mandanas-Garcia ruling / EO 138 (devolution)** | Roles of provinces, cities, municipalities and barangays; devolved health functions |
| **RA 10173 – Data Privacy Act** + NPC issuances | Consent, lawful processing, data sharing agreements, security |
| **RA 11055 – PhilSys Act** | Identity foundation for a unique person/patient ID |
| **DOH–DICT–PhilHealth eHealth issuances** (PHIE, Philippine eHealth Strategic Framework, EMR/standards circulars) | Health information exchange, interoperability standards, registries |
| **PhilHealth circulars** (Konsulta, eClaims, contracting HCPNs) | Financing flows, provider payment |
| **Other DOH programs** (FHSIS, NHFR, iClinicSys, supply chain) | Existing national systems to connect to |
| **WHO health system building blocks / Digital Health Atlas** | Framework to check completeness |
| **National AI policy (DTI/DICT roadmaps), WHO guidance on AI for health** | Responsible AI guardrails |

Output of this phase: `content/references.json` with citations, plus short plain-language summaries.

## 4. Draft architecture (content model)

Layered view, from people at the top to shared foundations at the bottom:

1. **People & Communities**: citizens/families, Barangay Health Workers, community groups
2. **Service Delivery Network (HCPN)**: Barangay Health Stations → RHUs/Health Centers (primary care provider, gatekeeper) → infirmaries / district hospitals → provincial/city hospital → DOH apex/end-referral hospitals; public and private
3. **Governance & Management**: Provincial/City Health Board, PHO/CHO, network management office, LCEs, DOH CHD
4. **Financing**: Special Health Fund (pooled PhilHealth, LGU, DOH and other funds), provider payment (Konsulta, case rates, capitation), budget and audit
5. **Support Systems**: health workforce, medicines and supply chain, laboratory/diagnostics network, transport and referral logistics, regulation
6. **Connective Digital Layer** (the "connected" layer): person ID, client, provider and facility registries, terminology, health information exchange, referral and e-prescription services, consent manager, shared analytics / data warehouse, national systems (PhilHealth, FHSIS, NHFR)
7. **AI Layer** (cross-cutting): applies to each layer above, behind privacy and human-oversight guardrails

Each component card answers the same questions:
- *What is it?* (one sentence, layman)
- *Why does it matter to a family?*
- *Who owns or runs it?*
- *What does it connect to?* (clickable links that highlight related components)
- *Legal basis* (UHC Act section or issuance)
- *How AI helps* + *guardrail*
- *What it is NOT*

## 5. Pages and interactions

Static HTML + CSS + vanilla JavaScript. No build step. All content lives in JSON so non-developers can edit it.

| # | Page | Interaction |
|---|---|---|
| 1 | **Start here: What is this?** | Plain-language intro; flip cards for **"It IS / It is NOT"** (e.g. *It is not one software*, *not a takeover of LGU hospitals*, *not just IT*) |
| 2 | **Connected vs Integrated** | Toggle animation: "spaghetti" (point-to-point) → "one big system" → "connected via shared layer"; simulate an outage to show resilience |
| 3 | **The Architecture Map** | Layered clickable diagram; click a component to open a side panel; hovering highlights its connections; filter by lens (*services, money, data, people, AI*) |
| 4 | **Play a Patient Journey** | Step-through stories with animated flows of **care, data and money**. Draft scenarios: pregnant mother (maternal care and referral), hypertension/diabetes (primary care continuity), emergency referral, TB case, dengue outbreak (province-level surveillance) |
| 5 | **Follow the Money** | Interactive Special Health Fund: sources → pool → uses; sliders show trade-offs (simplified, illustrative) |
| 6 | **AI as the Enabler** | Grid of AI use cases by layer (triage support, referral matching, outbreak early warning, stock forecasting, claims checks, translation into Filipino/local languages, dashboards in plain language) with **guardrails**: human-in-the-loop, privacy, bias, explainability |
| 7 | **Roadmap / Maturity** | Stepper from "Fragmented" → "Connected" → "Learning health system", with what each LGU does per stage |
| 8 | **Glossary & References** | Searchable glossary (HCPN, SHF, PCPN, PHIE, FHIR...) and cited sources |

Cross-cutting:
- Mobile-friendly, works offline once loaded, accessible (keyboard, contrast)
- Optional **English / Filipino** toggle
- Clear labels separating **"what the law says"** from **"our recommended design"**
- Deployable on GitHub Pages; can also be published as a shareable page

## 6. Proposed repo structure

```
/index.html            Start here
/connected.html        Connected vs Integrated
/map.html              Architecture map
/journeys.html         Play a patient journey
/money.html            Follow the money
/ai.html               AI enablers
/roadmap.html          Maturity roadmap
/glossary.html         Glossary & references
/assets/css, /assets/js
/content/*.json        components, links, journeys, ai-use-cases, glossary, references
```

## 7. Phases

1. **Plan** (this document) → agree with the user on the open questions
2. **Research**: confirm legal references and section numbers; build `references.json`
3. **Content model**: write the components, links and journey JSON in plain language
4. **Prototype**: Start page + Architecture Map + one journey (vertical slice) for review
5. **Build out**: remaining pages, Filipino translations if wanted
6. **Review & polish**: accessibility, mobile, fact-check pass, publish

## 8. Open questions for the user

1. **Primary audience**: Local Chief Executives and health boards? Health workers? General public? IT/EA practitioners? (This sets the depth.)
2. **Language**: English only, Filipino, Taglish, or a toggle?
3. **Setting**: a generic "Province of Bagong Pag-asa" plus a generic highly urbanized city, or a real province/city?
4. **AI stance**: realistic near-term (what an LGU can do in 1 to 3 years) vs. aspirational long-term, or both side by side?
5. **Hosting**: GitHub Pages, a shareable claude.ai page, offline zip for workshops, or all three?
6. **Any existing materials** (DOH slides, LGU EA documents, local system names) you want reflected?
