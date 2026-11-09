/* DigitalAdvero — secret.js
   A hidden story for one person. Nothing on the page points to it.
   It opens like the site itself and slowly turns into a beige, romantic world: lines that rise like the
   site's headings, a slow song, petals in the air, our future home, and the words from one long night.
   The words are stored encoded below, so they are not readable at a glance in the public repository. */
(function () {
  "use strict";
  var ring = document.querySelector(".mini-ring");
  if (!ring || !document.querySelector) return;

  var html = document.documentElement, body = document.body;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var fine = !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  var SONG = "assets/story-song.mp3", HOME = "assets/story-home.webp", ART = "assets/story-art.webp";
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
  var EASE = "cubic-bezier(.16,1,.3,1)", EASE_IO = "cubic-bezier(.76,0,.24,1)";
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
.st-root.st-dark .st-light{opacity:.25}
@keyframes st-drift{to{transform:translate3d(5%,-4%,0) rotate(5deg) scale(1.06)}}
.st-grain{position:absolute;inset:0;pointer-events:none;opacity:.2;mix-blend-mode:multiply;background-image:${GRAIN}}
.st-fx{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
.st-glow{position:absolute;left:0;top:0;z-index:1;width:560px;height:560px;margin:-280px 0 0 -280px;border-radius:50%;pointer-events:none;opacity:0;transition:opacity .8s;
  background:radial-gradient(closest-side,rgba(255,247,233,.5),rgba(255,247,233,0))}
.st-root.st-pointer .st-glow{opacity:1}

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
.st-root.st-muted .st-eq i{animation:none;transform:scaleY(.25)}

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
.st-big{margin:0;max-width:19ch;font-family:${SERIF};font-style:italic;font-weight:400;font-size:clamp(1.9rem,4.7vw,4.7rem);line-height:1.06;letter-spacing:-.012em}
.st-mid{margin:0;max-width:27ch;font-family:${SERIF};font-style:italic;font-weight:400;font-size:clamp(1.3rem,2.65vw,2.5rem);line-height:1.18}
.st-small{margin:0;max-width:46ch;font-size:clamp(1rem,1.25vw,1.2rem);line-height:1.6;color:rgba(43,33,25,.78)}
.st-stack>.st-small{margin-top:clamp(1.3rem,3.2vh,2.2rem)}
.st-d .st-small{color:rgba(246,236,221,.78)}
.st-script{margin:0;font-family:'Great Vibes',cursive;font-weight:400;font-size:clamp(2.7rem,7.4vw,6.6rem);line-height:1.15;color:${TERRA}}
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

.st-k-open .st-in{padding-bottom:clamp(90px,14vh,140px)}
.st-k-band .st-in{padding-bottom:clamp(120px,20vh,190px)}
.st-begin{margin-top:clamp(1.6rem,4vh,2.6rem);cursor:pointer;border:0;font-family:${SANS}}
.st-begin .btn-ic svg{transform:rotate(90deg)!important}
.st-hint{position:absolute;left:50%;bottom:clamp(18px,4vh,34px);z-index:2;display:flex;flex-direction:column;align-items:center;gap:.6rem;transform:translateX(-50%);font:500 .66rem/1 ${SANS};letter-spacing:.14em;text-transform:uppercase;opacity:.55}
.st-hint i{display:block;width:1px;height:38px;background:currentColor;animation:st-line 2s ${EASE_IO} infinite}
@keyframes st-line{0%{transform:scaleY(0);transform-origin:top}45%{transform:scaleY(1);transform-origin:top}55%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

.st-moonball{position:absolute;right:clamp(8%,12vw,14%);top:clamp(14%,17vh,20%);z-index:1;width:clamp(86px,13vw,180px);aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle at 36% 34%,#fffbf3,#f5e6cb 52%,#e5cda7);box-shadow:0 0 60px 18px rgba(255,247,230,.55),0 0 170px 70px rgba(255,240,214,.32);
  opacity:0;transform:translate3d(0,24px,0) scale(.92);transition:opacity 2.2s,transform 2.6s ${EASE}}
.st-moonball::before,.st-moonball::after{content:"";position:absolute;border-radius:50%;background:rgba(214,186,146,.35)}
.st-moonball::before{width:18%;height:18%;left:24%;top:30%}.st-moonball::after{width:11%;height:11%;left:60%;top:56%}
.is-in .st-moonball{opacity:1;transform:none}

.st-band{position:absolute;left:0;right:0;bottom:clamp(26px,7vh,70px);z-index:1;overflow:hidden;padding:.9rem 0;border-top:1px solid rgba(43,33,25,.16);border-bottom:1px solid rgba(43,33,25,.16);opacity:0;transition:opacity 1.6s .9s}
.is-in .st-band{opacity:1}
.st-band-track{display:flex;width:max-content;animation:st-mq 30s linear infinite}
.st-band span{flex:none;padding:0 1.1rem;white-space:nowrap;font:500 clamp(1.3rem,2.9vw,2.7rem)/1.1 ${SANS};letter-spacing:-.04em;text-transform:uppercase}
.st-band span:nth-child(4n+3){color:transparent;-webkit-text-stroke:1px rgba(43,33,25,.5)}
.st-band b{flex:none;align-self:center;color:${TERRA};font-weight:400;font-size:clamp(.9rem,1.6vw,1.4rem)}
@keyframes st-mq{to{transform:translate3d(-50%,0,0)}}

.st-tiltbox{display:inline-block;transform-origin:8% 92%}
.is-in .st-tiltbox{animation:st-tilt 6s ease-in-out 2s infinite}
@keyframes st-tilt{0%,100%{transform:rotate(0)}28%,58%{transform:rotate(2.8deg)}}

.st-rules{list-style:none;margin:clamp(1.4rem,4vh,2.6rem) 0 0;padding:0;border-bottom:1px solid rgba(43,33,25,.2)}
.st-rule{position:relative;display:grid;grid-template-columns:3.2rem minmax(0,1.35fr) minmax(0,1fr);gap:1rem;align-items:baseline;padding:clamp(1.1rem,3vh,1.8rem) 0}
.st-rule::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:rgba(43,33,25,.22);transform:scaleX(0);transform-origin:left;transition:transform 1.5s ${EASE} var(--d,0s)}
.is-in .st-rule::before{transform:none}
.st-rule-n{font:500 .74rem/1 ${SANS};letter-spacing:.06em;color:rgba(43,33,25,.55)}
.st-rule h3{margin:0;font:italic 400 clamp(1.4rem,2.9vw,2.7rem)/1.08 ${SERIF};color:${TERRA}}
.st-rule p{margin:0;font-size:.95rem;color:rgba(43,33,25,.68)}

.st-home{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(1.4rem,5vw,5rem);align-items:center}
.st-photo{position:relative;margin:0;justify-self:start;width:100%;max-width:min(430px,52vh);aspect-ratio:3/4;border-radius:20px;overflow:hidden;box-shadow:0 40px 90px -36px rgba(64,40,18,.55);
  opacity:0;transform:translate3d(0,34px,0) rotate(-1.4deg);transition:opacity 1.5s ${EASE},transform 1.8s ${EASE}}
.is-in .st-photo{opacity:1;transform:rotate(-1.4deg)}
.st-photo img{display:block;width:100%;height:100%;object-fit:cover;filter:sepia(.32) saturate(.95) brightness(1.06) contrast(1.02);transform:scale(1.14);transition:transform 8s ${EASE}}
.is-in .st-photo img{transform:scale(1)}
.st-photo::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(240,220,190,0) 55%,rgba(52,34,18,.38)),radial-gradient(120% 70% at 50% 0%,rgba(255,226,182,.2),rgba(255,226,182,0) 60%)}
.st-photo figcaption{position:absolute;left:1.1rem;bottom:1rem;z-index:1;color:#f8ecd9;font:500 .66rem/1 ${SANS};letter-spacing:.14em;text-transform:uppercase}
.st-names{display:flex;flex-wrap:wrap;gap:.55rem;margin:clamp(1rem,2.6vh,1.6rem) 0}
.st-name{display:inline-flex;align-items:center;gap:.6rem;padding:.55rem 1.05rem .62rem;border-radius:999px;background:rgba(255,251,244,.62);border:1px solid rgba(43,33,25,.12);
  font:italic 400 clamp(1.05rem,1.8vw,1.4rem)/1 ${SERIF};opacity:0;transform:translate3d(0,12px,0);transition:opacity 1s,transform 1.1s ${EASE};transition-delay:calc(1.1s + var(--i) * .3s)}
.st-name::before{content:"";flex:none;width:7px;height:7px;border-radius:50%;background:#efb06c;box-shadow:0 0 0 0 rgba(239,176,108,0);transition:box-shadow 1.4s;transition-delay:calc(1.4s + var(--i) * .3s)}
.is-in .st-name{opacity:1;transform:none}
.is-in .st-name::before{box-shadow:0 0 14px 5px rgba(239,176,108,.7)}

.st-artbg{position:absolute;inset:-5%;z-index:0;background:url(${ART}) center/cover no-repeat;filter:sepia(.5) saturate(.85) contrast(.96);mix-blend-mode:multiply;
  opacity:0;transform:scale(1.1);transition:opacity 2.4s,transform 10s ${EASE}}
.is-in .st-artbg{opacity:.5;transform:none}
.st-artveil{position:absolute;inset:0;z-index:0;background:linear-gradient(90deg,rgba(230,212,184,.94) 0%,rgba(230,212,184,.7) 48%,rgba(230,212,184,.18) 100%)}

.st-morph{position:relative;display:grid;align-items:center;justify-items:left;height:clamp(8rem,24vw,16rem);margin:clamp(.4rem,1.6vh,1rem) 0}
.st-morph span{grid-area:1/1;font:400 clamp(5.4rem,16vw,12.5rem)/1 Amiri,'Noto Naskh Arabic',serif;color:${INK};opacity:0}
.st-morph span:first-child{opacity:1}
.is-in .st-m0{animation:st-m0 11s ease-in-out 1.2s infinite}
.is-in .st-m1{animation:st-m1 11s ease-in-out 1.2s infinite}
.is-in .st-m2{animation:st-m2 11s ease-in-out 1.2s infinite}
@keyframes st-m0{0%,20%{opacity:1}28%,82%{opacity:0}90%,100%{opacity:1}}
@keyframes st-m1{0%,20%{opacity:0}28%,36%{opacity:1}44%,64%{opacity:0}72%,82%{opacity:1}90%,100%{opacity:0}}
@keyframes st-m2{0%,36%{opacity:0}44%,64%{opacity:1}72%,100%{opacity:0}}

.st-num{margin:0 0 clamp(.6rem,2vh,1.2rem);font-family:Archivo,'Inter Tight',sans-serif;font-weight:800;font-stretch:125%;font-size:clamp(6.5rem,25vw,21rem);line-height:.8;letter-spacing:-.03em;
  color:transparent;-webkit-text-stroke:1.5px rgba(43,33,25,.65);background:linear-gradient(0deg,${TERRA} 50%,rgba(184,97,58,0) 50%);background-size:100% 200%;background-position:0 0;
  -webkit-background-clip:text;background-clip:text;transition:background-position 3.4s cubic-bezier(.65,0,.35,1) .6s}
.is-in .st-num{background-position:0 100%}

.st-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.7rem;margin-top:clamp(1rem,3vh,1.8rem)}
.st-card{position:relative;isolation:isolate;overflow:hidden;display:flex;flex-direction:column;min-height:clamp(10rem,24vh,13rem);padding:1.15rem 1.2rem 1.2rem;border-radius:14px;background:#fbf6ee;
  box-shadow:0 18px 40px -30px rgba(64,40,18,.5);cursor:default;opacity:0;transform:translate3d(0,18px,0);transition:opacity 1s,transform 1.2s ${EASE};transition-delay:calc(.4s + var(--i) * .09s)}
.is-in .st-card{opacity:1;transform:none}
.st-card::before{content:"";position:absolute;inset:0;z-index:-1;background:#a9552f;clip-path:circle(0% at var(--mx,100%) var(--my,100%));transition:clip-path .9s ${EASE}}
.st-card:hover::before,.st-card.on::before{clip-path:circle(150% at var(--mx,100%) var(--my,100%))}
.st-card h3{margin:0;padding-right:1.8rem;font:italic 400 clamp(1.15rem,1.7vw,1.55rem)/1.08 ${SERIF};color:${TERRA};transition:color .5s}
.st-card p{margin:auto 0 0;padding-top:1.2rem;font-size:.86rem;line-height:1.45;color:rgba(43,33,25,.72);transition:color .5s}
.st-card-n{position:absolute;top:1.1rem;right:1.15rem;font:500 .68rem/1 ${SANS};letter-spacing:.06em;color:rgba(43,33,25,.42);transition:color .5s}
.st-card:hover h3,.st-card.on h3,.st-card:hover p,.st-card.on p,.st-card:hover .st-card-n,.st-card.on .st-card-n{color:#fbf6ee}

.st-route{position:relative;max-width:640px;height:86px;margin:clamp(1.4rem,4vh,2.4rem) 0 clamp(.6rem,2vh,1.2rem)}
.st-route-line{position:absolute;left:6%;right:6%;top:30px;height:1px;background:rgba(43,33,25,.3)}
.st-route-line::after{content:"";position:absolute;inset:0;background:${TERRA};transform-origin:left;transform:scaleX(var(--p,0))}
.st-route-dot{position:absolute;top:30px;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:${TERRA};box-shadow:0 0 0 6px rgba(184,97,58,.16);left:calc(6% + 88% * var(--p,0))}
.st-route-end{position:absolute;top:30px;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;border:1.5px solid ${INK};background:#ecdec9}
.st-route-end.a{left:6%}.st-route-end.b{left:94%}
.st-route-lab{position:absolute;top:50px;font:500 .7rem/1 ${SANS};letter-spacing:.1em;text-transform:uppercase;opacity:.7}
.st-route-lab.a{left:6%;transform:translateX(-30%)}.st-route-lab.b{right:6%;transform:translateX(30%)}
.st-route-time{position:absolute;left:50%;top:0;transform:translateX(-50%);font:500 .78rem/1 ${SANS};letter-spacing:.08em;font-variant-numeric:tabular-nums;opacity:.75}

.st-k-final .st-in{display:flex;flex-direction:column;align-items:center;text-align:center}
.st-k-final .st-mid,.st-k-final .st-small{margin-left:auto;margin-right:auto}
.st-sky{position:relative;width:clamp(160px,24vw,280px);aspect-ratio:1.6;margin:0 auto clamp(.4rem,2vh,1.2rem)}
.st-sky .st-moonball{position:absolute;left:50%;top:50%;right:auto;width:46%;margin:-23% 0 0 -23%}
.st-sky svg{position:absolute;inset:-10% -14%;width:128%;height:120%;overflow:visible}
.st-sky ellipse{fill:none;stroke:#ead2ad;stroke-width:1.6;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 3s cubic-bezier(.65,0,.35,1) 1s;filter:drop-shadow(0 0 6px rgba(234,210,173,.8))}
.is-in .st-sky ellipse{stroke-dashoffset:0}
.st-sign{margin:clamp(.8rem,2vh,1.2rem) 0 0;font:italic 400 clamp(1.25rem,2vw,1.65rem)/1 ${SERIF};color:rgba(246,236,221,.86)}
.st-end{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;margin-top:clamp(1.4rem,4vh,2.4rem)}
.st-end .btn{border:0;cursor:pointer;font-family:${SANS}}

@media (max-width:760px){
  .st-count{display:none}
  .st-home{grid-template-columns:minmax(0,1fr);gap:1.1rem}
  .st-photo{max-width:none;width:min(66vw,34vh)}
  .st-name{padding:.45rem .85rem .5rem}
  .st-rule{grid-template-columns:2.4rem minmax(0,1fr);row-gap:.45rem}
  .st-rule p{grid-column:2}
  .st-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem}
  .st-card{min-height:8.6rem;padding:.9rem}
  .st-card h3{font-size:1.15rem;padding-right:1.4rem}
  .st-card p{font-size:.78rem;padding-top:.8rem}
  .st-artveil{background:linear-gradient(180deg,rgba(230,212,184,.9),rgba(230,212,184,.75))}
  .st-moonball{right:8%;top:11%}
}
@media (max-width:760px) and (max-height:700px){.st-card p{display:none}.st-card{min-height:5.5rem}}
@media (prefers-reduced-motion:reduce){
  .st-root{clip-path:none!important;opacity:0;transition:opacity .5s!important}
  .st-root.st-open{opacity:1}.st-root.st-closing{opacity:0}
  .st-root [data-split] .ln>span,.st-root [data-r],.st-write,.st-name,.st-card,.st-photo,.st-moonball{transition:none!important;transform:none!important;opacity:1!important;clip-path:none!important}
  .st-band-track,.st-light,.st-hint i{animation:none!important}
  .st-morph{display:flex;gap:1.5rem;place-items:center}.st-morph span{position:static;opacity:1!important;animation:none!important}.st-morph .st-m1{display:none}
}`;

  function ensureStyles() {
    if (!document.getElementById("storyFonts")) {
      var link = document.createElement("link");
      link.id = "storyFonts"; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Amiri&family=EB+Garamond:ital,wght@0,400;1,400;1,500&family=Great+Vibes&display=swap";
      document.head.appendChild(link);
    }
    if (!document.getElementById("storyStyles")) {
      var s = document.createElement("style");
      s.id = "storyStyles"; s.textContent = CSS;
      document.head.appendChild(s);
    }
  }
  function fontsReady(ms) {
    var list = ["italic 400 40px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "40px 'Great Vibes'", "40px Amiri"];
    var all = document.fonts && document.fonts.load
      ? Promise.all(list.map(function (f) { return document.fonts.load(f, "Mžćđ روحي").catch(function () {}); }))
      : Promise.resolve();
    return Promise.race([all, new Promise(function (r) { setTimeout(r, ms); })]);
  }

  /* ---------- music: created inside the gesture, routed through a gain node once the context runs ---------- */
  var audio = null;
  function newAudio() {
    var el = new Audio();
    el.preload = "auto"; el.loop = true; el.setAttribute("playsinline", ""); el.src = SONG;
    return { el: el, ctx: null, gain: null, routed: false, muted: false, playing: false, fadeId: 0 };
  }
  function setVolume(target, ms) {
    var a = audio; if (!a) return;
    a.fadeId++;
    if (a.routed && a.gain) {
      var now = a.ctx.currentTime, g = a.gain.gain;
      try { g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(target, now + Math.max(ms, 30) / 1000); } catch (e) { g.value = target; }
      return;
    }
    if (target === 0) { a.el.muted = true; } else { a.el.muted = false; }
    var id = a.fadeId, from = a.el.volume, t0 = performance.now();
    (function step(ts) {
      if (audio !== a || a.fadeId !== id || a.routed) return;
      var p = Math.min((ts - t0) / Math.max(ms, 1), 1);
      try { a.el.volume = Math.max(0, Math.min(1, from + (target - from) * p)); } catch (e) {}
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function route() {
    var a = audio; if (!a || a.routed || !a.ctx || a.ctx.state !== "running") return;
    try {
      var src = a.ctx.createMediaElementSource(a.el);
      a.gain = a.ctx.createGain(); a.gain.gain.value = 0;
      src.connect(a.gain); a.gain.connect(a.ctx.destination);
      a.routed = true; a.el.muted = false; a.el.volume = 1;
      setVolume(a.muted ? 0 : TARGET_VOL, 2400);
    } catch (e) { a.routed = false; }
  }
  function startAudio() {
    if (!audio) audio = newAudio();
    var a = audio;
    if (a.playing) return;
    try { a.el.volume = 0; } catch (e) {}
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx && !a.ctx) { try { a.ctx = new Ctx(); } catch (e) { a.ctx = null; } }
    var p = null;
    try { p = a.el.play(); } catch (e) { p = null; }
    if (a.ctx) { var r = null; try { r = a.ctx.resume(); } catch (e) {} Promise.resolve(r).then(function () { if (audio === a) route(); }, function () {}); }
    var ok = function () { a.playing = true; setMusicUi(); if (!a.routed) setVolume(a.muted ? 0 : TARGET_VOL, 2400); };
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
    setVolume(audio.muted ? 0 : TARGET_VOL, 700);
    setMusicUi();
  }

  /* ---------- the hidden door: press and hold the little ring ---------- */
  var hold = null, opened = false, warmed = false;
  function warmUp() {
    if (warmed) return;
    warmed = true;
    ensureStyles();
    if (!audio) { audio = newAudio(); try { audio.el.load(); } catch (e) {} }
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

  /* ---------- building the story ---------- */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fmt(s) {
    return esc(s).replace(/\{([^}]+)\}/g, '<span class="st-ar" dir="rtl" lang="ar">$1</span>').replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function lum(rgb) { return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255; }
  function texts(s, d) {
    var out = "";
    d = d || 0.15;
    Object.keys(s).forEach(function (k) {
      if (k === "big") { out += '<p class="st-big" data-split style="--d:' + d.toFixed(2) + 's">' + fmt(s.big) + "</p>"; d += 0.5; }
      else if (k === "mid") { out += '<p class="st-mid" data-split style="--d:' + d.toFixed(2) + 's">' + fmt(s.mid) + "</p>"; d += 0.45; }
      else if (k === "small") { out += '<p class="st-small" data-r style="--d:' + (d + 0.25).toFixed(2) + 's">' + fmt(s.small) + "</p>"; d += 0.35; }
    });
    return out;
  }
  function kicker(t, d) { return '<p class="st-kicker" data-r style="--d:' + (d || 0) + 's">' + esc(t) + "</p>"; }
  var ARROW = '<span class="btn-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-arrow"/></svg></span>';

  function scene(s, i, n) {
    var dark = lum(hex(s.tone)) < 0.42;
    var h = '<section class="st-scene st-k-' + s.k + (dark ? " st-d" : "") + '" data-i="' + i + '" aria-label="' + (i + 1) + " / " + n + '">';
    var after = "";
    var inner = "";
    switch (s.k) {
      case "open":
        inner = kicker(s.label, 0.1) + '<h2 class="st-site" data-split style="--d:.25s">' + fmt(s.site) + "</h2>" +
          '<div data-r style="--d:1.1s"><button type="button" class="btn btn-orange st-begin"><span class="roll"><span>' + esc(s.btn) + "</span></span>" + ARROW + "</button></div>";
        after = '<p class="st-hint" aria-hidden="true">' + esc(s.hint) + "<i></i></p>";
        break;
      case "moon":
        after = '<div class="st-moonball" aria-hidden="true"></div>';
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        break;
      case "band":
        var words = "";
        for (var k = 0; k < 8; k++) words += "<span>" + esc(s.band) + "</span><b>♥</b>";
        inner = kicker(s.label, 0.1) + '<div class="st-stack">' + texts({ big: s.big, mid: s.mid }) + "</div>";
        after = '<div class="st-band" aria-hidden="true"><div class="st-band-track">' + words + words + "</div></div>";
        if (s.small) inner += '<p class="st-small" data-r style="--d:1.6s;margin-top:1.4rem">' + fmt(s.small) + "</p>";
        break;
      case "tilt":
        inner = '<div class="st-stack"><div class="st-tiltbox">' + texts({ big: s.big }) + "</div>" + texts({ small: s.small }, 0.6) + "</div>";
        break;
      case "rules":
        inner = kicker(s.label, 0.1) + '<ol class="st-rules">' + s.rules.map(function (r, j) {
          return '<li class="st-rule" style="--d:' + (0.25 + j * 0.25) + 's"><span class="st-rule-n" data-r style="--d:' + (0.35 + j * 0.25) + 's">' + esc(r[0]) + "</span>" +
            '<h3 data-split style="--d:' + (0.35 + j * 0.25) + 's">' + fmt(r[1]) + '</h3><p data-r style="--d:' + (0.7 + j * 0.25) + 's">' + fmt(r[2]) + "</p></li>";
        }).join("") + "</ol>";
        break;
      case "home":
        inner = '<div class="st-home"><figure class="st-photo"><img src="' + HOME + '" alt="Naš budući dom" decoding="async"><figcaption>' + esc(s.label) + "</figcaption></figure>" +
          "<div>" + kicker(s.label, 0.3) + texts({ mid: s.mid }, 0.45) +
          '<div class="st-names">' + s.names.map(function (nm, j) { return '<span class="st-name" style="--i:' + j + '">' + esc(nm) + "</span>"; }).join("") + "</div>" +
          '<p class="st-small" data-r style="--d:3.2s">' + fmt(s.small) + "</p></div></div>";
        break;
      case "love":
        var d = 0.15;
        inner = '<div class="st-stack">' + s.lines.map(function (l) { var x = '<p class="st-mid" data-split style="--d:' + d.toFixed(2) + 's">' + fmt(l) + "</p>"; d += 0.45; return x; }).join("") +
          '<p class="st-big" data-split style="--d:' + d.toFixed(2) + 's;font-size:clamp(2.8rem,8vw,7.5rem);line-height:1">' + fmt(s.big) + "</p>" +
          '<p class="st-small" data-r style="--d:' + (d + 0.8).toFixed(2) + 's">' + fmt(s.small) + "</p></div>";
        break;
      case "art":
        after = '<div class="st-artbg" aria-hidden="true"></div><div class="st-artveil" aria-hidden="true"></div>';
        inner = '<div class="st-stack">' + texts(s) + "</div>";
        break;
      case "dots":
        inner = '<p class="st-small" data-r style="--d:.15s">' + fmt(s.small) + "</p>" +
          '<div class="st-morph" dir="rtl" lang="ar" aria-label="' + esc(s.words[0]) + '">' + s.words.map(function (w, j) { return '<span class="st-m' + j + '">' + esc(w) + "</span>"; }).join("") + "</div>" +
          '<div class="st-stack">' + texts({ mid: s.mid }, 0.5) + '<p class="st-small" data-r style="--d:1.3s">' + fmt(s.small2) + "</p></div>";
        break;
      case "days":
        inner = '<p class="st-num" aria-hidden="true">' + esc(s.num) + '</p><div class="st-stack">' + texts({ mid: s.mid, small: s.small }, 0.9) + "</div>";
        break;
      case "cards":
        inner = kicker(s.label, 0.1) + texts({ mid: s.mid }, 0.2) + '<div class="st-cards">' + s.cards.map(function (c, j) {
          return '<article class="st-card" style="--i:' + j + '"><span class="st-card-n">0' + (j + 1) + "</span><h3>" + fmt(c[0]) + "</h3><p>" + fmt(c[1]) + "</p></article>";
        }).join("") + "</div>";
        break;
      case "route":
        inner = kicker(s.label, 0.1) + '<div class="st-stack">' + texts({ big: s.big }, 0.2) + "</div>" +
          '<div class="st-route" data-r style="--d:.9s" aria-hidden="true"><span class="st-route-time">2:00</span><span class="st-route-line"></span>' +
          '<span class="st-route-end a"></span><span class="st-route-end b"></span><span class="st-route-dot"></span>' +
          '<span class="st-route-lab a">' + esc(s.from) + '</span><span class="st-route-lab b">' + esc(s.to) + "</span></div>" +
          '<p class="st-script st-write" style="--d:2.2s">' + fmt(s.script) + "</p>";
        break;
      case "final":
        inner = '<div class="st-sky" aria-hidden="true"><div class="st-moonball"></div><svg viewBox="0 0 400 250" preserveAspectRatio="none"><ellipse cx="200" cy="125" rx="188" ry="54" pathLength="1" transform="rotate(-9 200 125)"/></svg></div>' +
          '<div class="st-stack">' + texts({ mid: s.mid }, 0.3) + "</div>" +
          '<p class="st-script st-write" style="--d:1.3s">' + fmt(s.script) + "</p>" +
          '<p class="st-mid" data-split style="--d:2.6s">' + fmt(s.moon) + "</p>" +
          '<p class="st-sign" data-r style="--d:3.4s">' + esc(s.sign) + "</p>" +
          '<div class="st-end" data-r style="--d:3.9s"><button type="button" class="btn btn-orange btn-plain st-again"><span class="roll"><span>' + esc(s.again) + '</span></span></button>' +
          '<button type="button" class="st-btn st-done">' + esc(s.close) + "</button></div>";
        break;
      default:
        inner = '<div class="st-stack">' + texts(s) + "</div>";
    }
    return h + after + '<div class="st-in">' + inner + "</div></section>";
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
      prevOverflow: body.style.overflow, dark: 0, idx: 0, io: null, routeRaf: 0
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
    on(document, "keydown", function (e) { if (e.key === "Escape") closeStory(); });
    // any first touch inside the story may start the music if the browser blocked it before
    var nudge = function () { if (audio && !audio.playing && !audio.muted) startAudio(); };
    on(root, "touchend", nudge, { passive: true });
    on(root, "click", nudge);
    if (fine) on(root, "mousemove", function (e) { root.classList.add("st-pointer"); S.glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)"; }, { passive: true });
    cardsSetup();
    on(window, "resize", onResize);

    fontsReady(900).then(function () {
      if (!S || S.root !== root) return;
      Array.prototype.forEach.call(root.querySelectorAll("[data-split]"), split);
      S.timers.push(setTimeout(startReveals, reduce ? 0 : 520));
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
    if (!("IntersectionObserver" in window)) { S.scenes.forEach(function (sc) { sc.classList.add("is-in"); }); return; }
    S.io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) { if (e.target.classList.contains("st-k-route")) stopRoute(); return; }
        e.target.classList.add("is-in");
        if (e.target.classList.contains("st-k-route")) startRoute(e.target);
      });
    }, { root: S.scroller, threshold: 0.45 });
    S.scenes.forEach(function (sc) { S.io.observe(sc); });
  }
  var resizeT = 0;
  function onResize() {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      if (!S) return;
      Array.prototype.forEach.call(S.root.querySelectorAll("[data-split]"), split);
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

  /* little cards: the fill grows from where the pointer enters; a tap lights one up on phones */
  function cardsSetup() {
    Array.prototype.forEach.call(S.root.querySelectorAll(".st-card"), function (c) {
      var at = function (e) { var r = c.getBoundingClientRect(); c.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%"); c.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%"); };
      on(c, "mouseenter", at);
      on(c, "mouseleave", at);
      on(c, "click", function (e) {
        if (fine) return;
        at(e);
        var was = c.classList.contains("on");
        Array.prototype.forEach.call(S.root.querySelectorAll(".st-card.on"), function (x) { x.classList.remove("on"); });
        if (!was) c.classList.add("on");
      });
    });
  }

  /* the little route scene: two points, a walking dot and a countdown */
  function startRoute(sceneEl) {
    stopRoute();
    var box = sceneEl.querySelector(".st-route"), time = box.querySelector(".st-route-time"), t0 = performance.now() + 900;
    (function step(now) {
      if (!S) return;
      var cyc = (now - t0) % 6200, p = Math.max(0, Math.min(1, cyc / 4200)), ep = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      if (now < t0) ep = 0;
      box.style.setProperty("--p", ep.toFixed(4));
      var left = Math.round(120 * (1 - ep));
      time.textContent = Math.floor(left / 60) + ":" + (left % 60 < 10 ? "0" : "") + (left % 60);
      S.routeRaf = requestAnimationFrame(step);
    })(performance.now());
  }
  function stopRoute() { if (S && S.routeRaf) { cancelAnimationFrame(S.routeRaf); S.routeRaf = 0; } }

  /* ---------- petals by day, stars by night ---------- */
  function startFx() {
    var cv = S.canvas, ctx = cv.getContext && cv.getContext("2d");
    if (!ctx) return;
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.75), last = performance.now();
    var PAL = [[233, 211, 181], [220, 193, 156], [246, 234, 216], [207, 143, 102], [239, 224, 200], [226, 182, 146]];
    var petals = [], stars = [], motes = [];
    function size() {
      var w = S.root.clientWidth, h = S.root.clientHeight;
      if (w === W && h === H) return;
      W = w; H = h; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var area = w * h / (1440 * 900), np = Math.round((reduce ? 10 : 30) * Math.max(0.45, Math.min(1.2, area)));
      petals = []; stars = []; motes = [];
      for (var i = 0; i < np; i++) petals.push(petal(true));
      for (var k = 0; k < Math.round(70 * Math.max(0.5, area)); k++) stars.push({ x: Math.random() * w, y: Math.random() * h * 0.8, r: Math.random() * 1.2 + 0.3, ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 1.6 });
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
          if (!reduce) {
            pe.y += pe.vy * dt; pe.x += Math.sin(t * 0.8 + pe.ph) * pe.sw * dt; pe.rot += pe.vr * dt; pe.flip += dt * 1.6;
          }
          if (pe.y > H + 30) { petals[p] = petal(false); continue; }
          ctx.save();
          ctx.translate(pe.x, pe.y); ctx.rotate(pe.rot); ctx.scale(1, 0.45 + 0.55 * Math.abs(Math.sin(pe.flip)));
          ctx.globalAlpha = (0.42 + 0.4 * pe.z) * day;
          var g = ctx.createRadialGradient(-pe.r * 0.3, -pe.r * 0.2, 0, 0, 0, pe.r);
          g.addColorStop(0, "rgba(255,250,242,1)");
          g.addColorStop(1, "rgb(" + pe.c[0] + "," + pe.c[1] + "," + pe.c[2] + ")");
          ctx.fillStyle = g;
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
    stopAudio();
    s.root.classList.remove("st-open");
    s.root.classList.add("st-closing");
    setTimeout(function () {
      cancelAnimationFrame(s.raf);
      stopRoute();
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
