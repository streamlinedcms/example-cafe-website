import { PUBLIC_SITE_URL } from "astro:env/client";

// The deploy's public address, from PUBLIC_SITE_URL in .env.production or .env.staging
export const siteUrl = PUBLIC_SITE_URL.replace(/\/$/, "");

// Staging builds (`astro build --mode staging`) ask search engines not to index them
export const isStaging = import.meta.env.MODE === "staging";

// Pages are served at /page/, and /page redirects there. Canonical tags, social
// previews and the sitemap use the /page/ form, so search engines see the address
// that loads without a redirect. Files (/images/card.jpg, /sitemap.xml) keep theirs.
export const absoluteUrl = (path: string) => {
    const isFile = /\.[a-z0-9]+$/i.test(path);
    return new URL(isFile || path.endsWith("/") ? path : `${path}/`, `${siteUrl}/`).toString();
};
