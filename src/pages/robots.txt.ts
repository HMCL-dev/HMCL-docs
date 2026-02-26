import type { APIRoute } from "astro";

let siteUrl: string = import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321";
if (!siteUrl.endsWith("/")) {
  siteUrl += "/";
}

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: \/\n\nSitemap: ${siteUrl}sitemap-index.xml\n`, {
    headers: {
      "content-type": "text/plain",
    },
  });
