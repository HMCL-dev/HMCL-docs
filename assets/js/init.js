---
layout: null
---
window.addEventListener("DOMContentLoaded", function () {
  // skin
  var skinLink = document.getElementById("skin");
  var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function applyDarkSkin() {
    skinLink.href = "{{ '/assets/css/skins/' | relative_url }}" + settings.get("appearance_skin_dark", "dark") + ".css";
  }
  function applyLightSkin() {
    skinLink.href = "{{ '/assets/css/skins/' | relative_url }}" + settings.get("appearance_skin_light", "default") + ".css";
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
  settings.onChange("appearance_color", function (mode) {
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
  });
  settings.onChange("appearance_skin_dark", function () {
    settings.refresh("appearance_color");
  });
  settings.onChange("appearance_skin_light", function () {
    settings.refresh("appearance_color");
  });
  // april_fools
  var now = new Date();
  var isAprilFoolsDay = now.getMonth() === 3 && now.getDate() === 1;
  settings.onChange("miscellaneous_april_fools", function (strategy) {
    var root = document.documentElement;
    root.classList.remove("vertical");
    if (strategy !== "disable" && (strategy === "enable" || isAprilFoolsDay)) {
      root.classList.add("vertical");
    }
  });
});
