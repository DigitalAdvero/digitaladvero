/* DigitalAdvero — sea.js
   The background world: a dark moving sea under a navy sky, with one vertical light (the DigitalAdvero
   light core) standing on the water. The light itself stays still; what moves is the light coming
   from it — reflections on the waves, sparkles, pulses running across the water, thin filaments.
   One fullscreen WebGL shader + a small 2D overlay, no libraries. Dark theme only; the light theme
   and browsers without WebGL simply keep the original CSS background. */
(function () {
  "use strict";

  var root = document.documentElement;
  var stage = document.querySelector(".bg-stage");
  if (!stage || !window.WebGLRenderingContext) return;

  var reduced = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var fine = !!(window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches);

  var canvas = document.createElement("canvas");
  canvas.className = "sea";
  canvas.setAttribute("aria-hidden", "true");
  var fxCanvas = document.createElement("canvas");
  fxCanvas.className = "sea-fx";
  fxCanvas.setAttribute("aria-hidden", "true");
  stage.insertBefore(canvas, stage.firstChild);
  stage.appendChild(fxCanvas);

  var gl = null;
  try { gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" }); } catch (e) { gl = null; }
  if (!gl) { canvas.remove(); fxCanvas.remove(); return; }

  var VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
  function frag(mob) {
    return [
      "#ifdef GL_FRAGMENT_PRECISION_HIGH", "precision highp float;", "#else", "precision mediump float;", "#endif",
      "uniform vec2 uRes;uniform float uTime;uniform vec3 uCam;uniform vec3 uRight;uniform vec3 uUp;uniform vec3 uFwd;",
      "uniform float uTanF;uniform float uPixA;uniform vec4 uBeam;uniform vec4 uA;uniform vec4 uB;uniform vec4 uC;uniform vec2 uBase;",
      "const vec3 CORE=vec3(.94,.97,1.);const vec3 INNER=vec3(.55,.74,1.);const vec3 HALO=vec3(.17,.34,.95);const vec3 HORIZ=vec3(.035,.07,.17);",
      "float hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}",
      "float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}",
      "float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<" + (mob ? 2 : 3) + ";i++){s+=a*noise(p);p=mat2(1.6,1.2,-1.2,1.6)*p;a*=.5;}return s;}",
      /* the light column: x core, y tight glow, z broad atmosphere, w height at closest approach */
      "vec4 column(vec3 o,vec3 d,float tmax,vec4 P,float blur){",
      " vec2 dxz=d.xz;float dd=max(dot(dxz,dxz),1e-6);float tc=dot(P.xy-o.xz,dxz)/dd;float t=clamp(tc,0.,tmax);",
      " vec3 p=o+d*t;float dist=length(p.xz-P.xy);float fp=t*(uPixA+blur)+.002;",
      " float inY=smoothstep(-fp,fp,p.y)*smoothstep(P.w+fp,P.w-fp,p.y);float vis=step(0.,tc)*step(tc,tmax);",
      " float dn=clamp(dist/max(P.z,1e-4),0.,1.);",
      " float core=smoothstep(P.z+fp,P.z-fp*.5,dist)*inY*vis*(.5+.5*(1.-dn*dn));",
      " float over=max(0.,p.y-P.w)+max(0.,-p.y);float vf=exp(-over*.7);",
      " float tight=exp(-dist/(P.z*1.8+.06+blur*t));float mid=1./(1.+dist*dist*1.3);float wide=1./(1.+dist*.6);",
      " return vec4(core,tight*vf,(mid*.32+wide*.06)*vf,p.y);}",
      /* sum of moving swells: returns the slope (dh/dx, dh/dz); short waves fade out where they would alias */
      "vec2 wv(vec2 p,vec2 d,float k,float a,float s,float fp){float ph=dot(p,d)*k+uTime*s;return d*(a*k*cos(ph))*(1.-smoothstep(.35,1.4,fp*k));}",
      "vec2 slope(vec2 p,float fp){vec2 g=vec2(0.);",
      " g+=wv(p,vec2(.96,.28),.42,.16,.75,fp);g+=wv(p,vec2(-.51,.86),.78,.085,1.05,fp);g+=wv(p,vec2(.2,-.98),1.45,.04,1.5,fp);",
      " g+=wv(p,vec2(.74,.67),2.6,.018,2.2,fp);g+=wv(p,vec2(-.98,-.2),4.3,.009,3.,fp);g+=wv(p,vec2(.4,.92),7.1,.005,4.,fp);" + (mob ? "" : "g+=wv(p,vec2(-.3,.95),11.3,.0028,5.2,fp);g+=wv(p,vec2(.85,-.5),16.,.0016,6.,fp);"),
      " return g*uC.z;}",
      "vec3 skyCol(vec3 d,float glow){float h=max(d.y,0.);vec3 c=mix(HORIZ,vec3(.004,.008,.022),pow(clamp(h*2.3,0.,1.),.55));",
      " vec2 cp=d.xz/(h+.05);float cl=fbm(vec2(cp.x*.15+uTime*.004,cp.y*.75));cl=smoothstep(.42,.92,cl)*smoothstep(0.,.06,h)*(1.-smoothstep(.3,.75,h));",
      " c+=vec3(.06,.11,.23)*cl*(.2+glow*2.4);return c;}",
      "void main(){",
      " vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;",
      " vec3 rd=normalize(uFwd+2.*uTanF*(uv.x*uRight+uv.y*uUp));vec3 ro=uCam;",
      " float tg=rd.y<-1e-4?-ro.y/rd.y:1e5;float tmax=min(tg,800.);",
      " float I=uBeam.w>0.?uA.y:0.;vec4 P=vec4(0.,0.,uBeam.z,uBeam.w);",
      " vec4 c=column(ro,rd,tmax,P,0.);",
      " float pk=1.+.35*smoothstep(.72,1.,sin(c.w*2.1-uTime*2.6))+.15*smoothstep(.85,1.,sin(c.w*6.-uTime*4.3));",
      " vec3 col=mix(INNER*1.15,CORE,c.x)*c.x*I*3.1+INNER*c.y*I*.8*pk+HALO*c.z*I*pk;float glow=(c.y*.6+c.z)*I;",
      " vec3 bg;",
      " if(rd.y<0.){",
      "  vec3 g=ro+rd*tg;vec2 q=g.xz;float fp=tg*uPixA/max(-rd.y,.02);",
      "  vec2 s=slope(q,fp)*mix(.35,1.,smoothstep(3.,14.,tg));s+=(vec2(noise(q*3.1+uTime*.6),noise(q*3.1-uTime*.5+7.))-.5)*.07*(1.-smoothstep(.2,.9,fp*3.));",
      "  vec3 n=normalize(vec3(-s.x,1.,-s.y));vec3 rr=reflect(rd,n);float up=smoothstep(-.14,.1,rr.y);rr.y=max(rr.y,.004);rr=normalize(rr);",
      "  float fr=.03+.97*pow(1.-clamp(dot(n,-rd),0.,1.),5.);",
      /* the light reflected by every wave: a long broken path of light on the water */
      "  vec4 r=column(g,rr,400.,P,.02);float rg=(r.y*.6+r.z)*I;",
      "  vec3 refl=mix(HORIZ,vec3(.004,.008,.022),pow(clamp(rr.y*2.3,0.,1.),.55))*2.2+HALO*rg*.5+HALO*.03+(mix(INNER,CORE,r.x)*r.x*.16+INNER*r.y*.3+HALO*r.z*.95)*I;",
      "  vec3 w=vec3(.004,.01,.028)+vec3(.004,.009,.024)*noise(q*.3);",
      "  float dist=length(q-P.xy);float pool=exp(-dist*.55)*.55+.22/(1.+dist*dist*.18);",
      "  w+=HALO*pool*I*.35;",
      /* sparkles: wave facets that turn exactly towards the light */
      "  vec3 L=normalize(vec3(P.x,P.w*.55,P.y)-g);vec3 hv=normalize(L-rd);float sp=pow(max(dot(n,hv),0.),900.)*exp(-dist*.03)*smoothstep(.6,.82,noise(q*9.+uTime*1.3));",
      "  w+=CORE*sp*I*uA.w*5.;",
      /* light pulses that leave the core and run across the water */
      "  if(uA.z>.002){vec2 v=q-P.xy;float rr2=length(v);float k=atan(v.y,v.x)*11.459;float id=floor(k);",
      "   float fa=abs(fract(k)-.5)*.08727*rr2;float h1=hash(vec2(id,3.));float ln=1.-smoothstep(0.,.008+fp,fa);",
      "   float ph=fract(rr2*.05-uTime*(.12+h1*.16)+h1*7.);float pu=smoothstep(0.,.02,ph)*(1.-smoothstep(.02,.18,ph));",
      "   w+=INNER*ln*(pu*1.3+.03)*exp(-rr2*.045)*smoothstep(.4,1.5,rr2)*step(.5,h1)*uA.z;}",
      "  bg=mix(w,refl,fr*up);",
      "  float fog=1.-exp(-tg*.012);bg=mix(bg,HORIZ*.85+HALO*glow*.15,fog);",
      " }else{",
      "  bg=skyCol(rd,glow);",
      /* a few far stars, slowly breathing */
      "  vec2 sg=gl_FragCoord.xy/uRes.y*120.;vec2 ce=floor(sg);float hs=hash(ce);",
      "  float st=step(.993,hs)*smoothstep(.06,.0,length(fract(sg)-.5-(vec2(hash(ce+3.),hash(ce+9.))-.5)*.6))*smoothstep(.04,.22,rd.y);",
      "  bg+=vec3(.6,.72,1.)*st*(.35+.35*sin(uTime*(.6+hs*2.)+hs*40.));",
      " }",
      " col+=bg;col+=HORIZ*exp(-abs(rd.y)*70.)*uB.w*1.6;",
      /* anamorphic flare where the light meets the sea */
      " vec2 sv=uv-uBase;col+=INNER*(exp(-abs(sv.y)*120.)*exp(-abs(sv.x)*2.2)*.6+exp(-length(sv*vec2(1.4,5.))*7.)*.45)*I*.55;",
      " float mist=fbm(uv*vec2(2.,3.2)+vec2(uTime*.012,-uTime*.016));col+=HALO*glow*mist*.32;",
      " vec2 dp=gl_FragCoord.xy/uRes.y*40.;dp.y-=uTime*.7;dp.x+=sin(dp.y*.13+uTime*.2)*.4;vec2 de=floor(dp);",
      " col+=INNER*smoothstep(.11,0.,length(fract(dp)-.5-(vec2(hash(de+11.3),hash(de+5.7))-.5)*.6))*step(.91,hash(de))*(glow*1.3+.01);",
      " float md=length(uv-uB.xy);col+=HALO*exp(-md*md*9.)*uB.z*(.25+mist*.6)*.3;",
      " col=1.-exp(-col*uA.x);col*=1.-uC.y*dot(uv,uv)*.8;col*=1.-uC.x;",
      " col+=(hash(gl_FragCoord.xy+fract(uTime*3.1)*71.)-.5)*(1./110.);",
      " gl_FragColor=vec4(max(col,0.),1.);}"
    ].join("\n");
  }

  var mob = window.innerWidth < 760, prog = null, U = {}, ok = false;
  function build() {
    function sh(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { if (window.console) console.warn("sea shader:", gl.getShaderInfoLog(s)); return null; }
      return s;
    }
    var vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, frag(mob));
    if (!vs || !fs) return false;
    prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ["uRes", "uTime", "uCam", "uRight", "uUp", "uFwd", "uTanF", "uPixA", "uBeam", "uA", "uB", "uC", "uBase"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    return true;
  }
  ok = build();
  if (!ok) { canvas.remove(); fxCanvas.remove(); return; }
  root.classList.add("has-sea");

  /* ---------- camera + composition ---------- */
  var W = 1, H = 1, dpr = 1, scale = mob ? .7 : .75, rw = 1, rh = 1;
  var fx = fxCanvas.getContext("2d");
  var BEAM = { hw: .2, h: 6 };
  var view = { sx: .72, horizon: .6 };            // where the light stands, where the sea meets the sky
  var cur = { tilt: 0, beam: 1, fil: 1, rays: 1, dim: 0, mx: 0, my: 0, amt: 0 };
  var tgt = { tilt: 0, beam: 1, fil: 1, rays: 1, dim: 0, mx: 0, my: 0, amt: 0 };
  var cam = { c: [0, 1, 16], f: [0, 0, -1], r: [1, 0, 0], u: [0, 1, 0], tan: .34 };

  function norm(a) { var l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function layout() {
    mob = window.innerWidth < 760;
    view.sx = mob ? .93 : window.innerWidth < 1000 ? .8 : .71;
    view.horizon = mob ? .55 : .6;
    BEAM.hw = mob ? .13 : .2; BEAM.h = mob ? 5.4 : 6;
  }
  function updCamera() {
    var fov = mob ? 52 : 38, tan = Math.tan(fov * Math.PI / 360), d = 17, camY = 1.25;
    // pitch so the horizon lands at view.horizon (+ a slow tilt towards the water while scrolling)
    var hz = view.horizon + cur.tilt;                 // 0 top … 1 bottom
    var pitch = Math.atan((hz - .5) * 2 * tan);       // looking down by this angle puts the horizon there
    var asp = W / Math.max(1, H), off = (view.sx - .5) * asp * 2 * tan * d;
    var px = cur.mx * .35, py = cur.my * .12;
    var c = [-off + px, camY, d];
    var f = norm([0 - px * .4, Math.tan(pitch) + py * .02, -1]);
    var r = norm(cross(f, [0, 1, 0])), u = cross(r, f);
    cam.c = c; cam.f = f; cam.r = r; cam.u = u; cam.tan = tan;
  }
  function project(x, y, z) {
    var v = [x - cam.c[0], y - cam.c[1], z - cam.c[2]], dd = dot(v, cam.f);
    if (dd < .05) return null;
    var k = 1 / (dd * 2 * cam.tan);
    return { x: W / 2 + dot(v, cam.r) * k * H, y: H / 2 - dot(v, cam.u) * k * H, d: dd };
  }

  function resize() {
    layout();
    W = window.innerWidth; H = window.innerHeight; dpr = Math.min(window.devicePixelRatio || 1, 2);
    rw = Math.max(2, Math.round(W * scale)); rh = Math.max(2, Math.round(H * scale));
    canvas.width = rw; canvas.height = rh;
    fxCanvas.width = Math.round(W * dpr); fxCanvas.height = Math.round(H * dpr);
    gl.viewport(0, 0, rw, rh);
  }

  /* ---------- filaments: thin lines of light drifting out of the core ---------- */
  var fils = []; for (var i = 0; i < 160; i++) fils.push({ on: false });
  function sprite(flip) {
    var c = document.createElement("canvas"); c.width = 256; c.height = 2;
    var g = c.getContext("2d"), gr = g.createLinearGradient(0, 0, 256, 0);
    [[0, "rgba(120,170,255,0)"], [.7, "rgba(170,205,255,.5)"], [.97, "rgba(235,244,255,1)"], [1, "rgba(255,255,255,1)"]]
      .forEach(function (s) { gr.addColorStop(flip ? 1 - s[0] : s[0], s[1]); });
    g.fillStyle = gr; g.fillRect(0, 0, 256, 2); return c;
  }
  var spR = sprite(false), spL = sprite(true), fxDirty = false, beamScr = null;
  function drawFx(dt) {
    var amount = reduced ? 0 : cur.fil * cur.beam;
    if (amount > .02 && beamScr) {
      var n = amount * dt * (mob ? 22 : 46);
      while (n > 0) {
        if (n < 1 && Math.random() > n) break;
        n -= 1;
        for (var j = 0; j < fils.length; j++) if (!fils[j].on) {
          var f = fils[j], r = Math.random();
          f.on = true; f.t = 0; f.life = .9 + Math.random() * 1.8; f.dir = Math.random() < .5 ? -1 : 1;
          f.y = beamScr.top + (beamScr.base - beamScr.top) * (.12 + .8 * r * r);
          f.x0 = beamScr.x + f.dir * (beamScr.hw + 1);
          f.len = (80 + Math.pow(Math.random(), 1.5) * 420) * (mob ? .5 : 1);
          f.tail = 24 + Math.random() * 110; f.a = .18 + Math.random() * .55; f.w = Math.random() < .1 ? 1.5 : 1;
          break;
        }
      }
    }
    var any = false;
    for (var k = 0; k < fils.length; k++) if (fils[k].on) { any = true; break; }
    if (!any && !fxDirty) return;
    fx.setTransform(dpr, 0, 0, dpr, 0, 0); fx.clearRect(0, 0, W, H); fxDirty = any;
    if (!any) return;
    fx.globalCompositeOperation = "lighter";
    for (k = 0; k < fils.length; k++) {
      var g = fils[k]; if (!g.on) continue;
      g.t += dt; var p = g.t / g.life; if (p >= 1) { g.on = false; continue; }
      var e = 1 - Math.pow(1 - p, 2.2), x = g.x0 + g.dir * e * g.len, tl = g.tail * (1 - p * .4);
      fx.globalAlpha = g.a * Math.sin(Math.PI * Math.min(1, p * 1.2)) * clamp(cur.beam * 1.2, 0, 1);
      if (g.dir > 0) fx.drawImage(spR, x - tl, g.y - g.w / 2, tl, g.w); else fx.drawImage(spL, x, g.y - g.w / 2, tl, g.w);
    }
    fx.globalAlpha = 1; fx.globalCompositeOperation = "source-over";
  }

  /* ---------- scroll + pointer set the targets; the frame loop glides towards them ---------- */
  function readScroll() {
    var y = window.scrollY, vh = H || window.innerHeight;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    var heroFade = clamp(y / (vh * 1.1), 0, 1);        // 0 in the hero → 1 once it has scrolled away
    var nearEnd = clamp((y - (max - vh * 1.2)) / (vh * 1.2), 0, 1); // the light comes back for the contact + footer
    tgt.beam = (mob ? .78 : 1) - (mob ? .5 : .6) * heroFade + .08 * nearEnd;
    tgt.fil = 1 - .75 * heroFade + .15 * nearEnd;
    tgt.rays = 1 - .5 * heroFade;
    tgt.dim = (mob ? .48 : .3) * heroFade * (1 - nearEnd * .6);
    tgt.tilt = -(mob ? .32 : .4) * heroFade - .06 * clamp(y / max, 0, 1); // past the hero the camera looks down at the water
    kick();
  }
  window.addEventListener("scroll", readScroll, { passive: true });
  if (fine && !reduced) {
    window.addEventListener("pointermove", function (e) { tgt.mx = e.clientX / W * 2 - 1; tgt.my = 1 - e.clientY / H * 2; tgt.amt = 1; kick(); }, { passive: true });
    document.addEventListener("pointerleave", function () { tgt.amt = 0; kick(); });
  }

  var raf = 0, last = 0, t0 = performance.now(), running = false, idle = 0, slow = 0, frames = 0;
  function frame(now) {
    raf = 0;
    var dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    var a = reduced ? 1 : 1 - Math.exp(-dt * 3.2), moving = false;
    for (var k in tgt) { var d = tgt[k] - cur[k]; if (Math.abs(d) > 1e-4) { cur[k] += d * a; moving = true; } else cur[k] = tgt[k]; }
    frames++; if (dt > .03) slow++;
    if (frames % 90 === 0) { if (slow > 45 && scale > .38) { scale -= .08; resize(); } slow = 0; }
    updCamera();
    var bp = project(0, 0, 0), tp = project(0, BEAM.h, 0);
    beamScr = bp && tp ? { x: bp.x, base: bp.y, top: tp.y, hw: BEAM.hw / (bp.d * 2 * cam.tan) * H } : null;
    var time = reduced ? 30 : (now - t0) / 1000;
    var breathe = 1 + (reduced ? 0 : .06 * Math.sin(time * .7) + .03 * Math.sin(time * 1.9));
    gl.uniform2f(U.uRes, rw, rh);
    gl.uniform1f(U.uTime, time);
    gl.uniform3fv(U.uCam, cam.c); gl.uniform3fv(U.uRight, cam.r); gl.uniform3fv(U.uUp, cam.u); gl.uniform3fv(U.uFwd, cam.f);
    gl.uniform1f(U.uTanF, cam.tan); gl.uniform1f(U.uPixA, 2 * cam.tan / rh);
    gl.uniform4f(U.uBeam, 0, 0, BEAM.hw, BEAM.h);
    gl.uniform4f(U.uA, 1.0, cur.beam * breathe, reduced ? .4 : cur.rays * .9, 1);
    gl.uniform4f(U.uB, cur.mx * (W / H) * .5, cur.my * .5, cur.amt * .8, .9);
    gl.uniform4f(U.uC, cur.dim, .55, mob ? .9 : 1.1, 0);
    gl.uniform2f(U.uBase, bp ? (bp.x - W / 2) / H : 0, bp ? (H / 2 - bp.y) / H : -9);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    drawFx(dt);
    idle = moving ? 0 : idle + 1;
    if (!running) return;
    if (reduced && !moving) { running = false; return; }
    if (idle > 90) setTimeout(function () { if (running && !raf) raf = requestAnimationFrame(frame); }, 30); // ~30 fps when nothing but the sea moves
    else raf = requestAnimationFrame(frame);
  }
  function kick() { idle = 0; if (!running) { running = true; last = 0; } if (!raf && !document.hidden && active()) raf = requestAnimationFrame(frame); }
  function active() { return root.getAttribute("data-theme") !== "light"; }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else kick(); });
  // follow the theme switch: the sea belongs to the dark theme only
  new MutationObserver(function () { if (active()) kick(); else stop(); }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); stop(); });
  canvas.addEventListener("webglcontextrestored", function () { if (build()) { resize(); kick(); } });
  var rT; window.addEventListener("resize", function () { clearTimeout(rT); rT = setTimeout(function () { var m = mob; layout(); if (m !== mob) build(); resize(); readScroll(); }, 120); }, { passive: true });

  resize(); readScroll();
  for (var key in tgt) cur[key] = tgt[key];
  kick();
})();
