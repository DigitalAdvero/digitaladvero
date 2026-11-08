/* DigitalAdvero — ring.js
   The glossy black ring with orange and white light behind the hero and the contact section.
   One fixed WebGL canvas that ray-marches a slowly breathing torus. It only renders while the hero or the
   contact section is on screen, turns with the scroll and the mouse, lowers its resolution on slow devices
   and shows a still frame for "reduce motion". Without WebGL the CSS ring (.no-gl .ring-css) is used. */
(function () {
  "use strict";
  var hero = document.getElementById("top");
  if (!hero) return;
  var cta = document.getElementById("kontakt");
  var root = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  var canvas = document.createElement("canvas");
  canvas.className = "ring-gl";
  canvas.setAttribute("aria-hidden", "true");
  var gl = null;
  try {
    gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: "high-performance" });
  } catch (e) { gl = null; }
  if (!gl) { root.classList.add("no-gl"); return; }

  var VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  var FS = [
    "precision highp float;",
    "uniform vec2 uRes; uniform float uTime; uniform mat3 uM; uniform vec3 uPos;",
    "const vec3 OR = vec3(1.0, 0.353, 0.122);",
    // the ring: a torus whose tube gently swells and whose rim waves, so the light keeps sliding over it
    "float map(vec3 p){",
    "  vec3 q = p * uM;",
    "  float a = atan(q.z, q.x);",
    "  q.y += 0.075 * sin(a * 3.0 + uTime * 0.55) + 0.03 * sin(a * 5.0 - uTime * 0.9);",
    "  float r = 0.2 + 0.035 * sin(a * 2.0 - uTime * 0.4);",
    "  return length(vec2(length(q.xz) - 1.0, q.y)) - r;",
    "}",
    "vec3 nrm(vec3 p){",
    "  const vec2 k = vec2(1.0, -1.0); const float h = 0.0015;",
    "  return normalize(k.xyy * map(p + k.xyy * h) + k.yyx * map(p + k.yyx * h) + k.yxy * map(p + k.yxy * h) + k.xxx * map(p + k.xxx * h));",
    "}",
    // a dark studio: white soft boxes above and at the side, an orange light behind and a warm horizon
    "vec3 env(vec3 d){",
    "  vec3 c = vec3(0.0);",
    "  c += smoothstep(0.42, 0.92, d.y) * (0.5 + 0.5 * smoothstep(0.95, 0.0, abs(d.x))) * 1.6;",
    "  c += smoothstep(0.1, 0.0, abs(d.x - 0.78)) * smoothstep(-0.55, 0.45, d.y) * 1.7;",
    "  c += smoothstep(0.05, 0.0, abs(d.x + 0.5)) * smoothstep(0.05, 0.6, d.y) * 0.8;",
    "  float o = max(dot(d, normalize(vec3(-0.7, -0.45, -0.55))), 0.0);",
    "  c += OR * (o * o * 2.2 + pow(o, 14.0) * 2.5);",
    "  c += OR * exp(-abs(d.y + 0.08) * 7.0) * 0.45;",
    "  return c;",
    "}",
    "void main(){",
    "  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y - uPos.xy;",
    "  vec3 ro = vec3(0.0, 0.0, uPos.z);",
    "  vec3 rd = normalize(vec3(uv, -1.45));",
    "  float b = dot(ro, rd), h = b * b - (dot(ro, ro) - 2.89);",
    "  vec3 col = vec3(0.0); float a = 0.0;",
    "  if (h > 0.0) {",
    "    h = sqrt(h);",
    "    float t = max(-b - h, 0.0), tm = -b + h, dm = 1e3, tdm = t;",
    "    bool hit = false;",
    "    for (int i = 0; i < 96; i++) {",
    "      float d = map(ro + rd * t);",
    "      if (d < dm) { dm = d; tdm = t; }",
    "      if (d < 0.0005 * t) { hit = true; break; }",
    "      t += d * 0.75;",
    "      if (t > tm) break;",
    "    }",
    "    if (hit) {",
    "      vec3 p = ro + rd * t, n = nrm(p);",
    "      float ndv = clamp(dot(n, -rd), 0.0, 1.0);",
    "      vec3 r = reflect(rd, n);",
    "      float F = 0.04 + 0.96 * pow(1.0 - ndv, 5.0);",
    "      float film = pow(1.0 - ndv, 2.2);",
    "      col = vec3(0.01) + env(r) * (0.1 + 0.9 * F);",
    "      col += mix(OR, vec3(1.0, 0.92, 0.85), smoothstep(0.6, 1.0, film)) * film * 0.5;",
    "      col += pow(max(dot(r, normalize(vec3(0.35, 0.85, 0.5))), 0.0), 90.0) * 1.6;",
    "      a = 1.0;",
    "    } else {",
    "      float px = 1.8 * tdm / (1.45 * uRes.y);",
    "      float cov = 1.0 - smoothstep(0.0, px, dm);",
    "      col = mix(OR, vec3(1.0), 0.3) * cov * 0.8;",
    "      a = cov;",
    "    }",
    "    float g = exp(-max(dm, 0.0) * 8.0) * (1.0 - a) * 0.22;",
    "    col += OR * g;",
    "    a = min(a + g, 1.0);",
    "  }",
    "  col = col / (1.0 + 0.22 * col);",
    "  gl_FragColor = vec4(min(col, vec3(a)), a);",
    "}"
  ].join("\n");

  function shader(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  var vs = shader(gl.VERTEX_SHADER, VS), fs = shader(gl.FRAGMENT_SHADER, FS);
  var prog = gl.createProgram();
  if (vs && fs) { gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); }
  if (!vs || !fs || !gl.getProgramParameter(prog, gl.LINK_STATUS)) { root.classList.add("no-gl"); return; }
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {};
  ["uRes", "uTime", "uM", "uPos"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
  gl.clearColor(0, 0, 0, 0);
  document.body.insertBefore(canvas, document.body.firstChild);

  /* ---------- size & quality ---------- */
  var quality = 1, mobile = false;
  function size() {
    var w = window.innerWidth, h = window.innerHeight;
    mobile = w < 760;
    var s = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.25) * (mobile ? 0.62 : 0.72) * quality;
    var cw = Math.max(2, Math.round(w * s)), ch = Math.max(2, Math.round(h * s));
    if (cw !== canvas.width || ch !== canvas.height) { canvas.width = cw; canvas.height = ch; gl.viewport(0, 0, cw, ch); }
  }

  /* ---------- where the ring sits: hero pose, then a second pose in the contact section ---------- */
  var mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function pose(time) {
    var H = window.innerHeight, asp = window.innerWidth / H;
    var hp = clamp(window.scrollY / (hero.offsetHeight || H), 0, 1);
    var wide = asp >= 1, P;
    var r = cta ? cta.getBoundingClientRect() : null;
    if (r && hp >= 1 && r.top < H) {
      var cp = clamp(1 - r.top / H, 0, 1.6);
      P = wide ? { rx: 0.62 + cp * 0.25, rz: 0.55 - cp * 0.15, x: -0.12, y: -0.62 + cp * 0.12, z: 2.2 }
               : { rx: 0.7 + cp * 0.2, rz: 0.5 - cp * 0.1, x: 0.0, y: -0.5 + cp * 0.1, z: 2.8 };
    } else {
      P = wide ? { rx: 1.02 + hp * 0.5, rz: -0.3 + hp * 0.2, x: 0.44 + (asp - 1.6) * 0.05, y: -0.6 + hp * 0.3, z: 2.15 - hp * 0.25 }
               : { rx: 1.1 + hp * 0.4, rz: -0.35 + hp * 0.2, x: 0.05, y: -0.42 + hp * 0.25, z: 2.9 - hp * 0.3 };
    }
    P.ry = time * 0.12;
    P.rx += mouse.sy * 0.06;
    P.rz += mouse.sx * 0.05;
    return P;
  }
  // rotation R = Rz * Rx * Ry, uploaded column-major; the shader uses p * uM = R^T p (world -> ring space)
  function matrix(rx, ry, rz) {
    var cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry), cz = Math.cos(rz), sz = Math.sin(rz);
    var a00 = cy, a01 = 0, a02 = sy, a10 = sx * sy, a11 = cx, a12 = -sx * cy, a20 = -cx * sy, a21 = sx, a22 = cx * cy;
    var r00 = cz * a00 - sz * a10, r01 = cz * a01 - sz * a11, r02 = cz * a02 - sz * a12;
    var r10 = sz * a00 + cz * a10, r11 = sz * a01 + cz * a11, r12 = sz * a02 + cz * a12;
    return new Float32Array([r00, r10, a20, r01, r11, a21, r02, r12, a22]);
  }
  function draw(time) {
    size();
    var P = pose(time);
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uTime, time);
    gl.uniformMatrix3fv(U.uM, false, matrix(P.rx, P.ry, P.rz));
    gl.uniform3f(U.uPos, P.x, P.y, P.z);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /* ---------- loop: only while the hero or the contact section is visible ---------- */
  var visHero = true, visCta = false, revealed = !!window.DA_REVEALED || !root.classList.contains("intro-on");
  var raf = 0, t0 = performance.now(), lastFrame = 0, lastScroll = 0, slow = 0, frames = 0, lost = false;
  function active() { return !lost && revealed && (visHero || visCta) && !document.hidden; }
  function frame(now) {
    raf = 0;
    if (!active()) { canvas.classList.remove("is-on"); return; }
    canvas.classList.add("is-on");
    var dt = lastFrame ? now - lastFrame : 1000;
    // ~30 fps while nothing else moves, full rate while scrolling
    if (!reduce && dt < 30 && now - lastScroll > 400) { raf = requestAnimationFrame(frame); return; }
    lastFrame = now;
    // a device that cannot keep up gets a lower resolution
    if (frames++ > 8 && quality > 0.55) {
      slow = dt > 48 ? slow + 1 : Math.max(0, slow - 1);
      if (slow > 12) { quality = Math.max(0.55, quality - 0.15); slow = 0; }
    }
    mouse.sx += (mouse.x - mouse.sx) * 0.06;
    mouse.sy += (mouse.y - mouse.sy) * 0.06;
    draw(reduce ? 2.0 : (now - t0) / 1000);
    if (!reduce) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.target === hero) visHero = e.isIntersecting; else visCta = e.isIntersecting; });
      kick();
    });
    io.observe(hero);
    if (cta) io.observe(cta);
  }
  document.addEventListener("da:reveal", function () { revealed = true; kick(); });
  document.addEventListener("visibilitychange", function () { lastFrame = 0; kick(); });
  window.addEventListener("scroll", function () { lastScroll = performance.now(); kick(); }, { passive: true });
  window.addEventListener("resize", kick);
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX / window.innerWidth * 2 - 1;
    mouse.y = e.clientY / window.innerHeight * 2 - 1;
  }, { passive: true });
  canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); lost = true; canvas.classList.remove("is-on"); root.classList.add("no-gl"); });
  kick();
})();
