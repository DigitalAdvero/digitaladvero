/* DigitalAdvero — secret.js
   The founder's hidden personal scene: click the logo five times within 2.5 seconds.
   A night sky for Maryam: a big moon with words written around it, a comet circling it, shooting stars,
   beige petals drifting through the air, the original messages and the music.
   Self-contained: it injects its own styles and fonts, and removes everything again when it closes. */
(function () {
  "use strict";
  var logo = document.querySelector(".brand");
  if (!logo) return;

  var AUDIO_SRC = "assets/theme-song.mp3";
  var clickCount = 0, lastClickTime = 0, WINDOW_MS = 2500;
  logo.addEventListener("click", function (e) {
    var now = Date.now();
    if (now - lastClickTime > WINDOW_MS) clickCount = 0;
    lastClickTime = now;
    clickCount++;
    if (clickCount === 3) warmUp();                 // start loading fonts + music a moment early
    if (clickCount >= 5) { clickCount = 0; e.preventDefault(); openScene(); }
  });

  var CSS_TEXT = [
    ".secret-overlay{position:fixed;inset:0;z-index:9999;opacity:0;transition:opacity 1.2s ease;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;color:#F7EEDF;touch-action:none;overflow:hidden;--lv:0;}",
    ".secret-overlay.secret-visible{opacity:1;}",
    ".secret-overlay.secret-leaving{opacity:0;transition:opacity .7s ease;}",
    ".secret-sky{position:absolute;inset:0;background:radial-gradient(130% 65% at 50% 118%,rgba(128,82,96,.5),rgba(66,44,72,.22) 42%,transparent 72%),radial-gradient(55% 50% at var(--moon-x,78%) var(--moon-y,28%),rgba(246,226,190,.17),transparent 70%),linear-gradient(180deg,#04050d 0%,#090c1d 42%,#141226 74%,#221a2b 100%);}",
    ".secret-canvas,.secret-fx{position:absolute;inset:0;pointer-events:none;}",
    ".secret-canvas{z-index:0;}.secret-fx{z-index:2;}",
    /* the moon */
    ".secret-moon-wrap{position:absolute;left:0;top:0;z-index:1;pointer-events:none;}",
    ".secret-moon-halo{position:absolute;left:50%;top:50%;width:330%;height:330%;transform:translate(-50%,-50%) scale(calc(1 + var(--lv) * .08));border-radius:50%;background:radial-gradient(circle,rgba(250,236,210,.30) 0%,rgba(240,214,176,.13) 26%,rgba(220,190,150,.05) 46%,transparent 66%);opacity:0;transition:opacity 4s ease;}",
    ".secret-moon{position:absolute;inset:0;border-radius:50%;opacity:0;transform:translateY(46px) scale(.93);transition:opacity 3.2s ease,transform 4.2s cubic-bezier(.2,.7,.1,1);",
    "background:radial-gradient(circle at 33% 31%,rgba(178,160,136,.42) 0,rgba(178,160,136,0) 13%),radial-gradient(circle at 58% 42%,rgba(170,150,128,.38) 0,rgba(170,150,128,0) 17%),radial-gradient(circle at 45% 67%,rgba(184,166,142,.34) 0,rgba(184,166,142,0) 11%),radial-gradient(circle at 70% 69%,rgba(190,172,148,.3) 0,rgba(190,172,148,0) 8%),radial-gradient(circle at 27% 57%,rgba(196,180,156,.3) 0,rgba(196,180,156,0) 7%),radial-gradient(circle at 63% 21%,rgba(200,186,162,.28) 0,rgba(200,186,162,0) 6%),radial-gradient(circle at 51% 84%,rgba(196,180,156,.22) 0,rgba(196,180,156,0) 6%),radial-gradient(circle at 37% 34%,#FFFAF0 0%,#F6EDDC 42%,#E6D7BF 74%,#CDBA9C 100%);",
    "box-shadow:0 0 50px 14px rgba(250,236,210,.34),0 0 140px 50px rgba(236,212,170,.16),inset -22px -18px 46px rgba(120,96,74,.34),inset 8px 8px 24px rgba(255,255,255,.35);}",
    ".secret-moon::after{content:'';position:absolute;inset:0;border-radius:50%;opacity:.35;mix-blend-mode:multiply;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .55 0 0 0 0 .48 0 0 0 0 .4 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\");}",
    ".secret-visible .secret-moon{opacity:1;transform:none;}",
    ".secret-visible .secret-moon-halo{opacity:1;}",
    ".secret-moon-text{position:absolute;left:50%;top:50%;overflow:visible;pointer-events:none;transform:translate(-50%,-50%);max-width:none;max-height:none;display:block;}",
    ".secret-moon-text text{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;fill:#F4E6CE;letter-spacing:.09em;}",
    ".secret-moon-text{opacity:0;filter:blur(6px) drop-shadow(0 0 10px rgba(246,222,182,.55));transition:opacity 3.2s ease,filter 3.2s ease;}",
    ".secret-moon-text.secret-show{opacity:1;filter:blur(0) drop-shadow(0 0 10px rgba(246,222,182,.55));}",
    /* buttons */
    ".secret-close,.secret-mute{position:absolute;top:22px;z-index:5;width:38px;height:38px;border-radius:50%;background:rgba(246,232,210,.06);border:1px solid rgba(240,222,195,.22);color:rgba(246,232,210,.7);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .25s ease,color .25s ease,border-color .25s ease,box-shadow .25s ease;}",
    ".secret-close{right:24px;font-size:1.25rem;line-height:1;font-family:Georgia,serif;}",
    ".secret-mute{right:72px;}",
    ".secret-close:hover,.secret-mute:hover{background:rgba(246,232,210,.14);color:#fff;border-color:rgba(246,232,210,.5);box-shadow:0 0 18px rgba(240,214,170,.35);}",
    ".secret-mute svg{width:16px;height:16px;}",
    ".secret-mute .secret-mute-off{display:none;}",
    ".secret-mute.is-muted .secret-mute-on{display:none;}",
    ".secret-mute.is-muted .secret-mute-off{display:block;}",
    /* the letter */
    ".secret-panel{position:relative;z-index:3;max-width:540px;width:88%;padding:2.7rem 2.5rem 2.4rem;border-radius:24px;background:linear-gradient(180deg,rgba(30,24,40,.5),rgba(16,13,26,.46));border:1px solid rgba(236,216,186,.2);backdrop-filter:blur(14px) saturate(120%);-webkit-backdrop-filter:blur(14px) saturate(120%);text-align:center;opacity:0;transform:scale(.94) translateY(10px);transition:opacity 1.6s ease,transform 1.6s cubic-bezier(.2,.8,.2,1);box-shadow:inset 0 1px 0 rgba(255,244,226,.08),0 0 80px rgba(236,200,150,.10),0 30px 80px rgba(0,0,0,.55);}",
    ".secret-panel::before{content:'';position:absolute;top:0;left:12%;right:12%;height:1px;background:linear-gradient(90deg,transparent,rgba(246,224,188,.75),transparent);box-shadow:0 0 12px rgba(246,214,170,.6);}",
    ".secret-panel.secret-panel-in{opacity:1;transform:scale(1) translateY(0);}",
    ".secret-status{font-family:'Inter','Segoe UI',Arial,sans-serif;font-size:.64rem;letter-spacing:.24em;color:rgba(236,214,180,.72);margin:0 0 1.3rem;min-height:1em;opacity:0;transition:opacity 1.3s ease;}",
    ".secret-status.secret-show{opacity:1;}",
    ".secret-line{font-size:1.18rem;font-style:italic;color:rgba(246,236,220,.84);line-height:1.6;min-height:1.4em;margin:0 0 1rem;opacity:0;transition:opacity 1.6s ease;}",
    ".secret-line.secret-show{opacity:1;}",
    ".secret-line-1.secret-fade{opacity:0;transition:opacity 1.3s ease;}",
    ".secret-name-row{position:relative;display:inline-block;}",
    ".secret-name{font-family:'Great Vibes','Cormorant Garamond',Georgia,serif;font-weight:400;font-size:4.2rem;line-height:1.15;margin:0 0 .6rem;padding:0 .25em;min-height:1.15em;opacity:0;transform:scale(1.08);transition:opacity 1.8s ease,transform 1.8s cubic-bezier(.2,.8,.2,1),font-size 1s ease;",
    "background:linear-gradient(100deg,#F3DDB4 0%,#FFF6E6 30%,#E2BE86 55%,#FFF2DC 80%,#E7C793 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 16px rgba(246,214,160,.45));animation:secretShimmer 7s ease-in-out infinite;}",
    "@keyframes secretShimmer{0%,100%{background-position:0% 0;}50%{background-position:100% 0;}}",
    ".secret-name.secret-show{opacity:1;transform:scale(1);}",
    ".secret-name.secret-settle{font-size:3.1rem;}",
    ".secret-spark{position:absolute;top:50%;right:-4px;width:6px;height:6px;border-radius:50%;background:#FFF6E4;box-shadow:0 0 10px 3px rgba(246,214,160,.95);opacity:0;}",
    ".secret-spark.secret-fire{animation:secretSpark 1.8s ease-out forwards;}",
    "@keyframes secretSpark{0%{opacity:1;transform:translate(0,-50%) scale(1);}100%{opacity:0;transform:translate(170px,-130px) scale(.3);}}",
    ".secret-line-2{font-size:1.32rem;color:#FBF3E6;line-height:1.55;margin-top:.2rem;}",
    ".secret-sign{margin-top:1.3rem;font-family:'Great Vibes','Cormorant Garamond',Georgia,serif;font-size:1.9rem;color:rgba(242,224,196,.86);opacity:0;transition:opacity 1.6s ease;}",
    ".secret-sign.secret-show{opacity:1;}",
    /* the closing line, written by a small light */
    ".secret-love{position:absolute;left:50%;bottom:9vh;z-index:3;transform:translateX(-50%);width:max-content;max-width:94vw;text-align:center;pointer-events:none;}",
    ".secret-love-text{display:inline-block;padding:.12em .3em .2em;font-family:'Great Vibes','Cormorant Garamond',Georgia,serif;font-size:clamp(2.1rem,3.7vw,3.4rem);line-height:1.2;white-space:nowrap;background:linear-gradient(100deg,#EAC994 0%,#FFF5E3 35%,#E9C895 62%,#FFF0D6 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 14px rgba(246,214,160,.5));clip-path:inset(-30% 100% -30% -4%);transition:clip-path 4.2s cubic-bezier(.45,.05,.3,1);}",
    ".secret-love.secret-show .secret-love-text{clip-path:inset(-30% -4% -30% -4%);}",
    ".secret-love-pen{position:absolute;top:56%;left:2%;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#FFF8EA;box-shadow:0 0 12px 4px rgba(250,222,172,.9),0 0 34px 10px rgba(240,200,140,.45);opacity:0;}",
    ".secret-love.secret-show .secret-love-pen{animation:secretPen 4.2s cubic-bezier(.45,.05,.3,1) forwards;}",
    "@keyframes secretPen{0%{left:2%;opacity:0;}6%{opacity:1;}88%{opacity:1;}100%{left:98%;opacity:0;}}",
    /* Arabic words drifting in the sky */
    ".secret-arabic{position:absolute;top:0;left:0;z-index:1;font-family:'Noto Naskh Arabic','Segoe UI',Tahoma,Arial,sans-serif;color:rgba(244,228,204,.8);opacity:0;pointer-events:none;white-space:nowrap;text-shadow:0 0 14px rgba(240,200,150,.38),0 0 30px rgba(220,170,120,.18);transition:opacity 2.2s ease;will-change:transform,opacity;letter-spacing:.01em;font-size:1.05rem;}",
    ".secret-arabic.secret-show{opacity:.66;}",
    ".secret-arabic.secret-wide{max-width:min(78vw,420px);white-space:normal;text-align:center;line-height:1.7;font-size:.98rem;}",
    "@media (max-width:760px){.secret-panel{padding:2.1rem 1.5rem 1.9rem;width:90%;}.secret-name{font-size:3.2rem;}.secret-name.secret-settle{font-size:2.5rem;}.secret-line{font-size:1.06rem;}.secret-line-2{font-size:1.14rem;}.secret-mute{top:auto;bottom:20px;right:20px;}.secret-close{top:16px;right:16px;}.secret-arabic{font-size:.95rem;}.secret-love{bottom:7.2vh;}.secret-love-text{font-size:clamp(1.6rem,7.4vw,2.3rem);white-space:normal;max-width:88vw;}}",
    "@media (max-height:620px){.secret-panel{padding:1.6rem 1.6rem 1.4rem;}.secret-name{font-size:3rem;}.secret-love{bottom:3vh;}}",
    "@media (prefers-reduced-motion: reduce){.secret-arabic{transition-duration:.6s !important;}.secret-overlay,.secret-panel,.secret-line,.secret-name,.secret-sign,.secret-status,.secret-moon,.secret-moon-halo,.secret-moon-text{transition-duration:.4s !important;}.secret-name{animation:none;}.secret-spark,.secret-love-pen{display:none;}.secret-love-text{transition:none;}}"
  ].join("");

  /* ---------- fonts + music, loaded a moment before the scene opens ---------- */
  function ensureStyles() {
    if (!document.getElementById("secretFonts")) {
      var link = document.createElement("link");
      link.id = "secretFonts"; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,400;1,500&family=Great+Vibes&family=Noto+Naskh+Arabic:wght@500;600&display=swap";
      document.head.appendChild(link);
    }
    if (document.getElementById("secretStyles")) return;
    var s = document.createElement("style");
    s.id = "secretStyles"; s.textContent = CSS_TEXT;
    document.head.appendChild(s);
  }

  /* Audio. The element and the Web Audio graph are created inside the fifth click, so every browser
     (including Safari on iPhone) lets them play. The music is only routed through the analyser once the
     audio context is really running — otherwise it plays directly, so it can never end up silent. */
  var audio = null, TARGET_VOL = 0.34;
  function newAudio() {
    var el = new Audio();
    el.preload = "auto"; el.loop = true; el.setAttribute("playsinline", ""); el.src = AUDIO_SRC;
    return { el: el, ctx: null, gain: null, an: null, data: null, routed: false, muted: false, failed: false, fadeId: 0 };
  }
  function warmUp() {
    ensureStyles();
    if (!audio) { audio = newAudio(); audio.el.load(); }
  }
  function setVolume(target, ms) {
    var a = audio; if (!a || !a.el) return;
    a.fadeId++;
    if (a.routed && a.gain) {
      var now = a.ctx.currentTime, g = a.gain.gain;
      try { g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(target, now + Math.max(ms, 30) / 1000); } catch (e) { g.value = target; }
      return;
    }
    var id = a.fadeId, from = a.el.volume, t0 = performance.now();
    (function step(ts) {
      if (!audio || audio !== a || a.fadeId !== id || a.routed) return;
      var p = Math.min((ts - t0) / Math.max(ms, 1), 1);
      try { a.el.volume = from + (target - from) * p; } catch (e) {}
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function route() {
    var a = audio; if (!a || a.routed || !a.ctx || a.ctx.state !== "running") return;
    try {
      var src = a.ctx.createMediaElementSource(a.el);
      a.gain = a.ctx.createGain(); a.gain.gain.value = a.muted ? 0 : a.el.volume;
      a.an = a.ctx.createAnalyser(); a.an.fftSize = 64; a.an.smoothingTimeConstant = .82;
      src.connect(a.gain); a.gain.connect(a.an); a.an.connect(a.ctx.destination);
      a.data = new Uint8Array(a.an.frequencyBinCount);
      a.routed = true;
      a.el.volume = 1;                                 // loudness is the gain node's job from here on
      setVolume(a.muted ? 0 : TARGET_VOL, 1800);
    } catch (e) { a.routed = false; }
  }
  function startAudio(onFail) {
    if (!audio) audio = newAudio();
    var a = audio;
    a.el.addEventListener("error", function () { a.failed = true; });
    try { a.el.currentTime = 0; } catch (e) {}
    try { a.el.volume = 0; } catch (e) {}
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) { try { a.ctx = new Ctx(); } catch (e) { a.ctx = null; } }
    var p = null;
    try { p = a.el.play(); } catch (e) { p = null; }
    if (a.ctx) {
      var r = null; try { r = a.ctx.resume(); } catch (e) { r = null; }
      Promise.resolve(r).then(function () { if (audio === a) route(); }, function () {});
    }
    var started = function () { if (audio === a && !a.routed) setVolume(a.muted ? 0 : TARGET_VOL, 2200); };
    if (p && p.then) p.then(started, function () { if (onFail) onFail(); }); else started();
  }
  function retryAudio() {
    var a = audio; if (!a || a.failed) return;
    var p = null; try { p = a.el.play(); } catch (e) {}
    if (a.ctx && a.ctx.state !== "running") { try { a.ctx.resume().then(route, function () {}); } catch (e) {} }
    if (p && p.then) p.then(function () { if (!a.routed) setVolume(a.muted ? 0 : TARGET_VOL, 1600); }, function () {});
  }
  function stopAudio() {
    var a = audio; audio = null;
    if (!a) return;
    a.fadeId++;
    if (a.routed && a.gain) { try { var n = a.ctx.currentTime; a.gain.gain.cancelScheduledValues(n); a.gain.gain.setValueAtTime(a.gain.gain.value, n); a.gain.gain.linearRampToValueAtTime(0, n + .7); } catch (e) {} }
    else { var from = a.el.volume, t0 = performance.now(); (function step(ts) { var p = Math.min((ts - t0) / 700, 1); try { a.el.volume = from * (1 - p); } catch (e) {} if (p < 1) requestAnimationFrame(step); })(t0); }
    setTimeout(function () {
      try { a.el.pause(); a.el.removeAttribute("src"); a.el.load(); } catch (e) {}
      if (a.ctx) { try { a.ctx.close(); } catch (e) {} }
    }, 760);
  }
  function audioLevel() {
    if (!audio || !audio.an || !audio.data) return null;
    audio.an.getByteFrequencyData(audio.data);
    var sum = 0; for (var i = 0; i < audio.data.length; i++) sum += audio.data[i];
    return sum / audio.data.length / 255;
  }

  /* ---------- the scene ---------- */
  var sceneActive = false, sceneEl = null, rafId = null, timeouts = [], listeners = [];
  function addL(t, ty, fn, o) { t.addEventListener(ty, fn, o); listeners.push([t, ty, fn, o]); }
  function sched(fn, ms) { var id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function clearAll() { timeouts.forEach(function (id) { clearTimeout(id); }); timeouts = []; }

  function sprite(size, draw) { var c = document.createElement("canvas"); c.width = c.height = size; draw(c.getContext("2d"), size); return c; }

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
    sceneEl.setAttribute("aria-label", "Maryam");
    sceneEl.innerHTML =
      '<div class="secret-sky"></div>' +
      '<canvas class="secret-canvas"></canvas>' +
      '<div class="secret-moon-wrap" aria-hidden="true">' +
        '<span class="secret-moon-halo"></span>' +
        '<svg class="secret-moon-text" aria-hidden="true"><defs><path id="secretMoonArc" d=""/></defs><text><textPath href="#secretMoonArc" startOffset="50%" text-anchor="middle">Ti si moj najljepši mjesec, hayati</textPath></text></svg>' +
        '<span class="secret-moon"></span>' +
      '</div>' +
      '<div class="secret-arabic" id="ar-hayati" dir="rtl" lang="ar">حياتي</div>' +
      '<div class="secret-arabic" id="ar-ahwak" dir="rtl" lang="ar">أهواك</div>' +
      '<div class="secret-arabic" id="ar-ameerati" dir="rtl" lang="ar">أميرتي</div>' +
      '<div class="secret-arabic" id="ar-noor" dir="rtl" lang="ar">نور عيني</div>' +
      '<div class="secret-arabic secret-wide" id="ar-long" dir="rtl" lang="ar">دائماً معك، دائماً لك</div>' +
      '<canvas class="secret-fx"></canvas>' +
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
      '</div>' +
      '<p class="secret-love" id="secretLove"><span class="secret-love-text">Moja slatka i najdraža ljubav, Maryam</span><span class="secret-love-pen"></span></p>';
    document.body.appendChild(sceneEl);

    /* music starts right here, inside the click */
    startAudio(function () { addL(sceneEl, "pointerdown", retryAudio); });
    requestAnimationFrame(function () { sceneEl.classList.add("secret-visible"); });

    var canvas = sceneEl.querySelector(".secret-canvas"), ctx = canvas.getContext("2d");
    var fxCanvas = sceneEl.querySelector(".secret-fx"), fx = fxCanvas.getContext("2d");
    var moonWrap = sceneEl.querySelector(".secret-moon-wrap"), moonSvg = sceneEl.querySelector(".secret-moon-text");
    var moonPath = sceneEl.querySelector("#secretMoonArc"), moonText = moonSvg.querySelector("text");
    var w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var moon = { x: 0, y: 0, r: 100 };
    var particles = [], COUNT = isMobile ? 34 : 80;
    var stars = [], petals = [], meteors = [], nextMeteor = 1.6;
    var cx, cy, mx = null, my = null, revealHeart = false, nameBoost = 0;
    var startTime = performance.now(), lastT = startTime, cometA = 0;

    /* sprites: soft glow, beige bokeh and petals */
    var glow = sprite(64, function (g, s) { var gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, "rgba(255,250,240,1)"); gr.addColorStop(.18, "rgba(255,238,210,.75)"); gr.addColorStop(.5, "rgba(240,210,170,.18)"); gr.addColorStop(1, "rgba(240,210,170,0)"); g.fillStyle = gr; g.fillRect(0, 0, s, s); });
    var BEIGE = ["240,214,172", "246,228,196", "236,198,176", "228,200,150", "250,236,212"];
    var bokeh = BEIGE.map(function (c) { return sprite(64, function (g, s) { var gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2); gr.addColorStop(0, "rgba(" + c + ",.55)"); gr.addColorStop(.55, "rgba(" + c + ",.22)"); gr.addColorStop(1, "rgba(" + c + ",0)"); g.fillStyle = gr; g.fillRect(0, 0, s, s); }); });
    var petalSp = BEIGE.map(function (c) {
      return sprite(48, function (g, s) {
        g.translate(s / 2, s / 2);
        var gr = g.createLinearGradient(-s * .4, 0, s * .4, 0); gr.addColorStop(0, "rgba(" + c + ",.95)"); gr.addColorStop(1, "rgba(" + c + ",.55)");
        g.fillStyle = gr; g.beginPath(); g.moveTo(-s * .42, 0);
        g.bezierCurveTo(-s * .2, -s * .3, s * .25, -s * .26, s * .42, 0); g.bezierCurveTo(s * .25, s * .2, -s * .2, s * .24, -s * .42, 0); g.fill();
        g.strokeStyle = "rgba(255,255,255,.25)"; g.lineWidth = 1; g.beginPath(); g.moveTo(-s * .3, 0); g.quadraticCurveTo(0, -s * .04, s * .34, 0); g.stroke();
      });
    });

    function heartPoint(t, scale) {
      var x = 16 * Math.pow(Math.sin(t), 3);
      var y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return { x: x * scale, y: y * scale };
    }

    function layoutMoon() {
      if (isMobile) { moon.r = Math.max(48, Math.min(w, h) * .155); moon.x = w * .72; moon.y = Math.max(moon.r + 64, h * .135); }
      else { moon.r = Math.max(84, Math.min(170, Math.min(w, h) * .16)); moon.x = w * (w < 1100 ? .83 : .8); moon.y = Math.max(moon.r + 70, h * .29); }
      var d = moon.r * 2;
      moonWrap.style.width = d + "px"; moonWrap.style.height = d + "px";
      moonWrap.style.transform = "translate(" + (moon.x - moon.r) + "px," + (moon.y - moon.r) + "px)";
      sceneEl.style.setProperty("--moon-x", moon.x + "px"); sceneEl.style.setProperty("--moon-y", moon.y + "px");
      /* the words follow the moon: over the top on a wide screen, under it on a phone */
      var rt = moon.r * (isMobile ? 1.42 : 1.3), box = rt * 2 + 80, c = box / 2;
      moonSvg.setAttribute("width", box); moonSvg.setAttribute("height", box); moonSvg.style.width = box + "px"; moonSvg.style.height = box + "px";
      moonSvg.setAttribute("viewBox", "0 0 " + box + " " + box);
      moonText.setAttribute("font-size", Math.round(isMobile ? Math.max(14, moon.r * .27) : Math.max(17, moon.r * .17)));
      moonPath.setAttribute("d", isMobile
        ? "M " + (c - rt) + " " + c + " A " + rt + " " + rt + " 0 0 0 " + (c + rt) + " " + c
        : "M " + (c - rt) + " " + c + " A " + rt + " " + rt + " 0 0 1 " + (c + rt) + " " + c);
    }
    function resize() {
      w = window.innerWidth; h = window.innerHeight; isMobile = w < 760;
      [canvas, fxCanvas].forEach(function (c) { c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px"; });
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); fx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h * 0.4;
      layoutMoon();
      var anchors = isMobile
        ? { hayati: [0.17, 0.075], ahwak: [0.14, 0.24], ameerati: [0.18, 0.8], noor: [0.82, 0.79], long: [0.5, 0.968] }
        : { hayati: [0.15, 0.2], ahwak: [0.88, 0.62], ameerati: [0.13, 0.75], noor: [0.82, 0.85], long: [0.5, 0.955] };
      ["hayati", "ahwak", "ameerati", "noor", "long"].forEach(function (key, i) {
        var el = sceneEl.querySelector("#ar-" + key);
        if (!el) return;
        el.dataset.ax = anchors[key][0]; el.dataset.ay = anchors[key][1]; el.dataset.phase = i * 1.7;
      });
    }
    function initSky() {
      stars = [];
      var n = Math.round(w * h / (isMobile ? 5200 : 7000));
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * w, y: Math.random() * h * .82, r: Math.random() < .08 ? 1.5 + Math.random() : .4 + Math.random() * .9, ph: Math.random() * 6.28, sp: .5 + Math.random() * 1.6 });
      petals = [];
      var pn = isMobile ? 22 : 40;
      for (var k = 0; k < pn; k++) petals.push(newPetal(true));
    }
    function newPetal(anywhere) {
      var round = Math.random() < .38, depth = .5 + Math.random() * .9;
      return {
        round: round, c: (Math.random() * BEIGE.length) | 0, depth: depth, front: Math.random() < .3,
        x: anywhere ? Math.random() * w : -40 - Math.random() * 80, y: anywhere ? Math.random() * h : Math.random() * h * .8 - h * .1,
        vx: (14 + Math.random() * 26) * depth, vy: (6 + Math.random() * 18) * depth,
        s: round ? (12 + Math.random() * 28) * depth : (12 + Math.random() * 12) * depth,
        rot: Math.random() * 6.28, vr: (Math.random() - .5) * 1.4, sway: 10 + Math.random() * 22, ph: Math.random() * 6.28,
        o: round ? .32 + Math.random() * .38 : .7 + Math.random() * .3
      };
    }
    function initParticles() {
      particles = [];
      for (var i = 0; i < COUNT; i++) {
        var depth = 0.5 + Math.random() * 0.9;
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22 * depth, vy: (Math.random() - 0.5) * 0.22 * depth,
          r: (0.8 + Math.random() * 1.6) * depth, o: (0.16 + Math.random() * 0.4) * Math.min(depth, 1),
          converge: Math.random() < 0.65, special: false, depth: depth
        });
      }
      /* the heart of stars forms just above the letter, where it can be seen (behind it on a phone) */
      var panelEl = sceneEl.querySelector(".secret-panel");
      var scale = Math.min(w, h) * (isMobile ? 0.011 : 0.0072), n = 18;
      var hcx = cx, hcy = cy - 30;
      if (!isMobile && panelEl) hcy = Math.max(scale * 17 + 12, panelEl.offsetTop - scale * 13);
      for (var k = 0; k < n; k++) {
        var t = (k / n) * Math.PI * 2, p = heartPoint(t, scale);
        var idx = Math.floor((k / n) * particles.length);
        particles[idx].special = true;
        particles[idx].hx = hcx + p.x; particles[idx].hy = hcy + p.y;
      }
    }
    function spawnMeteor(burst) {
      var fromRight = Math.random() < .6;
      var ang = fromRight ? (Math.PI * (.78 + Math.random() * .1)) : (Math.PI * (.12 + Math.random() * .1));
      var speed = (isMobile ? 620 : 980) + Math.random() * 520;
      meteors.push({
        x: fromRight ? w * (.45 + Math.random() * .6) : w * (-.05 + Math.random() * .45), y: -20 + Math.random() * h * (burst ? .35 : .3),
        vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, len: (isMobile ? 90 : 150) + Math.random() * 140, t: 0, life: 1.1 + Math.random() * .7
      });
    }

    var arabicEls = null;
    function drawArabic(t) {
      if (!arabicEls) arabicEls = sceneEl.querySelectorAll(".secret-arabic");
      var mpx = mx != null ? (mx / w - 0.5) : 0, mpy = my != null ? (my / h - 0.5) : 0;
      arabicEls.forEach(function (el) {
        var ax = parseFloat(el.dataset.ax || 0.5), ay = parseFloat(el.dataset.ay || 0.5), phase = parseFloat(el.dataset.phase || 0);
        var radius = el.classList.contains("secret-wide") ? (isMobile ? 10 : 22) : (isMobile ? 12 : 26);
        var ox = Math.cos(t * 0.12 + phase) * radius, oy = Math.sin(t * 0.1 + phase) * radius * 0.55;
        var breathe = 0.85 + Math.sin(t * 0.35 + phase) * 0.15;
        el.style.transform = "translate3d(" + (ax * w + ox - mpx * 14) + "px," + (ay * h + oy - mpy * 10) + "px,0) translate(-50%,-50%) scale(" + breathe.toFixed(3) + ")";
      });
    }

    function drawComet(t, front) {
      /* a little comet circling the moon on a tilted orbit; behind the moon on the far side */
      var a = moon.r * 1.78, b = moon.r * .5, tilt = -.32, steps = 90, span = 1.5;
      var ca = Math.cos(tilt), sa = Math.sin(tilt);
      var g = front ? fx : ctx;
      function pt(th) { var ex = Math.cos(th) * a, ey = Math.sin(th) * b; return [moon.x + ex * ca - ey * sa, moon.y + ex * sa + ey * ca]; }
      /* a continuous, tapering tail of light */
      g.lineCap = "round";
      var prev = pt(cometA - span);
      for (var i = steps - 1; i >= 0; i--) {
        var th = cometA - span * i / steps, cur = pt(th), k = 1 - i / steps;
        if ((Math.sin(th) < 0) !== front) {
          g.strokeStyle = "rgba(255,240,214," + (.75 * k * k) + ")";
          g.lineWidth = .6 + 2.6 * k;
          g.beginPath(); g.moveTo(prev[0], prev[1]); g.lineTo(cur[0], cur[1]); g.stroke();
        }
        prev = cur;
      }
      if ((Math.sin(cometA) < 0) !== front) { var hd = pt(cometA); g.drawImage(glow, hd[0] - 11, hd[1] - 11, 22, 22); g.drawImage(glow, hd[0] - 4, hd[1] - 4, 8, 8); }
      g.globalAlpha = 1;
    }

    function draw(now) {
      if (!sceneActive) return;
      var t = (now - startTime) / 1000, dt = Math.min(.05, (now - lastT) / 1000); lastT = now;
      var level = audioLevel();
      var lv = level != null ? level : (.25 + Math.sin(t * 1.3) * .12);
      sceneEl.style.setProperty("--lv", lv.toFixed(3));
      var pulse = level != null ? (0.85 + level * 0.6) : (0.92 + Math.sin(t * 1.2) * 0.08);
      ctx.clearRect(0, 0, w, h); fx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter"; fx.globalCompositeOperation = "lighter";

      /* stars, breathing with the music */
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i], tw = .45 + .55 * (.5 + .5 * Math.sin(t * s.sp + s.ph));
        ctx.globalAlpha = Math.min(1, tw * (.55 + lv * .8));
        if (s.r > 1.4) ctx.drawImage(glow, s.x - s.r * 4, s.y - s.r * 4, s.r * 8, s.r * 8);
        else { ctx.fillStyle = "#FFF6E8"; ctx.fillRect(s.x, s.y, s.r, s.r); }
      }
      ctx.globalAlpha = 1;

      /* shooting stars */
      nextMeteor -= dt;
      if (nextMeteor <= 0) { spawnMeteor(false); nextMeteor = (isMobile ? 2.6 : 1.9) + Math.random() * 2.6; }
      for (var m = meteors.length - 1; m >= 0; m--) {
        var me = meteors[m]; me.t += dt; me.x += me.vx * dt; me.y += me.vy * dt;
        var life = me.t / me.life;
        if (life >= 1) { meteors.splice(m, 1); continue; }
        var sp = Math.sqrt(me.vx * me.vx + me.vy * me.vy), ux = me.vx / sp, uy = me.vy / sp;
        var fade = Math.sin(Math.PI * Math.min(1, life * 1.15));
        var gr = ctx.createLinearGradient(me.x, me.y, me.x - ux * me.len, me.y - uy * me.len);
        gr.addColorStop(0, "rgba(255,248,232," + (.95 * fade) + ")"); gr.addColorStop(.25, "rgba(246,222,186," + (.45 * fade) + ")"); gr.addColorStop(1, "rgba(240,210,170,0)");
        ctx.strokeStyle = gr; ctx.lineWidth = 1.6; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(me.x, me.y); ctx.lineTo(me.x - ux * me.len, me.y - uy * me.len); ctx.stroke();
        ctx.globalAlpha = fade; ctx.drawImage(glow, me.x - 9, me.y - 9, 18, 18); ctx.globalAlpha = 1;
      }

      /* the comet around the moon (far half behind the moon) */
      cometA += dt * .62;
      drawComet(t, false);

      /* the constellation that becomes a heart */
      var px = mx != null ? mx : cx, py = my != null ? my : cy;
      var parX = (px - w / 2) * 0.018, parY = (py - h / 2) * 0.018;
      particles.forEach(function (p) {
        if (p.special && revealHeart) { p.x += (p.hx - p.x) * 0.035; p.y += (p.hy - p.y) * 0.035; }
        else if (p.converge) { var pull = 0.002 + nameBoost; p.x += (cx - p.x) * pull; p.y += (cy - p.y) * pull; p.x += p.vx; p.y += p.vy; }
        else { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0; }
      });
      var maxDist = isMobile ? 65 : 95;
      ctx.globalCompositeOperation = "source-over"; ctx.lineWidth = 0.6;
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.strokeStyle = "rgba(240,220,190," + ((1 - d / maxDist) * 0.14 * pulse) + ")";
            ctx.beginPath(); ctx.moveTo(particles[a].x + parX, particles[a].y + parY); ctx.lineTo(particles[b].x + parX, particles[b].y + parY); ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "lighter";
      particles.forEach(function (p) {
        var warm = p.special && revealHeart, r = warm ? p.r * 2.2 : p.r * 1.3;
        ctx.globalAlpha = warm ? Math.min(p.o + 0.5, 1) : Math.min(1, p.o * pulse);
        ctx.drawImage(glow, p.x + parX - r * 2.6, p.y + parY - r * 2.6, r * 5.2, r * 5.2);
      });
      ctx.globalAlpha = 1;

      /* beige petals and lights drifting through the air */
      ctx.globalCompositeOperation = "source-over"; fx.globalCompositeOperation = "source-over";
      for (var q = 0; q < petals.length; q++) {
        var pe = petals[q];
        pe.x += pe.vx * dt; pe.y += pe.vy * dt; pe.rot += pe.vr * dt;
        var sx = pe.x + Math.sin(t * .6 + pe.ph) * pe.sway, sy = pe.y;
        if (pe.x > w + 60 || pe.y > h + 60) { petals[q] = newPetal(false); continue; }
        var g2 = pe.front ? fx : ctx;
        g2.globalAlpha = pe.o * (pe.front ? 1 : .8);
        if (pe.round) g2.drawImage(bokeh[pe.c], sx - pe.s, sy - pe.s, pe.s * 2, pe.s * 2);
        else {
          g2.save(); g2.translate(sx, sy); g2.rotate(pe.rot); g2.scale(1, .72 + .28 * Math.sin(t * 1.4 + pe.ph));
          g2.drawImage(petalSp[pe.c], -pe.s, -pe.s, pe.s * 2, pe.s * 2); g2.restore();
        }
      }
      ctx.globalAlpha = 1; fx.globalAlpha = 1;

      /* the comet's near half passes in front of the moon */
      fx.globalCompositeOperation = "lighter";
      drawComet(t, true);
      fx.globalCompositeOperation = "source-over";

      drawArabic(t);
      rafId = requestAnimationFrame(draw);
    }

    /* one still frame for visitors who prefer reduced motion */
    function drawStill() {
      ctx.clearRect(0, 0, w, h); fx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      stars.forEach(function (s) { ctx.globalAlpha = .7; if (s.r > 1.4) ctx.drawImage(glow, s.x - s.r * 4, s.y - s.r * 4, s.r * 8, s.r * 8); else { ctx.fillStyle = "#FFF6E8"; ctx.fillRect(s.x, s.y, s.r, s.r); } });
      ctx.globalCompositeOperation = "source-over";
      petals.forEach(function (pe) { ctx.globalAlpha = pe.o * .8; if (pe.round) ctx.drawImage(bokeh[pe.c], pe.x - pe.s, pe.y - pe.s, pe.s * 2, pe.s * 2); else { ctx.save(); ctx.translate(pe.x, pe.y); ctx.rotate(pe.rot); ctx.drawImage(petalSp[pe.c], -pe.s, -pe.s, pe.s * 2, pe.s * 2); ctx.restore(); } });
      ctx.globalAlpha = 1;
    }

    resize(); initSky();
    if (reduce) {
      drawStill();
      sceneEl.querySelectorAll(".secret-arabic").forEach(function (el) {
        el.style.left = parseFloat(el.dataset.ax || 0.5) * 100 + "%"; el.style.top = parseFloat(el.dataset.ay || 0.5) * 100 + "%"; el.style.transform = "translate(-50%,-50%)";
      });
    } else { initParticles(); rafId = requestAnimationFrame(draw); }

    addL(window, "resize", function () { resize(); initSky(); if (!reduce) initParticles(); else drawStill(); }, { passive: true });
    addL(sceneEl, "mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      var panel = sceneEl.querySelector(".secret-panel");
      if (panel && panel.classList.contains("secret-panel-in")) panel.style.transform = "translate(" + ((e.clientX / w - 0.5) * 10) + "px," + ((e.clientY / h - 0.5) * 10) + "px)";
    }, { passive: true });
    addL(sceneEl, "touchmove", function (e) { if (e.touches && e.touches[0]) { mx = e.touches[0].clientX; my = e.touches[0].clientY; } }, { passive: true });
    /* a small surprise inside the surprise: touch the moon and it answers with shooting stars and petals */
    addL(sceneEl, "pointerdown", function (e) {
      if (reduce) return;
      var dx = e.clientX - moon.x, dy = e.clientY - moon.y;
      if (dx * dx + dy * dy > moon.r * moon.r * 1.3) return;
      for (var i = 0; i < 3; i++) sched(spawnMeteor.bind(null, true), i * 260);
      for (var k = 0; k < 14; k++) {
        var pe = newPetal(true), ang = Math.random() * Math.PI * 2, sp = 40 + Math.random() * 90;
        pe.x = moon.x + Math.cos(ang) * moon.r * .9; pe.y = moon.y + Math.sin(ang) * moon.r * .9;
        pe.vx = Math.cos(ang) * sp + 20; pe.vy = Math.sin(ang) * sp + 18; pe.front = true;
        petals.push(pe);
      }
      if (petals.length > 90) petals.splice(0, petals.length - 90);
    });

    var muteBtn = sceneEl.querySelector(".secret-mute");
    addL(muteBtn, "click", function () {
      if (!audio) return;
      audio.muted = !audio.muted;
      muteBtn.classList.toggle("is-muted", audio.muted);
      muteBtn.setAttribute("aria-label", audio.muted ? "Play music" : "Mute music");
      if (!audio.muted) { audio.el.muted = false; retryAudio(); }
      setVolume(audio.muted ? 0 : TARGET_VOL, 500);
      if (!audio.routed) { var a = audio; setTimeout(function () { if (a.muted) a.el.muted = true; }, 520); }   // iPhones ignore volume
    });
    addL(document, "visibilitychange", function () {
      if (!audio) return;
      if (document.hidden) { audio.el.pause(); }
      else { if (audio.ctx && audio.ctx.state !== "running") { try { audio.ctx.resume(); } catch (e) {} } audio.el.play().catch(function () {}); }
    });

    /* the story, in the original order and wording */
    var statusEl = sceneEl.querySelector("#secretStatus");
    var line1 = sceneEl.querySelector("#secretLine1");
    var nameEl = sceneEl.querySelector("#secretName");
    var spark = sceneEl.querySelector("#secretSpark");
    var line2 = sceneEl.querySelector("#secretLine2");
    var signEl = sceneEl.querySelector("#secretSign");
    var loveEl = sceneEl.querySelector("#secretLove");
    var t0 = reduce ? 200 : 900;

    sched(function () { sceneEl.querySelector(".secret-panel").classList.add("secret-panel-in"); }, reduce ? 150 : 1600);
    sched(function () { moonSvg.classList.add("secret-show"); }, reduce ? 300 : 3200);
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

    /* the last line, written by a small light — with a few shooting stars for it */
    sched(function () {
      loveEl.classList.add("secret-show");
      if (!reduce) { spawnMeteor(true); sched(function () { spawnMeteor(true); }, 380); sched(function () { spawnMeteor(true); }, 900); }
    }, t0 + (reduce ? 5400 : 12800));

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
      }, 760);
    }
    addL(sceneEl.querySelector(".secret-close"), "click", closeScene);
    addL(document, "keydown", function (e) { if (e.key === "Escape") closeScene(); });
  }
})();
