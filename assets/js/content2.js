/* Content for Journeys, Money, Roadmap and Glossary.
   All numbers are ILLUSTRATIVE and are labelled that way on the pages. */
(function (CH) {

  CH.journeys = [
    { id: "rosa", person: "Aling Rosa", initials: "R", color: "var(--coral)", title: "A safe birth",
      intro: "Rosa is 7 months pregnant and lives 25 minutes by tricycle from the health center.",
      metrics: [
        { label: "Trips the family makes", today: [0, 1, 1, 1, 2], conn: [0, 1, 0, 1, 0] },
        { label: "Days lost", today: [0, 1, 1, 2, 1], conn: [0, 0, 0, 0, 0] },
        { label: "Out-of-pocket cost", unit: "₱", today: [0, 150, 1500, 3500, 300], conn: [0, 50, 0, 0, 0] }
      ],
      steps: [
        { where: "Home", title: "Check-ups", today: "No one tracks Rosa's check-ups. She misses two, and nobody notices.",
          conn: "Ate Lorna's phone app reminds Rosa and flags the missed visits.", ai: "The app sees a high blood pressure reading and says: go to the health station today." },
        { where: "Health station", title: "The midwife", today: "Midwife Ana can't find Rosa's notebook. She starts from zero and sends Rosa to the health center.",
          conn: "Ana opens Rosa's record with her one health ID. Every past check-up is there.", ai: "AI had already turned Rosa's old paper notebook into her digital record." },
        { where: "Health center", title: "The referral", today: "Dr. Cruz writes a paper referral. The family looks for a ride and pays for it.",
          conn: "The referral and her history are sent ahead. The network sends the ambulance.", ai: "The guide based on WHO guidelines suggests the referral. Dr. Cruz confirms it." },
        { where: "Provincial hospital", title: "The birth", today: "No history. Tests are done again. Rosa waits in a crowded emergency room.",
          conn: "Doc Mike is expecting her. No repeated tests. She delivers safely.", ai: "Her urgent lab result goes to the top of Doc Mike's list." },
        { where: "Back home", title: "After the birth", today: "The health center doesn't know she gave birth. The baby's vaccines start late.",
          conn: "A discharge summary goes back to the health center. Lorna visits mother and baby within 3 days.", ai: "Vaccine reminders for the baby, in Rosa's own language." }
      ],
      lesson: "When information travels ahead of Rosa, she makes fewer trips, spends less, and nobody starts from zero." },

    { id: "ben", person: "Mang Ben", initials: "B", color: "var(--sun)", title: "Blood pressure under control",
      intro: "Ben is a 58-year-old farmer with high blood pressure. He feels fine, so he often skips his pills.",
      metrics: [
        { label: "Trips", today: [0, 0, 1, 2], conn: [0, 0, 1, 0] },
        { label: "Days lost", today: [0, 0, 1, 10], conn: [0, 0, 0, 0] },
        { label: "Out-of-pocket cost", unit: "₱", today: [0, 0, 600, 25000], conn: [0, 0, 0, 0] }
      ],
      steps: [
        { where: "Home", title: "Feeling fine", today: "Ben feels fine and stops his pills. Nobody notices.",
          conn: "A monthly text reminds him. Lorna checks his blood pressure on her rounds.", ai: "Flags that Ben hasn't picked up his pills in six weeks." },
        { where: "Medicine warehouse", title: "The stock", today: "Stock is counted every quarter. Ben's town runs out of his pills while another town has extra.",
          conn: "Every clinic's stock is visible. Pills move to Ben's town before they run out.", ai: "The forecast saw the shortage coming a month early." },
        { where: "Health center", title: "The visit", today: "No pills at the center. He's told to buy them at a private pharmacy, so he skips them.",
          conn: "The pills are there. Nurse Joy adjusts his dose.", ai: "A risk score shows Ben is high-risk, so Joy calls him in." },
        { where: "Provincial hospital", title: "Six months later", today: "Ben has a stroke and spends 10 days in the hospital.",
          conn: "His blood pressure is under control. No stroke, no hospital stay.", ai: "The scoreboard tracks how many people in each town have their blood pressure under control." }
      ],
      lesson: "Keeping medicine on the shelf and following people up costs far less than a stroke." },

    { id: "dodong", person: "Kuya Dodong", initials: "D", color: "var(--sky)", title: "A night-time emergency",
      intro: "Dodong, a tricycle driver, is hurt in a crash on the highway at 10 pm.",
      metrics: [
        { label: "Hours lost", today: [1, 3, 1.5, 2], conn: [0.3, 0.3, 0, 0.3] },
        { label: "Phone calls to find a bed", today: [3, 8, 2, 0], conn: [1, 1, 0, 0] },
        { label: "Tests repeated", today: [0, 0, 1, 2], conn: [0, 0, 0, 0] }
      ],
      steps: [
        { where: "Highway", title: "The crash", today: "Bystanders call three different numbers. The ambulance comes from a far town.",
          conn: "One number. The nearest free ambulance is sent.", ai: "The dispatch helper finds the nearest free ambulance." },
        { where: "District hospital", title: "First stop", today: "He is stabilized, but there is no CT scanner. Staff phone around for a hospital that will accept him.",
          conn: "The referral board shows which hospital has a scanner and a free bed. The referral is sent with his details.", ai: "Suggests the best hospital based on beds, distance and specialists." },
        { where: "Provincial hospital", title: "Full", today: "The hospital is full. He is turned away and driven on to the city.",
          conn: "Skipped, because the board already showed it was full.", ai: "Predicted the emergency room would be full tonight." },
        { where: "Mabuhay City hospital", title: "Across the border", today: "He arrives with no records. Tests are repeated. The province and city systems don't talk.",
          conn: "The city hospital sees his record from the province. Surgery starts within the hour.", ai: "His scan is read first because it is urgent." }
      ],
      lesson: "In an emergency, minutes matter. Province and city sharing one road and one bed board saves lives." },

    { id: "isay", person: "Lola Isay", initials: "I", color: "var(--teal)", title: "Finishing TB treatment",
      intro: "Lola Isay, 67, has had a cough for a month. She thinks it's just old age.",
      metrics: [
        { label: "Weeks lost", today: [4, 2, 8, 0], conn: [0.5, 0.3, 0, 0] },
        { label: "People she may infect (estimate)", today: [1, 1, 2, 0], conn: [0, 0, 0, 0] }
      ],
      steps: [
        { where: "Home", title: "The cough", today: "She keeps coughing at home for weeks.",
          conn: "Lorna asks the screening questions on her app. Lola Isay is flagged for a TB test.", ai: "A mobile x-ray van uses AI to read chest x-rays on the spot." },
        { where: "Laboratory", title: "The result", today: "Her test result is written on paper and sits at the lab for two weeks.",
          conn: "The result goes straight to the health center and into her record.", ai: "A positive result sends an alert to Nurse Joy right away." },
        { where: "Health center", title: "Six months of medicine", today: "She starts treatment but stops at month 2, when she feels better.",
          conn: "Daily reminders and video check-ins. Lorna visits if she misses doses.", ai: "Predicts who may stop treatment early, so the team visits them first." },
        { where: "Capitol", title: "The Health Board", today: "TB numbers reach the Board months late.",
          conn: "The scoreboard shows treatment success by barangay, every week.", ai: "The Board asks: which barangays have the most people who stopped treatment?" }
      ],
      lesson: "Finding TB early and helping people finish treatment protects the whole barangay, not just Lola Isay." },

    { id: "dengue", person: "Dr. Ramos", initials: "DR", color: "var(--ai)", title: "A dengue outbreak",
      intro: "Dr. Ramos is the Provincial Health Officer. The rainy season has started.",
      metrics: [
        { label: "Dengue cases (estimate)", today: [40, 300, 120, 80, 60], conn: [40, 60, 20, 10, 0] },
        { label: "Days lost before acting", today: [7, 14, 5, 3, 14], conn: [1, 2, 0, 0, 1] }
      ],
      steps: [
        { where: "Barangays", title: "First fevers", today: "Fever cases rise in three barangays. Nobody connects the dots.",
          conn: "Clinic visits, lab tests and pharmacy sales show the rise within days.", ai: "Early warning combines these with rain data and raises an alert." },
        { where: "Capitol", title: "The alert", today: "Weekly paper reports arrive. The rise is noticed in week 3.",
          conn: "Dr. Ramos gets an alert on day 3, with a map of where the cases are.", ai: "The forecast shows which barangays are likely next." },
        { where: "Medicine warehouse", title: "Supplies", today: "Test kits and IV fluids run out at the hospitals.",
          conn: "Supplies are moved to the hospitals before the peak.", ai: "Estimates how many kits each hospital will need." },
        { where: "Hospitals", title: "Beds", today: "The provincial hospital overflows. Patients lie in the hallways.",
          conn: "Beds are shared across the network, including Mabuhay City.", ai: "A daily bed forecast for each hospital." },
        { where: "Special Health Fund", title: "Money", today: "Emergency money takes weeks to release from separate accounts.",
          conn: "The Health Board moves money from the pooled fund in one meeting.", ai: "Shows the cost of each option so the Board can decide fast." }
      ],
      lesson: "A connected province sees an outbreak coming and acts in days, not weeks." }
  ];

  /* Follow the money (₱ millions per year, illustrative, for a province of about 800,000 people) */
  CH.money = {
    sources: [
      { id: "ph", name: "PhilHealth payments", note: "for Konsulta, hospital stays and other care", value: 220, color: "var(--sky)" },
      { id: "lgu", name: "Province and town budgets", note: "local health budgets", value: 180, color: "var(--teal)" },
      { id: "doh", name: "DOH support", note: "grants, programs, medicines", value: 90, color: "var(--ink)" },
      { id: "other", name: "Other sources", note: "donations, partners", value: 20, color: "var(--muted)" }
    ],
    uses: [
      { id: "pop", name: "Community health programs", note: "vaccines, outbreak control, health education", weight: 20, unitCost: 0.0004, unitLabel: "people reached" },
      { id: "care", name: "Care for patients", note: "check-ups, medicines, hospital care", weight: 40, unitCost: 0.0012, unitLabel: "patient visits" },
      { id: "staff", name: "Health workers", note: "added nurses, midwives, doctors and incentives", weight: 20, unitCost: 0.45, unitLabel: "health workers for a year" },
      { id: "build", name: "Buildings and equipment", note: "health stations, hospital equipment", weight: 12, unitCost: 6, unitLabel: "health stations upgraded" },
      { id: "run", name: "Running the system", note: "including the shared road and AI services", weight: 8, unitCost: 0.12, unitLabel: "facilities connected, with AI tools" }
    ],
    stuckSeparate: 0.15, stuckPooled: 0.04,
    returnedNoAI: 0.18, returnedAI: 0.05
  };

  CH.roadmap = {
    years: 8,
    tracks: [
      { name: "Health Board, agreements and the Special Health Fund", kind: "people", usual: [0, 1.5], leap: [0, 1] },
      { name: "Clinic apps in every facility", kind: "found", usual: [1, 4.5], leap: [0.5, 3] },
      { name: "One health ID and shared local lists", kind: "found", usual: [3, 5.5], leap: [0.5, 2] },
      { name: "Connect every facility to the shared road", kind: "found", usual: [4.5, 6.5], leap: [1, 3] },
      { name: "Province scoreboard", kind: "found", usual: [6, 7.5], leap: [1, 2] },
      { name: "Train people to use data", kind: "people", usual: [6, 8], leap: [0.5, 2.5] },
      { name: "AI reads paper records", kind: "ai", usual: [7.2, 8], leap: [0, 1.5] },
      { name: "AI guideline helper for health workers", kind: "ai", usual: null, leap: [1, 3] },
      { name: "AI forecasting and early warning", kind: "ai", usual: null, leap: [2, 4] },
      { name: "A health system that learns and improves every year", kind: "goal", usual: null, leap: [3.5, 8] }
    ],
    stages: [
      { name: "On paper, on its own", sign: "Reports are typed by hand. Each town keeps its own records. Referrals go by paper slip.",
        leader: "Convene the Health Board. Sign the agreements between towns, the city and private clinics.",
        office: "List every facility and health worker. Agree on the shared rules.",
        clinics: "Keep working. Start phone apps where there is nothing yet.",
        ai: "AI reads paper records. Text reminders in local languages." },
      { name: "Connecting", sign: "One health ID is used in the first towns. Some referrals are sent ahead electronically.",
        leader: "Fund the shared road and AI services from the Special Health Fund, as shared services for all towns.",
        office: "Connect the first facilities to the shared road. Clean up the patient lists.",
        clinics: "Use one health ID. Send referrals ahead.",
        ai: "AI matches duplicate records. Guideline helpers are tested in pilot towns." },
      { name: "Connected", sign: "All public and most private facilities share information. The scoreboard is live.",
        leader: "Use the scoreboard at every Health Board meeting. Reward towns that improve.",
        office: "Watch quality and data every week. Fix the gaps the scoreboard shows.",
        clinics: "Referral results come back. Stock is visible across the network.",
        ai: "A scoreboard you can ask in plain words. Medicine forecasts. Claims checked before sending." },
      { name: "Learning", sign: "Results feed back into plans and budgets every year. The province spots problems early.",
        leader: "Plan with what-if questions. Pay for results, not just activity.",
        office: "Run early warning for outbreaks and disasters. Share lessons with other provinces.",
        clinics: "Care pathways improve based on results.",
        ai: "Early warning, what-if planning, and help with outcome-based payments." }
    ]
  };

  CH.glossary = [
    { term: "Universal Health Care (UHC)", plain: "Every Filipino gets the health care they need without going broke. Set by law in RA 11223 (2019).", like: "A promise that the whole family is covered.", see: "start" },
    { term: "Province-wide / City-wide Health System", plain: "All the clinics, hospitals and health offices of a province (or a highly urbanized city) working as one system, with one plan and one health fund. UHC Act, Sec. 19.", like: "One team instead of many separate players.", see: "map" },
    { term: "Health Care Provider Network", plain: "A group of clinics and hospitals, public and private, that agree to work together and refer patients to each other. UHC Act, Sec. 18.", like: "A basketball team: each player has a position.", see: "map" },
    { term: "Primary care provider", plain: "Your assigned first stop for care, usually the health center. It knows you and guides you to the hospital only when you need it.", like: "Your barangay's family doctor.", see: "map" },
    { term: "Referral", plain: "Being sent from one level of care to a higher one, such as from the health center to the hospital, with your information sent ahead.", like: "A teacher passing your report card to your next school.", see: "journeys" },
    { term: "Special Health Fund", plain: "One pot of health money for the whole province or city, pooled from PhilHealth payments, local budgets, DOH support and others. UHC Act, Sec. 20.", like: "The family budget envelope.", see: "money" },
    { term: "Health Board", plain: "The group that leads the province- or city-wide health system: the Governor or Mayor, health officers and other members.", like: "The barangay council, but for health.", see: "map" },
    { term: "PhilHealth Konsulta", plain: "PhilHealth's package that pays for check-ups, some lab tests and medicines at your registered primary care provider.", like: "A prepaid plan for everyday care.", see: "money" },
    { term: "Enterprise architecture", plain: "A plan that shows how all the parts of a large organization fit together: people, processes, information and technology.", like: "The blueprint of a house.", see: "map" },
    { term: "Health Sector Enterprise Architecture (HSEA)", plain: "DOH's blueprint for the whole health sector: the UHC agenda, 12 capabilities, digital tools, and data.", like: "The master plan for every house in the subdivision.", see: "map" },
    { term: "Connected, not integrated", plain: "Each place keeps its own system, and all of them follow shared rules so information can move. No one is forced into one giant system.", like: "Jeepneys from different owners on the same routes.", see: "start" },
    { term: "Interoperability layer (the shared road)", plain: "Common rules and a common language that let different systems send and receive information safely.", like: "The national highway and its traffic rules.", see: "map" },
    { term: "Registry", plain: "An official, shared list, such as of people, clinics, health workers or medicines, that every system uses.", like: "A trusted phone directory.", see: "map" },
    { term: "Client registry / one health ID", plain: "The shared list that makes sure Rosa is recognized as the same Rosa at every clinic. Linked to PhilSys.", like: "Your one passport.", see: "map" },
    { term: "PhilSys", plain: "The Philippine national ID system (RA 11055).", like: "The national ID card.", see: "glossary" },
    { term: "Terminology service", plain: "A shared dictionary so that \"high blood\", \"HPN\" and \"altapresyon\" are understood as the same illness, using standard codes such as ICD.", like: "A dictionary everyone uses.", see: "gap" },
    { term: "Shared Health Record", plain: "The summary of your health story that can follow you from clinic to clinic, with your permission.", like: "A report card that transfers with you.", see: "map" },
    { term: "EMR / HIS", plain: "The software a clinic (EMR, electronic medical record) or hospital (HIS, hospital information system) uses to keep records.", like: "A store's cash register.", see: "map" },
    { term: "eLMIS", plain: "The system that tracks medicines and supplies in warehouses and clinics.", like: "A sari-sari store's inventory notebook, but shared.", see: "journeys" },
    { term: "HL7 FHIR", plain: "An international standard format for health information, so systems can understand each other's messages.", like: "A standard envelope size every post office accepts.", see: "glossary" },
    { term: "PH Core", plain: "A Philippine version of the FHIR standard. Currently a draft guide prepared with DOH guidance.", like: "The local rules for filling in the standard envelope.", see: "glossary" },
    { term: "OpenHIE", plain: "An open, international blueprint for health information exchange: shared lists plus a connection layer. DOH uses it as its main application architecture.", like: "A proven house plan you can adapt.", see: "map" },
    { term: "WHO SMART Guidelines", plain: "World Health Organization guidelines turned into digital building blocks, so apps can give guideline-based advice.", like: "A recipe written so a kitchen machine can follow it.", see: "gap" },
    { term: "National Health Data Repository (NHDR)", plain: "The national store of health data, used for the national scoreboard.", like: "The national scoreboard.", see: "map" },
    { term: "Artificial intelligence (AI)", plain: "Computer tools that can read, write, predict and spot patterns. Here, they help health workers and leaders while people make the decisions.", like: "A tireless assistant beside every health worker.", see: "gap" },
    { term: "Human in the loop", plain: "A person always checks and decides. AI suggests, people decide.", like: "A co-pilot, never the pilot.", see: "gap" },
    { term: "Data Privacy Act", plain: "The law (RA 10173) that protects personal information, including health records.", like: "A lock and a guest list for your records.", see: "map" },
    { term: "GIDA", plain: "Geographically isolated and disadvantaged areas, such as remote islands and mountain barangays.", like: "Isla Verde in our example.", see: "gap" },
    { term: "Leapfrogging", plain: "Skipping slow, old steps by using newer tools directly.", like: "Mobile phones that skipped landlines.", see: "roadmap" }
  ];

  CH.references = [
    ["RA 11223, Universal Health Care Act (Secs. 17, 18, 19, 20, 36) and its IRR", "2019", "Verified"],
    ["DOH AO 2020-0021, Integration of Local Health Systems into P/CWHS", "2020", "Verified"],
    ["DOH AO 2020-0019, Service Delivery Design of Health Care Provider Networks", "2020", "Verified"],
    ["Joint Memorandum Circular 2021-0001 on the Special Health Fund", "2021", "Partly verified"],
    ["RA 7160, Local Government Code (Sec. 17); EO 138 (2021) as amended by EO 103 (2025)", "1991–2025", "Verified"],
    ["RA 10173, Data Privacy Act", "2012", "Verified"],
    ["RA 11055, Philippine Identification System Act", "2018", "Verified"],
    ["DOH-DOST-PhilHealth JAO 2016-0001, Philippine Health Information Exchange", "2016", "Verified"],
    ["PhilHealth Circulars 2020-0002 and 2020-0022 (Konsulta)", "2020", "Verified"],
    ["OpenHIE Architecture Specification v3.0", "2020", "Verified"],
    ["WHO SMART Guidelines; WHO Ethics and governance of AI for health (2021, 2024)", "2021–2024", "Verified"],
    ["DTI National AI Strategy Roadmap 2.0", "2024", "Verified"],
    ["HL7 FHIR PH Core implementation guide (draft)", "—", "Draft, not adopted as policy"],
    ["Aklan Local Health Information Exchange (pre-pilot, UP Manila report)", "2026", "Partly verified"],
    ["DOH KMITS, Understanding the Health Sector Enterprise Architecture (slide deck)", "—", "Source document"]
  ];

})(window.CH);
