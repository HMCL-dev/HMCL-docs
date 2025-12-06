window.addEventListener("DOMContentLoaded", function () {
  var skinLink = document.getElementById("skin");
  var darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function applyDarkSkin() {
    skinLink.href = config.baseurl + "assets/css/skins/" + settings.get("appearance_skin_dark", "dark") + ".css";
  }
  function applyLightSkin() {
    skinLink.href = config.baseurl + "assets/css/skins/" + settings.get("appearance_skin_light", "default") + ".css";
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
  var modeLabels = config.i18n[config.locale || "default"].settings.appearance_color.options;
  var menuList = document.querySelector(".masthead .visible-links");
  var modeSwitcher = null;
  if (menuList) {
    modeSwitcher = document.createElement("a");
    modeSwitcher.className = "masthead__menu-item";
    modeSwitcher.textContent = modeLabels["light"];
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
      modeSwitcher.textContent = modeLabels[resolvedMode];
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
  settings.onChange("appearance_skin_dark", function () {
    settings.refresh("appearance_color");
  });
  settings.onChange("appearance_skin_light", function () {
    settings.refresh("appearance_color");
  });
});
