import type { APIRoute } from "astro";
import { absoluteUrl, isStaging } from "../lib/site";

// Staging is for checking changes, not for search results
export const GET: APIRoute = () =>
    new Response(
        isStaging
            ? "User-agent: *\nDisallow: /\n"
            : `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`,
        { headers: { "Content-Type": "text/plain" } },
    );
