---
layout: null
---
(function (global) {
  var config = {};
  config.locale = document.documentElement.lang + "";
  config.baseurl = "{{ '/' | relative_url }}";
  config.settings = /*{%comment%}*/{}/*{%endcomment%}*//**{{'/'}}{{ site.data.settings | jsonify }}/**/;
  config.i18n = {};
  config.i18n.default = /*{%comment%}*/{};/*{%endcomment%}*//**{{'/'}}{{ site.data.plugins.i18n.ui-text | jsonify }};
  {% for locale in site.locales %}
  {% assign data = site.data.plugins.i18n | i18n: locale, "ui-text" %}
  config.i18n["{{ data.locale }}"] = {{ data.data | jsonify }}
  {% endfor %}
  /**/
  global.config = config;
})(window);
