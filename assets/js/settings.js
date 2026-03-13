---
layout: null
---
(function () {
  const PREFIX = "HMCL_DOCS_SETTINGS_", data = {}, bus = new EventTarget(), configs = /*{%comment%}*/{}/*{%endcomment%}*/ /**{{'/'}}{{ site.data.settings | jsonify }}/**/;
  window.addEventListener("storage", ({ key, newValue }) => key !== null && key.startsWith(PREFIX) && newValue !== data[key] && bus.dispatchEvent(new CustomEvent(key, { detail: (data[key] = newValue) })));
  for (const [key, config] of Object.entries(configs)) {
    if (config.children === undefined) continue; 
    for (const [childKey, child] of Object.entries(config.children)) {
      configs[`${key}.${childKey}`] = { ...config, ...child };
    }
  }
  const formatKey = (key) => PREFIX + key.toUpperCase().replaceAll(".", "_");
  window.settings = {
    set(key, value) {
      const name = formatKey(key);
      localStorage.setItem(name, (data[name] = String(value)));
      bus.dispatchEvent(new CustomEvent(name, { detail: data[name] }));
    },
    get(key) {
      const name = formatKey(key);
      if (data[name] !== undefined) return data[name];
      data[name] = localStorage.getItem(name);
      if (data[name] !== null) return data[name];
      const config = configs[key];
      if (config === undefined || typeof config.default !== "string") return null;
      return config.default;
    },
    onChange(key, handler) {
      bus.addEventListener(formatKey(key), (event) => handler(event.detail));
    },
  };
})();
