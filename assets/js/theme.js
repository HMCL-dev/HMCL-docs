---
layout: null
---
var alternateTheme = document.createElement("link");
var dark = "stylesheet";
var light = "stylesheet alternate";
alternateTheme.rel = light;
alternateTheme.href = "{{ '/assets/css/main.dark.css' | relative_url }}";
document.head.appendChild(alternateTheme);
var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
function handler() {
    alternateTheme.rel = mediaQuery.matches ? dark : light;
}
window.addEventListener("DOMContentLoaded", function () {
    var current = 0;
    var modes = ["light", "dark", "auto"];
    var modeNames = ["亮色", "暗色", "自动"];
    var switchers = document.getElementsByClassName("theme-switcher");
    function themeApply(index) {
        index %= modes.length;
        if (index === current) return;
        if (modes[current] === "auto") mediaQuery.removeEventListener("change", handler);
        current = index;
        for (var switcher of switchers) {
            if (!switcher.href) {
                switcher.addEventListener("click", function () {
                    themeApply(current + 1);
                });
                switcher.href = "javascript:;";
            }
            switcher.innerText = modeNames[current];
        }
        var mode = modes[index];
        localStorage.setItem("theme", index);
        if (mode === "light") alternateTheme.rel = light;
        else if (mode === "dark") alternateTheme.rel = dark;
        else {
            mediaQuery.addEventListener("change", handler);
            handler();
        }
    }
    themeApply(Number(localStorage.getItem("theme")) || current);
    window.addEventListener("storage", function (event) {
        if (event.key !== "theme") return;
        themeApply(Number(event.newValue) || 0);
    });
});
