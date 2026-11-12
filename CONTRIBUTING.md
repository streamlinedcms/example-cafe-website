# Development Guide

How the Wrenwick Roast House example site is built, deployed and made editable.

## Node Version

The Node version is set in one place, `.nvmrc`, and every GitHub workflow reads it from
there. Run `nvm use` to switch to it.

`package.json` declares the minimum version in `engines.node`, and `.npmrc` sets
`engine-strict=true`, so `npm ci` refuses to install on an older Node. That is deliberate:
when a dependency (Wrangler, for example) starts needing a newer Node, the install fails
straight away, locally and in CI, instead of only warning and breaking a deploy later. To
move to a newer Node, change `.nvmrc` and `engines.node` together.

## Deploying

GitHub Actions is the only way the site is deployed. Every push to `develop` deploys to
staging, and every push to `master` deploys the live site, so `master` only changes through
a pull request from `develop`, after the CI checks pass. There are no `deploy` npm scripts:
uploading from a laptop would skip those checks.

|                          | Staging                                  | Live                              |
| ------------------------ | ---------------------------------------- | --------------------------------- |
| Branch                   | `develop`                                | `master`                          |
| Cloudflare Pages project | `example-cafe-website-staging`           | `example-cafe-website-live`       |
| Address                  | https://cafe-staging.streamlinedcms.com  | https://cafe.streamlinedcms.com   |
| GitHub environment       | `staging`                                | `production`                      |

Staging is `cafe-staging`, not `staging.cafe`: Cloudflare's free certificate for
`streamlinedcms.com` covers one level of subdomain, so a second level wouldn't load over
HTTPS.

### One-time setup

**Cloudflare Pages projects.** Create both from the command line, naming the production
branch. A project created in the dashboard defaults its production branch to `main`, and
every deploy then lands on a preview address instead of the site. Run each with a
Cloudflare API token that can edit Pages, set for that one command:

```bash
CLOUDFLARE_API_TOKEN=<personal token> npx wrangler pages project create example-cafe-website-staging --production-branch develop
CLOUDFLARE_API_TOKEN=<personal token> npx wrangler pages project create example-cafe-website-live --production-branch master
```

Then attach the custom domains in each project's settings: `cafe-staging.streamlinedcms.com`
on staging and `cafe.streamlinedcms.com` on live.

**GitHub environments.** `staging` and `production` each need a `CLOUDFLARE_ACCOUNT_ID`
variable and a `CLOUDFLARE_API_TOKEN` secret, and `production` only deploys from `master`:

```bash
gh api -X PUT repos/streamlinedcms/example-cafe-website/environments/staging
gh api -X PUT repos/streamlinedcms/example-cafe-website/environments/production \
    -F 'deployment_branch_policy[protected_branches]=false' \
    -F 'deployment_branch_policy[custom_branch_policies]=true'
gh api -X POST repos/streamlinedcms/example-cafe-website/environments/production/deployment-branch-policies \
    -f name=master -f type=branch
gh variable set CLOUDFLARE_ACCOUNT_ID --env staging --body <account id>
gh variable set CLOUDFLARE_ACCOUNT_ID --env production --body <account id>
gh secret set CLOUDFLARE_API_TOKEN --env staging
gh secret set CLOUDFLARE_API_TOKEN --env production
```

**Streamlined CMS app.** Create the app at [app.streamlinedcms.com](https://app.streamlinedcms.com),
and put its App ID in `PUBLIC_SCMS_APP_ID` in `.env`. Until it's there, every build stops
and names the missing value. Editing on the live domain
needs the app on a paid plan; the free plan only works on `localhost`.

### Emergency manual deploy

Only for when GitHub Actions is unavailable. It skips the pull request and the CI checks, so
build from a clean, up-to-date checkout of the right branch. It needs
`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in `.env.local` (see `.env.local.example`).

```bash
git switch master && git pull
npm ci && npm run build
set -a; . ./.env.local; set +a
npx wrangler pages deploy dist --project-name example-cafe-website-live --branch master
```

For staging, use `develop`, build with `npx astro build --mode staging`, and deploy to
`example-cafe-website-staging` with `--branch develop`.

Use the credentials in `.env.local`, not a token already set in your shell, which may be
read-only. Always pass `--branch` with the project's production branch: without it,
Wrangler uses the current git branch, and the upload can land on a preview address while
the site stays unchanged.

## Settings

The site's public settings are in committed files, since they end up in the built pages
anyway, and each is named `PUBLIC_*` to say so:

- `.env`: the Streamlined CMS app ID and the SDK and API addresses. Every build reads it:
  the live site, staging and the dev server all use the same app.
- `.env.production` and `.env.staging`: only the site's address (`PUBLIC_SITE_URL`), which
  is the one thing that differs. `npm run build` reads `.env.production`;
  `astro build --mode staging` and `npm run dev` read `.env.staging`.

Each setting is declared as required in `env.schema` in `astro.config.js`, so a missing one
stops the build with its name. Read them from `astro:env/client`. Secrets (only the
Cloudflare credentials for an emergency deploy) go in `.env.local`, which is never
committed.

## File Structure

- `src/pages/`: one file per page (`menu.astro` is `/menu/`), plus `404.astro`,
  `robots.txt.ts` and `sitemap.xml.ts`
- `src/layouts/Layout.astro`: the page shell: meta tags, fonts, the CMS script, the header
  and footer
- `src/components/`: the header, footer, and the pieces used on more than one page
  (`Hours`, `SeasonalList`, `MenuSection`)
- `public/images/logo.svg` and `logo-light.svg`: the round stamp logo, dark for the header
  and light for the footer. The favicons in `public/` are a simpler version of it, since
  the lettering is unreadable at icon sizes.
- `src/lib/business.ts`: the café's name, address, phone number, hours and the menu links
- `src/lib/site.ts`: the site's address, and whether this is a staging build
- `src/styles/global.css`: Tailwind, the colours and fonts, and a few shared classes
- `public/images/`: every photo (see [Images](#images))
- `docs/stock-photos.md`: where each photo came from

Link to pages with a trailing slash (`/menu/`). That's the address Cloudflare Pages serves,
and the dev server returns a 404 for `/menu` because `trailingSlash` is `"always"` in
`astro.config.js`, so a missing slash shows up locally.

## Styling

Tailwind, set up in `src/styles/global.css`. The colours are named for what they look
like on a printed menu: `paper`, `kraft`, `kraft-deep`, `ink`, `ink-soft`, `rust`,
`rust-dark` and `sea`. Headings use Fraunces (`font-serif`), everything else Inter
(`font-sans`). Both are installed as `@fontsource-variable` packages and served with the
site; don't load fonts from Google Fonts or another CDN, which sends every visitor's
address to a third party.

Shared classes: `label` (small capitals for labels), `rule-double` (the double-line
divider), `kraft` (the paper texture) and `prose-cafe` (styles for rich text from the CMS).
See [DESIGN.md](DESIGN.md) for the design's thinking.

## CMS Integration

Content is made editable with `data-scms-*` attributes. How they work is in the
[Streamlined CMS integration guide](https://streamlinedcms.github.io/client-sdk/docs/INTEGRATION).
This site's conventions:

- **Each page's content is in its own `page-<name>` group** on `<main>` (`page-menu`).
- **Shared groups hold what must match everywhere:**
    - `contact-details`: the street, town and phone number (footer, home, Visit)
    - `hours`: the opening hours and the holiday note (home, Visit)
    - `seasonal`: the seasonal specials list (home, menu), from `SeasonalList.astro`
    - `company`: the footer tagline
- **Lists the owner adds to are templates:** each menu section (`menu-espresso`,
  `menu-brewed`, `menu-tea`, `menu-bakery`), the seasonal specials, the testimonials, the
  events and the team. Every item in a template must have identical markup, so differences
  between items come from CSS: the receipt numbers on the home page come from a CSS
  counter, and the tilt of each team snapshot from `nth-of-type`.
- **Prices keep the `$` outside the editable**, so the owner only types the number.
- **The starting copy in code stops mattering once something is edited.** After the owner
  edits a list, the CMS holds the real items, and changing the array in the page's code no
  longer shows.
- **Never editable:** the menu links in the header and footer (while someone is signed in,
  an editable link opens the editor instead of its page, so the menu would stop working),
  the copyright year (an editable year would be saved and then never change), and the note
  that this is a fictional café.
- **Don't position editables.** Put `absolute` or similar on a wrapper and keep the
  editable inside unpositioned, as with the bag label over the home page photo: in edit
  mode the CMS makes every editable `position: relative`.

### Before renaming or removing a CMS ID

Saved content is stored by group and ID. Rename or remove one in the markup, and whatever
was saved under it stops showing, silently. Check what's saved first, at
`https://api.streamlinedcms.com/v1/apps/<app id>/content` (a public GET), and carry anything
that would be lost into the code as the new starting copy.

## Images

Every photo is editable, so every photo lives in `public/images/` at a fixed address:
saving any change to an image in the CMS, even only its alt text, stores its address, and
an address that later changed would leave a broken image. For the same reason they aren't
processed by Astro, and have no `srcset` (the CMS changes an image's `src` but not its
`srcset`, so visitors would keep seeing the old picture).

Size each photo to about twice the widest it's shown, so it stays sharp on high-density
screens. To replace one in the code, add the new file under a new name and leave the old
one in place, since saved content may still point at it.

The team photos are hands at work, never faces: the people on the site are fictional, so
no real person should appear as one of them.

## Code Formatting

Run Prettier before committing (CI checks it):

```bash
npm run format
```

### Spaces between text and tags

Astro removes the line break between a line of text and a tag on the next line, the way JSX
does, so the two run together on the page. Where text meets a link, a `<span>` or a
component across a line break, put the space in explicitly with `{" "}`.
