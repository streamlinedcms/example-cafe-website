# Wrenwick Roast House

An example website for [Streamlined CMS](https://streamlinedcms.com): a small coffee roaster
and café on Harbor Street in Wrenwick, Oregon. The café, the town and everyone on the site
are fictional.

It's a plain static site built with [Astro](https://astro.build). Streamlined CMS is one
script tag in the page's `<head>` plus `data-scms-*` attributes on the parts that can be
edited, so the owner can change the menu, prices, hours, events, team and photos right on
the page, without a rebuild.

- Live: https://cafe.streamlinedcms.com
- Staging: https://cafe-staging.streamlinedcms.com

## Running it

Needs the Node version in `.nvmrc` (`nvm use`).

```bash
npm ci
npm run dev       # http://localhost:4321, using .env.staging
npm run build     # production build into dist/
npm run preview   # build, then serve dist/
```

The dev server uses the same Streamlined CMS app as the live site, so signing in on it
edits the live site.

## Deploying

GitHub Actions deploys every push: `develop` to staging, `master` to the live site, both on
Cloudflare Pages. See [CONTRIBUTING.md](CONTRIBUTING.md) for how the site is put together.
