// Either Play button swaps the poster for the game, so the download only
// starts when someone wants to play, and their click also lets the browser
// play sound. Full screen uses the frame; phones get the game's own page.
(function () {
  "use strict";
  var screen = document.getElementById("screen");
  var full = document.getElementById("fullscreen");
  var note = document.getElementById("screen-note");
  var frame = null;
  var touch = window.matchMedia("(pointer: coarse)").matches;

  if (touch) {
    // Small screens play best on the game's own page, held sideways.
    note.textContent = "Free, about 14 MB. On a phone or tablet, Play opens the game on its own page: hold it sideways, left thumb to move, right thumb to shoot.";
  }

  function play() {
    if (touch && window.innerWidth < 900) {
      window.location.href = "play/";
      return;
    }
    // Already running: a second press must not reload it.
    if (!frame) {
      frame = document.createElement("iframe");
      frame.src = "play/";
      frame.title = "Deep Descent";
      frame.allow = "autoplay; fullscreen; gamepad; clipboard-read; clipboard-write";
      frame.setAttribute("allowfullscreen", "");
      screen.innerHTML = "";
      screen.appendChild(frame);
      frame.addEventListener("load", function () { frame.focus(); });
      if (frame.requestFullscreen || frame.webkitRequestFullscreen) {
        full.hidden = false;
      }
    }
    screen.scrollIntoView({ block: "nearest" });
    frame.focus();
  }

  var buttons = document.querySelectorAll(".js-play");
  for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener("click", play);

  full.addEventListener("click", function () {
    if (!frame) return;
    var go = frame.requestFullscreen || frame.webkitRequestFullscreen;
    if (go) go.call(frame);
    frame.focus();
  });
})();
