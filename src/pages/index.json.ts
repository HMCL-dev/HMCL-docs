import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const docs = await getCollection("docs").then((docs) =>
  docs.filter((doc) => doc.filePath !== undefined)
);

const modpack = docs.filter((doc) => doc.filePath!.includes("/modpack/"));
const launcher = docs.filter((doc) => doc.filePath!.includes("/launcher/"));

export const GET: APIRoute = () => {
  return Response.json([
    {
      title: "整合包",
      items: modpack.map((item) => ({
        title: item.data.title,
        subtitle: item.data.description || "",
        url: `https://docs.hmcl.net/${item.id}/`,
      })),
    },
    {
      title: "启动器",
      items: launcher.map((item) => ({
        title: item.data.title,
        subtitle: item.data.description || "",
        url: `https://docs.hmcl.net/${item.id}/`,
      })),
    },
  ]);
};
