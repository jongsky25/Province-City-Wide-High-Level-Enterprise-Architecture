(function () {
  "use strict";
  var D = window.CH;
  var NS = "http://www.w3.org/2000/svg";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function svgEl(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function svgText(parent, x, y, str, cls, size, lineH) {
    var t = svgEl("text", { x: x, y: y, "class": cls, "font-size": size }, parent);
    String(str).split("\n").forEach(function (line, i) {
      var ts = svgEl("tspan", { x: x, dy: i === 0 ? 0 : (lineH || size * 1.2) }, t);
      ts.textContent = line;
    });
    return t;
  }
  function byId(id) { for (var i = 0; i < D.places.length; i++) if (D.places[i].id === id) return D.places[i]; }

  /* ---------------- Router ---------------- */
  var VIEWS = ["start", "map", "gap"];
  var inited = {};
  function route() {
    var h = (location.hash || "").slice(1);
    if (VIEWS.indexOf(h) < 0) h = "start";
    VIEWS.forEach(function (v) { $("#view-" + v).hidden = v !== h; });
    $$(".nav a").forEach(function (a) { a.setAttribute("aria-current", a.getAttribute("href") === "#" + h ? "page" : "false"); });
    if (!inited[h]) { inited[h] = true; ({ start: initStart, map: initMap, gap: initGap })[h](); }
  }
  window.addEventListener("hashchange", function () { route(); window.scrollTo(0, 0); });

  /* ---------------- START ---------------- */
  function initStart() {
    $("#people").innerHTML = D.people.map(function (p) {
      return '<article class="person"><header><span class="avatar" style="background:' + p.color + '">' + esc(p.initials) + '</span>' +
        '<div><h3>' + esc(p.name) + '</h3><div class="role">' + esc(p.role) + '</div></div></header>' +
        '<p class="today"><b>Today</b>' + esc(p.today) + '</p>' +
        '<p class="better"><b>When connected</b>' + esc(p.better) + '</p></article>';
    }).join("");

    $("#isnot").innerHTML = D.isnot.map(function (c, i) {
      return '<button type="button" class="flip" aria-pressed="false" aria-label="It is not ' + esc(c.not) + '. Flip to see what it is.">' +
        '<span class="flip-inner"><span class="face front"><span class="tag">It is not</span><h3>' + esc(c.not) + '</h3><p>' + esc(c.notWhy) + '</p><span class="hint">Tap to flip</span></span>' +
        '<span class="face back"><span class="tag">It is</span><h3>' + esc(c.is) + '</h3><p>' + esc(c.isWhy) + '</p></span></span></button>';
    }).join("");
    $$("#isnot .flip").forEach(function (b) {
      b.addEventListener("click", function () { b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
    });

    initSim();
  }

  /* Connected vs integrated simulator */
  var sim = { mode: "connected", outage: false };
  var SIM_NODES = ["Health station", "Health center", "Private clinic", "Provincial hospital", "Laboratory", "District hospital"];
  var SIM_MSG = {
    alone: ["Every clinic works, but nothing travels. Rosa's history is stuck at the health station, so the hospital starts from zero.",
      "One system breaking changes little, because nothing was shared to begin with. Rosa still starts from zero at every clinic."],
    one: ["Everything is shared, but every town must switch to the same software, and one office controls it. Changes are slow and costly.",
      "The central system is down. Every clinic in the province stops at the same time."],
    connected: ["Each clinic keeps its own app. They all speak the same language on one shared road, so Rosa's history follows her.",
      "The district hospital's app is down. Everyone else keeps working and sharing. When it comes back, it catches up."]
  };
  function initSim() {
    $$("#sim-modes button").forEach(function (b) {
      b.addEventListener("click", function () {
        sim.mode = b.dataset.mode; sim.outage = false;
        $$("#sim-modes button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        drawSim();
      });
    });
    $("#sim-outage").addEventListener("click", function () { sim.outage = !sim.outage; drawSim(); });
    drawSim();
  }
  function drawSim() {
    var svg = $("#sim-svg"); svg.innerHTML = "";
    var cx = 300, cy = 172, rx = 215, ry = 112;
    var pts = SIM_NODES.map(function (n, i) {
      var a = -Math.PI / 2 + i * (2 * Math.PI / SIM_NODES.length) + Math.PI / 6;
      return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), name: n };
    });
    var m = sim.mode, out = sim.outage;
    var down = function (i) { return (m === "one" && out) || (m === "connected" && out && i === 5); };

    if (m === "connected") {
      svgEl("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, "class": "road" }, svg);
      svgEl("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, "class": "road-top" }, svg);
      svgEl("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, "class": "flow flow-info", style: "display:inline" }, svg);
      svgEl("path", { d: "M" + cx + " " + (cy - ry) + " L" + cx + " " + (cy - 18), "class": "hub-link" }, svg);
      var hub = svgEl("g", { transform: "translate(" + cx + " " + cy + ")" }, svg);
      svgEl("ellipse", { rx: 74, ry: 26, "class": "hub-cloud" }, hub);
      svgText(hub, 0, -3, "Shared lists", "badge-t", 13);
      svgText(hub, 0, 12, "one ID · one dictionary", "lbl-sub", 10).style.textAnchor = "middle";
      svgText(svg, cx, cy + ry + 30, "The shared road", "lbl sea-lbl", 13).setAttribute("style", "stroke:var(--surface)");
    }
    if (m === "one") {
      pts.forEach(function (p) {
        svgEl("line", { x1: p.x, y1: p.y, x2: cx, y2: cy, stroke: out ? "var(--line)" : "var(--sky)", "stroke-width": 3, "stroke-dasharray": out ? "4 6" : "none" }, svg);
      });
      var big = svgEl("g", { transform: "translate(" + cx + " " + cy + ")" }, svg);
      svgEl("rect", { x: -78, y: -32, width: 156, height: 64, rx: 10, fill: out ? "var(--coral)" : "var(--ink)" }, big);
      var t = svgText(big, 0, -4, out ? "DOWN" : "One big system", "badge-t", 15); t.setAttribute("style", "fill:var(--surface)");
      var t2 = svgText(big, 0, 16, out ? "everyone stops" : "one owner, one vendor", "badge-t", 11); t2.setAttribute("style", "fill:var(--surface);font-weight:400");
    }
    pts.forEach(function (p, i) {
      var g = svgEl("g", { transform: "translate(" + p.x.toFixed(1) + " " + p.y.toFixed(1) + ")", opacity: down(i) ? 0.35 : 1 }, svg);
      svgEl("rect", { x: -48, y: -22, width: 96, height: 44, rx: 9, "class": "bldg-body" }, g);
      if (m !== "one") {
        svgEl("rect", { x: -40, y: -15, width: 18, height: 13, rx: 2, "class": "screen" }, g);
        var st = svgText(g, 6, -5, "own app", "lbl-sub", 10); st.style.textAnchor = "middle";
      } else {
        var st2 = svgText(g, 0, -5, "screen only", "lbl-sub", 10); st2.style.textAnchor = "middle";
      }
      var nt = svgText(g, 0, 12, p.name, "badge-t", 11.5); nt.setAttribute("style", "font-family:var(--f-body)");
      if (down(i) && m === "connected") { var x = svgText(g, 0, -30, "offline", "badge-t", 12); x.setAttribute("style", "fill:var(--coral)"); }
    });
    if (m === "alone") {
      var r = pts[0];
      var doc = svgEl("g", { transform: "translate(" + (r.x + 52) + " " + (r.y - 30) + ")" }, svg);
      svgEl("rect", { x: 0, y: 0, width: 22, height: 28, rx: 2, fill: "var(--surface)", stroke: "var(--coral)", "stroke-width": 2 }, doc);
      svgEl("path", { d: "M5 8 H17 M5 14 H17 M5 20 H13", stroke: "var(--coral)", "stroke-width": 1.5 }, doc);
      var dt = svgText(svg, r.x + 80, r.y - 14, "Rosa's record:\nstuck here", "lbl-sub", 11); dt.setAttribute("style", "fill:var(--coral);font-weight:700");
    }
    var msg = $("#sim-msg");
    msg.textContent = SIM_MSG[m][out ? 1 : 0];
    msg.className = "sim-msg " + ((m === "connected") ? "good" : (out || m === "alone") ? "bad" : "");
    $("#sim-outage").textContent = out ? "Fix it" : "Cause an outage";
  }

  /* ---------------- MAP ---------------- */
  var VB = {
    country: [0, 0, 1600, 1000],
    province: [290, 150, 1030, 740],
    town: [415, 532, 300, 188],
    clinic: [598, 586, 104, 62]
  };
  var ZOOM_NOTE = {
    country: "<b>Country</b> · DOH calls this the \"2 km view\": the national plan, and the shared lists every province uses.",
    province: "<b>Province</b> · the \"100 m view\": one province-wide health system, all its places, one shared road.",
    town: "<b>Town</b> · the \"5 m view\": one project, like getting Rosa from home to the health center.",
    clinic: "<b>Clinic</b> · \"street level\": the actual tools a clinic uses and buys."
  };
  var INVEST = {
    national: "Built nationally (DOH, PhilHealth)",
    local: "Run by the province, city or town",
    private: "Private, joins by agreement",
    people: "Families and communities"
  };
  var LEGEND = {
    care: '<div class="row"><i style="background:var(--teal)"></i>The path a patient takes, from home up to the hospital</div>',
    money: '<div class="row"><i style="background:var(--sun)"></i>Money flows into the Special Health Fund, then out to care</div>',
    info: '<div class="row"><i style="background:var(--sky)"></i>Information travels on the shared road, linked to the national hub</div>',
    ai: '<div class="row"><i style="background:var(--ai)"></i>An AI helper works here. Tap a place to see what it does</div>',
    invest: '<div class="row"><i style="background:var(--sky)"></i>' + INVEST.national + '</div><div class="row"><i style="background:var(--teal)"></i>' + INVEST.local + '</div><div class="row"><i style="background:var(--sun)"></i>' + INVEST.private + '</div>'
  };
  var CARE = ["homes", "bhs", "rhu", "district", "provhosp", "private"];
  var MONEY = ["philhealth", "shf", "capitol", "bhs", "rhu", "district", "provhosp", "warehouse"];
  var LOOP = [[560, 250], [610, 390], [600, 520], [610, 690], [800, 790], [990, 760], [1090, 640], [1110, 520], [1110, 400], [1000, 318], [840, 286], [690, 252]];

  var map = { svg: null, zoom: "province", vb: VB.province.slice(), anim: null, selected: null, roadPath: null };

  function smoothPath(points, closed) {
    var p = points, n = p.length, d = "M" + p[0][0] + " " + p[0][1];
    var get = function (i) { return closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]; };
    var last = closed ? n : n - 1;
    for (var i = 0; i < last; i++) {
      var p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += " C" + c1x.toFixed(1) + " " + c1y.toFixed(1) + " " + c2x.toFixed(1) + " " + c2y.toFixed(1) + " " + p2[0] + " " + p2[1];
    }
    return d + (closed ? " Z" : "");
  }
  function center(p) { return [p.x, p.y - (p.h || 20) / 2]; }

  function initMap() {
    var svg = map.svg = $("#map-svg");
    svg.innerHTML = "";
    svgEl("rect", { x: -2000, y: -2000, width: 6000, height: 5000, "class": "sea" }, svg);
    [[180, 520], [1400, 520], [420, 930], [1250, 940], [980, 120], [300, 120], [1500, 380]].forEach(function (w) {
      svgEl("path", { d: "M" + w[0] + " " + w[1] + " q14 -8 28 0 t28 0", "class": "wave" }, svg);
    });

    /* other provinces (country view) */
    var others = svgEl("g", {}, svg);
    [[140, 270, 95, 70], [160, 800, 110, 80], [1460, 190, 100, 70], [1470, 820, 105, 85]].forEach(function (o) {
      svgEl("ellipse", { cx: o[0], cy: o[1], rx: o[2], ry: o[3], "class": "island other" }, others);
      svgEl("path", { d: "M" + o[0] + " " + o[1] + " L700 78", "class": "hub-link lv lv-country" }, others);
      svgText(others, o[0], o[1] + 8, "Another\nprovince", "lbl lv lv-country", 24, 28);
    });

    /* the province island */
    svgEl("path", { "class": "island", d: "M360 260 C420 180 620 170 760 200 C900 230 1040 170 1180 230 C1290 280 1300 420 1250 520 C1210 610 1260 720 1160 800 C1040 890 860 850 740 860 C600 870 460 840 400 760 C330 670 380 600 350 500 C320 400 310 320 360 260 Z" }, svg);
    var trees = [[420, 330], [455, 300], [390, 430], [430, 470], [700, 470], [1180, 300], [1220, 360], [1160, 720], [520, 800], [600, 820], [930, 820], [1200, 650], [470, 540], [760, 420], [905, 470]];
    trees.forEach(function (t) { svgEl("circle", { cx: t[0], cy: t[1], r: 9, "class": "tree hide-town" }, svg); svgEl("circle", { cx: t[0] + 12, cy: t[1] + 5, r: 7, "class": "tree hide-town" }, svg); });
    svgText(svg, 800, 560, "Province of\nBagong Pag-asa", "lbl lv lv-country", 40, 46);

    /* the shared road */
    var loopD = smoothPath(LOOP, true);
    var roadG = svgEl("g", { "class": "place road-place inv-national", "data-id": "road", tabindex: 0, role: "button", "aria-label": "The shared road" }, svg);
    svgEl("path", { d: loopD, "class": "hit", "stroke-width": 30, stroke: "transparent", fill: "none" }, roadG);
    var roadBase = svgEl("path", { d: loopD, "class": "road" }, roadG);
    svgEl("path", { d: loopD, "class": "road-top" }, roadG);
    svgEl("path", { d: loopD, "class": "road-dash" }, roadG);
    map.roadPath = roadBase;
    svgEl("path", { d: loopD, "class": "flow flow-info glow" }, svg);
    svgEl("path", { d: loopD, "class": "flow flow-info" }, svg);
    svgEl("path", { d: "M560 250 L560 200 L700 78", "class": "hub-link" }, svg);
    svgEl("path", { d: "M560 250 L560 200 L700 78", "class": "flow flow-info" }, svg);

    /* spurs from places to the road */
    var total = roadBase.getTotalLength(), samples = [];
    for (var s = 0; s <= 240; s++) { var pt = roadBase.getPointAtLength(total * s / 240); samples.push([pt.x, pt.y]); }
    var spurG = svgEl("g", {}, svg);
    D.places.forEach(function (p) {
      if (p.kind === "road" || p.kind === "hub") return;
      var c = [p.x, p.y], best = null, bd = 1e9;
      samples.forEach(function (q) { var dd = (q[0] - c[0]) * (q[0] - c[0]) + (q[1] - c[1]) * (q[1] - c[1]); if (dd < bd) { bd = dd; best = q; } });
      var d = "M" + c[0] + " " + c[1] + " L" + best[0].toFixed(1) + " " + best[1].toFixed(1);
      svgEl("path", { d: d, "class": "spur" }, spurG);
      svgEl("path", { d: d, "class": "flow flow-info" }, spurG);
    });

    /* care path */
    var careD = smoothPath(["homes", "bhs", "rhu", "district", "provhosp"].map(function (id) { return center(byId(id)); }), false);
    svgEl("path", { d: careD, "class": "flow flow-care" }, svg);
    /* money flows */
    var shf = center(byId("shf"));
    function moneyCurve(a, b) {
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - 40;
      return "M" + a[0] + " " + a[1] + " Q" + mx + " " + my + " " + b[0] + " " + b[1];
    }
    [["philhealth"], ["capitol"], ["hub"]].forEach(function (src) {
      svgEl("path", { d: moneyCurve(center(byId(src[0])), shf), "class": "flow flow-money" }, svg);
    });
    ["bhs", "rhu", "district", "provhosp", "warehouse"].forEach(function (dst) {
      svgEl("path", { d: moneyCurve(shf, center(byId(dst))), "class": "flow flow-money" }, svg);
    });

    /* places */
    D.places.forEach(function (p) { if (p.kind !== "road") drawPlace(svg, p); });

    /* road sign + hub sign at province level */
    var sign = svgEl("g", { "class": "place", "data-id": "hub", tabindex: 0, role: "button", "aria-label": "Road to the national hub" }, svg);
    svgEl("rect", { x: 572, y: 176, width: 196, height: 40, rx: 8, fill: "var(--sky)", "class": "lv lv-province" }, sign);
    var stx = svgText(sign, 670, 193, "↑ To the national hub", "badge-t lv lv-province", 14); stx.setAttribute("style", "fill:#fff");
    var stx2 = svgText(sign, 670, 208, "(DOH shared lists)", "badge-t lv lv-province", 11); stx2.setAttribute("style", "fill:#fff;font-weight:400");
    var rlbl = svgText(svg, 532, 470, "The shared road", "lbl lv lv-province", 15);
    rlbl.setAttribute("transform", "rotate(-78 532 470)");

    drawTownDetails(svg);
    drawClinicDetails(svg);

    /* Rosa marker */
    var rosa = map.rosa = svgEl("g", { "class": "rosa", style: "display:none" }, svg);
    svgEl("circle", { r: 14, "class": "rosa-ring" }, rosa);
    svgEl("circle", { r: 9, "class": "rosa-dot" }, rosa);
    var rt = svgText(rosa, 0, -18, "Rosa", "lbl", 14); rt.setAttribute("style", "fill:var(--coral)");

    /* events */
    svg.addEventListener("click", function (e) {
      var g = e.target.closest && e.target.closest(".place");
      if (g) selectPlace(g.getAttribute("data-id"));
    });
    svg.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("place")) {
        e.preventDefault(); selectPlace(e.target.getAttribute("data-id"));
      }
    });
    $$("[data-lens]").forEach(function (b) { b.addEventListener("click", function () { setLens(b.dataset.lens); }); });
    $$("[data-zoom]").forEach(function (b) { b.addEventListener("click", function () { setZoom(b.dataset.zoom); }); });
    $("#tech-toggle").addEventListener("click", toggleTech);
    $("#rosa-start").addEventListener("click", function () { rosaGo(0); });
    $("#rosa-next").addEventListener("click", function () { rosaGo(map.rosaStep + 1); });
    $("#rosa-prev").addEventListener("click", function () { rosaGo(map.rosaStep - 1); });
    $("#rosa-close").addEventListener("click", rosaStop);

    setZoom("province", true);
    renderPanel(null);
  }

  function drawPlace(svg, p) {
    var g = svgEl("g", { "class": "place inv-" + p.invest + (CARE.indexOf(p.id) >= 0 ? " on-care" : "") + (MONEY.indexOf(p.id) >= 0 ? " on-money" : ""),
      "data-id": p.id, tabindex: 0, role: "button", "aria-label": p.name }, svg);
    var x = p.x, y = p.y, w = p.w || 40, h = p.h || 28;

    if (p.kind === "homes") {
      svgEl("rect", { x: x - 42, y: y - 40, width: 84, height: 62, "class": "hit" }, g);
      [[-26, -18], [0, -24], [24, -14], [-14, 8], [14, 10]].forEach(function (o, i) {
        var hx = x + o[0], hy = y + o[1];
        svgEl("rect", { x: hx - 8, y: hy - 10, width: 16, height: 11, rx: 1, "class": "bldg-body", style: i === 1 ? "stroke:var(--coral);stroke-width:2" : "" }, g);
        svgEl("path", { d: "M" + (hx - 10) + " " + (hy - 10) + " L" + hx + " " + (hy - 18) + " L" + (hx + 10) + " " + (hy - 10) + " Z", "class": "bldg-roof" }, g);
      });
      svgText(g, x, y + 40, p.short, "lbl lv lv-province", 15);
    } else if (p.kind === "city") {
      svgEl("rect", { x: x - 50, y: y - 90, width: 100, height: 100, "class": "hit" }, g);
      [[-36, 46, 18], [-14, 74, 20], [10, 60, 18], [32, 40, 16]].forEach(function (b) {
        svgEl("rect", { x: x + b[0] - b[2] / 2, y: y - b[1], width: b[2], height: b[1], rx: 1.5, "class": "bldg-body" }, g);
        for (var wy = y - b[1] + 6; wy < y - 6; wy += 9) svgEl("rect", { x: x + b[0] - 4, y: wy, width: 8, height: 4, "class": "bldg-win" }, g);
      });
      svgEl("circle", { cx: x - 14, cy: y - 86, r: 9, "class": "badge hide-clinic" }, g);
      svgText(g, x - 14, y - 86, "+", "badge-t", 13);
      svgText(g, x, y + 24, p.short, "lbl lv lv-province", 15);
      svgText(g, x, y + 40, "highly urbanized city", "lbl lbl-sub lv lv-province", 12);
    } else if (p.kind === "hub") {
      svgEl("ellipse", { cx: x, cy: y, rx: 120, ry: 44, "class": "hub-cloud" }, g);
      svgEl("ellipse", { cx: x - 70, cy: y + 6, rx: 50, ry: 30, "class": "hub-cloud" }, g);
      svgEl("ellipse", { cx: x + 72, cy: y + 4, rx: 54, ry: 32, "class": "hub-cloud" }, g);
      svgEl("ellipse", { cx: x, cy: y, rx: 112, ry: 38, fill: "var(--surface)" }, g);
      svgText(g, x, y - 6, "National hub (DOH)", "badge-t", 26);
      var sub = svgText(g, x, y + 20, "one ID · clinic & worker lists · dictionary · medicines", "badge-t", 13);
      sub.setAttribute("style", "font-weight:400;font-family:var(--f-body)");
    } else {
      svgEl("rect", { x: x - w / 2 - 6, y: y - h - 22, width: w + 12, height: h + 26, "class": "hit" }, g);
      svgEl("rect", { x: x - w / 2, y: y - h, width: w, height: h, rx: 2, "class": "bldg-body" }, g);
      var badge = { station: "+", clinic: "+", hospital: "+", warehouse: "Rx", lab: "Lab", bank: "₱", office: "₱", capitol: "★" }[p.kind];
      if (p.kind === "hospital") {
        svgEl("rect", { x: x - w / 2 - 2, y: y - h - 5, width: w + 4, height: 6, "class": "bldg-roof" }, g);
        for (var c = -w / 2 + 6; c < w / 2 - 6; c += 10) svgEl("rect", { x: x + c, y: y - h + 8, width: 6, height: 5, "class": "bldg-win" }, g);
      } else if (p.kind === "capitol") {
        svgEl("path", { d: "M" + (x - 14) + " " + (y - h) + " A14 14 0 0 1 " + (x + 14) + " " + (y - h) + " Z", "class": "bldg-roof" }, g);
        for (var k = -w / 2 + 8; k <= w / 2 - 8; k += 11) svgEl("rect", { x: x + k - 1.5, y: y - h + 6, width: 3, height: h - 8, "class": "bldg-win" }, g);
      } else if (p.kind === "bank") {
        svgEl("path", { d: "M" + (x - w / 2 - 3) + " " + (y - h) + " L" + x + " " + (y - h - 12) + " L" + (x + w / 2 + 3) + " " + (y - h) + " Z", "class": "bldg-roof" }, g);
      } else if (p.kind === "office" || p.kind === "warehouse") {
        svgEl("rect", { x: x - w / 2 - 2, y: y - h - 4, width: w + 4, height: 5, "class": "bldg-roof" }, g);
      } else {
        svgEl("path", { d: "M" + (x - w / 2 - 4) + " " + (y - h) + " L" + x + " " + (y - h - 14) + " L" + (x + w / 2 + 4) + " " + (y - h) + " Z", "class": "bldg-roof" }, g);
      }
      svgEl("rect", { x: x - 4, y: y - 9, width: 8, height: 9, "class": "bldg-roof hide-clinic" }, g);
      var by = p.kind === "capitol" ? y - h / 2 + 2 : y - h / 2 - 2;
      svgEl("circle", { cx: x, cy: by, r: 9, "class": "badge hide-clinic" }, g);
      svgText(g, x, by, badge, "badge-t hide-clinic", badge.length > 1 ? 8 : 12);
      svgText(g, x, y + 20, p.short, "lbl lv lv-province", 15);
    }
    if (p.aiNow) {
      var sx = p.kind === "hub" ? x + 120 : p.kind === "homes" ? x + 40 : p.kind === "city" ? x + 46 : x + (w / 2) + 8;
      var sy = p.kind === "hub" ? y - 40 : p.kind === "homes" ? y - 44 : p.kind === "city" ? y - 80 : y - h - 14;
      svgEl("path", { d: "M" + sx + " " + (sy - 10) + " L" + (sx + 3) + " " + (sy - 3) + " L" + (sx + 10) + " " + sy + " L" + (sx + 3) + " " + (sy + 3) + " L" + sx + " " + (sy + 10) + " L" + (sx - 3) + " " + (sy + 3) + " L" + (sx - 10) + " " + sy + " L" + (sx - 3) + " " + (sy - 3) + " Z", "class": "spark" }, g);
    }
  }

  function drawTownDetails(svg) {
    var g = svgEl("g", { "class": "lv lv-town" }, svg);
    var f = 6.5;
    svgText(g, 470, 690, "Aling Rosa's house\n(the one in red)", "lbl", f, 7.5);
    svgText(g, 545, 602, "Barangay Health Station", "lbl", f);
    svgText(g, 545, 609, "midwife + health workers", "lbl lbl-sub", 5);
    svgText(g, 650, 643, "Rural Health Unit", "lbl", f);
    svgText(g, 650, 650, "Nurse Joy · Dr. Cruz", "lbl lbl-sub", 5);
    /* Lorna */
    var l = svgEl("g", { transform: "translate(508 640)" }, g);
    svgEl("circle", { cx: 0, cy: -9, r: 2.6, "class": "figure-head", style: "fill:var(--teal)" }, l);
    svgEl("path", { d: "M-3.5 0 Q0 -9 3.5 0 Z", "class": "figure-body", style: "fill:var(--teal)" }, l);
    svgEl("rect", { x: 3, y: -6, width: 2.4, height: 3.6, rx: .5, "class": "screen" }, l);
    svgText(g, 520, 652, "Ate Lorna visits\nwith a phone app", "lbl", 5, 6);
    /* tower */
    svgEl("path", { d: "M598 585 L602 560 L606 585 M599 578 L605 578 M600 570 L604 570", stroke: "var(--bldg-edge)", "stroke-width": 1, fill: "none" }, g);
    svgEl("path", { d: "M596 557 q6 -5 12 0 M594 553 q8 -7 16 0", stroke: "var(--sky)", "stroke-width": .9, fill: "none" }, g);
    svgText(g, 612, 575, "Phone signal\n= connection", "lbl lbl-sub", 4.6, 5.5).style.textAnchor = "start";
    svgText(g, 590, 700, "Tricycle ride to the health center: 25 minutes", "lbl lbl-sub", 5);
    svgText(g, 690, 560, "Shared road →", "lbl", 5.5);
  }

  function drawClinicDetails(svg) {
    var g = svgEl("g", { "class": "lv lv-clinic" }, svg);
    var x0 = 627, y0 = 598;
    svgEl("rect", { x: x0 + 1.5, y: y0 + 1.5, width: 43, height: 31, fill: "var(--surface)", stroke: "var(--line)", "stroke-width": .3 }, g);
    svgEl("rect", { x: x0 + 8, y: y0 + 20, width: 26, height: 3, rx: .5, "class": "bldg-roof" }, g); /* counter */
    /* nurse */
    svgEl("circle", { cx: 641, cy: 612, r: 2, style: "fill:var(--teal)" }, g);
    svgEl("path", { d: "M638 619 Q641 612 644 619 Z", style: "fill:var(--teal)" }, g);
    /* patient */
    svgEl("circle", { cx: 657, cy: 621, r: 2, style: "fill:var(--coral)" }, g);
    svgEl("path", { d: "M654 629 Q657 621 660 629 Z", style: "fill:var(--coral)" }, g);
    /* tablet */
    svgEl("rect", { x: 645, y: 615.5, width: 5, height: 3.6, rx: .4, "class": "screen" }, g);
    svgEl("rect", { x: 645.8, y: 616.2, width: 3.4, height: .6, "class": "screen-glow" }, g);
    /* logbook */
    svgEl("rect", { x: 632, y: 624, width: 4.5, height: 3.4, fill: "var(--sun-soft)", stroke: "var(--sun)", "stroke-width": .3 }, g);
    /* cable out */
    svgEl("path", { d: "M650 617 L668 617 L668 632 L676 640", stroke: "var(--sky)", "stroke-width": .5, fill: "none", "stroke-dasharray": "1 1" }, g);
    var f = 2.1, lh = 2.6;
    function note(x, y, txt, tx, ty, color) {
      svgEl("path", { d: "M" + tx + " " + ty + " L" + (x < 640 ? x + 23 : x - 1) + " " + (y - 0.6), stroke: color || "var(--muted)", "stroke-width": .2, fill: "none" }, g);
      var t = svgText(g, x, y, txt, "lbl lbl-sub", f, lh); t.setAttribute("style", "text-anchor:start;stroke:var(--land);stroke-width:.5px;fill:" + (color || "var(--ink)"));
    }
    note(600, 601, "Nurse Joy's tablet:\nthe clinic app (EMR)", 645, 616, "var(--sky)");
    note(600, 621, "Old paper logbook:\nAI reads it into\nthe app", 632, 625, "var(--sun)");
    note(675, 601, "AI helper suggests\nnext steps (WHO\nguidelines). Joy decides.", 650, 616, "var(--ai)");
    note(675, 627, "Visit summary goes out\non the shared road,\nwith Rosa's consent", 670, 632, "var(--teal)");
    svgText(g, 650, 645, "Inside the Rural Health Unit", "lbl", 2.4);
  }

  function setLens(lens) {
    map.svg.setAttribute("data-lens", lens);
    $$("[data-lens]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lens === lens ? "true" : "false"); });
    var lg = $("#legend");
    if (LEGEND[lens]) { lg.innerHTML = LEGEND[lens]; lg.hidden = false; } else lg.hidden = true;
  }

  function animateVB(target, instant) {
    if (map.anim) cancelAnimationFrame(map.anim);
    var from = map.vb.slice(), t0 = null, dur = (instant || reduceMotion) ? 0 : 750;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = dur ? Math.min(1, (ts - t0) / dur) : 1;
      var e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      map.vb = from.map(function (v, i) { return v + (target[i] - v) * e; });
      map.svg.setAttribute("viewBox", map.vb.map(function (v) { return v.toFixed(2); }).join(" "));
      if (k < 1) map.anim = requestAnimationFrame(step);
    }
    map.anim = requestAnimationFrame(step);
  }
  function setZoom(z, instant) {
    map.zoom = z;
    map.svg.setAttribute("data-zoom", z);
    $$("[data-zoom]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.zoom === z ? "true" : "false"); });
    $("#zoom-note").innerHTML = ZOOM_NOTE[z];
    animateVB(VB[z], instant);
    if (z === "clinic") selectPlace("rhu");
    if (z === "country") selectPlace("hub");
  }

  function selectPlace(id) {
    map.selected = id;
    $$(".place", map.svg).forEach(function (g) { g.classList.toggle("selected", g.getAttribute("data-id") === id); });
    renderPanel(byId(id));
  }
  function renderPanel(p) {
    var el = $("#panel");
    if (!p) {
      el.innerHTML = '<p class="eyebrow">How to use this map</p><h2>Pick a place</h2><div class="empty"><p>Tap any building, the road or the national hub.</p><ul>' +
        '<li><b>Show</b> lights up how care, money and information move.</li>' +
        '<li><b>AI helpers</b> marks every place an AI helper works.</li>' +
        '<li><b>Who builds it</b> shows what DOH builds and what the province runs.</li>' +
        '<li><b>Zoom</b> from the whole country down to one clinic.</li>' +
        '<li><b>Follow Rosa\'s journey</b> plays the story step by step.</li></ul></div>';
      return;
    }
    el.innerHTML =
      '<div><p class="eyebrow">' + esc(INVEST[p.invest]) + '</p><h2>' + esc(p.name) + '</h2></div>' +
      '<p class="who">' + esc(p.who) + '</p>' +
      '<div class="block"><p>' + esc(p.what) + '</p></div>' +
      '<div class="block today"><b>Today</b><p>' + esc(p.today) + '</p></div>' +
      '<div class="block conn"><b>When connected</b><p>' + esc(p.connected) + '</p></div>' +
      '<div class="ai-box"><b>AI helper</b><div class="cols"><div><span>Doable in 1–3 years</span>' + esc(p.aiNow) + '</div><div><span>Future vision</span>' + esc(p.aiFuture) + '</div></div>' +
      '<p class="guard"><strong>Safeguard:</strong> ' + esc(p.guard) + '</p></div>' +
      '<div class="meta"><span class="pill ' + p.invest + '">' + esc(INVEST[p.invest]) + '</span><span class="tech"><b>What DOH calls this:</b> ' + esc(p.doh) + '</span></div>';
  }

  /* Rosa's journey */
  function rosaGo(i) {
    var steps = D.rosaSteps;
    if (i < 0) i = 0;
    if (i >= steps.length) { rosaStop(); return; }
    if (map.zoom !== "province") setZoom("province");
    var prev = map.rosaStep, s = steps[i];
    map.rosaStep = i;
    var card = $("#rosa-card"); card.hidden = false;
    $("#rosa-step").textContent = "Step " + (i + 1) + " of " + steps.length;
    $("#rosa-title").textContent = s.title;
    $("#rosa-text").textContent = s.text;
    $("#rosa-ai").textContent = "AI helper: " + s.ai;
    $("#rosa-prev").disabled = i === 0;
    $("#rosa-next").textContent = i === steps.length - 1 ? "Finish" : "Next";
    setLens(s.lens);
    selectPlace(s.place);
    var to = center(byId(s.place)); to = [to[0], to[1] - 26];
    var from = (prev === undefined || prev === null || map.rosa.style.display === "none") ? to : map.rosaPos;
    map.rosa.style.display = "";
    var t0 = null, dur = reduceMotion ? 0 : 900;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = dur ? Math.min(1, (ts - t0) / dur) : 1, e = 1 - Math.pow(1 - k, 3);
      var x = from[0] + (to[0] - from[0]) * e, y = from[1] + (to[1] - from[1]) * e - Math.sin(Math.PI * k) * 30;
      map.rosa.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")");
      if (k < 1) requestAnimationFrame(step);
    }
    map.rosaPos = to;
    requestAnimationFrame(step);
  }
  function rosaStop() {
    $("#rosa-card").hidden = true;
    map.rosa.style.display = "none";
    map.rosaStep = null;
    setLens("none");
  }

  /* Technical view */
  function toggleTech() {
    var b = $("#tech-toggle"), on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.textContent = on ? "Back to the illustrated map" : "Show the technical view";
    $("#map-area").hidden = on;
    $("#tech-view").hidden = !on;
    $$("[data-lens], [data-zoom], #rosa-start").forEach(function (x) { x.disabled = on; });
    if (on && !$("#tech-view").innerHTML) renderTech();
  }
  function renderTech() {
    var H = D.hsea;
    function boxes(arr) { return arr.map(function (a) { return Array.isArray(a) ? '<div class="tbox"><strong>' + esc(a[1]) + '</strong><span class="tech">' + esc(a[0]) + '</span></div>' : '<div class="tbox">' + esc(a) + '</div>'; }).join(""); }
    var caps = D.capabilities.map(function (c, i) { return '<div class="tbox"><strong>' + esc(c.q) + '</strong><span class="tech">' + esc(c.doh) + (i < 6 ? " · core" : " · enabling") + '</span></div>'; }).join("");
    $("#tech-view").innerHTML =
      '<div class="section-head" style="margin:0"><p class="eyebrow">The technical view</p><h2>The same province, in DOH\'s enterprise architecture</h2>' +
      '<p class="muted">This is the structure of the DOH Health Sector Enterprise Architecture. Each part shows the plain-language version in bold and the technical name below it.</p></div>' +
      '<div class="tier"><header><span class="eyebrow">Tier 1</span><h3>Why we do it</h3><span class="tech">UHC Agenda</span></header><div class="tier-items">' + boxes(H.agenda) + '</div></div>' +
      '<p class="tier-arrow">directs and guides ↓ · ↑ makes it real</p>' +
      '<div class="tier"><header><span class="eyebrow">Tier 2</span><h3>What the health system must do</h3><span class="tech">Health Sector Processes: 6 core + 6 enabling capabilities</span></header><div class="tier-items">' + caps + '</div></div>' +
      '<p class="tier-arrow">organizes ↓ · ↑ automates</p>' +
      '<div class="tier"><header><span class="eyebrow">Tier 3</span><h3>The digital tools that help</h3><span class="tech">Digital Health Ecosystem, around integration &amp; data analysis</span></header><div class="tier-items">' + boxes(H.ecosystem) + '</div></div>' +
      '<p class="tier-arrow">uses ↓ · ↑ produces</p>' +
      '<div class="tier"><header><span class="eyebrow">Tier 4</span><h3>The information underneath</h3><span class="tech">Health and health-related data</span></header><div class="tier-items">' + boxes(H.data) + '</div></div>' +
      '<div class="split"><div class="nat"><h3>DOH builds once, for everyone</h3><span class="tech">National government investments (OpenHIE component layer)</span><ul>' + H.national.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div>' +
      '<div class="loc"><h3>Province, city and clinics run and plug in</h3><span class="tech">Local government and other entity-deployed (point of service)</span><ul>' + H.local.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div></div>' +
      '<p class="source">Source: DOH Knowledge Management and IT Service, "Understanding the Health Sector Enterprise Architecture" (HSEA, OpenHIE application architecture). The plain-language wording here is this project\'s own.</p>';
  }

  /* ---------------- GAP ---------------- */
  var gap = { profile: "gida", t: 0, share: 1, playing: null };
  var CAPS = D.capabilities;
  var CAPMAX = 130;
  function trad(p, i, t) { var P = D.profiles[p]; return Math.min(CAPMAX, P.base[i] + 6 * P.capacity * t); }
  function aiVal(p, i, t, share) {
    var P = D.profiles[p], s = (share === undefined ? gap.share : share);
    var scale = P.capacity + s * (1 - P.capacity), head = (CAPMAX - P.base[i]) / 100;
    return Math.min(CAPMAX, P.base[i] + 6 * P.capacity * t + CAPS[i].boost * scale * head * Math.max(0, t - 0.5));
  }
  function avg(fn) { var s = 0; for (var i = 0; i < CAPS.length; i++) s += fn(i); return s / CAPS.length; }
  function goal(t) { return 100 + 3 * t; }

  function initGap() {
    var colors = { metro: "var(--sky)", avg: "var(--teal)", gida: "var(--coral)" };
    $("#profiles").innerHTML = Object.keys(D.profiles).map(function (k) {
      var P = D.profiles[k];
      return '<button type="button" data-profile="' + k + '" aria-pressed="' + (k === gap.profile) + '"><span class="avatar" style="background:' + colors[k] + '">' +
        P.name.split(" ").map(function (w) { return w[0]; }).join("") + '</span><strong>' + esc(P.name) + '</strong><span>' + esc(P.tag) + '</span></button>';
    }).join("");
    $$("#profiles button").forEach(function (b) {
      b.addEventListener("click", function () {
        gap.profile = b.dataset.profile;
        $$("#profiles button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        drawGap();
      });
    });
    $("#caps").innerHTML = CAPS.map(function (c, i) {
      return '<div class="cap-row"><div><span class="q">' + esc(c.q) + '</span><span class="tech">' + esc(c.doh) + '</span></div>' +
        '<div class="track" aria-hidden="true"><div class="bar usual" id="bu' + i + '"></div><div class="bar ai" id="ba' + i + '"></div><div class="goal" id="bg' + i + '"></div></div>' +
        '<div class="nums" id="bn' + i + '"></div></div>';
    }).join("");
    var yr = $("#gap-year");
    yr.addEventListener("input", function () { stopPlay(); gap.t = parseFloat(yr.value); drawGap(); });
    $("#gap-play").addEventListener("click", function () { gap.playing ? stopPlay() : play(); });
    var eq = $("#eq-share");
    eq.addEventListener("input", function () { gap.share = parseFloat(eq.value); drawGap(); drawEq(); });

    $("#gap-cards").innerHTML = D.gaps.map(function (g) {
      return '<details class="gap-card"><summary><span class="tech">Question ' + (g.cap + 1) + ': ' + esc(CAPS[g.cap].q) + '</span><h3>' + esc(g.title) + '</h3><span class="who">' + esc(g.who) + '</span><span class="open">See the AI fix</span></summary>' +
        '<div class="body"><div class="usual-l"><b>The usual fix</b>' + esc(g.usual) + '</div>' +
        '<div class="ai-l"><div><b>AI fix, doable in 1–3 years</b>' + esc(g.aiNow) + '</div><div><b>Future vision</b>' + esc(g.aiFuture) + '</div></div>' +
        '<div class="ahead"><b>How it puts us ahead</b>' + esc(g.ahead) + '</div>' +
        '<div class="needs"><b>Needs from the shared road</b>' + esc(g.needs) + '</div>' +
        '<div class="guard-l"><b>Safeguard</b>' + esc(g.guard) + '</div></div></details>';
    }).join("");
    drawGap(); drawEq();
  }
  function play() {
    if (gap.t >= 6) gap.t = 0;
    $("#gap-play").textContent = "Pause";
    var last = null;
    function tick(ts) {
      if (last === null) last = ts;
      gap.t = Math.min(6, gap.t + (ts - last) / 1000 * (reduceMotion ? 6 : 0.9));
      last = ts;
      $("#gap-year").value = gap.t;
      drawGap();
      if (gap.t < 6) gap.playing = requestAnimationFrame(tick); else stopPlay();
    }
    gap.playing = requestAnimationFrame(tick);
  }
  function stopPlay() {
    if (gap.playing) cancelAnimationFrame(gap.playing);
    gap.playing = null;
    $("#gap-play").textContent = gap.t >= 6 ? "Replay" : "Play";
  }

  function drawGap() {
    var p = gap.profile, t = gap.t, P = D.profiles[p];
    var X0 = 46, X1 = 430, Y0 = 268, Y1 = 18, YMAX = 140;
    var sx = function (yr) { return X0 + (X1 - X0) * yr / 6; };
    var sy = function (v) { return Y0 - (Y0 - Y1) * v / YMAX; };
    var svg = $("#gap-chart"); svg.innerHTML = "";
    [0, 50, 100].forEach(function (v) {
      svgEl("line", { x1: X0, x2: X1, y1: sy(v), y2: sy(v), "class": "ax" }, svg);
      var lab = svgText(svg, X0 - 8, sy(v) + 4, String(v), "ax-t", 11); lab.style.textAnchor = "end";
    });
    for (var yv = 0; yv <= 6; yv++) {
      var xl = svgText(svg, sx(yv), Y0 + 20, yv === 0 ? "Today" : "Year " + yv, "ax-t", 11); xl.style.textAnchor = "middle";
    }
    var clip = svgEl("clipPath", { id: "gap-clip" }, svgEl("defs", {}, svg));
    svgEl("rect", { x: 0, y: 0, width: sx(t) + 0.5, height: 300 }, clip);
    function line(fn, cls, clipped) {
      var d = "";
      for (var k = 0; k <= 60; k++) { var yr = k / 10; d += (k ? " L" : "M") + sx(yr).toFixed(1) + " " + sy(fn(yr)).toFixed(1); }
      var a = { d: d, "class": "ln " + cls }; if (clipped) a["clip-path"] = "url(#gap-clip)";
      if (clipped) svgEl("path", { d: d, "class": "ln " + cls, opacity: 0.15 }, svg);
      return svgEl("path", a, svg);
    }
    line(goal, "ln-goal", false);
    line(function (yr) { return avg(function (i) { return trad(p, i, yr); }); }, "ln-usual", true);
    line(function (yr) { return avg(function (i) { return aiVal(p, i, yr); }); }, "ln-ai", true);
    svgEl("line", { x1: sx(t), x2: sx(t), y1: Y1, y2: Y0, "class": "yr-line" }, svg);

    var vu = avg(function (i) { return trad(p, i, t); }), va = avg(function (i) { return aiVal(p, i, t); }), vg = goal(t);
    var ends = [
      { y: sy(goal(6)), txt: "Where we", txt2: "should be", fill: "var(--ink)" },
      { y: sy(avg(function (i) { return aiVal(p, i, 6); })), txt: "With AI", fill: "var(--ai)" },
      { y: sy(avg(function (i) { return trad(p, i, 6); })), txt: "The usual", txt2: "way", fill: "var(--muted)" }
    ].sort(function (a, b) { return a.y - b.y; });
    for (var e = 1; e < ends.length; e++) { var need = ends[e - 1].txt2 ? 34 : 22; if (ends[e].y - ends[e - 1].y < need) ends[e].y = ends[e - 1].y + need; }
    ends.forEach(function (en) {
      var tt = svgText(svg, X1 + 10, en.y + 4, en.txt + (en.txt2 ? "\n" + en.txt2 : ""), "ln-lbl", 13, 14);
      tt.setAttribute("style", "fill:" + en.fill);
    });
    [[vu, "var(--bldg-edge)"], [va, "var(--ai)"]].forEach(function (d) {
      svgEl("circle", { cx: sx(t), cy: sy(d[0]), r: 5, fill: d[1], stroke: "var(--surface)", "stroke-width": 2 }, svg);
    });

    var label = t < 0.05 ? "Today" : "Year " + (Math.round(t * 10) / 10).toFixed(1).replace(".0", "");
    $("#gap-year-out").textContent = label;
    var s = esc(P.name) + ", " + label.toLowerCase() + ": the usual way reaches <b>" + Math.round(vu) + "</b> of the <b>" + Math.round(vg) + "</b> needed. ";
    s += va >= vg ? '<span class="ai-t">With AI: ' + Math.round(va) + ", ahead of the goal.</span>" : '<span class="ai-t">With AI: ' + Math.round(va) + ".</span>";
    if (t < 0.05) s = esc(P.name) + " today: readiness " + Math.round(vu) + " out of 100. Press Play to see the next six years.";
    $("#gap-summary").innerHTML = s;

    CAPS.forEach(function (c, i) {
      var u = trad(p, i, t), a = aiVal(p, i, t);
      $("#bu" + i).style.width = (u / CAPMAX * 100) + "%";
      $("#ba" + i).style.width = (a / CAPMAX * 100) + "%";
      $("#bg" + i).style.left = (Math.min(vg, CAPMAX) / CAPMAX * 100) + "%";
      $("#bn" + i).innerHTML = "Usual " + Math.round(u) + '<br><span class="a">AI ' + Math.round(a) + "</span>";
    });
  }

  function drawEq() {
    var t = 3, s = gap.share;
    var cityAI = avg(function (i) { return aiVal("metro", i, t, s); }), islAI = avg(function (i) { return aiVal("gida", i, t, s); });
    var cityU = avg(function (i) { return trad("metro", i, t); }), islU = avg(function (i) { return trad("gida", i, t); });
    var rows = [["Mabuhay City", cityAI, ""], ["Isla Verde", islAI, ""], ["City, usual way", cityU, "usual"], ["Island, usual way", islU, "usual"]];
    $("#eq-bars").innerHTML = rows.map(function (r) {
      return '<div class="eq-bar"><span>' + r[0] + '</span><div class="track"><div class="fill ' + r[2] + '" style="width:' + (r[1] / CAPMAX * 100).toFixed(1) + '%"></div></div><span class="v">' + Math.round(r[1]) + "</span></div>";
    }).join("");
    $("#eq-gap").innerHTML = 'Gap between the city and the island: <span class="n">' + Math.round(cityAI - islAI) + "</span> points with AI, " + Math.round(cityU - islU) + " the usual way.";
  }

  route();
})();
