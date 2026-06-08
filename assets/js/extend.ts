/* @frontmatter
layout: null
*/

interface Window {
  $: JQueryStatic;
  appendMeta: (text: string, icon: string) => void;
  hits: (tag: string) => void;
  settings: {
    get: (key: string) => string;
    _get: (
      id: string,
      setting: Setting,
      keys: [name: string, childName?: string],
    ) => string;
    set: (key: string, value: string) => void;
    format: (
      key: string,
    ) => [
      id: string,
      setting: Setting,
      keys: [name: string, childName?: string],
    ];
    onChange: (
      key: string | string[],
      handler: (value: string) => void,
    ) => void;
  };
}

type RadioSetting = {
  type: "radio";
  default: string;
  options: string[];
};

type MultiRadioSetting = {
  type: "multi-radio";
  children: Record<string, { default: string }>;
  options: string[];
};

type Setting = RadioSetting | MultiRadioSetting;

type SettingSchema = Record<string, Setting>;

(() => {
  const settingNamePrefix = "HMCL_DOCS_SETTINGS_";
  const settingCache: Record<string, string> = {};
  const settingSchema: SettingSchema = /*{%comment%}*/ {}; /*{%endcomment%}*/
  /**{{'/'}}{{ site.data.settings | jsonify }};/**/
  const $settingEventBus = $({});

  window.addEventListener("storage", ({ key, newValue }) => {
    if (
      key !== null &&
      key.startsWith(settingNamePrefix) &&
      newValue !== null &&
      newValue !== settingCache[key]
    ) {
      settingCache[key] = newValue;
      $settingEventBus.trigger(key, newValue);
    }
  });

  const settings = (window.settings = {
    format(key) {
      const keys = key.toLocaleLowerCase().split(".");
      if (keys.length > 2 || keys.length === 0) {
        throw new Error("unknow key [" + key + "]");
      }

      const item = settingSchema[keys[0]];
      if (item === undefined) {
        throw new Error("unknow key [" + key + "]");
      }

      let id = settingNamePrefix + "_" + keys[0].toUpperCase();
      if (item.type === "multi-radio") {
        if (keys.length === 1) {
          throw new Error("unknow key [" + key + "]");
        }
        if (item.children[keys[1]] === undefined) {
          throw new Error("unknow key [" + key + "]");
        }
        id += "_" + keys[1].toUpperCase();
      } else if (keys.length === 2) {
        throw new Error("unknow key [" + key + "]");
      }
      return [id, item, keys as [name: string, childName?: string]];
    },
    set(key, value) {
      const [id] = this.format(key);
      if (settingCache[id] !== value) {
        settingCache[id] = value;
        localStorage.setItem(id, value);
        $settingEventBus.trigger(id, value);
      }
    },
    get(key) {
      const [id, config, keys] = this.format(key);
      return this._get(id, config, keys);
    },
    _get(id, setting, keys) {
      if (settingCache[id] !== undefined) {
        return settingCache[id];
      }
      const storeValue = localStorage.getItem(id);

      if (setting.type === "multi-radio" || setting.type === "radio") {
        if (storeValue !== null) {
          for (const option of setting.options) {
            if (storeValue === option) {
              settingCache[id] = storeValue;
              return storeValue;
            }
          }
        }

        return setting.type === "radio"
          ? setting.default
          : setting.children[keys[1]!].default;
      } else {
        throw new Error("key not match type");
      }
    },
    onChange(key, handler) {
      if (Array.isArray(key)) {
        for (const item of key) {
          this.onChange(item, handler);
        }
      } else {
        const [id, setting, keys] = this.format(key);
        handler(this._get(id, setting, keys));
        $settingEventBus.on(id, (_, data) => handler(data));
      }
    },
  });

  const $skin = $("#skin");
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const applySkin = (skin: string) => {
    $skin.attr(
      "href",
      "{{ '/assets/css/skins/' | relative_url }}" + skin + ".css",
    );
  };

  const autoSchemeHandler = () => {
    applySkin(
      settings.get("appearance_skin." + (darkQuery.matches ? "dark" : "light")),
    );
  };

  let currentModeIndex = 0;
  const modeKeys = ["light", "dark", "auto"];
  const modeIcons = ["fa-sun", "fa-moon", "fa-computer"];

  const $menu = $(".masthead .visible-links");
  let $switcher: JQuery<HTMLElement> | null = null;
  if ($menu.length !== 0) {
    $switcher = $("<button>")
      .attr("type", "button")
      .css("border", 0)
      .css("color", "inherit")
      .css("background", "transparent")
      .on("click", () => {
        settings.set(
          "appearance_color",
          modeKeys[(currentModeIndex + 1) % modeKeys.length],
        );
      });

    $switcher.append($("<i>").addClass(["fas", modeIcons[currentModeIndex]]));

    $menu.after($switcher);
  }

  function applyTheme(mode: string) {
    const modeIndex = modeKeys.indexOf(mode);
    if (modeIndex < 0) {
      throw new Error("error mode [" + mode + "]");
    }

    if (currentModeIndex === modeIndex) {
      return;
    }

    if (modeKeys[currentModeIndex] === "auto") {
      darkQuery.removeEventListener("change", autoSchemeHandler);
    }

    currentModeIndex = modeIndex;
    const currentMode = modeKeys[currentModeIndex];

    if ($switcher) {
      $switcher
        .children("i")
        .removeClass(modeIcons)
        .addClass(modeIcons[currentModeIndex]);
    }

    if (currentMode === "auto") {
      darkQuery.addEventListener("change", autoSchemeHandler);
      autoSchemeHandler();
    } else {
      applySkin(settings.get("appearance_skin." + currentMode));
    }
  }

  if ($switcher) {
    settings.onChange("appearance_color_switcher", (value) => {
      $switcher.css("display", value === "enable" ? "" : "none");
    });
  }

  settings.onChange("appearance_color", applyTheme);
  settings.onChange(["appearance_skin.dark", "appearance_skin.light"], () => {
    applyTheme(settings.get("appearance_color"));
  });

  const $header = $("#main article.page div.page__inner-wrap > header");
  if ($header.length !== 0) {
    let $metas = $header.children(".page__meta");
    if ($metas.length === 0) {
      $header.append(($metas = $("<p>").addClass("page__meta")));
    }
    const appendMeta = (window.appendMeta = (text, icon) => {
      if ($metas.children().length !== 0) {
        $metas.append($("<span>").addClass("page__meta-sep"));
      }
      const $meta = $("<span>");
      if (icon) {
        $meta.append($("<i>").addClass(icon), " ");
      }
      $meta.append(text.trim());
      $metas.append($meta);
    });
    window.hits = (tag) => {
      if (settings.get("miscellaneous_hits") === "disable") return;
      const hitsUrl = new URL("https://hits.zkitefly.eu.org");
      hitsUrl.searchParams.set("tag", tag);
      fetch(hitsUrl, { method: "HEAD" }).then((response) => {
        if (response.status !== 200) return;
        const { headers } = response;
        const total = headers.get("X-Total-Hits");
        const today = headers.get("X-Today-Hits");
        if (total !== null && today !== null) {
          appendMeta(today + " / " + total, "far fa-eye");
        }
      });
    };
  }
})();
