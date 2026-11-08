/* DigitalAdvero — app.js
   1 intro · 2 text split into lines · 3 reveals · 4 smooth scroll + anchor links · 5 scroll effects
   6 marquee · 7 cursor · 8 service cards on touch · 9 menu · 10 contact form · 11 cookies · 12 init
   No libraries. Everything degrades to a normal, fully visible page without JavaScript or with "reduce motion". */
(function () {
  "use strict";
  window.DA_READY = true;

  var doc = document, root = doc.documentElement, body = doc.body;
  var media = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduce = media("(prefers-reduced-motion: reduce)");
  var fine = media("(hover: hover) and (pointer: fine)");
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var vh = window.innerHeight;

  /* ---------- 1. Intro ---------- */
  function runIntro(done) {
    var intro = $("#intro");
    if (!intro || !root.classList.contains("intro-on")) {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
      root.classList.remove("intro-on");
      done();
      return;
    }
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    root.classList.add("is-locked");
    setTimeout(function () { intro.classList.add("s1"); }, 60);
    // the wordmark waits for its font (at most ~1 s), then the curtain lifts
    whenFonts(380, 1000, function () {
      intro.classList.add("s2");
      setTimeout(function () { intro.classList.add("s3"); done(); }, 1050);
      setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
        root.classList.remove("intro-on", "is-locked");
      }, 2150);
    });
  }
  var fontsLoaded = !(doc.fonts && doc.fonts.ready);
  if (!fontsLoaded) doc.fonts.ready.then(function () { fontsLoaded = true; }, function () { fontsLoaded = true; });
  // run fn once the fonts are in, but not before minMs and not after maxMs
  function whenFonts(minMs, maxMs, fn) {
    var t0 = Date.now(), fired = false;
    (function check() {
      if (fired) return;
      var dt = Date.now() - t0;
      if ((fontsLoaded && dt >= minMs) || dt >= maxMs) { fired = true; fn(); } else setTimeout(check, 40);
    })();
  }

  /* ---------- 2. Text split into lines (for the line-by-line reveal) ---------- */
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  // Words of an element, keeping the classes of inline wrappers (e.g. <span class="magic-word">).
  function tokens(el) {
    var list = [], space = false;
    (function walk(node, cls) {
      for (var n = node.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) {
          var parts = n.nodeValue.split(/(\s+)/);
          for (var i = 0; i < parts.length; i++) {
            if (!parts[i]) continue;
            if (/^\s+$/.test(parts[i])) { space = true; continue; }
            list.push({ html: '<span class="w' + (cls ? " " + cls : "") + '">' + esc(parts[i]) + "</span>", sp: space && list.length > 0 });
            space = false;
          }
        } else if (n.nodeType === 1) {
          walk(n, (cls + " " + (n.getAttribute("class") || "")).trim());
        }
      }
    })(el, "");
    return list;
  }
  function join(list) {
    var s = "";
    for (var i = 0; i < list.length; i++) s += (i && list[i].sp ? " " : "") + list[i].html;
    return s;
  }
  function splitLines(el) {
    if (el.__src === undefined) el.__src = el.innerHTML; else el.innerHTML = el.__src;
    var list = tokens(el);
    el.innerHTML = join(list);
    var words = el.querySelectorAll(".w"), lines = [], cur = null, top = null;
    for (var i = 0; i < words.length; i++) {
      var t = words[i].offsetTop;
      if (top === null || t > top + 3) { cur = []; lines.push(cur); top = t; }
      cur.push(list[i]);
    }
    el.innerHTML = lines.map(function (ln, i) { return '<span class="ln"><span style="--i:' + i + '">' + join(ln) + "</span></span>"; }).join("");
    el.classList.add("is-split");
  }
  var splits = [];
  function doSplits() { splits.forEach(splitLines); }

  /* ---------- 3. Reveals ---------- */
  function show(el) { el.classList.add("is-in"); }
  function initReveals() {
    var els = $$("[data-split]:not([data-hero]), [data-reveal]:not([data-hero])");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }
  function revealHero() {
    $$("[data-hero]").forEach(show);
    window.DA_REVEALED = true;
    try { doc.dispatchEvent(new CustomEvent("da:reveal")); } catch (e) {}
  }

  /* ---------- 4. Smooth scroll (mouse wheel only) + anchor links ---------- */
  var sm = { on: false, y: 0, target: 0, run: false, last: 0 };
  function maxY() { return Math.max(0, root.scrollHeight - window.innerHeight); }
  function locked() {
    return root.classList.contains("menu-open") || root.classList.contains("is-locked") || body.style.overflow === "hidden" || !!$(".secret-overlay");
  }
  function scrollsInside(t, dy) {
    for (var el = t; el && el.nodeType === 1 && el !== body && el !== root; el = el.parentElement) {
      if (el.scrollHeight > el.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) {
        if ((dy < 0 && el.scrollTop > 0) || (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1)) return true;
      }
    }
    return false;
  }
  function stepSmooth(now) {
    var dt = Math.min(64, now - sm.last); sm.last = now;
    sm.y += (sm.target - sm.y) * (1 - Math.pow(0.9, dt / 16.667));
    if (Math.abs(sm.target - sm.y) < 0.5) { sm.y = sm.target; sm.run = false; }
    window.scrollTo(0, sm.y);
    if (sm.run) requestAnimationFrame(stepSmooth);
  }
  function startSmooth() { if (!sm.run) { sm.run = true; sm.last = performance.now(); requestAnimationFrame(stepSmooth); } }
  function initSmooth() {
    if (reduce || !fine) return;
    sm.on = true;
    window.addEventListener("wheel", function (e) {
      if (e.ctrlKey || e.defaultPrevented || locked()) return;
      var dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 36; else if (e.deltaMode === 2) dy *= window.innerHeight;
      if (Math.abs(e.deltaX) > Math.abs(dy) || scrollsInside(e.target, dy)) return;
      e.preventDefault();
      if (!sm.run) sm.y = sm.target = window.scrollY;
      sm.target = clamp(sm.target + dy, 0, maxY());
      startSmooth();
    }, { passive: false });
  }
  function scrollToY(y) {
    y = clamp(y, 0, maxY());
    if (sm.on) { if (!sm.run) sm.y = window.scrollY; sm.target = y; startSmooth(); }
    else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }
  doc.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute("href");
    var target = id === "#top" ? body : (id.length > 1 ? doc.getElementById(id.slice(1)) : null);
    if (!target) return;
    e.preventDefault();
    setMenu(false);
    scrollToY(id === "#top" ? 0 : target.getBoundingClientRect().top + window.scrollY);
    if (id !== "#top") {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      try { target.focus({ preventScroll: true }); } catch (err) {}
    }
  });

  /* ---------- 5. Scroll effects: nav, filling text, white panel, footer wordmark ---------- */
  var nav = $("#nav"), lastY = window.scrollY, navHidden = false, ticking = false;
  var fills = [], panel = $("[data-panel]"), wordmark = $("[data-wordmark]"), footer = $(".footer");
  var cards = $$(".card"), navLinks = $$(".nav-links a");
  var sections = navLinks.map(function (a) { return doc.getElementById(a.getAttribute("href").slice(1)); });

  function prepFill(el) {
    el.innerHTML = join(tokens(el));
    var st = { el: el, ws: $$(".w", el), n: 0 };
    if (reduce) { st.ws.forEach(function (w) { w.classList.add("on"); }); st.n = st.ws.length; }
    return st;
  }
  function updateFill(st) {
    if (reduce) return;
    var r = st.el.getBoundingClientRect();
    var n = Math.round(clamp((vh * 0.86 - r.top) / (r.height + vh * 0.38), 0, 1) * st.ws.length);
    if (n === st.n) return;
    for (var i = Math.min(n, st.n); i < Math.max(n, st.n); i++) st.ws[i].classList.toggle("on", i < n);
    st.n = n;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  function update() {
    ticking = false;
    var y = window.scrollY, dy = y - lastY;
    lastY = y;
    if (nav) {
      nav.classList.toggle("is-scrolled", y > 24);
      if (!root.classList.contains("menu-open")) {
        if (y > 240 && dy > 4 && !navHidden) { navHidden = true; nav.classList.add("is-hidden"); }
        else if ((dy < -4 || y <= 240) && navHidden) { navHidden = false; nav.classList.remove("is-hidden"); }
      }
    }
    mqKick(dy);
    fills.forEach(updateFill);
    if (panel && !reduce) {
      var pr = panel.getBoundingClientRect();
      panel.style.setProperty("--p", clamp((vh - pr.top) / (vh * 0.55), 0, 1).toFixed(3));
    }
    if (wordmark && footer && !reduce) {
      var fr = footer.getBoundingClientRect();
      wordmark.style.setProperty("--rise", ((1 - clamp((vh - fr.top) / fr.height, 0, 1)) * 60).toFixed(2) + "%");
    }
    if (!fine) activeCard();
    var cur = -1;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < vh * 0.45) cur = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle("is-current", i === cur); });
  }

  /* ---------- 6. Marquee (speeds up while you scroll) ---------- */
  var marquees = [], mqRaf = 0, mqLast = 0, boost = 0;
  function initMarquee() {
    $$("[data-marquee]").forEach(function (m) {
      var track = $(".mq-track", m), group = $(".mq-group", m);
      if (!track || !group) return;
      var mq = { m: m, track: track, group: group, w: 0, x: 0, vis: false };
      fillMarquee(mq);
      marquees.push(mq);
      if (reduce) return;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) { mq.vis = es[0].isIntersecting; if (mq.vis) startMq(); }).observe(m);
      } else { mq.vis = true; startMq(); }
    });
  }
  function fillMarquee(mq) {
    $$(".mq-group[aria-hidden]", mq.track).forEach(function (c) { c.parentNode.removeChild(c); });
    mq.w = mq.group.offsetWidth;
    var n = 0;
    while (mq.track.scrollWidth < window.innerWidth + mq.w * 2 && n < 8) {
      var c = mq.group.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      mq.track.appendChild(c);
      n++;
    }
  }
  function mqKick(dy) { boost = Math.min(320, boost + Math.abs(dy) * 1.6); }
  function startMq() { if (!mqRaf) { mqLast = performance.now(); mqRaf = requestAnimationFrame(mqLoop); } }
  function mqLoop(now) {
    var dt = Math.min(0.05, (now - mqLast) / 1000), any = false;
    mqLast = now;
    boost *= Math.pow(0.04, dt);
    marquees.forEach(function (mq) {
      if (!mq.vis || !mq.w) return;
      any = true;
      mq.x -= (window.innerWidth < 700 ? 38 : 64) * dt + boost * dt;
      if (mq.x <= -mq.w) mq.x += mq.w;
      mq.track.style.transform = "translate3d(" + mq.x.toFixed(2) + "px,0,0)";
    });
    mqRaf = any ? requestAnimationFrame(mqLoop) : 0;
  }

  /* ---------- 7. Cursor (mouse only) ---------- */
  function initCursor() {
    var cur = $(".cursor");
    if (!fine || reduce || !cur) return;
    root.classList.add("has-cursor");
    var x = -100, y = -100, cx = -100, cy = -100, raf = 0, shown = false;
    function loop() {
      cx += (x - cx) * 0.38; cy += (y - cy) * 0.38;
      cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.2 ? requestAnimationFrame(loop) : 0;
    }
    doc.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; cx = x; cy = y; cur.classList.add("is-on"); }
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    doc.addEventListener("mouseover", function (e) {
      var t = e.target;
      if (!t.closest) return;
      var field = t.closest("input, textarea, select");
      cur.classList.toggle("is-hidden", !!field);
      cur.classList.toggle("is-big", !field && !!t.closest("a, button, .card, label"));
      cur.classList.toggle("is-dark", !!t.closest(".panel, .cookie"));
    });
    doc.documentElement.addEventListener("mouseleave", function () { cur.classList.remove("is-on"); shown = false; });
    // give the normal cursor back while the hidden logo scene is open
    new MutationObserver(function () { root.classList.toggle("has-cursor", !$(".secret-overlay")); }).observe(body, { childList: true });
    // the orange fill of a service card grows from where the mouse enters
    cards.forEach(function (c) {
      function at(e) { var r = c.getBoundingClientRect(); c.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%"); c.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%"); }
      c.addEventListener("mouseenter", at);
      c.addEventListener("mouseleave", at);
    });
  }

  /* ---------- 8. Service cards on touch screens: the card passing the middle lights up ---------- */
  function activeCard() {
    var mid = vh * 0.55, pick = null;
    var rows = {};
    cards.forEach(function (c) {
      var r = c.getBoundingClientRect(), d = r.top + r.height / 2 - mid;
      if (Math.abs(d) < r.height * 0.62) { var k = Math.round(r.top); (rows[k] = rows[k] || { d: d, list: [] }).list.push(c); }
    });
    for (var k in rows) {
      var row = rows[k];
      row.list.sort(function (a, b) { return a.getBoundingClientRect().left - b.getBoundingClientRect().left; });
      pick = row.list.length > 1 && row.d < 0 ? row.list[row.list.length - 1] : row.list[0];
      break;
    }
    cards.forEach(function (c) { c.classList.toggle("is-active", c === pick); });
  }

  /* ---------- 9. Mobile menu ---------- */
  var menuBtn = $(".menu-btn");
  function setMenu(open) {
    if (!menuBtn || root.classList.contains("menu-open") === open) return;
    root.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    var txt = $(".menu-txt", menuBtn);
    if (txt) txt.textContent = open ? "Zatvori" : "Meni";
    if (open) {
      if (nav) nav.classList.remove("is-hidden");
      navHidden = false;
      var first = $(".menu-links a");
      if (first) setTimeout(function () { try { first.focus({ preventScroll: true }); } catch (e) {} }, 300);
    }
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(!root.classList.contains("menu-open")); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* ---------- 10. Contact form (opens the visitor's email app — GitHub Pages is static) ---------- */
  function initForm() {
    var form = $("#contactForm"), ok = $("#formOk");
    if (!form) return;
    var required = ["f-name", "f-biz", "f-contact"];
    var val = function (id) { var el = doc.getElementById(id); return el ? el.value.trim() : ""; };
    var isContact = function (v) { return /\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, "").length >= 6; };
    required.forEach(function (id) {
      var el = doc.getElementById(id);
      el.addEventListener("input", function () { el.closest(".field").classList.remove("is-bad"); el.removeAttribute("aria-invalid"); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = null;
      required.forEach(function (id) {
        var el = doc.getElementById(id), v = el.value.trim();
        var bad = !v || (id === "f-contact" && !isContact(v));
        el.closest(".field").classList.toggle("is-bad", bad);
        if (bad) { el.setAttribute("aria-invalid", "true"); if (!first) first = el; } else el.removeAttribute("aria-invalid");
      });
      if (first) { if (ok) ok.classList.remove("is-shown"); first.focus(); return; }
      var msg = "Ime i prezime: " + val("f-name") + "\nBiznis: " + val("f-biz") + "\nKontakt: " + val("f-contact") + "\n\nPoruka:\n" + (val("f-msg") || "-");
      if (ok) ok.classList.add("is-shown");
      window.location.href = "mailto:digitaladvero@gmail.com?subject=" + encodeURIComponent("Upit s web stranice — " + val("f-biz")) + "&body=" + encodeURIComponent(msg);
    });
  }

  /* ---------- 11. Cookies: "Prihvati sve" or "Samo neophodni" ---------- */
  var CONSENT_KEY = "da_consent", cookieEl = $("#cookie");
  function getConsent() {
    try { var c = JSON.parse(localStorage.getItem(CONSENT_KEY)); return c && c.v === 1 ? c : null; } catch (e) { return null; }
  }
  function applyConsent(c) {
    window.DA_CONSENT = c;
    // scripts marked data-consent="analytics" (see the comment in <head>) only run after "Prihvati sve"
    if (c && c.analytics) {
      $$('script[type="text/plain"][data-consent="analytics"]').forEach(function (s) {
        var n = doc.createElement("script");
        if (s.getAttribute("data-src")) { n.src = s.getAttribute("data-src"); n.async = true; } else n.text = s.text;
        s.parentNode.replaceChild(n, s);
      });
    }
    try { doc.dispatchEvent(new CustomEvent("da:consent", { detail: c })); } catch (e) {}
  }
  function clearAnalyticsCookies() {
    var host = location.hostname, domains = ["", host, "." + host, "." + host.split(".").slice(-2).join(".")];
    doc.cookie.split(";").forEach(function (part) {
      var name = part.split("=")[0].trim();
      if (/^(_ga|_gid|_gat|_gcl)/.test(name)) {
        domains.forEach(function (d) { doc.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : ""); });
      }
    });
  }
  function setConsent(all) {
    var prev = getConsent();
    var c = { v: 1, necessary: true, analytics: !!all, date: new Date().toISOString() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch (e) {}
    if (cookieEl) cookieEl.classList.remove("is-shown");
    if (prev && prev.analytics && !c.analytics) { clearAnalyticsCookies(); location.reload(); return; }
    applyConsent(c);
  }
  function initCookies(delay) {
    if (!cookieEl) return;
    $$("[data-consent-choice]").forEach(function (b) {
      b.addEventListener("click", function () { setConsent(b.getAttribute("data-consent-choice") === "all"); });
    });
    $$("[data-cookie-settings]").forEach(function (b) {
      b.addEventListener("click", function () {
        cookieEl.classList.add("is-shown");
        var first = $("[data-consent-choice]", cookieEl);
        if (first) setTimeout(function () { try { first.focus({ preventScroll: true }); } catch (e) {} }, 80);
      });
    });
    var c = getConsent();
    if (c) applyConsent(c);
    else setTimeout(function () { cookieEl.classList.add("is-shown"); }, delay);
  }

  /* ---------- 12. Footer wordmark fills the width ---------- */
  function fitWordmark() {
    if (!wordmark) return;
    var wrap = wordmark.parentNode, cs = getComputedStyle(wrap);
    var avail = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    wordmark.style.fontSize = "100px";
    var w = wordmark.getBoundingClientRect().width;
    if (w > 0) wordmark.style.fontSize = (100 * avail / w).toFixed(2) + "px";
  }

  /* ---------- Init ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  splits = $$("[data-split]");
  fills = $$("[data-fill]").map(prepFill);
  initForm();
  initCursor();
  initSmooth();

  // Line splitting and measuring wait for the fonts (or 1.2 s at most); the intro starts right away.
  var started = false;
  function start() {
    if (started) return;
    started = true;
    doSplits();
    fitWordmark();
    initMarquee();
    initReveals();
    update();
  }
  if (doc.fonts && doc.fonts.ready) {
    doc.fonts.ready.then(function () {
      if (started) { doSplits(); fitWordmark(); marquees.forEach(fillMarquee); } else start();
    }, start);
  }
  setTimeout(start, 1200);
  initCookies(root.classList.contains("intro-on") ? 2300 : 900);
  runIntro(function () { start(); revealHero(); });

  window.addEventListener("scroll", onScroll, { passive: true });
  var lastW = window.innerWidth, rt = 0;
  window.addEventListener("resize", function () {
    vh = window.innerHeight;
    onScroll();
    if (window.innerWidth === lastW) return;   // mobile address bar: height only
    lastW = window.innerWidth;
    clearTimeout(rt);
    rt = setTimeout(function () { doSplits(); fitWordmark(); marquees.forEach(fillMarquee); onScroll(); }, 160);
  });
})();
