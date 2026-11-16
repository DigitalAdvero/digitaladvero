/* DigitalAdvero — ad.js
   Opens the recommended ad (the "Preporuka" block) full size, and closes it with the button, a click
   outside the image or Escape. While it is open the page behind does not scroll. */
(function () {
  "use strict";
  var box = document.getElementById("adBox");
  if (!box) return;
  var body = document.body, lastFocus = null, prevOverflow = "", hideT = 0;
  function focus(el) { if (el && el.focus) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } } }

  function open() {
    clearTimeout(hideT);
    lastFocus = document.activeElement;
    prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    box.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("is-open"); }); });
    focus(box.querySelector("[data-ad-close]"));
  }
  function close() {
    if (box.hidden || !box.classList.contains("is-open")) return;
    box.classList.remove("is-open");
    body.style.overflow = prevOverflow;
    hideT = setTimeout(function () { box.hidden = true; }, 400);
    focus(lastFocus);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-ad-open]"), function (b) { b.addEventListener("click", open); });
  box.addEventListener("click", function (e) { if (e.target === box || (e.target.closest && e.target.closest("[data-ad-close]"))) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
