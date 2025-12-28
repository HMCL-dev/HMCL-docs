(function (global) {
  var modeSwitcher = null;
  var activeModeIndex = 0;
  var modeKeys = ["light", "dark", "auto"];
  var modeLabels = ["亮色", "暗色", "自动"];
  function applyTheme(mode) {
    var newIndex = modeKeys.indexOf(mode);
    if (newIndex < 0) newIndex = 0;
    activeModeIndex = newIndex;
    var resolvedMode = modeKeys[activeModeIndex];
    if (modeSwitcher) {
      modeSwitcher.textContent = modeLabels[activeModeIndex];
    }
    if (resolvedMode === "auto") {
      delete document.documentElement.dataset.bsTheme;
    } else {
      document.documentElement.dataset.bsTheme = resolvedMode;
    }
  }
  settings.onChange("appearance_color", applyTheme);
  settings.onChange("appearance_skin_dark", function () {
    settings.refresh("appearance_color");
  });
  settings.onChange("appearance_skin_light", function () {
    settings.refresh("appearance_color");
  });
  global.addEventListener("DOMContentLoaded", function () {
    var menuList = document.querySelector("#navbar .navbar-nav");
    if (menuList) {
      var menuItem = document.createElement("li");
      menuItem.className = "nav-item";
      modeSwitcher = document.createElement("a");
      modeSwitcher.className = "nav-link";
      modeSwitcher.textContent = modeLabels[activeModeIndex];
      modeSwitcher.href = "javascript:;";
      modeSwitcher.onclick = function () {
        var nextIndex = (activeModeIndex + 1) % modeKeys.length;
        settings.set("appearance_color", modeKeys[nextIndex]);
      }
      menuItem.appendChild(modeSwitcher);
      menuList.appendChild(menuItem);
    }
  });
})(window);
