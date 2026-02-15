import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { localeConfig } from "./config/locale";
import { sidebarConfig } from "./config/sidebar";

import react from "@astrojs/react";

const urlHandler = (url: string) => {
  if (url.endsWith("/")) {
    url += "index.html";
  } else if (!url.endsWith(".html")) {
    url += ".html";
  }
  return url;
};

let siteUrl = process.env.PUBLIC_SITE_URL || "http://localhost:4321";
if (!siteUrl.endsWith("/")) {
  siteUrl += "/";
}

const site = new URL(siteUrl);

export default defineConfig({
  site: site.origin,
  base: site.pathname,
  trailingSlash: "never",
  redirects: {
    "/contribution": "/guides/contribution.html",
    "/crash-support-group": "/guides/crash-support-group.html",
    "/faq": "/guides/faq.html",
    "/groups": "/guides/groups.html",
    "/help": "/guides/help.html",
    "/downloads/hmcl-snapshot-update": {
      status: 302,
      destination: "https://hmcl-snapshot-update.netlify.app",
    },
    "/downloads/loongnix": "/downloads/linux/loongarch64.html",
    "/launcher/fabric_and_optifine_install": "/launcher/fabric-and-optifine-install.html",
    "/launcher/global-version-isolation": "/launcher/isolation.html",
  },
  output: "static",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: localeConfig.defaultLocale,
        locales: Object.fromEntries(
          Object.entries(localeConfig.locales).map(([locale, config]) => [locale, config!.lang!])
        ),
      },
      filter: (page) =>
        !["changelog/dev", "changelog/stable"].includes(page.slice(site.href.length)),
      serialize(item) {
        if (Array.isArray(item.links)) {
          for (const linkItem of item.links) {
            linkItem.url = urlHandler(linkItem.url);
          }
        }
        item.url = urlHandler(item.url);
        return item;
      },
    }),
    starlight({
      title: {
        "zh-Hans": "HMCL 文档",
        "zh-Hant": "HMCL 文檔",
        en: "HMCL Documentation",
      },
      components: {
        Banner: "./src/components/starlight/Banner.astro",
        PageTitle: "./src/components/starlight/PageTitle.astro",
        Footer: "./src/components/starlight/Footer.astro",
      },
      routeMiddleware: "./src/routeData.ts",
      editLink: {
        baseUrl: "https://github.com/HMCL-dev/HMCL-docs/edit/main",
      },
      defaultLocale: "root",
      locales: localeConfig.locales,
      sidebar: sidebarConfig,
      logo: {
        src: "./src/assets/image/hmcl.png",
        alt: "HMCL Logo",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/HMCL-dev/HMCL",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/jVvC7HfM6U",
        },
      ],
      customCss: ["./src/assets/landing.css"],
      lastUpdated: true,
      favicon: "/favicon.ico",
      credits: true,
    }),
    react(),
  ],
  build: {
    format: "file",
  },
});
