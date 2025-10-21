---
layout: null
---
var darkTheme = document.createElement("link");
darkTheme.rel = "stylesheet alternate";
darkTheme.href = "{{ '/assets/css/dark.css' | relative_url }}";
document.head.appendChild(darkTheme);
window.addEventListener("DOMContentLoaded", function () {
    var list = document.querySelector(".masthead .visible-links");
    if (!list) return;
    var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function handler() {
        darkTheme.rel = mediaQuery.matches ? "stylesheet" : "stylesheet alternate";
    }
    var current = 0;
    var modes = ["light", "dark", "auto"];
    var modeNames = ["亮色", "暗色", "自动"];
    var switcher = document.createElement("a");
    switcher.className = "masthead__menu-item";
    switcher.innerText = modeNames[current];
    switcher.href = "javascript:;";
    switcher.onclick = function () {
        themeApply(current + 1);
    }
    list.appendChild(switcher);
    function themeApply(index) {
        index = (Number(index) || 0) % modes.length;
        if (index === current) return;
        if (modes[current] === "auto") mediaQuery.removeEventListener("change", handler);
        current = index;
        var mode = modes[current];
        switcher.innerText = modeNames[current];
        localStorage.setItem("theme", current);
        if (mode === "light") darkTheme.rel = "stylesheet alternate";
        else if (mode === "dark") darkTheme.rel = "stylesheet";
        else {
            mediaQuery.addEventListener("change", handler);
            handler();
        }
    }
    themeApply(localStorage.getItem("theme"));
    window.addEventListener("storage", function (event) {
        event.key === "theme" && themeApply(event.newValue);
    });
});