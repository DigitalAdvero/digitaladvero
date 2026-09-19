/* DigitalAdvero — secret.js
   The founder's hidden personal scene: click the logo five times within 2.5 seconds.
   Kept exactly as designed; only the code structure was tidied (and a broken CSS string fixed). */
(function () {
  "use strict";
  var logo = document.querySelector(".brand");
  if (!logo) return;

  var clickCount = 0, lastClickTime = 0, WINDOW_MS = 2500;
  logo.addEventListener("click", function (e) {
    var now = Date.now();
    if (now - lastClickTime > WINDOW_MS) clickCount = 0;
    lastClickTime = now;
    clickCount++;
    if (clickCount >= 5) { clickCount = 0; e.preventDefault(); openScene(); }
  });

  var CSS_TEXT = [
    ".secret-overlay{position:fixed;inset:0;z-index:9999;opacity:0;transition:opacity .9s ease;display:flex;align-items:center;justify-content:center;font-family:'Inter','Segoe UI',Arial,sans-serif;touch-action:none;}",
    ".secret-overlay.secret-visible{opacity:1;}",
    ".secret-overlay.secret-leaving{opacity:0;transition:opacity .6s ease;}",
    ".secret-backdrop{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%, rgba(6,10,18,.90), rgba(3,5,10,.97));backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);}",
    ".secret-canvas{position:absolute;inset:0;}",
    ".secret-close{position:absolute;top:22px;right:24px;z-index:2;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.5);font-size:1.15rem;line-height:1;cursor:pointer;transition:background .2s ease,color .2s ease;}",
    ".secret-close:hover{background:rgba(255,255,255,.12);color:#fff;}",
    ".secret-panel{position:relative;z-index:1;max-width:520px;width:88%;padding:2.6rem 2.4rem;border-radius:18px;background:rgba(14,19,31,.4);border:1px solid rgba(143,187,255,.16);backdrop-filter:blur(22px) saturate(140%);-webkit-backdrop-filter:blur(22px) saturate(140%);text-align:center;opacity:0;transform:scale(.94) translateY(8px);transition:opacity 1.4s ease,transform 1.4s cubic-bezier(.2,.8,.2,1);box-shadow:0 0 60px rgba(91,147,255,.10),0 20px 60px rgba(0,0,0,.5);}",
    ".secret-panel.secret-panel-in{opacity:1;transform:scale(1) translateY(0);}",
    ".secret-status{font-size:.66rem;letter-spacing:.09em;color:rgba(143,187,255,.65);margin:0 0 1.2rem;min-height:1em;opacity:0;transition:opacity 1.3s ease;}",
    ".secret-status.secret-show{opacity:1;}",
    ".secret-line{font-size:1rem;color:rgba(228,234,248,.8);line-height:1.65;min-height:1.4em;margin:0 0 1rem;opacity:0;transition:opacity 1.6s ease;}",
    ".secret-line.secret-show{opacity:1;}",
    ".secret-line-1.secret-fade{opacity:0;transition:opacity 1.3s ease;}",
    ".secret-name-row{position:relative;display:inline-block;}",
    ".secret-name{font-family:'Space Grotesk','Segoe UI',Arial,sans-serif;font-size:2.05rem;font-weight:600;color:#fff;margin:0 0 1.1rem;min-height:1.15em;opacity:0;transform:scale(1.07);transition:opacity 1.8s ease,transform 1.8s cubic-bezier(.2,.8,.2,1),font-size .9s ease,color .9s ease;}",
    ".secret-name.secret-show{opacity:1;transform:scale(1);}",
    ".secret-name.secret-settle{font-size:1.45rem;color:rgba(255,255,255,.8);}",
    ".secret-spark{position:absolute;top:50%;right:-6px;width:5px;height:5px;border-radius:50%;background:#fff;box-shadow:0 0 8px 2px rgba(143,187,255,.9);opacity:0;}",
    ".secret-spark.secret-fire{animation:secretSpark 1.8s ease-out forwards;}",
    "@keyframes secretSpark{0%{opacity:1;transform:translate(0,-50%) scale(1);}100%{opacity:0;transform:translate(160px,-120px) scale(.3);}}",
    ".secret-line-2{font-size:1.08rem;font-style:italic;color:#F1EFFF;line-height:1.7;margin-top:.3rem;}",
    ".secret-sign{margin-top:1.6rem;font-size:.86rem;color:rgba(200,210,230,.55);opacity:0;transition:opacity 1.6s ease;}",
    ".secret-sign.secret-show{opacity:1;}",
    "@media (max-width:600px){.secret-panel{padding:2rem 1.5rem;width:92%;}.secret-name{font-size:1.6rem;}.secret-line-2{font-size:1rem;}}",
    ".secret-arabic{position:absolute;top:0;left:0;z-index:0;font-family:'Noto Naskh Arabic','Segoe UI',Tahoma,Arial,sans-serif;color:rgba(214,226,250,.68);opacity:0;pointer-events:none;white-space:nowrap;text-shadow:0 0 12px rgba(143,187,255,.35),0 0 26px rgba(91,147,255,.18);transition:opacity 2.2s ease;will-change:transform,opacity;letter-spacing:.01em;}",
    ".secret-arabic.secret-show{opacity:.62;}",
    ".secret-arabic.secret-wide{max-width:min(78vw,420px);white-space:normal;text-align:center;line-height:1.7;font-size:.95rem;}",
    ".secret-mute{position:absolute;top:22px;right:68px;z-index:2;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.5);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,color .2s ease;}",
    ".secret-mute:hover{background:rgba(255,255,255,.12);color:#fff;}",
    ".secret-mute svg{width:15px;height:15px;}",
    ".secret-mute .secret-mute-off{display:none;}",
    ".secret-mute.is-muted .secret-mute-on{display:none;}",
    ".secret-mute.is-muted .secret-mute-off{display:block;}",
    "@media (max-width:600px){.secret-mute{top:auto;bottom:22px;right:24px;}.secret-arabic{font-size:.92rem;}}",
    "@media (prefers-reduced-motion: reduce){.secret-arabic{transition-duration:.6s !important;}.secret-overlay,.secret-panel,.secret-line,.secret-name,.secret-sign,.secret-status{transition-duration:.4s !important;}.secret-spark{display:none;}}"
  ].join("");

  var sceneActive = false, sceneEl = null, rafId = null, timeouts = [], listeners = [];
  function addL(t, ty, fn, o) { t.addEventListener(ty, fn, o); listeners.push([t, ty, fn, o]); }
  function sched(fn, ms) { var id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function clearAll() { timeouts.forEach(function (id) { clearTimeout(id); }); timeouts = []; }

  function ensureStyles() {
    if (!document.getElementById("secretArabicFont")) {
      var link = document.createElement("link");
      link.id = "secretArabicFont"; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@500;600&display=swap";
      document.head.appendChild(link);
    }
    if (document.getElementById("secretStyles")) return;
    var s = document.createElement("style");
    s.id = "secretStyles"; s.textContent = CSS_TEXT;
    document.head.appendChild(s);
  }

  function openScene() {
    if (sceneActive) return;
    sceneActive = true;
    ensureStyles();
    window.__heroParticlesSlow = true;
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var isMobile = window.innerWidth < 760;

    sceneEl = document.createElement("div");
    sceneEl.className = "secret-overlay";
    sceneEl.setAttribute("role", "dialog");
    sceneEl.setAttribute("aria-modal", "true");
    sceneEl.innerHTML =
      '<div class="secret-backdrop"></div>' +
      '<canvas class="secret-canvas"></canvas>' +
      '<div class="secret-arabic" id="ar-hayati" dir="rtl" lang="ar">حياتي</div>' +
      '<div class="secret-arabic" id="ar-ahwak" dir="rtl" lang="ar">أهواك</div>' +
      '<div class="secret-arabic" id="ar-ameerati" dir="rtl" lang="ar">أميرتي</div>' +
      '<div class="secret-arabic" id="ar-noor" dir="rtl" lang="ar">نور عيني</div>' +
      '<div class="secret-arabic secret-wide" id="ar-long" dir="rtl" lang="ar">دائماً معك، دائماً لك</div>' +
      '<button class="secret-close" aria-label="Close" type="button">×</button>' +
      '<button class="secret-mute" aria-label="Mute music" type="button">' +
        '<svg class="secret-mute-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a9 9 0 0 1 0 12"/></svg>' +
        '<svg class="secret-mute-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9v6h4l5 5V4L8 9H4z"/><line x1="16" y1="9" x2="21" y2="14"/><line x1="21" y1="9" x2="16" y2="14"/></svg>' +
      '</button>' +
      '<div class="secret-panel">' +
        '<div class="secret-status" id="secretStatus"></div>' +
        '<p class="secret-line secret-line-1" id="secretLine1"></p>' +
        '<div class="secret-name-row"><p class="secret-name" id="secretName"></p><span class="secret-spark" id="secretSpark"></span></div>' +
        '<p class="secret-line secret-line-2" id="secretLine2"></p>' +
        '<p class="secret-sign" id="secretSign"></p>' +
      '</div>';
    document.body.appendChild(sceneEl);
    requestAnimationFrame(function () { sceneEl.classList.add("secret-visible"); });

    var canvas = sceneEl.querySelector(".secret-canvas");
    var ctx = canvas.getContext("2d");
    var w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [], COUNT = reduce ? 0 : (isMobile ? 32 : 88);
    var cx, cy, mx = null, my = null, revealHeart = false, nameBoost = 0;
    var startTime = performance.now();

    /* Audio: assets/theme-song.mp3, faded in/out, with a mute button and a small level analyser */
    var AUDIO_SRC = "assets/theme-song.mp3";
    var audioEl = null, audioCtx = null, analyser = null, audioData = null, muted = false;
    var TARGET_VOL = 0.26;

    function fadeVol(el, target, ms, done) {
      if (!el) return;
      var start = el.volume, t0v = null;
      function step(ts) {
        if (!el) return;
        if (!t0v) t0v = ts;
        var p = Math.min((ts - t0v) / ms, 1);
        el.volume = start + (target - start) * p;
        if (p < 1) { requestAnimationFrame(step); } else if (done) { done(); }
      }
      requestAnimationFrame(step);
    }
    function setupAnalyser() {
      try {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new Ctx();
        var src = audioCtx.createMediaElementSource(audioEl);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 32;
        src.connect(analyser);
        analyser.connect(audioCtx.destination);
        audioData = new Uint8Array(analyser.frequencyBinCount);
      } catch (err) { analyser = null; }
    }
    function audioLevel() {
      if (!analyser || !audioData) return null;
      analyser.getByteFrequencyData(audioData);
      var sum = 0;
      for (var i = 0; i < audioData.length; i++) sum += audioData[i];
      return sum / audioData.length / 255;
    }
    function startAudio() {
      if (!AUDIO_SRC) return;
      try {
        audioEl = new Audio(AUDIO_SRC);
        audioEl.loop = true;
        audioEl.volume = 0;
        audioEl.addEventListener("error", function () { audioEl = null; });
        var p = audioEl.play();
        if (p && p.then) {
          p.then(function () { fadeVol(audioEl, muted ? 0 : TARGET_VOL, 1600); setupAnalyser(); }).catch(function () { audioEl = null; });
        } else { fadeVol(audioEl, muted ? 0 : TARGET_VOL, 1600); setupAnalyser(); }
      } catch (err) { audioEl = null; }
    }
    function stopAudio() {
      if (audioEl) { var el = audioEl; fadeVol(el, 0, 800, function () { el.pause(); el.src = ""; }); }
      if (audioCtx) { try { audioCtx.close(); } catch (err) {} }
      audioCtx = null; analyser = null; audioEl = null;
    }
    var muteBtn = sceneEl.querySelector(".secret-mute");
    addL(muteBtn, "click", function () {
      muted = !muted;
      muteBtn.classList.toggle("is-muted", muted);
      if (audioEl) fadeVol(audioEl, muted ? 0 : TARGET_VOL, 500);
    });
    addL(document, "visibilitychange", function () {
      if (!audioEl) return;
      if (document.hidden) { audioEl.pause(); } else if (!muted) { audioEl.play().catch(function () {}); }
    });
    startAudio();

    function heartPoint(t, scale) {
      var x = 16 * Math.pow(Math.sin(t), 3);
      var y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { x: x * scale, y: y * scale };
    }
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h * 0.4;
      var anchors = isMobile
        ? { hayati: [0.22, 0.09], ahwak: [0.78, 0.14], ameerati: [0.16, 0.85], noor: [0.82, 0.88], long: [0.5, 0.965] }
        : { hayati: [0.16, 0.2], ahwak: [0.87, 0.26], ameerati: [0.14, 0.76], noor: [0.88, 0.72], long: [0.5, 0.94] };
      ["hayati", "ahwak", "ameerati", "noor", "long"].forEach(function (key, i) {
        var el = sceneEl.querySelector("#ar-" + key);
        if (!el) return;
        el.dataset.ax = anchors[key][0]; el.dataset.ay = anchors[key][1]; el.dataset.phase = i * 1.7;
      });
    }
    function initParticles() {
      particles = [];
      for (var i = 0; i < COUNT; i++) {
        var depth = 0.5 + Math.random() * 0.9;
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22 * depth, vy: (Math.random() - 0.5) * 0.22 * depth,
          r: (0.8 + Math.random() * 1.7) * depth, o: (0.14 + Math.random() * 0.4) * Math.min(depth, 1),
          converge: Math.random() < 0.65, special: false, depth: depth
        });
      }
      var scale = Math.min(w, h) * 0.011, n = 14;
      for (var k = 0; k < n; k++) {
        var t = (k / n) * Math.PI * 2, p = heartPoint(t, scale);
        var idx = Math.floor((k / n) * particles.length);
        particles[idx].special = true;
        particles[idx].hx = cx + p.x; particles[idx].hy = cy + p.y - 30;
      }
    }
    var arabicEls = null;
    function drawArabic(now) {
      if (!arabicEls) arabicEls = sceneEl.querySelectorAll(".secret-arabic");
      var t = (now - startTime) * 0.001;
      var mpx = mx != null ? (mx / w - 0.5) : 0, mpy = my != null ? (my / h - 0.5) : 0;
      arabicEls.forEach(function (el) {
        var ax = parseFloat(el.dataset.ax || 0.5), ay = parseFloat(el.dataset.ay || 0.5);
        var phase = parseFloat(el.dataset.phase || 0);
        var radius = el.classList.contains("secret-wide") ? (isMobile ? 10 : 22) : (isMobile ? 12 : 26);
        var ox = Math.cos(t * 0.12 + phase) * radius, oy = Math.sin(t * 0.1 + phase) * radius * 0.55;
        var breathe = 0.85 + Math.sin(t * 0.35 + phase) * 0.15;
        var px = ax * w + ox - mpx * 14, py = ay * h + oy - mpy * 10;
        el.style.transform = "translate3d(" + px + "px," + py + "px,0) translate(-50%,-50%) scale(" + breathe.toFixed(3) + ")";
      });
    }
    function draw(now) {
      if (!sceneActive) return;
      ctx.clearRect(0, 0, w, h);
      var px = mx != null ? mx : cx, py = my != null ? my : cy;
      var parX = (px - w / 2) * 0.018, parY = (py - h / 2) * 0.018;
      var level = audioLevel();
      var pulse = level != null ? (0.85 + level * 0.5) : (0.92 + Math.sin((now || 0) * 0.0012) * 0.08);
      particles.forEach(function (p) {
        if (p.special && revealHeart) {
          p.x += (p.hx - p.x) * 0.035; p.y += (p.hy - p.y) * 0.035;
        } else if (p.converge) {
          var pull = 0.002 + nameBoost;
          p.x += (cx - p.x) * pull; p.y += (cy - p.y) * pull;
          p.x += p.vx; p.y += p.vy;
        } else {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        }
      });
      var maxDist = isMobile ? 65 : 95;
      ctx.lineWidth = 0.6;
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.strokeStyle = "rgba(143,187,255," + ((1 - d / maxDist) * 0.16 * pulse) + ")";
            ctx.beginPath();
            ctx.moveTo(particles[a].x + parX, particles[a].y + parY);
            ctx.lineTo(particles[b].x + parX, particles[b].y + parY);
            ctx.stroke();
          }
        }
      }
      particles.forEach(function (p) {
        var warm = p.special && revealHeart;
        ctx.beginPath();
        ctx.fillStyle = warm ? "rgba(255,214,214," + Math.min(p.o + 0.3, 0.92) + ")" : "rgba(220,232,255," + (p.o * pulse) + ")";
        ctx.arc(p.x + parX, p.y + parY, warm ? p.r * 1.6 : p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reduce) drawArabic(now || performance.now());
      rafId = requestAnimationFrame(draw);
    }
    resize();
    if (COUNT > 0) { initParticles(); draw(); }
    if (reduce) {
      sceneEl.querySelectorAll(".secret-arabic").forEach(function (el) {
        var ax = parseFloat(el.dataset.ax || 0.5) * 100, ay = parseFloat(el.dataset.ay || 0.5) * 100;
        el.style.left = ax + "%"; el.style.top = ay + "%"; el.style.transform = "translate(-50%,-50%)";
      });
    }
    addL(window, "resize", function () { resize(); if (COUNT > 0) initParticles(); }, { passive: true });
    addL(sceneEl, "mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      var ppx = (e.clientX / w - 0.5) * 10, ppy = (e.clientY / h - 0.5) * 10;
      var panel = sceneEl.querySelector(".secret-panel");
      if (panel) panel.style.transform = "translate(" + ppx + "px," + ppy + "px)";
    }, { passive: true });
    addL(sceneEl, "touchmove", function (e) {
      if (e.touches && e.touches[0]) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }
    }, { passive: true });

    var statusEl = sceneEl.querySelector("#secretStatus");
    var line1 = sceneEl.querySelector("#secretLine1");
    var nameEl = sceneEl.querySelector("#secretName");
    var spark = sceneEl.querySelector("#secretSpark");
    var line2 = sceneEl.querySelector("#secretLine2");
    var signEl = sceneEl.querySelector("#secretSign");
    var t0 = reduce ? 200 : 900;

    sched(function () { sceneEl.querySelector(".secret-panel").classList.add("secret-panel-in"); }, reduce ? 150 : 1600);
    sched(function () { line1.textContent = "You found something that wasn't meant for everyone."; line1.classList.add("secret-show"); }, t0 + (reduce ? 300 : 1400));
    sched(function () { line1.classList.add("secret-fade"); }, t0 + (reduce ? 2000 : 4200));
    sched(function () { nameEl.textContent = "Maryam"; nameEl.classList.add("secret-show"); nameBoost = 0.01; sched(function () { nameBoost = 0; }, 1400); }, t0 + (reduce ? 2400 : 4900));
    sched(function () { nameEl.classList.add("secret-settle"); }, t0 + (reduce ? 3100 : 6600));
    sched(function () {
      line2.textContent = "You're in my real life... and now you're somewhere on my internet too, my princess. ❤️";
      line2.classList.add("secret-show");
    }, t0 + (reduce ? 3500 : 7300));
    sched(function () { signEl.textContent = "— Adnan"; signEl.classList.add("secret-show"); }, t0 + (reduce ? 4400 : 10200));

    var arDelays = reduce
      ? { hayati: 200, ameerati: 400, noor: 600, ahwak: 800, long: 1000 }
      : { hayati: 1600, ameerati: 5200, noor: 7600, ahwak: 8800, long: 10600 };
    ["hayati", "ameerati", "noor", "ahwak", "long"].forEach(function (key) {
      var el = sceneEl.querySelector("#ar-" + key);
      if (el) sched(function () { el.classList.add("secret-show"); }, arDelays[key]);
    });

    sched(function () {
      statusEl.textContent = "CONNECTION: ALWAYS ACTIVE";
      statusEl.classList.add("secret-show");
      revealHeart = true;
      spark.classList.add("secret-fire");
    }, t0 + (reduce ? 5000 : 11400));

    function closeScene() {
      if (!sceneActive) return;
      sceneActive = false;
      clearAll();
      stopAudio();
      window.__heroParticlesSlow = false;
      sceneEl.classList.remove("secret-visible");
      sceneEl.classList.add("secret-leaving");
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      listeners = [];
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      var el = sceneEl;
      setTimeout(function () {
        if (el && el.parentNode) el.parentNode.removeChild(el);
        document.body.style.overflow = prevOverflow;
      }, 700);
    }
    addL(sceneEl.querySelector(".secret-close"), "click", closeScene);
    addL(document, "keydown", function (e) { if (e.key === "Escape") closeScene(); });
  }
})();
