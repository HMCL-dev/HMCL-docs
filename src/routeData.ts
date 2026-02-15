import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { getCollection } from "astro:content";

const compareVersion = (v1: string, v2: string) => {
  const a1 = v1.split(".").map(Number);
  const a2 = v2.split(".").map(Number);

  const len = Math.max(a1.length, a2.length);

  for (let i = 0; i < len; i++) {
    const n1 = a1[i] || 0;
    const n2 = a2[i] || 0;

    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }

  return 0;
};

export const onRequest = defineRouteMiddleware(async (context) => {
  const { starlightRoute } = context.locals;
  const { entry, lang } = starlightRoute;
  if (
    entry.filePath.startsWith("src/content/docs/changelogs/") ||
    entry.filePath.startsWith(`src/content/docs/${lang.toLowerCase()}/changelogs/`)
  ) {
    const filename = entry.filePath.split("/").pop() as string;
    const channel = filename.split(".")[0] as string;
    const changelogs = await getCollection(
      "changelogs",
      (entry) =>
        entry.rendered !== undefined &&
        entry.filePath !== undefined &&
        entry.filePath.includes(`/${channel}/`)
    );

    const list = changelogs
      .map((changelog) => {
        const filePath = changelog.filePath!.split("/") as string[];
        const rootVersion = filePath[filePath.length - 2] as string;
        const version = filePath[filePath.length - 1].slice(0, -3) as string;
        return {
          rootVersion,
          version,
          html: changelog.rendered!.html,
        };
      })
      .sort((itemA, itemB) => -compareVersion(itemA.version, itemB.version));

    starlightRoute.entry.data.changelogs = list;
    starlightRoute.toc = {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
      items: [
        {
          depth: 2,
          slug: "_top",
          text: context.locals.t("tableOfContents.overview"),
          children: [],
        },
        ...Object.entries(Object.groupBy(list, (item) => item.rootVersion)).map(
          ([rootVersion, versions]) => {
            return {
              depth: 2,
              slug: `HMCL-${rootVersion}`,
              text: rootVersion,
              children: (versions || []).map(({ version }) => ({
                depth: 3,
                slug: `HMCL-${version}`,
                text: version,
                children: [],
              })),
            };
          }
        ),
      ],
    };
  }
});
