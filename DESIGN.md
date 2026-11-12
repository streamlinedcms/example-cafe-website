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
- **2026-11-11:** Staging is `cafe-staging.streamlinedcms.com`, because Cloudflare's free
  certificate doesn't cover a second-level subdomain like `staging.cafe`.
