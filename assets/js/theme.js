---
layout: null
---
window.addEventListener("DOMContentLoaded", function () {
  var skinLink = document.getElementById("skin");
  var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function applySkin(skin) {
    skinLink.href = "{{ '/assets/css/skins/' | relative_url }}" + skin + ".css";
  }
  function applyDarkSkin() {
    applySkin(settings.get("appearance_skin.dark"));
  }
  function applyLightSkin() {
    applySkin(settings.get("appearance_skin.light"));
  }
  function autoSchemeHandler() {
    if (darkModeQuery.matches) {
      applyDarkSkin();
    } else {
      applyLightSkin();
    }
  }
  var activeModeIndex = 0;
  var modeKeys = ["light", "dark", "auto"];
  var modeLabels = ["亮色", "暗色", "自动"];

  var menuList = document.querySelector(".masthead .visible-links");
  var modeSwitcher = null;
  if (menuList) {
    modeSwitcher = document.createElement("a");
    modeSwitcher.className = "masthead__menu-item";
    modeSwitcher.textContent = modeLabels[activeModeIndex];
    modeSwitcher.href = "javascript:;";
    modeSwitcher.onclick = function () {
      var nextIndex = (activeModeIndex + 1) % modeKeys.length;
      settings.set("appearance_color", modeKeys[nextIndex]);
    }
    menuList.appendChild(modeSwitcher);
  }
  function applyTheme(mode) {
    var newIndex = modeKeys.indexOf(mode);
    if (newIndex < 0) newIndex = 0;

    if (modeKeys[activeModeIndex] === "auto") {
      darkModeQuery.removeEventListener("change", autoSchemeHandler);
    }

    activeModeIndex = newIndex;
    var resolvedMode = modeKeys[activeModeIndex];

    if (modeSwitcher) {
      modeSwitcher.textContent = modeLabels[activeModeIndex];
    }

    if (resolvedMode === "light") {
      applyLightSkin();
    }
    else if (resolvedMode === "dark") {
      applyDarkSkin();
    }
    else {
      darkModeQuery.addEventListener("change", autoSchemeHandler);
      autoSchemeHandler();
    }
  }
  settings.onChange("appearance_color", applyTheme);
  settings.onChange("appearance_skin.dark", function () {
    settings.refresh("appearance_color");
  });
  settings.onChange("appearance_skin.light", function () {
    settings.refresh("appearance_color");
  });
  settings.onChange("appearance_color_switcher", function (value) {
    if (modeSwitcher !== null) {
      modeSwitcher.style.display = value === "enable" ? "" : "none";
    }
  });
});
