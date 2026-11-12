# Wrenwick Roast House

An example website for [Streamlined CMS](https://streamlinedcms.com): a small coffee roaster
and café on Harbor Street in Wrenwick, Oregon. The café, the town and everyone on the site
are fictional.

It's a plain static site built with [Astro](https://astro.build). Streamlined CMS adds one
script tag to the page's `<head>` and a few `data-scms-*` attributes to the parts that can
be edited. With those, the owner changes the menu, prices, hours, events, team and photos
right on the page, with no rebuild and no admin dashboard.

See it live at https://wrenwickroasthouse.com.

## Try it with your own Streamlined CMS app

You can run this site on your computer and edit it yourself, free:

1. **Get the code.** You'll need [Node](https://nodejs.org) (the version in `.nvmrc`;
   `nvm use` picks it).

    ```bash
    git clone https://github.com/streamlinedcms/example-cafe-website.git
    cd example-cafe-website
    npm ci
    ```

2. **Create an app.** Sign up at [app.streamlinedcms.com](https://app.streamlinedcms.com)
   (the free plan needs no card and works on `localhost`), create an app, and copy its
   **App ID**.

3. **Use your App ID.** Open `.env` and put it after `PUBLIC_SCMS_APP_ID=`:

    ```
    PUBLIC_SCMS_APP_ID=your-app-id
    ```

4. **Run it.**

    ```bash
    npm run dev
    ```

    Open http://localhost:4321, scroll to the footer and click **Sign in**.

5. **Edit.** Click any heading, price or paragraph and type. Double-click a photo to replace
   it. In the menu, select an item to add, move or delete items. Save, sign out and reload:
   your changes are there for every visitor.

Your app starts empty, so you begin from the copy in this repo, and what you save goes to
your app only. Nothing you do changes the live Wrenwick site.

## How it's made editable

Everything Streamlined CMS needs is in the HTML:

- **The script tag** is in `src/layouts/Layout.astro`, with the App ID from `.env`.
- **Editable text, images and links** carry `data-scms-text`, `data-scms-image` and
  `data-scms-href`. Start with `src/pages/index.astro`.
- **Lists the owner can add to** (each menu section, the events, the team) carry
  `data-scms-template`. See `src/components/MenuSection.astro`.
- **Content that must match on every page** (the address, opening hours, seasonal specials)
  sits in a shared `data-scms-group`. See `src/components/Hours.astro`.

The [integration guide](https://streamlinedcms.github.io/client-sdk/docs/INTEGRATION)
explains each attribute. [CONTRIBUTING.md](CONTRIBUTING.md) has this site's own conventions,
and [DESIGN.md](DESIGN.md) its design brief.

## Commands

```bash
npm run dev         # dev server at http://localhost:4321
npm run build       # production build into dist/
npm run preview     # build, then serve dist/
npm run typecheck   # type check the Astro files
npm run format      # format with Prettier
```

## Deploying

This repo's own site deploys to Cloudflare Pages through GitHub Actions. See
[CONTRIBUTING.md](CONTRIBUTING.md#deploying).
