/* DigitalAdvero — secret.js
   A hidden story for one person. Nothing on the page points to it.
   It opens like the site itself and slowly turns into a beige, romantic world: lines that rise like the
   site's headings, small movements that follow the words, a slow song, petals in the air, our future home,
   and a night with a voice. The words are stored encoded below, so they are not readable at a glance. */
(function () {
  "use strict";
  var ring = document.querySelector(".mini-ring");
  if (!ring) return;

  var html = document.documentElement, body = document.body;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var fine = !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  var SONG = "assets/story-song.mp3", HOME = "assets/story-home.webp", ART = "assets/story-art.webp", VOICE = "assets/story-voice.mp3";
  var HOLD_MS = 1500, TARGET_VOL = 0.45;
  var DATA = "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";

  /* ---------- the words ---------- */
  function seed(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; }
  function prng(a) {
    return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function readStory() {
    var bin = atob(DATA), out = new Uint8Array(bin.length), r = prng(seed("da-story-26"));
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) ^ Math.floor(r() * 256);
    var txt = window.TextDecoder ? new TextDecoder("utf-8").decode(out) : decodeURIComponent(escape(String.fromCharCode.apply(null, out)));
    return JSON.parse(txt);
  }

  /* ---------- styles ---------- */
  var INK = "#2b2119", CREAM = "#f6ecdd", TERRA = "#b8613a";
  var GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .36 0 0 0 0 .27 0 0 0 0 .19 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  var EASE = "cubic-bezier(.16,1,.3,1)", EASE_IO = "cubic-bezier(.76,0,.24,1)", BOUNCE = "cubic-bezier(.34,1.56,.64,1)";
  var SERIF = "'EB Garamond',Georgia,'Times New Roman',serif", SANS = "'Inter Tight','Inter',system-ui,sans-serif";
  var CSS = `
.mini-ring.st-holding{animation-duration:1.15s!important;filter:drop-shadow(0 0 10px rgba(241,224,198,.9)) drop-shadow(0 0 26px rgba(255,90,31,.35))}
.st-hold{position:fixed;left:var(--x);top:var(--y);width:var(--s);height:var(--s);margin:calc(var(--s) / -2) 0 0 calc(var(--s) / -2);z-index:9998;pointer-events:none;transition:opacity .45s,transform .45s ${EASE}}
.st-hold svg{display:block;width:100%;height:100%;overflow:visible;transform:rotate(-90deg)}
.st-hold circle{fill:none;stroke:#efdcbf;stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 6px rgba(239,220,191,.95))}
.st-hold.st-gone{opacity:0;transform:scale(.8)}
.st-warm{position:fixed;inset:0;z-index:9997;pointer-events:none;opacity:0;background:radial-gradient(circle at var(--x) var(--y),rgba(243,226,201,.62),rgba(243,226,201,.16) 18%,rgba(243,226,201,0) 42%);transition:opacity .4s}

.st-root{position:fixed;inset:0;z-index:9999;color:${INK};font-family:${SANS};-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  clip-path:circle(0px at var(--cx,50%) var(--cy,50%));transition:clip-path 1.3s ${EASE_IO}}
.st-root.st-open{clip-path:circle(160vmax at var(--cx,50%) var(--cy,50%))}
.st-root.st-closing{clip-path:circle(0px at var(--cx,50%) var(--cy,50%));transition-duration:1s}
.st-root *,.st-root *::before,.st-root *::after{box-sizing:border-box}
.st-bg{position:absolute;inset:0;background:#f3ece1}
.st-light{position:absolute;inset:-25%;pointer-events:none;background:radial-gradient(38% 32% at 24% 22%,rgba(255,251,243,.8),rgba(255,251,243,0) 70%),radial-gradient(34% 30% at 78% 74%,rgba(231,190,150,.42),rgba(231,190,150,0) 70%);animation:st-drift 20s ease-in-out infinite alternate;transition:opacity 1s}
.st-root.st-dark .st-light{opacity:.22}
@keyframes st-drift{to{transform:translate3d(5%,-4%,0) rotate(5deg) scale(1.06)}}
.st-grain{position:absolute;inset:0;pointer-events:none;opacity:.2;mix-blend-mode:multiply;background-image:${GRAIN}}
.st-fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
.st-glow{position:absolute;left:0;top:0;z-index:1;width:560px;height:560px;margin:-280px 0 0 -280px;border-radius:50%;pointer-events:none;opacity:0;transition:opacity .8s;background:radial-gradient(closest-side,rgba(255,247,233,.5),rgba(255,247,233,0))}
.st-root.st-pointer .st-glow{opacity:1}
.st-root.st-dark .st-glow{opacity:.25}

.st-top{position:absolute;left:0;right:0;top:0;z-index:5;display:flex;align-items:center;gap:clamp(.7rem,2vw,1.4rem);padding:16px clamp(16px,3.4vw,48px);color:${INK};transition:color .6s}
.st-root.st-dark .st-top{color:${CREAM}}
.st-mark{width:42px;height:auto;aspect-ratio:215.5/129;fill:currentColor;--mark-a:#ff5a1f;margin-right:auto;flex:none}
.st-count{font-size:.72rem;font-weight:500;letter-spacing:.08em;font-variant-numeric:tabular-nums;opacity:.75}
.st-bar{position:relative;width:min(140px,18vw);height:1px;background:rgba(43,33,25,.2)}
.st-root.st-dark .st-bar{background:rgba(246,236,221,.25)}
.st-bar i{position:absolute;inset:0;background:currentColor;transform-origin:left;transform:scaleX(var(--prog,0));transition:transform .3s}
.st-btn{display:inline-flex;align-items:center;gap:.55rem;height:2.5rem;padding:0 1rem;border:1px solid currentColor;border-radius:999px;background:transparent;color:inherit;
  font:500 .72rem/1 ${SANS};letter-spacing:.08em;text-transform:uppercase;cursor:pointer;opacity:.82;transition:opacity .3s,background-color .3s,color .3s}
.st-btn:hover,.st-btn:focus-visible{opacity:1}
.st-btn:focus-visible{outline:2px solid #ff5a1f;outline-offset:3px}
.st-x{width:2.5rem;padding:0;justify-content:center;font-size:1.05rem;letter-spacing:0}
.st-eq{display:inline-flex;align-items:flex-end;gap:2px;height:11px}
.st-eq i{width:2px;height:100%;background:currentColor;transform-origin:bottom;animation:st-eq 1.1s ease-in-out infinite}
.st-eq i:nth-child(2){animation-delay:-.45s}.st-eq i:nth-child(3){animation-delay:-.8s}
@keyframes st-eq{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
.st-root.st-muted .st-music .st-eq i{animation:none;transform:scaleY(.25)}

.st-scroll{position:absolute;inset:0;z-index:2;overflow-x:hidden;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;scrollbar-width:none;outline:none}
.st-scroll::-webkit-scrollbar{display:none}
.st-scene{position:relative;height:100%;display:flex;align-items:center;overflow:hidden;scroll-snap-align:start;scroll-snap-stop:always;color:${INK}}
.st-scene.st-d{color:${CREAM}}
.st-in{position:relative;z-index:2;width:min(1180px,calc(100% - 2 * clamp(16px,3.4vw,48px)));margin:0 auto;padding:clamp(74px,11vh,110px) 0 clamp(48px,8vh,80px)}
.st-stack>*+*{margin-top:clamp(.9rem,2.3vh,1.7rem)}

.st-kicker{display:inline-flex;align-items:center;gap:.6rem;margin:0 0 clamp(1rem,2.4vh,1.6rem);font:500 .72rem/1 ${SANS};letter-spacing:.09em;text-transform:uppercase;color:rgba(43,33,25,.7)}
.st-d .st-kicker{color:rgba(246,236,221,.72)}
.st-kicker::before{content:"";width:6px;height:6px;border-radius:50%;background:#ff5a1f}
.st-site{margin:0;max-width:15ch;font:500 clamp(2.3rem,6.2vw,6.2rem)/.93 ${SANS};letter-spacing:-.045em;text-transform:uppercase}
.st-big{margin:0;max-width:19ch;font-family:${SERIF};font-style:italic;font-weight:400;font-size:clamp(1.9rem,4.6vw,4.6rem);line-height:1.08;letter-spacing:-.012em}
.st-big.st-long{max-width:24ch;font-size:clamp(1.6rem,3.5vw,3.5rem);line-height:1.12}
.st-mid{margin:0;max-width:28ch;font-family:${SERIF};font-style:italic;font-weight:400;font-size:clamp(1.3rem,2.6vw,2.45rem);line-height:1.2}
.st-small{margin:0;max-width:46ch;font-size:clamp(1rem,1.25vw,1.2rem);line-height:1.6;color:rgba(43,33,25,.78)}
.st-stack>.st-small{margin-top:clamp(1.3rem,3.2vh,2.2rem)}
.st-d .st-small{color:rgba(246,236,221,.78)}
.st-script{margin:0;font-family:'Great Vibes',cursive;font-weight:400;font-size:clamp(2.6rem,7vw,6.2rem);line-height:1.18;color:${TERRA}}
.st-scene em{font-style:italic;color:${TERRA}}
.st-d em,.st-d .st-script{color:#f0b98f}
.st-ar{font-family:Amiri,'Noto Naskh Arabic',serif;font-style:normal;font-weight:400}

.st-root [data-split]:not(.is-split){visibility:hidden}
.st-root [data-split] .ln{display:block;overflow:hidden;padding:.14em .14em .12em .06em;margin:-.14em -.14em -.12em -.06em}
.st-root [data-split] .ln>span{display:block;transform:translate3d(0,118%,0);transition:transform 1.3s ${EASE};transition-delay:calc(var(--d,0s) + var(--i,0) * 95ms)}
.st-scene.is-in [data-split] .ln>span{transform:none}
.st-root [data-r]{opacity:0;transform:translate3d(0,22px,0);transition:opacity 1.2s ${EASE},transform 1.4s ${EASE};transition-delay:var(--d,0s)}
.st-scene.is-in [data-r]{opacity:1;transform:none}
.st-write{clip-path:inset(-30% 100% -30% -5%);transition:clip-path 2.2s cubic-bezier(.65,0,.35,1);transition-delay:var(--d,0s)}
.st-scene.is-in .st-write{clip-path:inset(-30% -8% -30% -5%)}

/* ---- small movements that follow the words ---- */
.fx{display:inline-block}
.fx .l{display:inline-block;white-space:pre}
.fx-blink{transform-origin:50% 62%}
.live .fx-blink{animation:fx-blink 4.4s ease-in-out 2.4s infinite}
@keyframes fx-blink{0%,88%,100%{transform:scaleY(1)}91%{transform:scaleY(.08)}94%{transform:scaleY(1)}}
.fx-smile .l{transition:transform 1.5s ${BOUNCE};transition-delay:calc(2.2s + var(--k) * 45ms)}
.is-in .fx-smile .l{transform:translateY(var(--y)) rotate(var(--r))}
.fx-blur{filter:blur(7px);opacity:.5;transition:filter 1.8s ease 3.2s,opacity 1.8s ease 3.2s}
.is-in .fx-blur{filter:blur(0);opacity:1}
.live .fx-shake{animation:fx-shake 3.4s ease-in-out 2.4s infinite}
@keyframes fx-shake{0%,68%,100%{transform:none}72%{transform:translateX(-2px) rotate(-4deg)}76%{transform:translateX(2px) rotate(4deg)}80%{transform:translateX(-2px) rotate(-3deg)}84%{transform:translateX(1px) rotate(1deg)}}
.live .fx-giggle .l{animation:fx-hop 1.9s ease-in-out infinite;animation-delay:calc(3.4s + var(--k) * 70ms)}
@keyframes fx-hop{0%,55%,100%{transform:none}18%{transform:translateY(-.16em) rotate(-5deg)}36%{transform:translateY(.02em) rotate(4deg)}}
.fx-swap{display:inline-grid;vertical-align:bottom}
.fx-swap>span{grid-area:1/1}
.fx-swap>span+span{opacity:0;color:${TERRA}}
.live .fx-swap>span:first-child{animation:fx-swap-a 7s ease-in-out 2.4s infinite}
.live .fx-swap>span+span{animation:fx-swap-b 7s ease-in-out 2.4s infinite}
@keyframes fx-swap-a{0%,8%{opacity:1;transform:none}18%,72%{opacity:0;transform:translateY(-.4em)}82%,100%{opacity:1;transform:none}}
@keyframes fx-swap-b{0%,8%{opacity:0;transform:translateY(.4em)}18%,72%{opacity:1;transform:none}82%,100%{opacity:0;transform:translateY(.4em)}}
.fx-think{position:relative;vertical-align:.55em;margin-left:.06em}
.fx-think b{display:grid;place-items:center;width:2.1em;height:2.1em;border-radius:50%;background:#fbf6ee;box-shadow:0 8px 20px -10px rgba(64,40,18,.55);
  font:600 .42em/1 ${SANS};font-style:normal;color:${TERRA};opacity:0;transform:translateY(8px) scale(.5)}
.live .fx-think b{animation:fx-think 3.8s ease-in-out 2.6s infinite}
@keyframes fx-think{0%{opacity:0;transform:translateY(8px) scale(.5)}14%,74%{opacity:1;transform:none}44%{transform:translateY(-4px) rotate(-6deg)}100%{opacity:0;transform:translateY(-10px) scale(.9)}}
.fx-scent{position:relative}
.fx-scent i{position:absolute;left:50%;bottom:.75em;width:.15em;height:.15em;border-radius:50%;background:rgba(201,128,88,.55);opacity:0;pointer-events:none}
.live .fx-scent i{animation:fx-rise 3.6s ease-out infinite}
.fx-scent i:nth-of-type(1){margin-left:-.9em;--dx:-.2em;animation-delay:2s!important}
.fx-scent i:nth-of-type(2){margin-left:-.35em;--dx:.25em;animation-delay:2.7s!important}
.fx-scent i:nth-of-type(3){margin-left:.15em;--dx:-.15em;animation-delay:3.3s!important}
.fx-scent i:nth-of-type(4){margin-left:.6em;--dx:.3em;animation-delay:2.4s!important}
.fx-scent i:nth-of-type(5){margin-left:1.1em;--dx:.1em;animation-delay:3.9s!important}
@keyframes fx-rise{0%{opacity:0;transform:translate(0,0) scale(.6)}25%{opacity:.85}100%{opacity:0;transform:translate(var(--dx),-1.9em) scale(1.6)}}
.fx-wave{white-space:nowrap}
.fx-wave .fx-eq{display:inline-flex;align-items:center;gap:.06em;height:.62em;margin-left:.18em;vertical-align:.02em}
.fx-wave .fx-eq i{display:block;width:.07em;height:100%;border-radius:.05em;background:${TERRA};transform:scaleY(.25)}
.live .fx-wave .fx-eq i{animation:fx-voice 1.1s ease-in-out infinite}
.fx-wave .fx-eq i:nth-child(2){animation-delay:-.3s!important}.fx-wave .fx-eq i:nth-child(3){animation-delay:-.6s!important}.fx-wave .fx-eq i:nth-child(4){animation-delay:-.15s!important}.fx-wave .fx-eq i:nth-child(5){animation-delay:-.8s!important}
@keyframes fx-voice{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
.fx-hug b{display:inline-block;font-weight:400;color:${TERRA};opacity:0;transition:transform 1.4s ${BOUNCE},opacity .9s;transition-delay:2.8s}
.fx-hug b:first-child{transform:translateX(-.8em)}.fx-hug b:last-child{transform:translateX(.8em)}
.is-in .fx-hug b{opacity:1;transform:none}
.fx-under,.fx-whole{position:relative}
.fx-under svg,.fx-whole svg{position:absolute;left:-3%;width:106%;bottom:-.32em;height:.45em;overflow:visible;pointer-events:none}
.fx-under path,.fx-whole path{fill:none;stroke:${TERRA};stroke-width:2.2;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.5s cubic-bezier(.65,0,.35,1) 1.8s}
.fx-whole path{stroke-width:1.8;transition-delay:3.4s;transition-duration:2s}
.is-in .fx-under path,.is-in .fx-whole path{stroke-dashoffset:0}
.fx-fall .l{opacity:0;transform:translateY(-1.5em) rotate(var(--r));transition:transform 1.2s ${BOUNCE},opacity .5s;transition-delay:calc(.9s + var(--k) * 60ms)}
.is-in .fx-fall .l{opacity:1;transform:none}
.fx-chaos .l{transform:translate(var(--x),var(--y)) rotate(var(--r));transition:transform 1.5s ${BOUNCE};transition-delay:calc(2s + var(--k) * 35ms)}
.is-in .fx-chaos .l{transform:none}
.fx-more{width:0;height:.6em;margin-left:.1em;vertical-align:baseline;opacity:.75;background:radial-gradient(circle,currentColor 30%,transparent 34%) 0 60%/.42em .42em repeat-x;transition:width 7s linear 2.4s}
.is-in .fx-more{width:110vw}

/* ---- scenes ---- */
.st-k-open .st-in{padding-bottom:clamp(90px,14vh,140px)}
.st-begin{margin-top:clamp(1.6rem,4vh,2.6rem);cursor:pointer;border:0;font-family:${SANS}}
.st-begin .btn-ic svg{transform:rotate(90deg)!important}
.st-hint{position:absolute;left:50%;bottom:clamp(18px,4vh,34px);z-index:2;display:flex;flex-direction:column;align-items:center;gap:.6rem;transform:translateX(-50%);font:500 .66rem/1 ${SANS};letter-spacing:.14em;text-transform:uppercase;opacity:.55}
.st-hint i{display:block;width:1px;height:38px;background:currentColor;animation:st-line 2s ${EASE_IO} infinite}
@keyframes st-line{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

.st-penrow{display:flex;align-items:center;flex-wrap:wrap;gap:.2em .5em}
.st-scribble{width:clamp(130px,22vw,250px);height:auto;overflow:visible}
.st-scribble path{fill:none;stroke:${TERRA};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1}
.live .st-scribble path{animation:st-write 5.2s cubic-bezier(.45,0,.4,1) 1.6s infinite}
@keyframes st-write{0%{stroke-dashoffset:1;opacity:1}70%{stroke-dashoffset:0;opacity:1}88%{stroke-dashoffset:0;opacity:0}100%{stroke-dashoffset:1;opacity:0}}

.st-growbox{display:block}
.st-grow-w{display:inline-block;transform-origin:0 80%;transition:transform 2.6s ${EASE} 1.8s,color 2s 1.8s}
.is-in .st-grow-w{transform:scale(1.3);color:${TERRA}}

.st-tiltbox{display:inline-block;transform-origin:8% 92%}
.live .st-tiltbox{animation:st-tilt 5.6s ease-in-out 1.8s infinite}
@keyframes st-tilt{0%,100%{transform:rotate(0)}26%,58%{transform:rotate(3.4deg)}}

.st-note{position:absolute;right:clamp(16px,4vw,56px);bottom:clamp(20px,5vh,46px);z-index:2;font:italic 400 .82rem/1.2 ${SERIF};color:rgba(43,33,25,.5);opacity:0;transform:translateY(6px);transition:opacity 2s 6s,transform 2s 6s}
.st-note::before{content:"♡ ";color:${TERRA}}
.is-in .st-note{opacity:1;transform:none}

.st-shades{display:flex;align-items:flex-end;gap:clamp(.35rem,1vw,.6rem);margin:clamp(1rem,3vh,1.8rem) 0 .4rem}
.st-shade{position:relative;width:clamp(28px,3.6vw,46px);height:clamp(28px,3.6vw,46px);border-radius:50%;box-shadow:inset 0 0 0 1px rgba(43,33,25,.12)}
.st-shade.her{width:clamp(40px,5vw,62px);height:clamp(40px,5vw,62px)}
.st-shade.her::after{content:attr(data-l);position:absolute;left:50%;top:calc(100% + .55rem);transform:translateX(-50%);font:500 .66rem/1 ${SANS};letter-spacing:.1em;text-transform:uppercase;color:rgba(43,33,25,.6);white-space:nowrap}
.st-pick{position:absolute;inset:-6px;border-radius:50%;border:1.5px solid ${INK};pointer-events:none}
.st-shades-wrap{position:relative;display:inline-block;padding-bottom:1.4rem}
.st-ring{position:absolute;bottom:1.4rem;width:var(--hw);height:var(--hw);border-radius:50%;border:1.5px solid ${INK};left:var(--hx);transform:translateX(0);pointer-events:none}
.live .st-ring{animation:st-pick 6s ${EASE_IO} 1.4s infinite}
@keyframes st-pick{0%,14%{transform:translateX(0)}28%,36%{transform:translateX(var(--l1))}50%,58%{transform:translateX(var(--r1))}72%,100%{transform:translateX(0)}}

.st-orbit{position:absolute;right:clamp(2%,6vw,9%);top:50%;z-index:1;width:clamp(250px,34vw,470px);aspect-ratio:1;transform:translateY(-50%)}
.st-orbit svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.st-orbit text{font:500 13px/1 ${SANS};letter-spacing:.24em;text-transform:uppercase;fill:rgba(43,33,25,.5)}
.st-orbit .st-spin{transform-origin:200px 200px;transform-box:view-box}
.live .st-orbit .st-spin{animation:st-spin 46s linear infinite}
@keyframes st-spin{to{transform:rotate(360deg)}}
.st-orbit .st-moonball{position:absolute;left:50%;top:50%;right:auto;width:40%;margin:-20% 0 0 -20%}
.st-k-orbit .st-stack{max-width:min(46%,560px)}

.st-moonball{position:absolute;right:clamp(8%,12vw,14%);top:clamp(14%,17vh,20%);z-index:1;width:clamp(86px,13vw,180px);aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle at 36% 34%,#fffbf3,#f5e6cb 52%,#e5cda7);box-shadow:0 0 60px 18px rgba(255,247,230,.55),0 0 170px 70px rgba(255,240,214,.32);
  opacity:0;transform:translate3d(0,24px,0) scale(.92);transition:opacity 2.2s,transform 2.6s ${EASE}}
.st-moonball::before,.st-moonball::after{content:"";position:absolute;border-radius:50%;background:rgba(214,186,146,.35)}
.st-moonball::before{width:18%;height:18%;left:24%;top:30%}.st-moonball::after{width:11%;height:11%;left:60%;top:56%}
.is-in .st-moonball{opacity:1;transform:none}

.st-home{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(1.4rem,5vw,5rem);align-items:center}
.st-photo{position:relative;margin:0;justify-self:start;width:100%;max-width:min(430px,52vh);aspect-ratio:3/4;border-radius:20px;overflow:hidden;box-shadow:0 40px 90px -36px rgba(64,40,18,.55);
  opacity:0;transform:translate3d(0,34px,0) rotate(-1.4deg);transition:opacity 1.5s ${EASE},transform 1.8s ${EASE}}
.is-in .st-photo{opacity:1;transform:rotate(-1.4deg)}
.st-photo img{display:block;width:100%;height:100%;object-fit:cover;filter:sepia(.32) saturate(.95) brightness(1.06) contrast(1.02);transform:scale(1.14);transition:transform 8s ${EASE}}
.is-in .st-photo img{transform:scale(1)}
.st-photo::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(240,220,190,0) 55%,rgba(52,34,18,.38)),radial-gradient(120% 70% at 50% 0%,rgba(255,226,182,.2),rgba(255,226,182,0) 60%)}
.st-photo figcaption{position:absolute;left:1.1rem;bottom:1rem;z-index:1;color:#f8ecd9;font:500 .66rem/1 ${SANS};letter-spacing:.14em;text-transform:uppercase}
.st-names,.st-pills{display:flex;flex-wrap:wrap;gap:.55rem;margin:clamp(1rem,2.6vh,1.6rem) 0}
.st-name,.st-pill{display:inline-flex;align-items:center;gap:.6rem;padding:.55rem 1.05rem .62rem;border-radius:999px;background:rgba(255,251,244,.62);border:1px solid rgba(43,33,25,.12);
  font:italic 400 clamp(1.05rem,1.8vw,1.4rem)/1 ${SERIF};opacity:0;transform:translate3d(0,12px,0);transition:opacity 1s,transform 1.1s ${EASE};transition-delay:calc(1.1s + var(--i) * .3s)}
.st-name::before{content:"";flex:none;width:7px;height:7px;border-radius:50%;background:#efb06c;box-shadow:0 0 0 0 rgba(239,176,108,0);transition:box-shadow 1.4s;transition-delay:calc(1.4s + var(--i) * .3s)}
.is-in .st-name,.is-in .st-pill{opacity:1;transform:none}
.is-in .st-name::before{box-shadow:0 0 14px 5px rgba(239,176,108,.7)}
.st-pill::before{content:"♡";font-style:normal;font-size:.8em;color:${TERRA}}
.st-pill.lazy{transition-duration:2.8s,3s;transition-delay:calc(1.4s + var(--i) * .3s + .6s)}
.is-in .st-pill.lazy{opacity:.62}

.st-sticker{position:relative;display:inline-block;max-width:24ch;margin:.4rem 0 .6rem 8px;padding:.6em .85em .65em;border-radius:18px;background:#fffaf3;
  box-shadow:0 0 0 7px #fff,0 26px 50px -26px rgba(64,40,18,.6);font:italic 400 clamp(1.5rem,3.3vw,3rem)/1.14 ${SERIF};color:${INK};
  opacity:0;transform:rotate(-7deg) scale(1.22);transition:transform .95s ${BOUNCE} .45s,opacity .35s .45s}
.is-in .st-sticker{opacity:1;transform:rotate(-2.5deg)}
.st-sticker::after{content:"";position:absolute;right:-7px;bottom:-7px;width:38px;height:38px;border-radius:0 0 18px 0;background:linear-gradient(135deg,rgba(0,0,0,0) 50%,#efe0c9 50%);box-shadow:-4px -4px 8px -4px rgba(64,40,18,.35)}

.st-route{position:relative;max-width:640px;height:86px;margin:clamp(1.2rem,3.4vh,2.2rem) 0 clamp(.6rem,2vh,1.2rem)}
.st-route-line{position:absolute;left:6%;right:6%;top:30px;height:1px;background:rgba(43,33,25,.3)}
.st-route-line::after{content:"";position:absolute;inset:0;background:${TERRA};transform-origin:left;transform:scaleX(var(--p,0))}
.st-route-dot{position:absolute;top:30px;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:${TERRA};box-shadow:0 0 0 6px rgba(184,97,58,.16);left:calc(6% + 88% * var(--p,0))}
.st-route-end{position:absolute;top:30px;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;border:1.5px solid ${INK};background:#ecdec9}
.st-route-end.a{left:6%}.st-route-end.b{left:94%}
.st-route-lab{position:absolute;top:50px;font:500 .7rem/1 ${SANS};letter-spacing:.1em;text-transform:uppercase;opacity:.7}
.st-route-lab.a{left:6%;transform:translateX(-30%)}.st-route-lab.b{right:6%;transform:translateX(30%)}
.st-route-time{position:absolute;left:50%;top:0;transform:translateX(-50%);font:500 .78rem/1 ${SANS};letter-spacing:.08em;font-variant-numeric:tabular-nums;opacity:.75}
.st-route-n{position:absolute;right:6%;top:0;font:500 .7rem/1 ${SANS};letter-spacing:.08em;color:${TERRA};font-variant-numeric:tabular-nums}

.st-stairs{display:block}
.st-step{display:inline-block;margin-right:.28em;color:${TERRA}}
.st-step:nth-child(1){font-size:1em}.st-step:nth-child(2){font-size:1.18em}.st-step:nth-child(3){font-size:1.4em}

.st-gray{position:absolute;inset:0;z-index:0;background:#d8d5d0;transition:opacity 2.8s ease 2.2s}
.is-in .st-gray{opacity:0}
.st-k-color .st-in{filter:grayscale(1);transition:filter 2.6s ease 2.2s}
.st-k-color.is-in .st-in{filter:none}
.st-bloom{position:absolute;z-index:1;left:var(--bx,30%);top:var(--by,40%);width:20vmax;height:20vmax;margin:-10vmax 0 0 -10vmax;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,rgba(231,170,120,.45),rgba(231,170,120,0));opacity:0;transform:scale(.2);transition:transform 3.2s ${EASE} 2.2s,opacity 3.2s ease 2.2s}
.is-in .st-bloom{opacity:1;transform:scale(5)}

.st-artbg{position:absolute;inset:-5%;z-index:0;background:url(${ART}) center/cover no-repeat;filter:sepia(.5) saturate(.85) contrast(.96);mix-blend-mode:multiply;opacity:0;transform:scale(1.1);transition:opacity 2.4s,transform 10s ${EASE}}
.is-in .st-artbg{opacity:.5;transform:none}
.st-artveil{position:absolute;inset:0;z-index:0;background:linear-gradient(90deg,rgba(230,212,184,.94) 0%,rgba(230,212,184,.7) 48%,rgba(230,212,184,.18) 100%)}
.st-ruhi{display:block;text-align:left;margin:clamp(.2rem,1vh,.6rem) 0;font:400 clamp(5.2rem,15vw,11.5rem)/1.05 Amiri,'Noto Naskh Arabic',serif;color:${INK}}
.live .st-ruhi{animation:st-breathe 6s ease-in-out 1.5s infinite}
@keyframes st-breathe{0%,100%{transform:none;text-shadow:none}50%{transform:scale(1.03);text-shadow:0 0 30px rgba(184,97,58,.25)}}

.st-join{display:flex;align-items:baseline;gap:.22em;margin:clamp(.6rem,2vh,1.2rem) 0;font:italic 400 clamp(3rem,9vw,8rem)/1.04 ${SERIF};color:${TERRA}}
.st-join span{display:inline-block;transition:transform 1.8s ${BOUNCE} 1.2s,opacity 1s .6s;opacity:0}
.st-join span:first-child{transform:translateX(-1.1em)}.st-join span:last-child{transform:translateX(1.1em)}
.is-in .st-join span{opacity:1;transform:none}
.st-join i{position:relative;align-self:center;width:0;font-style:normal}
.st-join i::after{content:"♥";position:absolute;left:-.32em;top:-.95em;font-size:.32em;color:#e07a4d;opacity:0;transform:scale(.2);transition:transform 1s ${BOUNCE} 2.8s,opacity .6s 2.8s}
.is-in .st-join i::after{opacity:1;transform:none}

.st-numwrap{position:relative;display:inline-block;margin:0 0 clamp(.6rem,2vh,1.2rem)}
.st-num{display:block;font-family:Archivo,'Inter Tight',sans-serif;font-weight:800;font-stretch:125%;font-size:clamp(6rem,22vw,18rem);line-height:.82;letter-spacing:-.03em;color:${TERRA};font-variant-numeric:tabular-nums;transition:opacity 1s,filter 1s}
.st-numwrap::after{content:"";position:absolute;left:-3%;right:-3%;top:50%;height:clamp(3px,.6vw,7px);border-radius:4px;background:${INK};transform:scaleX(0) rotate(-6deg);transform-origin:left;transition:transform .9s cubic-bezier(.65,0,.35,1)}
.st-numwrap.stop::after{transform:scaleX(1) rotate(-6deg)}
.st-numwrap.stop .st-num{opacity:.4;filter:blur(1px)}

.st-rules{list-style:none;margin:clamp(1.2rem,3.4vh,2.4rem) 0 0;padding:0;border-bottom:1px solid rgba(43,33,25,.2)}
.st-rule{position:relative;display:grid;grid-template-columns:3.2rem minmax(0,1.35fr) minmax(0,1fr);gap:1rem;align-items:baseline;padding:clamp(1.1rem,3vh,1.8rem) 0}
.st-rule::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:rgba(43,33,25,.22);transform:scaleX(0);transform-origin:left;transition:transform 1.5s ${EASE} var(--d,0s)}
.is-in .st-rule::before{transform:none}
.st-rule-n{font:500 .74rem/1 ${SANS};letter-spacing:.06em;color:rgba(43,33,25,.55)}
.st-rule h3{margin:0;font:italic 400 clamp(1.4rem,2.9vw,2.7rem)/1.1 ${SERIF};color:${TERRA}}
.st-rule p{margin:0;font-size:.95rem;color:rgba(43,33,25,.68)}

.st-dict{position:relative;max-width:620px;padding:clamp(1.3rem,3.4vw,2.4rem);border-radius:18px;background:#fbf6ee;box-shadow:0 30px 60px -40px rgba(64,40,18,.6)}
.st-dict-w{margin:0;font:italic 400 clamp(2.6rem,7vw,5.2rem)/1 ${SERIF};color:${INK}}
.st-dict-s{margin:.55rem 0 0;font:500 .78rem/1.4 ${SANS};letter-spacing:.08em;color:rgba(43,33,25,.55)}
.st-dict-s b{color:${TERRA};font-weight:500}
.st-dict-d{margin:1.1rem 0 0;padding-top:1rem;border-top:1px solid rgba(43,33,25,.14);font:italic 400 clamp(1.15rem,2.1vw,1.55rem)/1.4 ${SERIF}}
.st-dict-d::before{content:"1. ";font-style:normal;font-family:${SANS};font-size:.75em;color:${TERRA}}

.st-band,.st-back{position:absolute;left:0;right:0;bottom:clamp(26px,7vh,70px);z-index:1;overflow:hidden;padding:.9rem 0;border-top:1px solid rgba(43,33,25,.16);border-bottom:1px solid rgba(43,33,25,.16);opacity:0;transition:opacity 1.6s .9s}
.is-in .st-band,.is-in .st-back{opacity:1}
.st-band-track{display:flex;width:max-content}
.live .st-band .st-band-track{animation:st-mq 30s linear infinite}
.live .st-back .st-band-track{animation:st-mq-back 46s linear infinite}
.st-band span,.st-back span{flex:none;padding:0 1.1rem;white-space:nowrap;font:500 clamp(1.3rem,2.9vw,2.7rem)/1.1 ${SANS};letter-spacing:-.04em;text-transform:uppercase}
.st-band span:nth-child(4n+3){color:transparent;-webkit-text-stroke:1px rgba(43,33,25,.5)}
.st-back{border:0;opacity:0}
.is-in .st-back{opacity:.32}
.st-back span{font:italic 400 clamp(1.1rem,2.2vw,1.9rem)/1.1 ${SERIF};text-transform:none;letter-spacing:0}
.st-band b,.st-back b{flex:none;align-self:center;color:${TERRA};font-weight:400;font-size:clamp(.9rem,1.6vw,1.4rem)}
@keyframes st-mq{to{transform:translate3d(-50%,0,0)}}
@keyframes st-mq-back{from{transform:translate3d(-50%,0,0)}to{transform:translate3d(0,0,0)}}
.st-k-band .st-in,.st-k-back .st-in{padding-bottom:clamp(120px,20vh,190px)}

.st-dishes{position:absolute;right:clamp(6%,11vw,15%);bottom:clamp(12%,16vh,20%);z-index:1;width:clamp(110px,15vw,210px);height:clamp(150px,22vw,300px)}
.live .st-dishes{animation:st-wobble 4.5s ease-in-out infinite}
@keyframes st-wobble{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1.4deg)}}
.st-dish{position:absolute;left:calc(var(--o) * 1%);bottom:calc(var(--k) * 10.5%);width:100%;height:16%;border-radius:50%;background:radial-gradient(ellipse at 50% 40%,#fffdf8 0 46%,#efe2cc 47% 58%,#fbf6ee 59%);
  box-shadow:0 3px 0 #d9c4a4,0 10px 18px -12px rgba(64,40,18,.6);opacity:0;transform:translate3d(0,-260%,0) rotate(var(--r));transition:transform .9s ${BOUNCE},opacity .4s;transition-delay:calc(1.2s + var(--k) * .42s)}
.is-in .st-dish{opacity:1;transform:rotate(var(--r))}
.st-k-dishes .st-stack{max-width:min(62%,720px)}

.st-night{text-align:center;display:flex;flex-direction:column;align-items:center}
.st-night .st-kicker{margin-bottom:clamp(1.4rem,4vh,2.4rem)}
.st-vlines{position:relative;display:grid;place-items:center;width:100%;min-height:clamp(9rem,32vh,17rem)}
.st-vl{grid-area:1/1;max-width:20ch;margin:0;font:italic 400 clamp(1.7rem,4.2vw,3.9rem)/1.16 ${SERIF};color:${CREAM};opacity:0;filter:blur(10px);transform:translate3d(0,16px,0);transition:opacity 1.2s,filter 1.5s,transform 1.5s ${EASE}}
.st-vl.on{opacity:1;filter:none;transform:none}
.st-vl.gone{opacity:0;filter:blur(8px);transform:translate3d(0,-14px,0)}
.st-night.done .st-vlines{display:block;min-height:0}
.st-night.done .st-vl{display:block;max-width:none;margin:0 auto;opacity:.92;filter:none;transform:none;font-size:clamp(1rem,1.7vw,1.45rem);line-height:1.5;transition:opacity 1.2s}
.st-vctl{display:flex;align-items:center;gap:1rem;margin-top:clamp(1.6rem,4vh,2.6rem)}
.st-vbar{position:relative;width:min(180px,40vw);height:1px;background:rgba(246,236,221,.25)}
.st-vbar i{position:absolute;inset:0;background:${CREAM};transform-origin:left;transform:scaleX(var(--vp,0))}
.st-vbtn.pulse{animation:st-pulse 1.8s ease-in-out infinite}
@keyframes st-pulse{0%,100%{box-shadow:0 0 0 0 rgba(246,236,221,.45)}50%{box-shadow:0 0 0 10px rgba(246,236,221,0)}}
.st-vic{display:inline-block;width:.9em;text-align:center}
.st-nightmoon{position:absolute;left:50%;top:clamp(10%,14vh,18%);z-index:1;width:clamp(70px,9vw,120px);aspect-ratio:1;margin-left:clamp(-60px,-4.5vw,-35px);border-radius:50%;
  background:radial-gradient(circle at 36% 34%,#fffbf3,#f2dfc0 55%,#d9bd95);box-shadow:0 0 50px 16px rgba(255,240,214,.28),0 0 160px 60px rgba(255,230,200,.12);opacity:0;transition:opacity 3s .6s}
.is-in .st-nightmoon{opacity:.9}
.st-k-night .st-nightmoon{transition:opacity 3s .6s,transform 1.4s ${EASE}}
.st-k-night.vdone .st-nightmoon{opacity:.28;transform:translate3d(0,-55%,0) scale(.7)}

.st-dawnglow{position:absolute;left:-15%;right:-15%;bottom:-35%;height:80%;z-index:0;background:radial-gradient(55% 60% at 50% 100%,rgba(246,176,112,.6),rgba(246,176,112,.18) 45%,rgba(246,176,112,0) 72%);opacity:0;transform:translate3d(0,22%,0);transition:opacity 3.4s,transform 4.2s ${EASE}}
.is-in .st-dawnglow{opacity:1;transform:none}
.st-chaosline{margin-top:clamp(1.4rem,4vh,2.4rem);font:italic 400 clamp(2.2rem,6vw,5.4rem)/1.1 ${SERIF}}
.st-chaosline .fx-chaos{color:#f0b98f}

.st-k-final .st-in{display:flex;flex-direction:column;align-items:center;text-align:center}
.st-sky{position:relative;width:clamp(160px,24vw,280px);aspect-ratio:1.6;margin:0 auto clamp(.4rem,2vh,1.2rem)}
.st-sky .st-moonball{position:absolute;left:50%;top:50%;right:auto;width:46%;margin:-23% 0 0 -23%}
.st-sky svg{position:absolute;inset:-10% -14%;width:128%;height:120%;overflow:visible}
.st-sky ellipse{fill:none;stroke:#ead2ad;stroke-width:1.6;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 3s cubic-bezier(.65,0,.35,1) 1s;filter:drop-shadow(0 0 6px rgba(234,210,173,.8))}
.is-in .st-sky ellipse{stroke-dashoffset:0}
.st-finalar{margin:clamp(.4rem,1.6vh,1rem) 0 0;font:400 clamp(2rem,4.6vw,3.6rem)/1.3 Amiri,'Noto Naskh Arabic',serif;color:${CREAM}}
.st-sign{margin:clamp(.8rem,2vh,1.2rem) 0 0;font:italic 400 clamp(1.25rem,2vw,1.65rem)/1 ${SERIF};color:rgba(246,236,221,.86)}
.st-end{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;margin-top:clamp(1.4rem,4vh,2.4rem)}
.st-end .btn{border:0;cursor:pointer;font-family:${SANS}}

@media (max-width:760px){
  .st-count{display:none}
  .st-home{grid-template-columns:minmax(0,1fr);gap:1.1rem}
  .st-photo{max-width:none;width:min(66vw,34vh)}
  .st-name,.st-pill{padding:.45rem .85rem .5rem}
  .st-rule{grid-template-columns:2.4rem minmax(0,1fr);row-gap:.45rem}
  .st-rule p{grid-column:2}
  .st-artveil{background:linear-gradient(180deg,rgba(230,212,184,.9),rgba(230,212,184,.75))}
  .st-moonball{right:8%;top:11%}
  .st-orbit{right:50%;top:clamp(70px,13vh,120px);width:min(70vw,34vh);transform:translateX(50%)}
  .st-k-orbit .st-in{padding-top:calc(min(70vw,34vh) + clamp(70px,13vh,120px))}
  .st-k-orbit .st-stack{max-width:none}
  .st-orbit text{font-size:15px}
  .st-dishes{right:6%;bottom:6%;width:84px;height:120px}
  .st-k-dishes .st-stack{max-width:none}
  .st-sticker{margin-left:6px}
}
@media (prefers-reduced-motion:reduce){
  .st-root{clip-path:none!important;opacity:0;transition:opacity .5s!important}
  .st-root.st-open{opacity:1}.st-root.st-closing{opacity:0}
  .st-root [data-split] .ln>span,.st-root [data-r],.st-write,.st-name,.st-pill,.st-photo,.st-moonball,.st-sticker,.st-dish,.st-join span,.fx-fall .l,.fx-chaos .l,.fx-blur,.fx-hug b{transition:none!important;transform:none!important;opacity:1!important;clip-path:none!important;filter:none!important}
  .st-root .live *,.st-band-track,.st-light,.st-hint i{animation:none!important}
}`;

  var fontCss = null;
  function ensureStyles() {
    if (!document.getElementById("storyFonts")) {
      var link = document.createElement("link");
      link.id = "storyFonts"; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Amiri&family=EB+Garamond:ital,wght@0,400;1,400;1,500&family=Great+Vibes&display=swap";
      // the font list has to arrive before the fonts can be asked for
      fontCss = new Promise(function (res) { link.onload = res; link.onerror = res; });
      document.head.appendChild(link);
    } else if (!fontCss) fontCss = Promise.resolve();
    if (!document.getElementById("storyStyles")) {
      var s = document.createElement("style");
      s.id = "storyStyles"; s.textContent = CSS;
      document.head.appendChild(s);
    }
  }
  function fontsReady(ms) {
    var list = ["italic 400 40px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "40px 'Great Vibes'", "40px Amiri"];
    var all = (fontCss || Promise.resolve()).then(function () {
      return document.fonts && document.fonts.load
        ? Promise.all(list.map(function (f) { return document.fonts.load(f, "Mžćđ روحي").catch(function () {}); }))
        : null;
    });
    return Promise.race([all, new Promise(function (r) { setTimeout(r, ms); })]);
  }

  /* ---------- music: created inside the gesture, routed through a gain node once the context runs ---------- */
  var audio = null, voice = null;
  function newAudio() {
    var el = new Audio();
    el.preload = "auto"; el.loop = true; el.setAttribute("playsinline", ""); el.src = SONG;
    return { el: el, ctx: null, gain: null, routed: false, muted: false, playing: false, ducked: false, fadeId: 0 };
  }
  function setVolume(target, ms) {
    var a = audio; if (!a) return;
    a.fadeId++;
    if (a.routed && a.gain) {
      var now = a.ctx.currentTime, g = a.gain.gain;
      try { g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(target, now + Math.max(ms, 30) / 1000); } catch (e) { g.value = target; }
      return;
    }
    a.el.muted = target === 0;
    var id = a.fadeId, from = a.el.volume, t0 = performance.now();
    (function step(ts) {
      if (audio !== a || a.fadeId !== id || a.routed) return;
      var p = Math.min((ts - t0) / Math.max(ms, 1), 1);
      try { a.el.volume = Math.max(0, Math.min(1, from + (target - from) * p)); } catch (e) {}
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function musicLevel() { return audio && !audio.muted && !audio.ducked ? TARGET_VOL : 0; }
  function route() {
    var a = audio; if (!a || a.routed || !a.ctx || a.ctx.state !== "running") return;
    try {
      var src = a.ctx.createMediaElementSource(a.el);
      a.gain = a.ctx.createGain(); a.gain.gain.value = 0;
      src.connect(a.gain); a.gain.connect(a.ctx.destination);
      a.routed = true; a.el.muted = false; a.el.volume = 1;
      setVolume(musicLevel(), 2400);
    } catch (e) { a.routed = false; }
  }
  function startAudio() {
    if (!audio) audio = newAudio();
    var a = audio;
    unlockVoice();
    if (a.playing) return;
    try { a.el.volume = 0; } catch (e) {}
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx && !a.ctx) { try { a.ctx = new Ctx(); } catch (e) { a.ctx = null; } }
    var p = null;
    try { p = a.el.play(); } catch (e) { p = null; }
    if (a.ctx) { var r = null; try { r = a.ctx.resume(); } catch (e) {} Promise.resolve(r).then(function () { if (audio === a) route(); }, function () {}); }
    var ok = function () { a.playing = true; setMusicUi(); if (!a.routed) setVolume(musicLevel(), 2400); };
    var bad = function () { a.playing = false; setMusicUi(); };
    if (p && p.then) p.then(ok, bad); else ok();
  }
  function stopAudio() {
    var a = audio; audio = null;
    if (!a) return;
    a.fadeId++;
    if (a.routed && a.gain) { try { var n = a.ctx.currentTime; a.gain.gain.cancelScheduledValues(n); a.gain.gain.setValueAtTime(a.gain.gain.value, n); a.gain.gain.linearRampToValueAtTime(0, n + .9); } catch (e) {} }
    else { var from = a.el.volume, t0 = performance.now(); (function step(ts) { var p = Math.min((ts - t0) / 900, 1); try { a.el.volume = from * (1 - p); } catch (e) {} if (p < 1) requestAnimationFrame(step); })(t0); }
    setTimeout(function () {
      try { a.el.pause(); a.el.removeAttribute("src"); a.el.load(); } catch (e) {}
      if (a.ctx) { try { a.ctx.close(); } catch (e) {} }
    }, 950);
  }
  function toggleMusic() {
    if (!audio || !audio.playing) { startAudio(); return; }
    audio.muted = !audio.muted;
    setVolume(musicLevel(), 700);
    setMusicUi();
  }
  // the song steps aside while the voice speaks (the voice has its own soft music)
  function duck(on) {
    var a = audio; if (!a) return;
    a.ducked = on;
    if (a.routed) { setVolume(musicLevel(), on ? 1000 : 2600); return; }
    if (on) { try { a.el.pause(); } catch (e) {} }
    else if (a.playing) { try { var p = a.el.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} setVolume(musicLevel(), 1800); }
  }

  /* the voice-over: a plain media element, unlocked inside the same gesture as the music */
  function voiceEl() {
    if (!voice) {
      var el = new Audio();
      el.preload = "auto"; el.setAttribute("playsinline", ""); el.src = VOICE;
      voice = { el: el, unlocked: false };
    }
    return voice;
  }
  function unlockVoice() {
    var v = voiceEl();
    if (v.unlocked || v.unlocking) return;
    v.unlocking = true;
    try {
      v.el.muted = true;
      var p = v.el.play();
      var done = function () { try { v.el.pause(); v.el.currentTime = 0; } catch (e) {} v.el.muted = false; v.unlocking = false; };
      if (p && p.then) p.then(function () { v.unlocked = true; done(); }, function () { v.unlocking = false; v.el.muted = false; });
      else { v.unlocked = true; done(); }
    } catch (e) { v.unlocking = false; v.el.muted = false; }
  }

  /* ---------- the hidden door: press and hold the little ring ---------- */
  var hold = null, opened = false, warmed = false;
  function warmUp() {
    if (warmed) return;
    warmed = true;
    ensureStyles();
    if (!audio) { audio = newAudio(); try { audio.el.load(); } catch (e) {} }
    voiceEl();
    [HOME, ART].forEach(function (src) { var i = new Image(); i.src = src; });
  }
  ring.style.touchAction = "none";
  ring.style.webkitTouchCallout = "none";
  ring.style.webkitUserSelect = "none";
  ring.style.userSelect = "none";
  ring.addEventListener("contextmenu", function (e) { if (hold) e.preventDefault(); });

  ring.addEventListener("pointerdown", function (e) {
    if (opened || hold || (e.pointerType === "mouse" && e.button !== 0)) return;
    e.preventDefault();
    try { ring.setPointerCapture(e.pointerId); } catch (err) {}
    warmUp();
    var r = ring.getBoundingClientRect(), c = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    var hud = document.createElement("div");
    hud.className = "st-hold";
    hud.style.cssText = "--x:" + c.x + "px;--y:" + c.y + "px;--s:" + Math.round(Math.max(r.width, r.height) + 30) + "px";
    hud.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg>';
    var warm = document.createElement("div");
    warm.className = "st-warm";
    warm.style.cssText = "--x:" + c.x + "px;--y:" + c.y + "px";
    body.appendChild(warm);
    body.appendChild(hud);
    ring.classList.add("st-holding");
    hold = { id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: performance.now(), c: c, hud: hud, warm: warm, circle: hud.querySelector("circle"), done: false, raf: 0 };
    hold.raf = requestAnimationFrame(holdStep);
  });
  function holdStep(now) {
    var h = hold;
    if (!h || h.done) return;
    var p = Math.min(1, (now - h.t0) / HOLD_MS), e = p * p * (3 - 2 * p);
    h.circle.setAttribute("stroke-dashoffset", (100 - 100 * p).toFixed(2));
    h.warm.style.opacity = (e * 0.95).toFixed(3);
    if (p >= 1) {
      h.done = true;
      if (navigator.vibrate) { try { navigator.vibrate(22); } catch (err) {} }
      openStory(h.c.x, h.c.y);
      return;
    }
    h.raf = requestAnimationFrame(holdStep);
  }
  function hideHoldUi(h) {
    ring.classList.remove("st-holding");
    h.hud.classList.add("st-gone");
    h.warm.style.opacity = "0";
  }
  function dropHold(soft) {
    var h = hold; hold = null;
    if (!h) return;
    cancelAnimationFrame(h.raf);
    clearTimeout(h.safety);
    hideHoldUi(h);
    setTimeout(function () { if (h.hud.parentNode) h.hud.remove(); if (h.warm.parentNode) h.warm.remove(); }, soft ? 900 : 450);
  }
  // letting go after the ring is full is the gesture that lets the music start, on every phone
  function release(e) {
    if (!hold || (e && e.pointerId !== undefined && e.pointerId !== hold.id)) return;
    if (hold.done) { startAudio(); dropHold(true); } else dropHold(false);
  }
  window.addEventListener("pointerup", release, true);
  window.addEventListener("pointercancel", function () { if (hold && !hold.done) dropHold(false); }, true);
  ring.addEventListener("touchend", function () { if (hold && hold.done) startAudio(); }, { passive: true });
  window.addEventListener("pointermove", function (e) {
    if (!hold || hold.done || e.pointerId !== hold.id) return;
    if (Math.abs(e.clientX - hold.x0) + Math.abs(e.clientY - hold.y0) > 16) dropHold(false);
  }, { passive: true });
  window.addEventListener("scroll", function () { if (hold && !hold.done) dropHold(false); }, { passive: true });
  window.addEventListener("blur", function () { if (hold && !hold.done) dropHold(false); });

  /* ---------- text helpers ---------- */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  var fxRand = prng(seed("fx"));
  function letters(s, extra) {
    var chars = Array.from(s), n = chars.length, mid = (n - 1) / 2, out = "";
    for (var k = 0; k < n; k++) out += '<span class="l" style="--k:' + k + (extra ? ";" + extra(k, n, mid) : "") + '">' + esc(chars[k]) + "</span>";
    return out;
  }
  var CURVE = '<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 4 C 30 18, 70 18, 98 4"/></svg>';
  var LINE = '<svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M1 12 C 25 8, 50 15, 75 10 S 96 9, 99 11"/></svg>';
  function fxSpan(type, arg) {
    var a = arg || "";
    switch (type) {
      case "blink": return '<span class="fx fx-blink" data-fx>' + esc(a) + "</span>";
      case "blur": return '<span class="fx fx-blur" data-fx>' + esc(a) + "</span>";
      case "shake": return '<span class="fx fx-shake" data-fx>' + esc(a) + "</span>";
      case "smile": return '<span class="fx fx-smile" data-fx>' + letters(a, function (k, n, mid) {
        var o = mid ? (k - mid) / mid : 0;
        return "--y:" + (0.2 * (1 - o * o)).toFixed(3) + "em;--r:" + (-o * 13).toFixed(1) + "deg";
      }) + "</span>";
      case "giggle": return '<span class="fx fx-giggle" data-fx>' + letters(a) + "</span>";
      case "fall": return '<span class="fx fx-fall" data-fx>' + letters(a, function () { return "--r:" + ((fxRand() - 0.5) * 40).toFixed(1) + "deg"; }) + "</span>";
      case "chaos": return '<span class="fx fx-chaos" data-fx>' + letters(a, function () {
        return "--x:" + ((fxRand() - 0.5) * 1.6).toFixed(2) + "em;--y:" + ((fxRand() - 0.5) * 1.4).toFixed(2) + "em;--r:" + ((fxRand() - 0.5) * 90).toFixed(0) + "deg";
      }) + "</span>";
      case "swap": var p = a.split("|"); return '<span class="fx fx-swap" data-fx><span>' + esc(p[0]) + "</span><span>" + esc(p[1] || p[0]) + "</span></span>";
      case "think": return '<span class="fx fx-think" data-fx aria-hidden="true"><b>' + esc(a || "?") + "</b></span>";
      case "scent": return '<span class="fx fx-scent" data-fx>' + esc(a) + "<i></i><i></i><i></i><i></i><i></i></span>";
      case "wave": return '<span class="fx fx-wave" data-fx>' + esc(a) + '<span class="fx-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></span>';
      case "hug": return '<span class="fx fx-hug" data-fx><b>(</b>' + esc(a) + "<b>)</b></span>";
      case "under": return '<span class="fx fx-under" data-fx>' + esc(a) + CURVE + "</span>";
      case "whole": return '<span class="fx fx-whole" data-fx>' + esc(a) + LINE + "</span>";
      case "more": return '<span class="fx fx-more" data-fx aria-hidden="true"></span>';
    }
    return esc(a);
  }
  function fmt(s) {
    var out = "", re = /\[(\w+)(?::([^\]]*))?\]/g, last = 0, m;
    while ((m = re.exec(s))) { out += plain(s.slice(last, m.index)) + fxSpan(m[1], m[2]); last = re.lastIndex; }
    return out + plain(s.slice(last));
  }
  function plain(s) {
    return esc(s).replace(/\{([^}]+)\}/g, '<span class="st-ar" dir="rtl" lang="ar">$1</span>').replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function lum(rgb) { return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255; }
  // a line with a movement in it is revealed whole, so the movement is never cut by the line mask
  function para(cls, text, d, extra) {
    var has = /\[\w/.test(text);
    if (cls === "st-big" && text.length > 112) cls += " st-long";
    return '<p class="' + cls + '" ' + (has ? "data-r" : "data-split") + ' style="--d:' + d.toFixed(2) + "s" + (extra || "") + '">' + fmt(text) + "</p>";
  }
  function texts(s, d, keys) {
    var out = "";
    d = d || 0.15;
    (keys || Object.keys(s)).forEach(function (k) {
      if (!s[k]) return;
      if (k === "big") { out += para("st-big", s.big, d); d += 0.5; }
      else if (k === "mid" || k === "mid2") { out += para("st-mid", s[k], d); d += 0.45; }
      else if (k === "small" || k === "small2") { out += '<p class="st-small" data-r style="--d:' + (d + 0.25).toFixed(2) + 's">' + fmt(s[k]) + "</p>"; d += 0.35; }
    });
    return out;
  }
  function kicker(t, d) { return '<p class="st-kicker" data-r style="--d:' + (d || 0) + 's">' + esc(t) + "</p>"; }
  var ARROW = '<span class="btn-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-arrow"/></svg></span>';
  function marquee(words, cls) {
    var w = "";
    for (var k = 0; k < (cls === "st-band" ? 8 : 2); k++) words.forEach(function (x) { w += "<span>" + esc(x) + "</span><b>" + (cls === "st-band" ? "♥" : "·") + "</b>"; });
    return '<div class="' + cls + '" aria-hidden="true"><div class="st-band-track">' + w + w + "</div></div>";
  }

  /* ---------- the scenes ---------- */
  function scene(s, i, n) {
    var dark = lum(hex(s.tone)) < 0.42;
    var h = '<section class="st-scene st-k-' + s.k + (dark ? " st-d" : "") + '" data-i="' + i + '" aria-label="' + (i + 1) + " / " + n + '">';
    var before = "", inner = "";
    switch (s.k) {
      case "open":
        inner = kicker(s.label, 0.1) + '<h2 class="st-site" data-split style="--d:.25s">' + fmt(s.site) + "</h2>" +
          '<div data-r style="--d:1.1s"><button type="button" class="btn btn-orange st-begin"><span class="roll"><span>' + esc(s.btn) + "</span></span>" + ARROW + "</button></div>";
        before = '<p class="st-hint" aria-hidden="true">' + esc(s.hint) + "<i></i></p>";
        break;
      case "pen":
        inner = kicker(s.label, 0.1) + '<div class="st-stack">' + texts(s, 0.2, ["big", "small"]) +
          '<div class="st-penrow" data-r style="--d:1.3s"><p class="st-mid" style="margin:0">' + esc(s.pen) + '</p><svg class="st-scribble" viewBox="0 0 240 40" aria-hidden="true"><path pathLength="1" d="M3 26 C 14 8, 26 6, 32 22 S 46 38, 56 20 S 72 4, 82 22 S 98 38, 110 18 S 128 4, 138 24 S 156 38, 168 20 S 186 6, 196 24 S 214 36, 226 20 L 237 16"/></svg></div></div>';
        break;
      case "grow":
        inner = '<div class="st-stack">' + texts(s, 0.15, ["mid"]) +
          '<p class="st-big" data-r style="--d:.7s"><span class="st-growbox">' + esc(s.lead) + '</span><span class="st-grow-w">' + esc(s.grow) + "</span></p>" +
          texts(s, 1.2, ["small"]) + "</div>";
        break;
      case "tilt":
        // the line about tilting her head tilts too
        var dd = 0.15, parts = "";
        Object.keys(s).forEach(function (k) {
          if (k === "big") { parts += '<div class="st-tiltbox">' + para("st-big", s.big, dd) + "</div>"; dd += 0.5; }
          else if (k === "small") { parts += '<p class="st-small" data-r style="--d:' + (dd + 0.2).toFixed(2) + 's">' + fmt(s.small) + "</p>"; dd += 0.35; }
        });
        inner = '<div class="st-stack">' + parts + "</div>";
        break;
      case "note":
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        before = '<p class="st-note">' + esc(s.note) + "</p>";
        break;
      case "shades":
        var tones = ["#e9d2b0", "#d9b58a", "#c8975f", "#a8713f", "#8a5a33", "#6d452a", "#4f3324"], her = 3;
        var sw = tones.map(function (t, j) { return '<span class="st-shade' + (j === her ? " her" : "") + '"' + (j === her ? ' data-l="' + esc(s.pick) + '"' : "") + ' style="background:' + t + '"></span>'; }).join("");
        inner = '<div class="st-stack">' + texts(s, 0.15, ["big", "small"]) +
          '<div data-r style="--d:1s"><div class="st-shades-wrap"><div class="st-shades">' + sw + '</div><span class="st-ring"></span></div></div>' +
          '<p class="st-script st-write" style="--d:2.2s">' + fmt(s.script) + "</p>" +
          '<p class="st-small" data-r style="--d:3.2s;margin-top:.4rem">' + fmt(s.small2) + "</p></div>";
        break;
      case "orbit":
        var words = s.words.concat(s.words).join("  ·  ") + "  ·  ";
        before = '<div class="st-orbit" aria-hidden="true"><div class="st-moonball"></div><svg viewBox="0 0 400 400"><defs><path id="st-orb" d="M200,200 m-176,0 a176,176 0 1,1 352,0 a176,176 0 1,1 -352,0"/></defs>' +
          '<g class="st-spin"><text><textPath href="#st-orb">' + esc(words) + "</textPath></text></g></svg></div>";
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        break;
      case "home":
        inner = '<div class="st-home"><figure class="st-photo"><img src="' + HOME + '" alt="Naš budući dom" decoding="async"><figcaption>Naš budući dom</figcaption></figure>' +
          "<div>" + kicker(s.label, 0.3) + texts(s, 0.45, ["mid"]) +
          '<div class="st-names">' + s.names.map(function (nm, j) { return '<span class="st-name" style="--i:' + j + '">' + esc(nm) + "</span>"; }).join("") + "</div>" +
          '<p class="st-small" data-r style="--d:3.2s">' + fmt(s.small) + "</p></div></div>";
        break;
      case "sticker":
        inner = kicker(s.label, 0.1) + '<div class="st-stack"><div><span class="st-sticker">' + fmt(s.sticker) + "</span></div>" + texts(s, 1.1, ["mid", "small"]) + "</div>";
        break;
      case "route":
        inner = kicker(s.label, 0.1) + '<div class="st-stack">' + texts(s, 0.2, ["big", "small"]) + "</div>" +
          '<div class="st-route" data-r style="--d:1.1s" aria-hidden="true"><span class="st-route-time">2:00</span><span class="st-route-n">×1</span><span class="st-route-line"></span>' +
          '<span class="st-route-end a"></span><span class="st-route-end b"></span><span class="st-route-dot"></span>' +
          '<span class="st-route-lab a">' + esc(s.from) + '</span><span class="st-route-lab b">' + esc(s.to) + "</span></div>" +
          '<p class="st-script st-write" style="--d:2.4s">' + fmt(s.script) + "</p>";
        break;
      case "list":
        inner = '<div class="st-stack">' + texts(s, 0.15, ["big", "mid"]) +
          '<div class="st-pills">' + s.items.map(function (it, j) { return '<span class="st-pill' + (j === s.items.length - 1 ? " lazy" : "") + '" style="--i:' + j + '">' + esc(it) + "</span>"; }).join("") + "</div>" +
          '<p class="st-small" data-r style="--d:3.6s">' + fmt(s.small) + "</p></div>";
        break;
      case "pills":
        inner = '<div class="st-stack">' + texts(s, 0.15, ["mid", "big"]) +
          '<div class="st-pills">' + s.items.map(function (it, j) { return '<span class="st-pill" style="--i:' + j + '">' + esc(it) + "</span>"; }).join("") + "</div>" +
          '<p class="st-small" data-r style="--d:3.4s">' + fmt(s.small) + "</p></div>";
        break;
      case "stairs":
        inner = '<div class="st-stack">' + texts(s, 0.15, ["mid"]) +
          '<p class="st-big" style="max-width:none"><span data-r style="--d:.6s;display:block">' + esc(s.lead) + '</span><span class="st-stairs">' +
          s.steps.map(function (st, j) { return '<span class="st-step" data-r style="--d:' + (1.2 + j * 0.55).toFixed(2) + 's">' + esc(st) + "</span>"; }).join("") + "</span></p>" +
          texts(s, 2.4, ["small"]) + "</div>";
        break;
      case "color":
        before = '<div class="st-gray" aria-hidden="true"></div><div class="st-bloom" aria-hidden="true"></div>';
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        break;
      case "ruhi":
        before = '<div class="st-artbg" aria-hidden="true"></div><div class="st-artveil" aria-hidden="true"></div>';
        inner = '<div class="st-stack"><p class="st-small" data-r style="--d:.15s">' + fmt(s.small) + "</p>" +
          '<p class="st-ruhi" data-r style="--d:.5s" dir="rtl" lang="ar">' + esc(s.word) + "</p>" + texts(s, 1, ["mid", "small2"]) + "</div>";
        break;
      case "join":
        inner = '<div class="st-stack">' + texts(s, 0.15, ["mid"]) +
          '<p class="st-join" aria-label="' + esc(s.a + " " + s.b) + '"><span>' + esc(s.a) + "</span><i></i><span>" + esc(s.b) + "</span></p>" +
          texts(s, 2.2, ["small"]) + "</div>";
        break;
      case "days":
        inner = '<div class="st-numwrap" data-r style="--d:.1s"><span class="st-num" data-from="' + s.num + '">' + s.num + "</span></div>" +
          '<div class="st-stack">' + texts(s, 0.6, ["mid", "small", "mid2"]) + "</div>";
        break;
      case "rules":
        inner = '<div class="st-stack">' + texts(s, 0.1, ["mid"]) + "</div>" + '<div style="margin-top:clamp(1.2rem,3vh,2rem)">' + kicker(s.label, 0.4) + "</div>" +
          '<ol class="st-rules">' + s.rules.map(function (r, j) {
            return '<li class="st-rule" style="--d:' + (0.55 + j * 0.25) + 's"><span class="st-rule-n" data-r style="--d:' + (0.65 + j * 0.25) + 's">' + esc(r[0]) + "</span>" +
              para("", r[1], 0.65 + j * 0.25).replace("<p ", "<h3 ").replace(/<\/p>$/, "</h3>") + '<p data-r style="--d:' + (1 + j * 0.25) + 's">' + fmt(r[2]) + "</p></li>";
          }).join("") + "</ol>";
        break;
      case "dict":
        inner = '<div class="st-dict" data-r style="--d:.2s"><p class="st-dict-w">' + esc(s.word) + '</p><p class="st-dict-s">' + esc(s.syll) + " · <b>" + esc(s.kind) + "</b></p>" +
          '<p class="st-dict-d">' + fmt(s.def) + "</p></div>";
        break;
      case "back":
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        before = marquee(s.words, "st-back");
        break;
      case "band":
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        before = marquee([s.band], "st-band");
        break;
      case "dishes":
        var plates = "";
        for (var d = 0; d < 7; d++) plates += '<i class="st-dish" style="--k:' + d + ";--o:" + ((fxRand() - 0.5) * 10).toFixed(1) + ";--r:" + ((fxRand() - 0.5) * 7).toFixed(1) + 'deg"></i>';
        before = '<div class="st-dishes" aria-hidden="true">' + plates + "</div>";
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        break;
      case "night":
        before = '<div class="st-nightmoon" aria-hidden="true"></div>';
        inner = '<div class="st-night">' + kicker(s.label, 0.2) + '<div class="st-vlines">' +
          s.lines.map(function (l, j) { return '<p class="st-vl" data-t="' + l[0] + '">' + esc(l[1]) + "</p>"; }).join("") + "</div>" +
          '<div class="st-vctl" data-r style="--d:.9s"><button type="button" class="st-btn st-vbtn"><span class="st-vic" aria-hidden="true">▶</span><span class="st-vtx">' + esc(s.play) + '</span></button><span class="st-vbar" aria-hidden="true"><i></i></span></div></div>';
        break;
      case "dawn":
        before = '<div class="st-dawnglow" aria-hidden="true"></div>';
        inner = '<div class="st-stack">' + texts(s, 0.15, ["big", "small"]) + '<p class="st-chaosline" data-r style="--d:1.2s">' + fmt(s.chaos) + " " + esc(s.tail) + "</p></div>";
        break;
      case "final":
        inner = '<div class="st-sky" aria-hidden="true"><div class="st-moonball"></div><svg viewBox="0 0 400 250" preserveAspectRatio="none"><ellipse cx="200" cy="125" rx="188" ry="54" pathLength="1" transform="rotate(-9 200 125)"/></svg></div>' +
          '<p class="st-script st-write" style="--d:.9s">' + fmt(s.script) + "</p>" +
          '<p class="st-finalar" data-r style="--d:2.4s">' + esc(s.ar) + "</p>" +
          '<p class="st-sign" data-r style="--d:3s">' + esc(s.sign) + "</p>" +
          '<div class="st-end" data-r style="--d:3.6s"><button type="button" class="btn btn-orange btn-plain st-again"><span class="roll"><span>' + esc(s.again) + '</span></span></button>' +
          '<button type="button" class="st-btn st-done">' + esc(s.close) + "</button></div>";
        break;
      default:
        inner = '<div class="st-stack">' + texts(s) + "</div>";
    }
    return h + before + '<div class="st-in">' + inner + "</div></section>";
  }

  /* ---------- line splitting (the same rising lines as the site's headings) ---------- */
  function tokens(el) {
    var list = [], space = false;
    (function walk(node, wrap) {
      for (var n = node.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3) {
          var parts = n.nodeValue.split(/(\s+)/);
          for (var i = 0; i < parts.length; i++) {
            if (!parts[i]) continue;
            if (/^\s+$/.test(parts[i])) { space = true; continue; }
            var w = '<span class="w">' + esc(parts[i]) + "</span>";
            for (var j = wrap.length - 1; j >= 0; j--) w = wrap[j][0] + w + wrap[j][1];
            list.push({ html: w, sp: space && list.length > 0 });
            space = false;
          }
        } else if (n.nodeType === 1) {
          if (n.hasAttribute("data-fx")) { list.push({ html: '<span class="w">' + n.outerHTML + "</span>", sp: space && list.length > 0 }); space = false; continue; }
          var open = "<" + n.tagName.toLowerCase();
          for (var a = 0; a < n.attributes.length; a++) open += " " + n.attributes[a].name + '="' + esc(n.attributes[a].value) + '"';
          walk(n, wrap.concat([[open + ">", "</" + n.tagName.toLowerCase() + ">"]]));
        }
      }
    })(el, []);
    return list;
  }
  function joinT(list) { var s = ""; for (var i = 0; i < list.length; i++) s += (i && list[i].sp ? " " : "") + list[i].html; return s; }
  function split(el) {
    if (el.__src === undefined) el.__src = el.innerHTML; else el.innerHTML = el.__src;
    var list = tokens(el);
    el.innerHTML = joinT(list);
    // words of different scripts sit at different heights, so lines are told apart by their middles
    var cs = getComputedStyle(el), lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    var ws = el.querySelectorAll(".w"), lines = [], cur = null, mid = null;
    for (var i = 0; i < ws.length; i++) {
      var r = ws[i].getBoundingClientRect(), m = r.top + r.height / 2;
      if (mid === null || m > mid + lh * 0.5) { cur = []; lines.push(cur); mid = m; }
      cur.push(list[i]);
    }
    el.innerHTML = lines.map(function (ln, k) { return '<span class="ln"><span style="--i:' + k + '">' + joinT(ln) + (k < lines.length - 1 ? " " : "") + "</span></span>"; }).join("");
    el.classList.add("is-split");
  }

  /* ---------- the open story ---------- */
  var S = null;
  function setMusicUi() {
    if (!S) return;
    var on = !!(audio && audio.playing && !audio.muted);
    S.root.classList.toggle("st-muted", !on);
    S.music.setAttribute("aria-pressed", on ? "true" : "false");
    S.musicTxt.textContent = on ? "Muzika" : "Pusti muziku";
  }
  function openStory(cx, cy) {
    if (opened) return;
    var data;
    try { data = readStory(); } catch (e) { dropHold(false); return; }
    opened = true;
    ensureStyles();
    fxRand = prng(seed("fx"));

    var n = data.length;
    var root = document.createElement("div");
    root.className = "secret-overlay st-root";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", data[0].label);
    root.style.setProperty("--cx", cx + "px");
    root.style.setProperty("--cy", cy + "px");
    root.innerHTML =
      '<div class="st-bg"></div><div class="st-light" aria-hidden="true"></div><div class="st-grain" aria-hidden="true"></div>' +
      '<canvas class="st-fx" aria-hidden="true"></canvas><div class="st-glow" aria-hidden="true"></div>' +
      '<div class="st-top"><svg class="st-mark" aria-hidden="true"><use href="#da-mark"/></svg>' +
      '<span class="st-count">01 / ' + (n < 10 ? "0" : "") + n + '</span><span class="st-bar" aria-hidden="true"><i></i></span>' +
      '<button type="button" class="st-btn st-music" aria-pressed="false"><span class="st-eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="st-music-t">Muzika</span></button>' +
      '<button type="button" class="st-btn st-x" aria-label="Zatvori priču">✕</button></div>' +
      '<div class="st-scroll" tabindex="-1">' + data.map(function (s, i) { return scene(s, i, n); }).join("") + "</div>";

    S = {
      root: root, data: data, n: n, tones: data.map(function (s) { return hex(s.tone); }),
      bg: root.querySelector(".st-bg"), scroller: root.querySelector(".st-scroll"), count: root.querySelector(".st-count"),
      bar: root.querySelector(".st-bar"), music: root.querySelector(".st-music"), musicTxt: root.querySelector(".st-music-t"),
      glow: root.querySelector(".st-glow"), canvas: root.querySelector(".st-fx"), scenes: [], timers: [], listeners: [], raf: 0,
      prevOverflow: body.style.overflow, dark: 0, idx: 0, io: null, routeRaf: 0, days: null, night: null, vRaf: 0, vState: "idle"
    };
    S.scenes = Array.prototype.slice.call(root.querySelectorAll(".st-scene"));
    body.appendChild(root);
    body.style.overflow = "hidden";
    html.classList.add("story-open");
    setMusicUi();

    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add("st-open"); }); });
    on(S.scroller, "scroll", onStoryScroll, { passive: true });
    on(root.querySelector(".st-x"), "click", closeStory);
    on(root.querySelector(".st-done"), "click", closeStory);
    on(S.music, "click", toggleMusic);
    on(root.querySelector(".st-begin"), "click", function () { if (!audio || !audio.playing) startAudio(); goTo(1); });
    on(root.querySelector(".st-again"), "click", function () { goTo(0); });
    on(root.querySelector(".st-vbtn"), "click", voiceButton);
    on(document, "keydown", function (e) { if (e.key === "Escape") closeStory(); });
    // any first touch inside the story may start the music if the browser blocked it before
    var nudge = function () { unlockVoice(); if (audio && !audio.playing && !audio.muted) startAudio(); };
    on(root, "touchend", nudge, { passive: true });
    on(root, "click", nudge);
    if (fine) on(root, "mousemove", function (e) { root.classList.add("st-pointer"); S.glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)"; }, { passive: true });
    on(window, "resize", onResize);
    var colorScene = root.querySelector(".st-k-color");
    if (colorScene) S.timers.push(setTimeout(placeBloom, 600));

    fontsReady(2600).then(function () {
      if (!S || S.root !== root) return;
      Array.prototype.forEach.call(root.querySelectorAll("[data-split]"), split);
      shadesSetup();
      S.timers.push(setTimeout(startReveals, reduce ? 0 : 520));
      // if a font arrives late (slow connection), measure the lines again
      if (document.fonts && document.fonts.addEventListener) on(document.fonts, "loadingdone", onResize);
    });
    onStoryScroll();
    startFx();
    S.timers.push(setTimeout(function () { try { S.scroller.focus({ preventScroll: true }); } catch (e) {} }, 400));
    // the ring's glow fades once the story is open; the hold itself ends when the finger lets go
    S.timers.push(setTimeout(function () { if (hold && hold.done) hideHoldUi(hold); }, 1300));
    if (hold) hold.safety = setTimeout(function () { if (hold && hold.done) dropHold(true); }, 15000);
  }
  function on(t, type, fn, o) { if (!t) return; t.addEventListener(type, fn, o); S.listeners.push([t, type, fn, o]); }
  function goTo(i) { if (S) S.scroller.scrollTo({ top: i * S.scroller.clientHeight, behavior: reduce ? "auto" : "smooth" }); }
  function startReveals() {
    if (!S) return;
    if (!("IntersectionObserver" in window)) { S.scenes.forEach(function (sc) { sc.classList.add("is-in", "live"); }); return; }
    S.io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var sc = e.target;
        if (!e.isIntersecting) { sc.classList.remove("live"); leaveScene(sc); return; }
        sc.classList.add("is-in", "live");
        enterScene(sc);
      });
    }, { root: S.scroller, threshold: 0.45 });
    S.scenes.forEach(function (sc) { S.io.observe(sc); });
  }
  function enterScene(sc) {
    if (sc.classList.contains("st-k-route")) startRoute(sc);
    if (sc.classList.contains("st-k-days")) startDays(sc);
    if (sc.classList.contains("st-k-night")) nightEnter(sc);
  }
  function leaveScene(sc) {
    if (sc.classList.contains("st-k-route")) stopRoute();
    if (sc.classList.contains("st-k-days")) stopDays(sc);
    if (sc.classList.contains("st-k-night")) nightLeave(sc);
  }
  var resizeT = 0;
  function onResize() {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      if (!S) return;
      Array.prototype.forEach.call(S.root.querySelectorAll("[data-split]"), split);
      shadesSetup();
      placeBloom();
      S.scroller.scrollTop = S.idx * S.scroller.clientHeight;
      onStoryScroll();
    }, 200);
  }
  var scrollTick = false;
  function onStoryScroll() {
    if (scrollTick || !S) return;
    scrollTick = true;
    requestAnimationFrame(function () {
      scrollTick = false;
      if (!S) return;
      var sc = S.scroller, hgt = sc.clientHeight || 1, f = Math.max(0, Math.min(S.n - 1, sc.scrollTop / hgt));
      var i = Math.floor(f), t = f - i, j = Math.min(S.n - 1, i + 1), e = t * t * (3 - 2 * t);
      var a = S.tones[i], b = S.tones[j], c = [0, 1, 2].map(function (k) { return Math.round(a[k] + (b[k] - a[k]) * e); });
      S.bg.style.backgroundColor = "rgb(" + c.join(",") + ")";
      S.dark = Math.max(0, Math.min(1, (0.55 - lum(c)) / 0.35));
      S.root.classList.toggle("st-dark", lum(c) < 0.42);
      S.idx = Math.round(f);
      S.count.textContent = (S.idx < 9 ? "0" : "") + (S.idx + 1) + " / " + (S.n < 10 ? "0" : "") + S.n;
      S.bar.style.setProperty("--prog", (f / (S.n - 1)).toFixed(4));
    });
  }

  /* the shade picker: the ring wanders to other shades and always comes back to hers */
  function shadesSetup() {
    if (!S) return;
    Array.prototype.forEach.call(S.root.querySelectorAll(".st-shades-wrap"), function (w) {
      var chips = w.querySelectorAll(".st-shade"), her = w.querySelector(".st-shade.her"), ring = w.querySelector(".st-ring");
      if (!her || !ring) return;
      var wr = w.getBoundingClientRect(), hr = her.getBoundingClientRect(), pad = 6;
      var at = function (el) { var r = el.getBoundingClientRect(); return r.left + r.width / 2 - (hr.left + hr.width / 2); };
      ring.style.setProperty("--hw", (hr.width + pad * 2) + "px");
      ring.style.setProperty("--hx", (hr.left - wr.left - pad) + "px");
      ring.style.setProperty("--l1", at(chips[1]) + "px");
      ring.style.setProperty("--r1", at(chips[5]) + "px");
    });
  }
  /* the colour scene: warmth spreads from the word "boja" */
  function placeBloom() {
    if (!S) return;
    var sc = S.root.querySelector(".st-k-color"), w = sc && sc.querySelector("em"), bl = sc && sc.querySelector(".st-bloom");
    if (!w || !bl) return;
    var sr = sc.getBoundingClientRect(), r = w.getBoundingClientRect();
    bl.style.setProperty("--bx", (r.left + r.width / 2 - sr.left) + "px");
    bl.style.setProperty("--by", (r.top + r.height / 2 - sr.top) + "px");
  }

  /* two minutes from one place to another, walked again and again */
  function startRoute(sceneEl) {
    stopRoute();
    var box = sceneEl.querySelector(".st-route"), time = box.querySelector(".st-route-time"), cnt = box.querySelector(".st-route-n"), t0 = performance.now() + 900, lastCyc = -1;
    (function step(now) {
      if (!S) return;
      var el = now - t0, cyc = Math.floor(Math.max(0, el) / 6200), ph = (Math.max(0, el) % 6200), p = Math.max(0, Math.min(1, ph / 4200));
      var ep = el < 0 ? 0 : (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
      if (cyc !== lastCyc) { lastCyc = cyc; cnt.textContent = "×" + (cyc + 1); }
      box.style.setProperty("--p", ep.toFixed(4));
      var left = Math.round(120 * (1 - ep));
      time.textContent = Math.floor(left / 60) + ":" + (left % 60 < 10 ? "0" : "") + (left % 60);
      S.routeRaf = requestAnimationFrame(step);
    })(performance.now());
  }
  function stopRoute() { if (S && S.routeRaf) { cancelAnimationFrame(S.routeRaf); S.routeRaf = 0; } }

  /* the days: it starts counting, then stops — he doesn't like counting them */
  function startDays(sc) {
    stopDays(sc);
    var num = sc.querySelector(".st-num"), wrap = sc.querySelector(".st-numwrap"), from = +num.getAttribute("data-from"), k = 0;
    if (reduce) return;
    S.days = setTimeout(function tick() {
      if (!S) return;
      k++;
      num.textContent = String(from - k);
      if (k < 4) S.days = setTimeout(tick, 460);
      else S.days = setTimeout(function () { num.textContent = String(from); wrap.classList.add("stop"); }, 700);
    }, 1500);
  }
  function stopDays(sc) {
    if (S && S.days) { clearTimeout(S.days); S.days = null; }
    var num = sc.querySelector(".st-num"), wrap = sc.querySelector(".st-numwrap");
    if (num) num.textContent = num.getAttribute("data-from");
    if (wrap) wrap.classList.remove("stop");
  }

  /* ---------- the night: lines appear as the voice speaks them ---------- */
  function nightParts(sc) { return { box: sc.querySelector(".st-night"), lines: Array.prototype.slice.call(sc.querySelectorAll(".st-vl")), btn: sc.querySelector(".st-vbtn"), bar: sc.querySelector(".st-vbar") }; }
  function setVoiceUi(state) {
    if (!S || !S.night) return;
    S.vState = state;
    var p = nightParts(S.night), d = S.data.filter(function (x) { return x.k === "night"; })[0] || {};
    var icon = p.btn.querySelector(".st-vic"), tx = p.btn.querySelector(".st-vtx");
    p.btn.classList.toggle("pulse", state === "blocked");
    if (state === "playing") { icon.textContent = "❚❚"; tx.textContent = d.pause || "Pauza"; }
    else if (state === "done") { icon.textContent = "↻"; tx.textContent = d.again || "Ponovo"; }
    else { icon.textContent = "▶"; tx.textContent = d.play || "Pusti glas"; }
  }
  function showLine(i) {
    if (!S || !S.night) return;
    nightParts(S.night).lines.forEach(function (l, j) { l.classList.toggle("on", j === i); l.classList.toggle("gone", j < i); });
  }
  function nightEnter(sc) {
    S.night = sc;
    var p = nightParts(sc);
    p.box.classList.remove("done");
    sc.classList.remove("vdone");
    showLine(0);
    setVoiceUi("idle");
    S.timers.push(setTimeout(function () { if (S && S.night === sc && S.vState === "idle") playVoice(true); }, 1600));
  }
  function nightLeave(sc) {
    if (!S || S.night !== sc) return;
    stopVoice();
    S.night = null;
  }
  function playVoice(fromStart) {
    if (!S || !S.night) return;
    var v = voiceEl(), sc = S.night;
    if (fromStart) { try { v.el.currentTime = 0; } catch (e) {} nightParts(sc).box.classList.remove("done"); sc.classList.remove("vdone"); }
    v.el.muted = false;
    var p = null;
    try { p = v.el.play(); } catch (e) { p = null; }
    duck(true);
    setVoiceUi("playing");
    var ok = function () { v.unlocked = true; followVoice(); };
    var bad = function () { duck(false); setVoiceUi("blocked"); };
    if (p && p.then) p.then(ok, bad); else ok();
  }
  function followVoice() {
    if (!S) return;
    cancelAnimationFrame(S.vRaf);
    var v = voice, sc = S.night;
    if (!v || !sc) return;
    var p = nightParts(sc), times = p.lines.map(function (l) { return +l.getAttribute("data-t"); });
    (function step() {
      if (!S || S.night !== sc) return;
      var t = v.el.currentTime || 0, dur = v.el.duration || 48, i = 0;
      for (var k = 0; k < times.length; k++) if (t + 0.05 >= times[k]) i = k;
      showLine(i);
      p.bar.style.setProperty("--vp", Math.min(1, t / dur).toFixed(4));
      if (v.el.ended || t >= dur - 0.05) { voiceDone(); return; }
      if (v.el.paused) return;
      S.vRaf = requestAnimationFrame(step);
    })();
  }
  function voiceDone() {
    if (!S || !S.night) return;
    nightParts(S.night).box.classList.add("done");
    S.night.classList.add("vdone");
    nightParts(S.night).lines.forEach(function (l) { l.classList.remove("gone"); l.classList.add("on"); });
    duck(false);
    setVoiceUi("done");
  }
  function stopVoice() {
    if (voice) { try { voice.el.pause(); } catch (e) {} }
    if (S) cancelAnimationFrame(S.vRaf);
    if (audio && audio.ducked) duck(false);
  }
  function voiceButton() {
    if (!S || !S.night) return;
    var v = voiceEl();
    if (S.vState === "playing") { try { v.el.pause(); } catch (e) {} cancelAnimationFrame(S.vRaf); duck(false); setVoiceUi("paused"); return; }
    if (S.vState === "done") { playVoice(true); return; }
    playVoice(S.vState === "idle" || S.vState === "blocked");
  }

  /* ---------- petals by day, stars and the odd falling star by night ---------- */
  function startFx() {
    var cv = S.canvas, ctx = cv.getContext && cv.getContext("2d");
    if (!ctx) return;
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.75), last = performance.now(), nextShoot = 0;
    var PAL = [[233, 211, 181], [220, 193, 156], [246, 234, 216], [207, 143, 102], [239, 224, 200], [226, 182, 146]];
    var petals = [], stars = [], motes = [], shoots = [];
    function size() {
      var w = S.root.clientWidth, h = S.root.clientHeight;
      if (w === W && h === H) return;
      W = w; H = h; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var area = w * h / (1440 * 900), np = Math.round((reduce ? 10 : 30) * Math.max(0.45, Math.min(1.2, area)));
      petals = []; stars = []; motes = [];
      for (var i = 0; i < np; i++) petals.push(petal(true));
      for (var k = 0; k < Math.round(80 * Math.max(0.5, area)); k++) stars.push({ x: Math.random() * w, y: Math.random() * h * 0.85, r: Math.random() * 1.2 + 0.3, ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 1.6 });
      for (var m = 0; m < 26; m++) motes.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.6, vy: -(6 + Math.random() * 14), ph: Math.random() * 6.28 });
    }
    function petal(anywhere) {
      var z = 0.45 + Math.random() * 0.75;
      return { x: Math.random() * (W || 1200), y: anywhere ? Math.random() * (H || 800) : -30, z: z, r: (5 + Math.random() * 7) * z, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 1.2,
        vy: (14 + Math.random() * 22) * z, ph: Math.random() * 6.28, sw: 18 + Math.random() * 26, flip: Math.random() * 6.28, c: PAL[Math.floor(Math.random() * PAL.length)] };
    }
    function frame(now) {
      if (!S || S.canvas !== cv) return;
      S.raf = requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - last) / 1000), t = now / 1000;
      last = now;
      if (document.hidden) return;
      size();
      ctx.clearRect(0, 0, W, H);
      var night = S.dark, day = 1 - night;
      if (night > 0.02) {
        for (var i = 0; i < stars.length; i++) {
          var st = stars[i], a = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * st.sp + st.ph))) * night;
          ctx.globalAlpha = a; ctx.fillStyle = "#fff4e2"; ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283); ctx.fill();
        }
        if (!reduce && night > 0.85 && now > nextShoot) {
          nextShoot = now + 3500 + Math.random() * 4500;
          var sx = W * (0.35 + Math.random() * 0.6), sy = H * (0.05 + Math.random() * 0.3);
          shoots.push({ x: sx, y: sy, vx: -(380 + Math.random() * 260), vy: 150 + Math.random() * 120, life: 0, max: 0.9 + Math.random() * 0.5 });
        }
        for (var q = shoots.length - 1; q >= 0; q--) {
          var sh = shoots[q];
          sh.life += dt; sh.x += sh.vx * dt; sh.y += sh.vy * dt;
          if (sh.life > sh.max) { shoots.splice(q, 1); continue; }
          var fade = Math.sin(Math.PI * sh.life / sh.max) * night, len = 0.16;
          var g = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * len, sh.y - sh.vy * len);
          g.addColorStop(0, "rgba(255,244,226," + fade + ")"); g.addColorStop(1, "rgba(255,244,226,0)");
          ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.vx * len, sh.y - sh.vy * len); ctx.stroke();
        }
      }
      for (var m = 0; m < motes.length; m++) {
        var mo = motes[m];
        if (!reduce) { mo.y += mo.vy * dt; mo.x += Math.sin(t * 0.7 + mo.ph) * 0.25; }
        if (mo.y < -10) { mo.y = H + 10; mo.x = Math.random() * W; }
        ctx.globalAlpha = 0.35 + 0.25 * Math.sin(t + mo.ph);
        ctx.fillStyle = night > 0.5 ? "#f6c99a" : "#fffaf0";
        ctx.beginPath(); ctx.arc(mo.x, mo.y, mo.r, 0, 6.283); ctx.fill();
      }
      if (day > 0.02) {
        for (var p = 0; p < petals.length; p++) {
          var pe = petals[p];
          if (!reduce) { pe.y += pe.vy * dt; pe.x += Math.sin(t * 0.8 + pe.ph) * pe.sw * dt; pe.rot += pe.vr * dt; pe.flip += dt * 1.6; }
          if (pe.y > H + 30) { petals[p] = petal(false); continue; }
          ctx.save();
          ctx.translate(pe.x, pe.y); ctx.rotate(pe.rot); ctx.scale(1, 0.45 + 0.55 * Math.abs(Math.sin(pe.flip)));
          ctx.globalAlpha = (0.42 + 0.4 * pe.z) * day;
          var gr = ctx.createRadialGradient(-pe.r * 0.3, -pe.r * 0.2, 0, 0, 0, pe.r);
          gr.addColorStop(0, "rgba(255,250,242,1)");
          gr.addColorStop(1, "rgb(" + pe.c[0] + "," + pe.c[1] + "," + pe.c[2] + ")");
          ctx.fillStyle = gr;
          ctx.beginPath(); ctx.ellipse(0, 0, pe.r, pe.r * 0.62, 0, 0, 6.283); ctx.fill();
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    }
    S.raf = requestAnimationFrame(frame);
  }

  function closeStory() {
    if (!S || S.closing) return;
    var s = S;
    s.closing = true;
    stopVoice();
    if (voice) { try { voice.el.currentTime = 0; } catch (e) {} }
    stopAudio();
    s.root.classList.remove("st-open");
    s.root.classList.add("st-closing");
    setTimeout(function () {
      cancelAnimationFrame(s.raf);
      cancelAnimationFrame(s.vRaf);
      stopRoute();
      if (s.days) clearTimeout(s.days);
      if (s.io) s.io.disconnect();
      s.timers.forEach(function (id) { clearTimeout(id); });
      s.listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      if (s.root.parentNode) s.root.remove();
      body.style.overflow = s.prevOverflow;
      html.classList.remove("story-open");
      if (S === s) S = null;
      opened = false;
      if (hold) dropHold(true);
    }, reduce ? 450 : 1050);
  }
})();
