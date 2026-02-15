import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { defineCollection, z } from "astro:content";
import { parse as parseCsv } from "csv-parse/sync";
import { file, glob } from "astro/loaders";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        contributors: z.array(z.string()).optional(),
        changelogs: z
          .array(
            z.object({
              rootVersion: z.string(),
              version: z.string(),
              html: z.string(),
            })
          )
          .optional(),
        autoRedirect: z
          .object({
            delay: z.number(),
            text: z.string(),
            href: z.string(),
          })
          .optional(),
      }),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        "page.contributors": z.string(),
        "page.hits.label": z.string(),
        "page.hits.today": z.string(),
        "page.hits.total": z.string(),
        "page.hits.ok": z.string(),
        "page.hits.error": z.string(),
        "page.hits.loading": z.string(),
      }),
    }),
  }),
  changelogs: defineCollection({
    loader: glob({
      pattern: ["**/*.md"],
      base: "src/content/changelogs",
    }),
    schema: z.object({}),
  }),
  groups: defineCollection({
    loader: file("src/data/groups.csv", {
      parser: (text) => parseCsv(text, { columns: true, skipEmptyLines: true }),
    }),
    schema: z.object({
      id: z.string(),
      name: z.string(),
      link: z.string(),
      status: z.string(),
    }),
  }),
};
