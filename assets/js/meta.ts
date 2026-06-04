---
layout: null
---

/// <reference lib="dom" />
/// <reference types="jquery" />

interface Window {
  $: JQueryStatic;
  appendMeta: (text: string, icon: string) => void;
  hits: (tag: string) => void;
  settings: {
    get: (key: string) => string;
  };
}

(() => {
  const $header = $("#main article.page div.page__inner-wrap > header");
  if ($header.length !== 0) {
    let $metas = $header.children(".page__meta");
    if (!$metas.length) {
      $metas = $('<div class="page__meta"></div>');
      $header.append($metas);
    }
    window.appendMeta = (text, icon) => {
      if ($metas.children().length !== 0) {
        $metas.append('<span class="page__meta-sep"></span>');
      }
      const $meta = $("<span>");
      if (icon) {
        $meta.append($("<i>").addClass(icon), " ");
      }
      $meta.append(text.trim());
      $metas.append($meta);
    };
    window.hits = (tag) => {
      if (window.settings.get("miscellaneous_hits") === "disable") return;
      const hitsUrl = new URL("https://hits.zkitefly.eu.org");
      hitsUrl.searchParams.set("tag", tag);
      fetch(hitsUrl, { method: "HEAD" }).then((response) => {
        if (response.status !== 200) return;
        const { headers } = response;
        const total = headers.get("X-Total-Hits");
        const today = headers.get("X-Today-Hits");
        if (total !== null && today !== null) {
          window.appendMeta(today + " / " + total, "far fa-eye");
        }
      });
    };
  }
})();
