$(function () {
  var $alt = $("#theme-color-alternate"), $style = $("#theme-color-style");
  var current = 0, modes = ["light", "dark", "auto"], mq = window.matchMedia("(prefers-color-scheme: dark)");
  function applyTheme(idx) {
    idx = (Number(idx) || 0) % modes.length;
    if (idx === current) return;
    if (modes[current] === "auto") mq.removeEventListener("change", handler);
    current = idx;
    var mode = modes[current];
    $style.html(".theme-color-switcher.theme-color-" + mode + "{display:block!important}");
    localStorage.setItem("theme", current);
    if (mode === "light") $alt.attr("rel", "stylesheet alternate");
    else if (mode === "dark") $alt.attr("rel", "stylesheet");
    else { mq.addEventListener("change", handler); handler(); }
  }
  function handler() { $alt.attr("rel", mq.matches ? "stylesheet" : "stylesheet alternate"); }
  $(".theme-color-switcher").on("click", function () { applyTheme(current + 1); });
  applyTheme(localStorage.getItem("theme"));
  $(window).on("storage", e => e.originalEvent.key === "theme" && applyTheme(e.originalEvent.newValue));
});
