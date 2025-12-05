---
layout: null
---
(function (global) {
  var PREFIX = "HMCL_DOCS_SETTINGS_";
  var data = {};
  var events = {};
  var config = /*{%comment%}*/{}/*{%endcomment%}*//**{{'/'}}{{ site.data.settings | jsonify }}/**/;

  global.addEventListener("storage", function (event) {
    if (!event.key) return;
    if (event.key.indexOf(PREFIX) !== 0) return;

    var handlers = events[event.key];
    if (!handlers) return;

    var newValue = event.newValue;
    var oldValue = event.oldValue;
    if (oldValue === newValue) return;

    data[event.key] = newValue;
    for (var i = 0; i < handlers.length; i++) {
      if (typeof handlers[i] === "function") {
        handlers[i](newValue, oldValue);
      }
    }
  });

  var settings = {
    set: function (key, value) {
      if (config[key] === undefined) return;
      var strKey = (PREFIX + key).toUpperCase();
      var newValue = value + "";
      data[strKey] = newValue;
      localStorage.setItem(strKey, newValue);
      var handlers = events[strKey];
      if (!handlers) return;

      for (var i = 0; i < handlers.length; i++) {
        if (typeof handlers[i] === "function") {
          handlers[i](newValue);
        }
      }
    },

    get: function (key, defaultValue) {
      if (config[key] === undefined) return;
      var strKey = (PREFIX + key).toUpperCase();
      data.hasOwnProperty(strKey) || (data[strKey] = localStorage.getItem(strKey));
      if (typeof defaultValue === "string" && data[strKey] === null) {
        return defaultValue;
      }
      return data[strKey];
    },

    refresh: function (key) {
      if (config[key] === undefined) return;
      settings.set(key, settings.get(key, config[key].default));
    },

    onChange: function (key, handler) {
      if (config[key] === undefined) return;
      if (typeof handler !== "function") return;
      var strKey = (PREFIX + key).toUpperCase();
      if (config[key].type === "radio") {
        handler(settings.get(key, config[key].default));
      }
      if (!events[strKey]) {
        events[strKey] = [handler];
      } else {
        events[strKey].push(handler);
      }
    }
  };
  global.settings = settings;
})(window);
