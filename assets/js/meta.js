(() => {
  const pageTitle = document.getElementById("page-title");
  if (pageTitle === null) return;
  const header = pageTitle.parentElement;
  let metas = header.getElementsByClassName("page__meta")[0];
  if (metas === null) {
    metas = document.createElement("div");
    element.className = "page__meta";
    header.append(element);
  }
  window.appendMeta = (text, icon) => {
    if (metas.children.length > 0) {
      const sep = document.createElement("span");
      sep.className = "page__meta-sep";
      metas.append(sep);
    }
    const meta = document.createElement("span");
    if (icon !== undefined) {
      const metaIcon = document.createElement("i");
      metaIcon.className = icon;
      meta.append(metaIcon, " ");
    }
    meta.append(text.trim());
    metas.append(meta);
  };
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
})();
