# Design

## Brief

Wrenwick Roast House is a fictional independent café that roasts its own coffee, in a small
coastal town in Oregon. The site exists to show Streamlined CMS on a believable small
business, in demo videos and for developers who want to see the code behind them.

**What it has to show off:** every kind of everyday edit a café owner makes. Changing the
home page headline and photo; adding, reordering and deleting menu items and prices;
seasonal specials; opening hours and holiday hours (often from a phone); events; the team;
and customer quotes.

**Pages:** Home, Menu, Events, About (story and team), Visit (address, hours, directions).
No shop for coffee beans, since the café can't take real payments.

**Who it's for:** viewers of the Streamlined CMS videos, and developers checking how little
code the CMS needs. The repo is public for that reason.

**Constraints:**

- Clearly fictional: a made-up town and street, a 555 phone number, an `.example` email
  address, and a note in the footer saying it's an example site. No real business names.
- American English and US dollar prices.
- No faces on the team page: the people are fictional, so the photos are hands at work.
- No contact form, map embed or analytics, so nothing on the site talks to a third party
  except Streamlined CMS itself, and no privacy page is needed.

## Look

**Concept: a printed menu card and a roaster's label.** The design should look like good
print design for a small roaster, not a website template. What makes it distinctive is the
layout and typography, not interactive effects: everything is static.

- **Grid:** asymmetric twelve-column layouts with photos offset into the grid, rather than
  stacked full-width blocks or rows of three identical cards.
- **Type:** Fraunces for headings (a soft, slightly irregular serif, with italics for menu
  sections and names), Inter for everything else, and small capitals with wide spacing for
  labels, like the printing on a coffee bag.
- **Colour:** cream paper and espresso ink, with kraft paper for highlighted panels, a
  muted rust for links and labels, and a deep sea green for one band on the home page.
- **Print details:** double rules as section dividers, dotted leaders between menu items
  and prices, a round roaster's stamp as the logo, a coffee bag label over the home page
  photo, receipts for customer quotes, snapshots for the team.
- **Texture sparingly:** a faint paper grain on kraft panels, and nothing else.

## Decisions

- **2026-11-11:** Named Wrenwick Roast House after its town, Wrenwick, Oregon. "Half Moon
  Roasters" and "Thistledown" belong to real roasters; "Ember & Oak" is a name AI site
  builders keep generating.
- **2026-11-11:** Photos are Unsplash placeholders (see `docs/stock-photos.md`), to be
  replaced by AI-generated images made for the site.
- **2026-11-11:** The menu is a printed card in two columns, each section a list the owner
  can add to, reorder and delete from. The seasonal specials are one list shown on both the
  home page and the menu.
- **2026-11-11:** A drawn map on the Visit page instead of a Google Maps embed: the address
  is fictional, and an embed would load Google's scripts for every visitor.
- **2026-11-11:** No structured data (JSON-LD) for a local business, so search engines don't
  list a café that doesn't exist.
- **2026-11-12:** No page is indexed by search engines, on the live site as well as
  staging: someone searching for a café shouldn't find a convincing fake one. People
  reach the site from the videos, Streamlined CMS's own site and the GitHub repo instead.
  Every page has a noindex tag and every response an `X-Robots-Tag: noindex` header, and
  `robots.txt` still lets crawlers in, since a blocked crawler never sees the noindex.
  There's no sitemap.
- **2026-11-12:** The live site's main address is `wrenwickroasthouse.com`, so in the videos
  it reads as an ordinary business site on its own domain, not something hosted by
  Streamlined CMS. It's also served at `cafe.streamlinedcms.com`, a short address for
  Streamlined CMS's own marketing, but canonical links and link previews always name
  `wrenwickroasthouse.com`. With every page kept out of search results, serving both
  doesn't create duplicate listings.
- **2026-11-12:** Staging is `cafe.staging.streamlinedcms.com`, following the
  `<site>.staging.<domain>` convention. Pages issues its own certificate for each custom
  domain, so the second level of subdomain is fine.
