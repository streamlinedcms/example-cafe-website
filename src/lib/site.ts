import { PUBLIC_SITE_URL } from "astro:env/client";

// The deploy's public address, from PUBLIC_SITE_URL in .env.production or .env.staging
export const siteUrl = PUBLIC_SITE_URL.replace(/\/$/, "");

// Pages are served at /page/, and /page redirects there. Canonical tags and social
// previews use the /page/ form, the address that loads without a redirect. Files
// (/images/card.jpg) keep theirs.
export const absoluteUrl = (path: string) => {
    const isFile = /\.[a-z0-9]+$/i.test(path);
    return new URL(isFile || path.endsWith("/") ? path : `${path}/`, `${siteUrl}/`).toString();
};
