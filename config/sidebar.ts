import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const sidebarConfig = [
  {
    label: "新手导航",
    translations: {
      "zh-Hant": "新手導航",
      en: "Guides",
    },
    autogenerate: { directory: "guides" },
  },
  {
    label: "启动器",
    translations: {
      "zh-Hant": "啟動器",
      en: "Launcher",
    },
    autogenerate: { directory: "launcher" },
  },
  {
    label: "整合包",
    translations: {
      "zh-Hant": "整合包",
      en: "Modpack",
    },
    autogenerate: { directory: "modpack" },
  },
  {
    label: "多人联机",
    translations: {
      "zh-Hant": "多人聯機",
      en: "Multiplayer",
    },
    autogenerate: { directory: "multiplayer" },
  },
  {
    label: "用户协议",
    translations: {
      "zh-Hant": "用戶協議",
      en: "EULA",
    },
    autogenerate: { directory: "eula" },
  },
  {
    label: "更新日志",
    translations: {
      "zh-Hant": "更新日誌",
      en: "Changelogs",
    },
    autogenerate: { directory: "changelogs" },
  },
] satisfies StarlightUserConfig["sidebar"];
