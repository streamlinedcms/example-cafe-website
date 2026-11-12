import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    // Pages are served at /page/ (Cloudflare Pages redirects /page there), so the dev
    // server uses the same form
    trailingSlash: "always",
    integrations: [icon()],
    // Public settings from .env.production (builds) or .env.staging (staging builds and
    // the dev server). Each is required, so a missing one stops the build instead of
    // shipping a site nobody can sign in to or that links to the wrong address.
    env: {
        schema: {
            PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", url: true }),
            PUBLIC_SCMS_APP_ID: envField.string({ context: "client", access: "public" }),
            PUBLIC_SCMS_SDK_URL: envField.string({
                context: "client",
                access: "public",
                url: true,
            }),
            PUBLIC_SCMS_API_URL: envField.string({
                context: "client",
                access: "public",
                url: true,
            }),
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
