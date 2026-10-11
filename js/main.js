/* DigitalAdvero — main.js
   Vanilla JS, no dependencies. Sections:
   1 helpers · 2 language · 3 theme · 4 navigation · 5 reveal + scroll effects · 6 pointer effects
   7 hero (counter, ticker, particles) · 8 ecosystem diagram · 9 simulator · 10 FAQ · 11 contact form */
(function () {
  "use strict";

  /* ---------- 1. Helpers ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var root = document.documentElement;
  var mq = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduceMotion = mq("(prefers-reduced-motion: reduce)");
  var canHover = mq("(hover: hover) and (pointer: fine)");
  function store(key, val) { try { if (val === undefined) { return localStorage.getItem(key); } localStorage.setItem(key, val); } catch (e) {} return null; }
  function onFrame(fn) { var queued = false; return function () { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; fn(); }); }; }

  // Small UI strings that are set from JS rather than from data-i18n attributes.
  var UI = {
    bs: { themeToLight: "Prebaci na svijetlu temu", themeToDark: "Prebaci na tamnu temu", menuOpen: "Otvori meni", menuClose: "Zatvori meni", step: "Korak", selected: "Odabrano", subject: "Konsultacije - " },
    en: { themeToLight: "Switch to light theme", themeToDark: "Switch to dark theme", menuOpen: "Open menu", menuClose: "Close menu", step: "Step", selected: "Selected", subject: "Consultation - " }
  };
  var currentLang = "bs";
  function ui(key) { return UI[currentLang][key]; }

  /* ---------- 2. Language (BS is authored in the HTML, EN comes from i18n-en.js) ---------- */
  var EN = window.DA_EN || {};
  var textEls = $$("[data-i18n],[data-i18n-html]");
  var attrEls = $$("[data-i18n-attrs]");
  var bsText = {}, bsAttr = {};
  textEls.forEach(function (el) {
    var html = el.hasAttribute("data-i18n-html");
    var key = el.getAttribute(html ? "data-i18n-html" : "data-i18n");
    if (!(key in bsText)) bsText[key] = html ? el.innerHTML : el.textContent;
  });
  attrEls.forEach(function (el) {
    el.getAttribute("data-i18n-attrs").split(";").forEach(function (pair) {
      var p = pair.split(":"); if (p.length !== 2) return;
      if (!(p[1] in bsAttr)) bsAttr[p[1]] = el.getAttribute(p[0]);
    });
  });
  var bsMeta = { title: document.title, description: ($('meta[name="description"]') || {}).content };

  function tr(key, lang) { return lang === "en" && EN[key] !== undefined ? EN[key] : bsText[key] !== undefined ? bsText[key] : bsAttr[key]; }

  function applyLang(lang, persist) {
    currentLang = lang === "en" ? "en" : "bs";
    textEls.forEach(function (el) {
      var html = el.hasAttribute("data-i18n-html");
      var key = el.getAttribute(html ? "data-i18n-html" : "data-i18n");
      var val = tr(key, currentLang);
      if (val === undefined) return;
      if (html) el.innerHTML = val; else el.textContent = val;
    });
    attrEls.forEach(function (el) {
      el.getAttribute("data-i18n-attrs").split(";").forEach(function (pair) {
        var p = pair.split(":"); if (p.length !== 2) return;
        var val = tr(p[1], currentLang); if (val !== undefined) el.setAttribute(p[0], val);
      });
    });
    root.lang = currentLang;
    document.title = currentLang === "en" ? EN["meta.title"] : bsMeta.title;
    var md = $('meta[name="description"]'); if (md) md.content = currentLang === "en" ? EN["meta.description"] : bsMeta.description;
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === currentLang)); });
    if (persist !== false) store("da_lang", currentLang);
    updateThemeLabel(); updateMenuLabel();
    document.dispatchEvent(new CustomEvent("da:langchange", { detail: currentLang }));
  }
  $$("[data-lang]").forEach(function (b) { b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); }); });

  /* ---------- 3. Theme ---------- */
  function updateThemeLabel() {
    var light = root.getAttribute("data-theme") === "light";
    $$("[data-theme-toggle]").forEach(function (b) { b.setAttribute("aria-label", light ? ui("themeToDark") : ui("themeToLight")); });
  }
  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    var meta = $('meta[name="theme-color"]'); if (meta) meta.setAttribute("content", theme === "light" ? "#f4f6fc" : "#050912");
    if (persist) store("da_theme", theme);
    updateThemeLabel();
    document.dispatchEvent(new CustomEvent("da:themechange", { detail: theme }));
  }
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      root.classList.add("theme-anim");
      applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light", true);
      setTimeout(function () { root.classList.remove("theme-anim"); }, 500);
    });
  });

  /* ---------- 4. Navigation ---------- */
  var nav = $("#siteNav");
  var navLinks = $$("#navLinks a");
  var indicator = $("#navIndicator");
  var mobilePanel = $("#mobilePanel");
  var menuBtn = $("#menuBtn");
  var pageSections = $$("main > section[id]");
  var activeId = null;

  function updateMenuLabel() { if (menuBtn) menuBtn.setAttribute("aria-label", menuBtn.getAttribute("aria-expanded") === "true" ? ui("menuClose") : ui("menuOpen")); }
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    mobilePanel.classList.toggle("is-open", open);
    mobilePanel.toggleAttribute("inert", !open);
    document.body.style.overflow = open ? "hidden" : "";
    updateMenuLabel();
    if (open) { var first = $("a", mobilePanel); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60); }
  }
  menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
  $$("a", mobilePanel).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1100 && menuBtn.getAttribute("aria-expanded") === "true") setMenu(false); placeIndicator(); }, { passive: true });

  function placeIndicator() {
    if (!indicator) return;
    var link = navLinks.filter(function (a) { return a.classList.contains("is-active"); })[0];
    if (!link || !link.offsetWidth) { indicator.style.opacity = "0"; return; }
    indicator.style.width = (link.offsetWidth - 26) + "px";
    indicator.style.transform = "translateX(" + (link.offsetLeft + 13) + "px)";
    indicator.style.opacity = "1";
  }
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    $$("#navLinks a, .mobile-links a").forEach(function (a) { a.classList.toggle("is-active", !!id && a.getAttribute("href") === "#" + id); });
    placeIndicator();
  }
  document.addEventListener("da:langchange", function () { requestAnimationFrame(placeIndicator); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeIndicator);

  /* ---------- 5. Reveal + scroll effects ---------- */
  var revealEls = $$(".reveal, .eco-reveal");
  if ("IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); revealIO.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var parallaxEls = $$("[data-py]").map(function (el) { return { el: el, speed: parseFloat(el.getAttribute("data-py")) || 0 }; });
  var onScroll = onFrame(function () {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle("is-scrolled", y > 12);
    // scrollspy: the last section whose top has passed a probe line near the upper third of the viewport
    var probe = window.innerHeight * 0.34, current = null;
    for (var i = 0; i < pageSections.length; i++) { if (pageSections[i].getBoundingClientRect().top <= probe) current = pageSections[i].id; }
    setActive(current);
    if (!reduceMotion) parallaxEls.forEach(function (p) { p.el.style.setProperty("--py", (y * p.speed).toFixed(1) + "px"); });
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---------- 6. Pointer effects (fine pointers only) ---------- */
  if (canHover && !reduceMotion) {
    // Spotlight: one delegated listener lights whichever .spot card is under the pointer
    var litCard = null;
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest ? e.target.closest(".spot") : null;
      if (litCard && litCard !== card) litCard.classList.remove("is-lit");
      litCard = card;
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
      card.classList.add("is-lit");
    }, { passive: true });
    document.addEventListener("pointerleave", function () { if (litCard) { litCard.classList.remove("is-lit"); litCard = null; } });

    // 3D tilt
    $$("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.transform = "perspective(1000px) rotateX(" + ((0.5 - py) * 5).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * 6).toFixed(2) + "deg)";
      }, { passive: true });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    });

    // Magnetic buttons
    $$(".magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.setProperty("--tx", ((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1) + "px");
        btn.style.setProperty("--ty", ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px");
      }, { passive: true });
      btn.addEventListener("pointerleave", function () { btn.style.setProperty("--tx", "0px"); btn.style.setProperty("--ty", "0px"); });
    });
  }

  /* ---------- 7. Hero: counter, status ticker, particles ---------- */
  $$("[data-count-to]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count-to"), 10);
    function run() {
      if (reduceMotion) { el.textContent = target; return; }
      var t0 = null;
      (function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.6 });
      io.observe(el);
    } else run();
  });

  if (!reduceMotion) {
    var pills = $$(".status-pill"), pillIdx = 0;
    if (pills.length) setInterval(function () {
      if (document.hidden) return;
      pills.forEach(function (p) { p.classList.remove("is-tick"); });
      pills[pillIdx++ % pills.length].classList.add("is-tick");
    }, 2600);
  }

  (function heroParticles() {
    var canvas = $("#heroParticles");
    if (!canvas || reduceMotion || window.innerWidth < 760) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = 0, h = 0, pts = [], running = true, COUNT = 28, LINK = 120, lastDraw = 0;
    function color() { return root.getAttribute("data-theme") === "light" ? "47,91,255" : "157,195,255"; }
    var rgb = color();
    document.addEventListener("da:themechange", function () { rgb = color(); });
    function resize() {
      var r = canvas.parentElement.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (var i = 0; i < COUNT; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, r: 0.9 + Math.random() * 1.5, vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16, o: 0.2 + Math.random() * 0.4 });
    }
    function draw(ts) {
      if (!running) return;
      if (ts - lastDraw < 32) { requestAnimationFrame(draw); return; } // ~30fps is plenty for a slow ambient field and halves the compositing cost
      lastDraw = ts;
      ctx.clearRect(0, 0, w, h);
      var slow = window.__heroParticlesSlow ? 0.12 : 1, dim = window.__heroParticlesSlow ? 0.35 : 1;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx * slow * 2; p.y += p.vy * slow * 2;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) { ctx.strokeStyle = "rgba(" + rgb + "," + ((1 - Math.sqrt(d2) / LINK) * 0.16 * dim) + ")"; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        ctx.fillStyle = "rgba(" + rgb + "," + (p.o * dim) + ")"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize(); draw();
    var resizeT; window.addEventListener("resize", function () { clearTimeout(resizeT); resizeT = setTimeout(resize, 200); }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { var was = running; running = en[0].isIntersecting && !document.hidden; if (running && !was) requestAnimationFrame(draw); }).observe(canvas);
    document.addEventListener("visibilitychange", function () { var was = running; running = !document.hidden; if (running && !was) requestAnimationFrame(draw); });
  })();

  /* ---------- 8. Ecosystem diagram ---------- */
  (function ecosystem() {
    var ECO = {
      website: { bs: { t: "Web stranica", d: "Vaša digitalna adresa, dostupna 0-24." }, en: { t: "Website", d: "Your digital front door, open around the clock." } },
      google: { bs: { t: "Google", d: "Budite vidljivi kada vas klijenti traže." }, en: { t: "Google", d: "Be visible when customers are searching." } },
      social: { bs: { t: "Društvene mreže", d: "Ostanite prisutni tamo gdje vaši klijenti provode vrijeme." }, en: { t: "Social media", d: "Stay present where your customers spend their time." } },
      customers: { bs: { t: "Klijenti", d: "Sve informacije o klijentima, organizovane na jednom mjestu." }, en: { t: "Customers", d: "Every customer detail, organized in one place." } },
      appointments: { bs: { t: "Termini", d: "Pretvorite interesovanje u potvrđene termine." }, en: { t: "Appointments", d: "Turn interest into confirmed bookings." } },
      reviews: { bs: { t: "Recenzije", d: "Izgradite povjerenje kroz iskustva stvarnih klijenata." }, en: { t: "Reviews", d: "Build trust through real customer experiences." } },
      automation: { bs: { t: "Automatizacija", d: "Neka se rutinski posao odvija sam od sebe." }, en: { t: "Automation", d: "Let routine work happen automatically." } },
      analytics: { bs: { t: "Analitika", d: "Vidite tačno šta funkcioniše — i šta ne." }, en: { t: "Analytics", d: "See exactly what's working — and what isn't." } },
      comm: { bs: { t: "Komunikacija", d: "Jedan tok za svaku poruku i upit klijenta." }, en: { t: "Communication", d: "One stream for every message and inquiry." } }
    };
    var wrap = $("#ecoWrap"); if (!wrap) return;
    var stage = $("#ecoStage"), svg = $("#ecoSvg");
    var eyebrow = $("#ecoPanelEyebrow"), title = $("#ecoPanelTitle"), desc = $("#ecoPanelDesc");
    var center = $("#ecoCenter"), linesLayer = $("#ecoLinesLayer"), nodesLayer = $("#ecoNodesLayer");
    var chips = $$(".eco-chip");
    var shownKey = null;

    function show(key) {
      shownKey = key && ECO[key] ? key : null;
      if (shownKey) { eyebrow.textContent = ui("selected"); title.textContent = ECO[key][currentLang].t; desc.textContent = ECO[key][currentLang].d; }
      else { eyebrow.textContent = tr("eco.panel.hint", currentLang); title.textContent = "DigitalAdvero"; desc.textContent = tr("eco.panel.default", currentLang); }
    }
    document.addEventListener("da:langchange", function () { show(shownKey); });

    function setLine(id, on) { var l = id && document.getElementById(id); if (l) l.classList.toggle("line-active", on); }
    $$(".eco-node-g", svg).forEach(function (node) {
      var key = node.getAttribute("data-key"), line = node.getAttribute("data-line");
      function on() { node.classList.add("node-active"); setLine(line, true); if (center) center.classList.add("center-active"); show(key); }
      function off() { node.classList.remove("node-active"); setLine(line, false); if (center) center.classList.remove("center-active"); show(null); }
      node.addEventListener("mouseenter", on); node.addEventListener("mouseleave", off);
      node.addEventListener("focus", on); node.addEventListener("blur", off);
      node.addEventListener("click", on);
      node.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); on(); } });
    });
    if (center) {
      center.addEventListener("mouseenter", function () { center.classList.add("center-active"); show(null); });
      center.addEventListener("mouseleave", function () { center.classList.remove("center-active"); });
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var was = chip.classList.contains("chip-active");
        chips.forEach(function (c) { c.classList.remove("chip-active"); });
        if (was) { show(null); return; }
        chip.classList.add("chip-active"); show(chip.getAttribute("data-key"));
      });
    });
    if (canHover && !reduceMotion && stage) {
      stage.addEventListener("mousemove", function (e) {
        var r = stage.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        if (linesLayer) linesLayer.style.transform = "translate(" + (px * 6) + "px," + (py * 6) + "px)";
        if (nodesLayer) nodesLayer.style.transform = "translate(" + (px * 14) + "px," + (py * 14) + "px)";
      }, { passive: true });
      stage.addEventListener("mouseleave", function () { if (linesLayer) linesLayer.style.transform = ""; if (nodesLayer) nodesLayer.style.transform = ""; });
    }
    show(null);
  })();

  /* ---------- 9. Business simulator ---------- */
  (function simulator() {
    var DATA = {
      barber: { bs: ["Google pretraga", "Web stranica", "Novi klijent", "Termin", "Podsjetnik", "Posjeta", "Recenzija", "Redovni klijent"], en: ["Google search", "Website", "New customer", "Appointment", "Reminder", "Visit", "Review", "Repeat customer"] },
      dentist: { bs: ["Google pretraga", "Web stranica", "Upit", "Termin", "Podsjetnik", "Pacijent", "Praćenje", "Recenzija"], en: ["Google search", "Website", "Inquiry", "Appointment", "Reminder", "Patient", "Follow-up", "Review"] },
      restaurant: { bs: ["Google pretraga", "Web stranica / meni", "Rezervacija", "Potvrda", "Podsjetnik", "Posjeta", "Recenzija", "Povratak gosta"], en: ["Google search", "Website / menu", "Reservation", "Confirmation", "Reminder", "Visit", "Review", "Returning guest"] },
      shop: { bs: ["Google pretraga", "Google profil", "Upit o proizvodu", "Odgovor", "Posjeta", "Kupovina", "Recenzija", "Povratak kupca"], en: ["Google search", "Google profile", "Product inquiry", "Response", "Visit", "Purchase", "Review", "Returning customer"] },
      gym: { bs: ["Google pretraga", "Web stranica", "Prijava", "Potvrda", "Prvi trening", "Praćenje napretka", "Recenzija", "Obnova članarine"], en: ["Google search", "Website", "Sign-up", "Confirmation", "First session", "Progress tracking", "Review", "Renewal"] },
      property: { bs: ["Google pretraga", "Oglas", "Upit", "Obilazak", "Ponuda", "Ugovor", "Recenzija", "Preporuka"], en: ["Google search", "Listing", "Inquiry", "Viewing", "Offer", "Contract", "Review", "Referral"] }
    };
    var ICONS = [
      '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3l5.2 5.2"/>',
      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9.5h18"/>',
      '<path d="M4 5h16v11H9l-4 4V5z"/>',
      '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
      '<path d="M12 3a5 5 0 0 0-5 5v3.5L5 16h14l-2-4.5V8a5 5 0 0 0-5-5z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
      '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>',
      '<path d="M12 3.5l2.6 5.6 6 .7-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6-4.4-4.2 6-.7z"/>',
      '<path d="M4 12a8 8 0 0 1 13.6-5.7"/><path d="M20 12a8 8 0 0 1-13.6 5.7"/><path d="M17.6 4.2v3.3h-3.2"/><path d="M6.4 19.8v-3.3h3.2"/>'
    ];
    var flow = $("#simFlow"), tabs = $$(".sim-tab"); if (!flow) return;
    var biz = "barber", token = 0, litTimer = null, visible = false;

    function stepEl(i, total, label) {
      var d = document.createElement("div");
      d.className = "sim-step";
      d.style.transitionDelay = (i * 0.07) + "s";
      d.innerHTML = '<span class="sim-step-icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[i % ICONS.length] + '</svg></span><span><span class="sim-step-meta"></span><span class="sim-step-label"></span></span>';
      d.querySelector(".sim-step-meta").textContent = ui("step") + " " + (i + 1) + " / " + total;
      d.querySelector(".sim-step-label").textContent = label;
      return d;
    }
    function startLit() {
      clearInterval(litTimer);
      var els = $$(".sim-step", flow), i = -1;
      if (reduceMotion || !els.length) return;
      litTimer = setInterval(function () {
        if (!visible || document.hidden) return;
        els.forEach(function (e) { e.classList.remove("is-lit"); });
        i = (i + 1) % els.length; els[i].classList.add("is-lit");
      }, 1100);
    }
    function render() {
      var my = ++token, steps = DATA[biz][currentLang];
      function build() {
        if (my !== token) return;
        flow.innerHTML = "";
        steps.forEach(function (label, i) { flow.appendChild(stepEl(i, steps.length, label)); });
        flow.classList.remove("is-leaving");
        requestAnimationFrame(function () { requestAnimationFrame(function () {
          if (my !== token) return;
          $$(".sim-step", flow).forEach(function (e) { e.classList.add("is-in"); });
          startLit();
        }); });
      }
      if (flow.children.length) { flow.classList.add("is-leaving"); clearInterval(litTimer); setTimeout(build, 220); } else build();
    }
    function select(tab, focus) {
      tabs.forEach(function (t) { var on = t === tab; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
      flow.setAttribute("aria-labelledby", tab.id);
      biz = tab.getAttribute("data-biz"); render();
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, idx) {
      tab.addEventListener("click", function () { if (!tab.classList.contains("is-active")) select(tab); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(idx + 1) % tabs.length];
        else if (e.key === "ArrowLeft") n = tabs[(idx - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") n = tabs[0]; else if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    document.addEventListener("da:langchange", render);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.25 }).observe(flow); else visible = true;
    render();
  })();

  /* ---------- 10. FAQ accordion ---------- */
  $$(".faq-item").forEach(function (item) {
    var btn = $(".faq-q", item);
    btn.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
      $$(".faq-item.is-open").forEach(function (o) { o.classList.remove("is-open"); $(".faq-q", o).setAttribute("aria-expanded", "false"); });
      if (!open) { item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
    });
  });

  /* ---------- 11. Contact form (opens the visitor's email app — GitHub Pages is static) ---------- */
  (function contactForm() {
    var form = $("#consultForm"), ok = $("#formSuccess"); if (!form) return;
    function looksLikeContact(v) { return v.indexOf("@") > 0 || v.replace(/\D/g, "").length >= 6; }
    ["f-name", "f-biz", "f-contact", "f-type"].forEach(function (id) {
      var f = document.getElementById(id);
      f.addEventListener("input", function () { f.closest(".field").classList.remove("is-invalid"); f.removeAttribute("aria-invalid"); });
      f.addEventListener("change", function () { f.closest(".field").classList.remove("is-invalid"); f.removeAttribute("aria-invalid"); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true, firstBad = null;
      ["f-name", "f-biz", "f-contact", "f-type"].forEach(function (id) {
        var f = document.getElementById(id), v = f.value.trim();
        var bad = !v || (id === "f-contact" && !looksLikeContact(v));
        f.closest(".field").classList.toggle("is-invalid", bad);
        if (bad) { f.setAttribute("aria-invalid", "true"); valid = false; if (!firstBad) firstBad = f; }
      });
      if (!valid) { ok.classList.remove("is-shown"); firstBad.focus(); return; }
      var g = function (id) { return document.getElementById(id).value.trim(); };
      var body = "Ime: " + g("f-name") + "\nBiznis: " + g("f-biz") + "\nKontakt: " + g("f-contact") + "\nVrsta biznisa: " + g("f-type") + "\nPotrebna pomoć: " + g("f-help") + "\nPoruka: " + g("f-msg");
      ok.classList.add("is-shown");
      window.location.href = "mailto:digitaladvero@gmail.com?subject=" + encodeURIComponent(ui("subject") + g("f-biz")) + "&body=" + encodeURIComponent(body);
    });
  })();

  /* ---------- Init ---------- */
  var savedLang = store("da_lang");
  if (savedLang === "en") applyLang("en", false); else { updateThemeLabel(); updateMenuLabel(); }
})();
