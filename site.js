// The Play button swaps the poster for the game, so the ~24 MB download only
// starts when someone wants to play, and their click also lets the browser
// play sound. Full screen uses the frame; phones get the game's own page.
(function () {
  "use strict";
  var screen = document.getElementById("screen");
  var play = document.getElementById("play");
  var full = document.getElementById("fullscreen");
  var note = document.getElementById("screen-note");
  var frame = null;
  var touch = window.matchMedia("(pointer: coarse)").matches;

  if (touch) {
    // Small screens play best on the game's own page, held sideways.
    note.textContent = "Free, about 24 MB to load. On a phone or tablet, Play opens the game on its own page: hold it sideways, left thumb to move, right thumb to shoot.";
  }

  play.addEventListener("click", function () {
    if (touch && window.innerWidth < 900) {
      window.location.href = "play/";
      return;
    }
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
  });

  full.addEventListener("click", function () {
    if (!frame) return;
    var go = frame.requestFullscreen || frame.webkitRequestFullscreen;
    if (go) go.call(frame);
    frame.focus();
  });
})();
