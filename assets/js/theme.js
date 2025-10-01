var themeElement = document.querySelector("[href$='main.css']");
if (themeElement) {
    var light = themeElement.href;
    var dark = light.slice(0, -3) + "dark.css";
    var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    function handler() {
        themeElement.href = mediaQuery.matches ? dark : light;
    }
    var modes = ["auto", "light", "dark"];
    var modeNames = ["自动", "亮色", "暗色"];
    var current = 1;
    function themeApply(index) {
        index %= modes.length;
        if (index === current) return;
        if (modes[current] === "auto") mediaQuery.removeEventListener("change", handler);
        current = index;
        var mode = modes[index];
        localStorage.setItem("theme", mode);
        if (mode === "light") themeElement.href = light;
        else if (mode === "dark") themeElement.href = dark;
        else {
            mediaQuery.addEventListener("change", handler);
            handler();
        }
    }
    themeApply(Number(localStorage.getItem("theme")) || current);
    window.addEventListener("DOMContentLoaded", function () {
        var switchers = document.getElementsByClassName("theme-switcher");
        for (const switcher of switchers) {
            switcher.addEventListener("click", function() {
                themeApply(current + 1);
                for (const switcher of switchers) {
                    switcher.innerText = modeNames[current];
                }
            });
            switcher.innerText = modeNames[current];
        }
    });
}
