import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/site";

// Every page, found from the files in src/pages. Pages that shouldn't turn up in
// search are listed in `excluded`.
const excluded = new Set(["/404"]);

const pages = Object.keys(import.meta.glob("./**/*.astro"))
    .map(
        (file) =>
            file
                .replace(/^\.\//, "/")
                .replace(/\.astro$/, "")
                .replace(/\/?index$/, "") || "/",
    )
    .filter((path) => !excluded.has(path));

export const GET: APIRoute = () => {
    const urls = pages
        .sort()
        .map((path) => `    <url><loc>${absoluteUrl(path)}</loc></url>`)
        .join("\n");
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
        { headers: { "Content-Type": "application/xml" } },
    );
};
