import type { APIRoute } from "astro";

// Crawlers are let in on purpose: every page carries a noindex tag (see Layout.astro), and
// a crawler that's blocked here never reads it, so a page other sites link to could
// still turn up in results as a bare address.
export const GET: APIRoute = () =>
    new Response("User-agent: *\nAllow: /\n", { headers: { "Content-Type": "text/plain" } });
