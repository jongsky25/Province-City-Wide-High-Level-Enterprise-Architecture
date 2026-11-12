# Plan: Connected Province/City-Wide Health System — Interactive Enterprise Architecture

Status: **Draft for review** (planning phase, no pages built yet)

---

## 1. Goal

Build a set of dynamic, clickable HTML pages that explain the **ideal high-level enterprise architecture (EA)** of a Philippine **Province-wide / City-wide Health System (P/CWHS)** as envisioned by the **Universal Health Care (UHC) Act (RA 11223)**, and that sits inside the **DOH Health Sector Enterprise Architecture (HSEA)**. The pages should:

- Explain in **plain language** what the architecture is, and what it is **not**
- Show how the parts **work together**, through clicking, zooming, toggling and step-by-step "play" scenarios
- Put forward one idea throughout: **"Connected, not Integrated"**
- Show **AI as a gap equalizer**: not something added once everything else is in place, but a way to **close existing gaps and move ahead** of the traditional path (section 4)

## 2. The core idea: "Connected, not Integrated"

| | "Integrated" (what we avoid) | "Connected" (what we want) |
|---|---|---|
| Picture | One big system everyone must move into | Many systems that can talk to each other |
| Ownership | Central owner controls everything | Each LGU, hospital or RHU keeps its own system and data stewardship |
| Change | Replace what works, one vendor | Keep what works and plug it in through shared standards |
| Failure | One outage stops everyone | One outage stays local; the rest keep running |
| Analogy | One giant mall that every store must move into | Roads, bridges and traffic rules that connect independent towns |

What makes "connected" work is a thin **shared layer**. The DOH HSEA material names it: the **Interoperability Layer**, the **registries** (client, facility, health worker, product catalogue, terminology), and standards (HL7 FHIR, PH Core, ICD-10/11, SNOMED, WHO SMART Guidelines). The DOH builds these as **national investments**. **Point-of-service systems** (EMR, HIS, lab, pharmacy, logistics, mobile) are **deployed by LGUs and other entities** and plug in. That split is the "connected" model in the DOH's own architecture.

Note: the UHC Act uses the word *integration* (integrating local health systems into P/CWHS). The pages will explain that the Act's **management and financial integration** (one network, one Special Health Fund, one health board) is best served by **technical connection** rather than one monolithic IT system. This framing is our interpretation and will be labelled that way.

## 3. Alignment with the DOH Health Sector Enterprise Architecture (user-provided material)

Source: *"Understanding the Health Sector Enterprise Architecture"*, DOH Knowledge Management and Information Technology Service (KMITS) presentation, shared by the user.

### 3.1 What the deck establishes

- **DOH EA reference models**: Business, Application, Data and Technical, plus a Performance reference model (outputs, data quality, timeliness, response time). The layers are hierarchical and depend on each other.
- **Four levels of abstraction**, compared to zooming a map:

  | Level | Map zoom | Role |
  |---|---|---|
  | Strategy | 2 km view | Governs subordinate architecture |
  | Portfolio | 100 m view | Governs subordinate architecture |
  | Projects | 5 m view | Governs projects and design |
  | Solution delivery / third parties | Street level | Supports procurement |

- **HSEA (strategy level)**, four tiers:
  1. **UHC Agenda**: healthy schools, workplaces and communities · functional primary care system · quality and efficient hospitals · information technology transformation · strong health institutions and governance
  2. **Health Sector Processes**, made up of 12 capabilities:
     - *Core*: 1 Vision & Strategy Development · 2 Local Health System Management · 3 Primary Care & Facility Management · 4 Population-based Health Services · 5 Individual-based Health Services · 6 Health Financing
     - *Enabling*: 7 Good Governance & Accountability · 8 HR for Health · 9 Health Information Management · 10 Health Services & Goods Regulation · 11 Asset & Supply Chain · 12 Futures Thinking
  3. **Digital Health Ecosystem**: an *Integration & Data Analysis* hub linking payer, public health/policy, HR, providers/facilities, patient, regulatory/M&E, asset/supply chain and research info systems
  4. **Health and health-related data**: services/utilization, regulatory compliance, commodities/assets, research, financing, public health, workforce, patient data, other (mental health, emerging threats)
- **OpenHIE application architecture (portfolio level)**: this is the DOH's main application architecture. It has business domain services (logistics MIS, shared health record, HMIS, finance and insurance), registry services, and an interoperability layer (authentication, interlinking, entity mapping). Point-of-service systems sit underneath.
- **HIE pilot in Aklan (project level)**: business use cases (referral, immunization, reporting, nutrition, hypertension, diabetes). It uses national registries (PhilSys, NHFR, NHWR, terminology, product catalog, NHDR/OLAP) with **local registries** under them (citizen, facility, health worker, Shared Health Record/OLTP). EMR and HIS connect through FHIR/PH Core, and an executive dashboard sits on top.
- **HSRP digital health application architecture (project level)**: authoritative registries; interoperability services (routing, orchestration, validation, business rules, mediation, authentication, APIs); SHR and NHDR; and endpoints in four groups: national systems (GAMOT, PIDSR, ILIMS, disease registries, ERP/eLMIS), OHCC (IPNSIR), HCPN systems (HIS, EMR) and independent systems.

### 3.2 How this project uses it

The **Province/City-wide Health System EA** is the **local version** of the HSEA. It sits mostly at the **portfolio/project level** for one LGU and plugs into the national interoperability layer and registries. Changes to the plan:

- The **architecture map** (page 3) uses the **HSEA's four tiers and 12 capabilities** as its backbone, so LGU leaders see the same structure DOH uses. Each element gets a plain-language explanation of what it means *locally*.
- A **"Zoom" control** reuses the deck's map comparison. It moves from the national HSEA (2 km) → province/city portfolio (100 m) → one local project such as the referral flow (5 m) → one RHU's EMR (street level).
- A **"Who invests in what" toggle** shows the national-vs-local split: DOH builds the interoperability layer and national registries; the province/city runs local registries, its own systems and governance; facilities run point-of-service tools.
- The **Aklan HIE pilot** is cited in the references as a real-world example. The scenarios themselves stay in the **fictional province and city**.
- Pages will **cite** the DOH material as a source but will **not** use DOH logos or branding, and will not present themselves as an official DOH publication.

## 4. AI as the gap equalizer: catch up *and* get ahead (new core theme)

### 4.1 The problem with the traditional path

Traditional EA roadmaps assume a fixed order: *paper → digitize → connect → analyze → only then use AI*. Each step takes years and depends on the one before, so LGUs that start behind stay behind. The usual gaps: no EMR, too few health workers, poor data quality, no data analysts, weak connectivity, a mix of different systems. On this path the **desired state keeps moving away** and lagging LGUs never reach it.

### 4.2 The leapfrog path

Use AI **at the point where the gap is**, in parallel with building foundations, instead of waiting for them. A familiar comparison: mobile phones skipped landlines, and e-wallets reached people far from any bank branch. Examples per gap (to be refined and fact-checked):

| Gap today | Traditional fix (slow) | AI-leveraged fix (fast) | Gets us *ahead* by... |
|---|---|---|---|
| Records still on paper | Encode everything, roll out EMRs everywhere first | AI reads paper forms/logbooks (OCR + extraction) and voice capture on phones, turned into standard (FHIR) records | Historical data becomes usable from day one |
| Too few doctors/nurses in remote areas | Hire and train for years | AI decision support built on WHO SMART Guidelines for midwives and BHWs; AI scribes free up clinician time | Consistent, guideline-based care everywhere, not just in cities |
| Messy, duplicate patient records | Manual clean-up; wait for full PhilSys coverage | AI record matching (entity resolution) for the local client registry; AI data-quality checks at entry | A cleaner registry than manual processes would ever produce |
| Local terms don't match standards | Train coders on ICD/SNOMED | AI maps local terms to ICD-10/11 and SNOMED, with human confirmation | Faster connection to the interoperability layer |
| No data analysts at the PHO/CHO | Hire and train analysts | Plain-language AI dashboards: "ask a question, get a chart" | Leaders act on data weekly instead of yearly |
| Outbreaks detected late | Paper reports moving up the chain | AI early warning from consults, lab results, pharmacy sales and weather | Prevent instead of react (supports capability **12: Futures Thinking**) |
| Medicine stock-outs | Quarterly manual inventory | AI demand forecasting across the network | Supplies shared across facilities before they run out |
| Claims denied, slow reimbursement | Manual claim review | AI pre-checks before submission to PhilHealth | Faster cash flow into the Special Health Fund |
| Many languages, low health literacy | Printed materials | AI translation and conversational health info in local languages | Health promotion reaches every barangay |

### 4.3 Honest boundaries (shown on the page)

- **AI rides on the connected layer.** Without registries, standards and consent it becomes isolated pilots. So we build foundations *and* deploy AI together, not one after the other.
- **AI does not replace health workers or governance.** It extends what they can do. A human stays in the loop for clinical and financial decisions.
- **Bad data in, bad decisions out.** That is why data-quality AI comes first.
- **Privacy and fairness**: Data Privacy Act compliance, bias checks, and explainable outputs.
- **Shared AI services**: a poorer municipality uses AI services hosted by the province or nationally, so it does not need its own. AI becomes an equalizer, not one more advantage for richer LGUs.
- All timelines and gap figures on the pages are **illustrative** and labelled that way.

### 4.4 Interactive design: "Close the Gap" page

- **Pick an LGU profile**: e.g. *well-resourced highly urbanized city*, *average municipality*, *remote island municipality (GIDA)*
- **Gap radar**: maturity on the 12 HSEA capabilities (illustrative). Current state vs desired state.
- **Two-path race**: press *Play* to animate the **traditional path** (step by step, the gap stays open) against the **AI-leveraged path** (gaps close in parallel, some capabilities go past the target)
- **Click any gap** to see the AI tool that closes it, near-term (1–3 years) vs future vision, its safeguards, and which connected-layer pieces it needs
- **Equalizer view**: one slider moves AI services from "each LGU on its own" to "shared provincial/national AI services". The gap between the rich city and the GIDA municipality narrows.

## 5. Research scope (study phase)

Primary legal and policy anchors to study and cite. Exact issuance numbers and section references will be checked before they are used on the pages:

| Reference | What we take from it |
|---|---|
| **RA 11223 – UHC Act** and its **IRR** | P/CWHS (Sec. 19), Health Care Provider Networks, primary care and gatekeeping, Special Health Fund (Sec. 20), Health Information Systems (Sec. 36), PhilHealth population coverage, HTA, health promotion |
| **DOH Health Sector Enterprise Architecture** (KMITS deck, user-provided) | Structure for the map; national-vs-local investment split; OpenHIE components |
| **DOH AO on LHS integration into P/CWHS** (and related UHC AOs) | Management and technical integration, local health boards, LHS maturity levels |
| **RA 7160 – Local Government Code** + **Mandanas-Garcia ruling / EO 138 (devolution)** | Roles of provinces, cities, municipalities and barangays; devolved health functions |
| **RA 10173 – Data Privacy Act** + NPC issuances | Consent, lawful processing, data sharing agreements, security |
| **RA 11055 – PhilSys Act** | Identity foundation for a unique person/patient ID |
| **DOH–DICT–PhilHealth eHealth issuances** (PHIE, Philippine eHealth Strategic Framework, EMR/standards circulars, PH Core FHIR IG) | Health information exchange, interoperability standards, registries |
| **PhilHealth circulars** (Konsulta, eClaims, contracting HCPNs) | Financing flows, provider payment |
| **Existing national systems** (FHSIS, NHFR, NHWR, PIDSR, GAMOT, eLMIS, NHDR) | What the local architecture connects to |
| **OpenHIE framework; WHO SMART Guidelines; WHO building blocks** | Reference architecture, guideline-based decision support, completeness check |
| **National AI policy (DTI/DICT roadmaps), WHO guidance on AI for health** | Responsible AI guardrails |

Output of this phase: `content/references.json` with citations, plus short plain-language summaries.

## 6. Content model

Each element on the map (HSEA tier, capability, system, registry, actor) uses one card format:
- *What is it?* (one sentence, layman)
- *Why does it matter to a family?*
- *Who owns or runs it locally?* and *national or local investment?*
- *What does it connect to?* (clickable links that highlight related elements)
- *Legal basis* (UHC Act section or issuance)
- *Gap today and how AI closes it* (near-term / future) + *safeguard*
- *What it is NOT*

Local view layered onto the HSEA:
- **People & Communities**: families, Barangay Health Workers
- **Service Delivery Network (HCPN)**: BHS → RHU/health center (primary care, gatekeeper) → infirmary/district hospital → provincial/city hospital → DOH apex hospitals; public and private
- **Governance**: Provincial/City Health Board, PHO/CHO, network management office, DOH CHD
- **Financing**: Special Health Fund, PhilHealth (Konsulta, case rates), budget and audit
- **Connected digital layer**: local registries + national registries + interoperability layer + point-of-service systems + dashboards
- **AI**: cross-cutting, framed as the gap equalizer

## 7. Pages and interactions

Static HTML + CSS + vanilla JavaScript. No build step, no external dependencies (works offline). All content lives in JSON/JS data files so non-developers can edit it.

| # | Page | Interaction |
|---|---|---|
| 1 | **Start here: What is this?** | Plain-language intro; flip cards for **"It IS / It is NOT"** |
| 2 | **Connected vs Integrated** | Toggle animation: "spaghetti" → "one big system" → "connected via shared layer"; simulate an outage to show resilience |
| 3 | **The Architecture Map** | HSEA-based clickable diagram with the **Zoom** control (national → province → project → facility); **"Who invests in what"** toggle; lens filters (*services, money, data, people, AI*) |
| 4 | **Close the Gap with AI** | Section 4.4: LGU profiles, gap radar, two-path race, equalizer slider |
| 5 | **Play a Patient Journey** | Step-through stories with animated flows of **care, data and money**, plus *"without AI / with AI"* toggles. Scenarios: pregnant mother, hypertension/diabetes, emergency referral, TB, dengue outbreak |
| 6 | **Follow the Money** | Special Health Fund: sources → pool → uses; sliders (simplified, illustrative) |
| 7 | **Roadmap** | Traditional sequential roadmap vs **leapfrog roadmap** where foundations and AI are built in parallel |
| 8 | **Glossary & References** | Searchable glossary (HCPN, SHF, OpenHIE, interoperability layer, FHIR, SMART Guidelines, ...) and cited sources |

Cross-cutting:
- Mobile-friendly, works offline, accessible (keyboard, contrast)
- English only, written for non-technical readers
- Clear labels separating **"what the law/DOH says"**, **"our recommended design"** and **"illustrative numbers"**

## 8. Proposed repo structure

```
/index.html            Start here
/connected.html        Connected vs Integrated
/map.html              Architecture map (HSEA-based, zoomable)
/gap.html              Close the Gap with AI
/journeys.html         Play a patient journey
/money.html            Follow the money
/roadmap.html          Traditional vs leapfrog roadmap
/glossary.html         Glossary & references
/assets/css, /assets/js
/content/*.js          components, links, capabilities, gaps, journeys, glossary, references
```

(Content files are `.js` rather than `.json` so the pages also work when opened directly from disk, without a local server.)

## 9. Phases

1. **Plan** (this document) → decisions recorded in section 10
2. **Research**: confirm legal references and section numbers; build the references file
3. **Content model**: write capabilities, components, gaps/AI cases and journeys in plain language
4. **Prototype**: Start page + Architecture Map + Close the Gap page (first working version) for review
5. **Build out**: remaining pages
6. **Review & polish**: accessibility, mobile, fact-check pass; publish to GitHub Pages, as a claude.ai link and as an offline zip

## 10. Decisions (answered by the user)

| Topic | Decision | What it means for the build |
|---|---|---|
| **Audience** | LGU leaders & health boards, health workers, general public | Plain language first. No IT/EA deep-dive layer. Technical terms (FHIR, HIE) appear only in the glossary or as "what's behind this" footnotes |
| **Language** | English only | No language toggle; keep words simple and short |
| **Setting** | Generic fictional | A made-up province (with component cities and municipalities) plus one highly urbanized city |
| **AI** | Near-term and future side by side; **AI as gap equalizer that helps LGUs leapfrog** | Every AI case shows "1–3 years" vs "future vision", the gap it closes, and its safeguards; a dedicated "Close the Gap" page |
| **Hosting** | GitHub Pages, shareable claude.ai link, offline zip | Self-contained static files, relative paths, no CDN dependency |
| **Materials** | DOH HSEA deck (KMITS) provided | The map follows the HSEA structure and the OpenHIE national/local split (section 3) |
