import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const localeConfig = {
  defaultLocale: "root",
  locales: {
    root: { label: "简体中文", lang: "zh-Hans", dir: "ltr" },
    "zh-hant": { label: "繁體中文", lang: "zh-Hant", dir: "ltr" },
    en: { label: "English", lang: "en", dir: "ltr" },
  } satisfies StarlightUserConfig["locales"],
};
