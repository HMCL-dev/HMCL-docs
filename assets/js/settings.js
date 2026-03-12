---
layout: null
---
(function (global) {
  var PREFIX = "HMCL_DOCS_SETTINGS_";
  var data = {};
  var events = {};
  var configs = /*{%comment%}*/{}/*{%endcomment%}*//**{{'/'}}{{ site.data.settings | jsonify }}/**/;

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
    set: function (name, value) {
      var keys = name.split(".");
      if (keys.length === 0) return;
      var item = configs[keys[0]];
      if (item === undefined) return;
      for (var i = 1; i < keys.length; i++) {
        if (item.children === undefined || item.children[keys[i]] === undefined) return;
        item = item.children[keys[i]];
      }
      var strKey = (PREFIX + name).toUpperCase();
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

    get: function (name) {
      var keys = name.split(".");
      if (keys.length === 0) return;
      var item = configs[keys[0]];
      if (item === undefined) return;
      for (var i = 1; i < keys.length; i++) {
        if (item.children === undefined || item.children[keys[i]] === undefined) return;
        item = item.children[keys[i]];
      }
      var strKey = (PREFIX + name).toUpperCase();
      data.hasOwnProperty(strKey) || (data[strKey] = localStorage.getItem(strKey));
      if (typeof item.default === "string" && data[strKey] === null) {
        return item.default;
      }
      return data[strKey];
    },

    refresh: function (name) {
      var keys = name.split(".");
      if (keys.length === 0) return;
      var item = configs[keys[0]];
      if (item === undefined) return;
      for (var i = 1; i < keys.length; i++) {
        if (item.children === undefined || item.children[keys[i]] === undefined) return;
        item = item.children[keys[i]];
      }
      settings.set(name, settings.get(name, item.default));
    },

    onChange: function (name, handler) {
      var keys = name.split(".");
      if (keys.length === 0) return;
      var item = configs[keys[0]];
      if (item === undefined) return;
      for (var i = 1; i < keys.length; i++) {
        if (item.children === undefined || item.children[keys[i]] === undefined) return;
        item = item.children[keys[i]];
      }
      if (typeof handler !== "function") return;
      var strKey = (PREFIX + name).toUpperCase();
      handler(settings.get(name, item.default));
      if (events[strKey] === undefined) {
        events[strKey] = [handler];
      } else {
        events[strKey].push(handler);
      }
    }
  };
  global.settings = settings;
})(window);
