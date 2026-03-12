---
layout: null
---
(function () {
  const PREFIX = "HMCL_DOCS_SETTINGS_", data = {}, events = {}, configCache = {}, configs = /*{%comment%}*/ {}; /*{%endcomment%}*/ /**{{'/'}}{{ site.data.settings | jsonify }}/**/
  window.addEventListener("storage", ({ key, newValue }) => {
    if (key === null || !key.startsWith(PREFIX) || newValue === data[key]) return;
    data[key] = newValue;
    events[key]?.forEach((handler) => handler(newValue));
  });
  const getConfig = (key) => {
    if (typeof key !== "string") return undefined;
    if (configCache[key] !== undefined) return configCache[key];
    const keys = key.split(".");
    let item = configs[keys[0]];
    for (let i = 1; i < keys.length; i++) {
      if (item.children?.[keys[i]] === undefined) return undefined;
      item = item.children[keys[i]];
    }
    return configCache[key] = JSON.parse(JSON.stringify({ ...configs[keys[0]], ...item }));
  };
  window.settings = {
    set(key, value) {
      const config = getConfig(key);
      if (config === undefined) return;
      const name = PREFIX + key.toUpperCase().replaceAll(".", "_");
      localStorage.setItem(name, (data[name] = String(value)));
      events[name]?.forEach(handler => handler(data[name]));
    },
    get(key) {
      const config = getConfig(key);
      if (config === undefined) return null;
      const name = PREFIX + key.toUpperCase().replaceAll(".", "_");
      if (data[name] === undefined) data[name] = localStorage.getItem(name);
      if (typeof config.default === "string" && data[name] === null) return config.default;
      return data[name];
    },
    refresh(key) {
      const value = settings.get(key);
      if (value !== null) settings.set(key, value);
    },
    onChange(key, handler) {
      if (typeof handler !== "function") return;
      const config = getConfig(key);
      if (config === undefined) return;
      const name = PREFIX + key.toUpperCase().replaceAll(".", "_");
      handler(settings.get(key));
      if (events[name] === undefined) {
        events[name] = [handler];
      } else {
        events[name].push(handler);
      }
    },
  };
})();
