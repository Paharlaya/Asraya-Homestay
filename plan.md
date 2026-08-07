# Asraya Homestay — Website Revamp

**Final build plan.** Hand-written static site (HTML + CSS + JS, no framework, no build step), deployed to GitHub Pages.

**Repo:** https://github.com/Paharlaya/Asraya-Homestay (public)
**Live:** https://paharlaya.github.io/Asraya-Homestay/ *(Pages verified working)*
**Replacing:** https://asrayahomestay.com/ *(untouched until you say so — see §12)*

---

## 0. Locked decisions

| Decision | Answer |
|---|---|
| Navigation | **5 items** — Home · About · Rooms · Gallery · Contact |
| Header button | **CALL NOW**, black + gold pill → `tel:+919564827858` |
| Removed | The old "Contact Us" button — it duplicated the Contact nav item |
| All forms | Submit to **WhatsApp** → `wa.me/919564827858` (no backend needed) |
| Floating button | WhatsApp, bottom-right, **black + gold** to match the nav pill |
| Room copy | **Written fresh per room** from what's actually in each photo |
| Palette | White · rich gold · black |
| Pages | 5 HTML files + 404 |

---

## 1. Content audit

I read all five live pages, including the Facilities page you're dropping.

### Brand facts
| Field | Value |
|---|---|
| Name | Asraya Homestay |
| Address | Vallima Cottage 3, Hooker Road, Darjeeling 734101, India |
| Email | asraya.homestay@gmail.com |
| Phones | +91 9564827858 *(primary — call + WhatsApp)* · +91 9002153003 · +91 7699183995 |
| Position | Above Happy Valley Tea Estate, below Shrubbery Nightingale Park |
| Concept | Hollywood — rooms named for actors with Darjeeling roots |

### Copy carried over verbatim

**Hero**
> Your Gateway to Relaxation
> Welcome to Darjeeling: Where Nature Meets Tranquility

**About Darjeeling**
> Darjeeling, known as the 'Queen of the Hills,' is famous for its breathtaking landscapes and vibrant culture. With a rich tradition of music and a legacy of Hollywood actors originating from this charming town, Darjeeling exudes an artistic spirit. Inspired by this cultural heritage, 'Asraya' homestay embraces a Hollywood theme, offering a unique and memorable experience amidst the beauty of the hills.

**About Asraya**
> Asraya is a charming homestay nestled away from the crowded part of town, perfectly situated above the Happy Valley Tea Estate and below Shrubbery Nightingale Park. Our beautiful, cozy rooms offer panoramic views of the valley, hills, and the picturesque tea gardens surrounding Darjeeling. Enjoy a serene and tranquil stay with us, surrounded by nature's beauty.

**Tea gardens**
> Darjeeling is renowned for its sprawling tea estates that carpet the hillsides in vibrant shades of green. Take a leisurely stroll through the fragrant tea gardens, where you can witness firsthand the meticulous process of tea cultivation and sample the finest Darjeeling tea, celebrated worldwide for its exquisite flavor.

**Meals** — vegetarian home-cooked meals from locally sourced, fresh ingredients, emphasising hygiene and authentic regional culinary traditions.

**Facilities (4):** Attached Bathroom · Attached Balcony · Open Meditation Space · Spacious Location
**Amenities (6):** High-speed internet access · Flat-screen TVs · In-room dining options · Private balcony or terrace · Plush bedding · Elegant furnishings
**Headings kept:** Contact Info · Address · Email Us · Call Us · Book your Stay · Get In Touch
**Footer:** Privacy · Terms & Conditions · Accessibility Notice

### The four generic paragraphs — repurposed, not discarded

The old site put four interchangeable paragraphs under the four room names. None described its room. They're good *general* copy, so they move to where general copy belongs:

| Was under | Now used as |
|---|---|
| Erick Avari | Rooms page intro paragraph |
| Vivien Leigh | About page — "tastefully decorated…" hospitality block |
| Sylvia Coleridge | Rooms page — shared amenities strip intro |
| Anna Kashfi | Homepage rooms-preview intro |

### Audit findings
- **Facilities page is empty** — literally "Coming Soon". Dropping it loses nothing; its 4 real facilities live on About.
- **No prices** anywhere on the live site.
- **No testimonials, check-in/out times, map, or social links** exist. I won't invent them.
- `gallerypic2` and `gallerypic3` are **byte-identical duplicates** (same md5) → 8 unique gallery photos, not 9.

---

## 2. Image inventory → new names

13 files, **12 unique**. I opened every one; this is what's actually in frame.

| Current | Size | Contents | New path |
|---|---|---|---|
| `gallerypic5.jpeg` | 1280×960 | **Balcony at golden hour** — two chairs, table, hillside town, gold light | `hero/balcony-golden-hour.jpg` |
| `gallerypic1.jpeg` | 2560×1920 | Balcony, valley + tea gardens, patterned tile, blue sky | `gallery/valley-tea-view.jpg` |
| `gallerypic9.jpeg` | 2560×1920 | **Exterior at dusk** — lit saffron cottage, town lights below | `gallery/exterior-dusk.jpg` |
| `gallerypic6.jpeg` | 1280×960 | Balcony at night, town lights as bokeh | `gallery/balcony-night.jpg` |
| `gallerypic4.jpeg` | 2560×1920 | Potted blooms against the saffron façade, green window frames | `gallery/garden-blooms.jpg` |
| `gallerypic2.jpeg` | 1600×1200 | Guest room, bed, balcony door, warm light | `gallery/guest-room.jpg` |
| `gallerypic3.jpeg` | — | *duplicate of pic2* | **dropped** |
| `gallerypic8.jpeg` | 2560×1920 | Bathroom — marble, vanity, mirror, warm window | `gallery/bath-vanity.jpg` |
| `gallerypic7.jpeg` | 2560×1920 | Bathroom — marble, shower + WC | `gallery/bath-shower.jpg` |
| `Erick Avari.jpeg` | 1200×1600 | Room — portrait, mirror, sliding balcony doors, cane stools | `rooms/erick-avari.jpg` |
| `Vivien Leigh.jpeg` | 1280×960 | Room — corner, widest balcony doors, misty view | `rooms/vivien-leigh.jpg` |
| `Sylvia Coleridge.jpeg` | 1600×1200 | Room — pine panelling, skylight in pitched roof, red balcony chairs | `rooms/sylvia-coleridge.jpg` |
| `asraya-room-Anna Kashfi.jpeg` | 1600×1200 | Room — west light flooding through sliding doors | `rooms/anna-kashfi.jpg` |
| `logo.svg` | 399×188 | Logo | `brand/logo.svg` |

All 12 unique photos appear in the gallery. Every one gets a `.webp` plus `.jpg` fallback via `<picture>`.

---

## 3. Design direction — "The Portal"

### The idea

Look at the room photographs: **every single one is composed around a sliding glass balcony door.** The building's whole architecture is about framed openings onto the valley. Your inspiration image uses an arch-masked photo as its centrepiece — so the arch isn't a borrowed decoration here, it's a description of the building.

So the arch becomes the site's structural device, used at every scale: the hero image, room portraits, gallery hover states, and shrunk to a 6px arch that replaces bullet points. **One shape, repeated with discipline.**

### The signature: the offset gold mount

The arch image sits inside a **1px gold hairline arch, offset 16px down and right** — like a passe-partout mount slightly out of register, or a double exposure. Behind it, a single stroked gold arc segment. On scroll, the photograph inside drifts at 94% of page speed while the frame holds still, so you're looking *through* an opening rather than at a picture.

That's the one memorable thing. Everything else stays quiet.

```
              ╭───────────────╮ ← gold hairline, offset
         ╭────┼──────────────╮│
        ╱     │               ╲│
       │      │   photograph   ││   ← photo parallaxes inside
       │      │   drifts here  ││      the fixed frame
       │      ╰────────────────┼╯
       │                       │
       ╰───────────────────────╯
     ◜ single gold arc, stroked, behind
```

### The risk I'm taking: the page darkens as you scroll

Your photo set falls naturally into a day: bright midday valley → golden hour balcony → dusk exterior → night with town lights. The homepage uses that. It opens in **true white** — crisp, airy, premium — moves through white editorial sections, and resolves into **full-bleed black** for the night photography and the closing booking band.

This isn't decoration. It matches the pace of the thing being sold (an unhurried evening on a balcony above a valley), it's derived from the assets that actually exist, and it earns the black in "white, gold and black" instead of leaving black as merely text colour.

### Palette

| Token | Hex | Role |
|---|---|---|
| `--white` | `#FFFFFF` | Page base. **True white, not cream** — cream is the safe default; white is sharper and more couture. |
| `--bone` | `#FBFAF7` | Alternate band, barely-there warmth |
| `--ink` | `#0A0A0A` | Full-bleed dark sections, display type |
| `--ink-soft` | `#4A4844` | Body text |
| `--gold` | `#C9A227` | Rules, arcs, icons, glyphs — **decoration only** |
| `--gold-deep` | `#8A6D1F` | Gold **text** on white |
| `--gold-light` | `#E8D9A8` | Hairlines, hovers, gold text on black |

Metallic sheen for rules, the arch mount, and display numerals:
```css
linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)
```

> ⚠️ **Contrast rule.** `#C9A227` on white is ≈2.4:1 — it fails WCAG AA for text. Gold is for decoration and large display only. Small gold text on white uses `--gold-deep` `#8A6D1F` (≈5:1, passes AA). On black, gold text uses `--gold-light` `#E8D9A8` (≈11:1). Every pair gets checked during the build.

### Typography

**Display — Bodoni Moda.** A true Didone: hairline serifs, extreme thick/thin contrast. Chosen deliberately over Playfair and Cormorant, which are the reflexive picks. Didone is the shared typographic language of *film title cards* and *fashion houses* — which is precisely the intersection Asraya sits at, being a luxury homestay named after screen actors. It carries the concept, it isn't just decorative.

**Body — Jost.** Geometric sans in the Futura lineage. Quiet, wide-set, unfussy, and it doesn't compete with the Didone.

| Role | Face | Treatment |
|---|---|---|
| Hero headline | Bodoni Moda 400 | `clamp(3rem, 7vw, 6.5rem)`, leading 0.95, tracking −0.02em |
| Section titles | Bodoni Moda 400 | `clamp(2rem, 4vw, 3.5rem)` |
| Room names | Bodoni Moda 500 caps | tracking **0.18em** — the billing treatment |
| Eyebrows | Jost 500 caps | 12px, tracking 0.28em, `--gold-deep` |
| Body | Jost 400 | 17px / 1.75, measure 62ch |
| Chips & captions | Jost 500 caps | 11px, tracking 0.16em |

**Hard rule:** Bodoni Moda never renders below 28px — its hairlines vanish at small sizes and on low-DPI screens. Everything under 28px is Jost.

Self-hosted `woff2` subsets (Latin only). No font CDN.

### Room name treatment — the billing card

```
              ERICK   AVARI
        ────────────◆────────────
     BALCONY · VALLEY FACING · MIRROR
```

Letterspaced Didone caps, a gold hairline broken by a small gold diamond, feature chips beneath in tracked Jost. It reads as a film title card without a single literal Hollywood cliché — no reels, no clapperboards, no star motifs.

Deliberately **not numbered** (01 / 02 / 03). The rooms aren't a sequence, so numbering them would be decoration pretending to be information.

### Motion

One orchestrated moment, then quiet.

- **Page load:** the hero arch expands from a narrow slit to full arch via `clip-path` over 900ms, headline words rising in 60ms stagger behind it.
- **Scroll:** photographs parallax inside their fixed arch frames at 0.94×.
- **Reveals:** 24px rise + fade, `IntersectionObserver`, staggered 80ms.
- **Nav hover:** gold hairline wipes in left-to-right.
- **Gallery hover:** image desaturates to ~92% and the arch mask draws in.

All of it inside `@media (prefers-reduced-motion: reduce)` guards.

---

## 4. Header — every page

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⌂ ASRAYA      HOME   ABOUT   ROOMS   GALLERY   CONTACT   [CALL NOW]  │
└──────────────────────────────────────────────────────────────────────┘
   logo         Jost caps, tracking .2em            black pill,
                gold hairline on hover              gold text + border
                                                    → tel:+919564827858
```

Transparent over the hero, then solid white with a hairline gold bottom rule once scrolled past 80px. Active page marked with a persistent gold underline. Mobile: hamburger → full-screen black drawer, gold rules, focus-trapped, ESC to close.

---

## 5. Homepage — `index.html`

```
╔══════════════════════════════════════════════════════════════════════╗
║  HEADER                                                    [CALL NOW] ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  DARJEELING · WEST BENGAL          ╭──────────────╮                   ║
║  ──────────                       ╱  ╭───────────╮╲      ABOVE        ║
║                                  │   │           ││    Happy Valley   ║
║  Your Gateway                    │   │  golden   ││    Tea Estate     ║
║  to Relaxation                   │   │   hour    ││    ───────        ║
║                                  │   │  balcony  ││      BELOW        ║
║  Welcome to Darjeeling:          │   │           ││   Shrubbery       ║
║  Where Nature Meets              │   ╰───────────╯│   Nightingale     ║
║  Tranquility                     │                │    ───────        ║
║                                  ╰────────────────╯      FOUR         ║
║  [ Book Now ]   Explore rooms →                         Rooms         ║
║      ◜ gold arc                                                       ║
╠══════════════════════════════════════════════════════════════════════╣
║  2 · WELCOME          image ▏ About Asraya paragraph  ▏ View More →   ║
╠══════════════════════════════════════════════════════════════════════╣
║  3 · THE FOUR   ERICK AVARI ▏ VIVIEN LEIGH ▏ SYLVIA C. ▏ ANNA KASHFI ║
╠══════════════════════════════════════════════════════════════════════╣
║  4 · FACILITIES    ⌂ Bathroom  ⌂ Balcony  ⌂ Meditation  ⌂ Spacious   ║
╠══════════════════════════════════════════════════════════════════════╣
║  5 · TEA GARDENS       full-bleed valley photo + paragraph            ║
╠══════════════════════════════════════════════════════════════════════╣
║  6 · GALLERY           6-tile mosaic → View full gallery →            ║
╠══════════════════════════════════════════════════════════════════════╣
║ ███ 7 · QUEEN OF THE HILLS — BLACK, dusk exterior, Darjeeling copy ███║
╠══════════════════════════════════════════════════════════════════════╣
║ ███ 8 · BOOK YOUR STAY — BLACK, three numbers, WhatsApp CTA        ███║
╠══════════════════════════════════════════════════════════════════════╣
║  FOOTER                                                               ║
╚══════════════════════════════════════════════════════════════════════╝
```

**The right-hand rail replaces the inspiration's invented stats** (100% / 420+ / 1200+) with Asraya's actual vertical geography — above the tea estate, below the park, four rooms. Same visual rhythm, but every line is true, and it encodes the one fact that makes the location special: the property is stacked on a hillside between two landmarks.

---

## 6. About — `about.html`

Compact arch hero (`garden-blooms`) → **About Asraya**, three paragraphs in an editorial two-column with an offset arch image → **At the table**, the vegetarian home-cooked meals block → **Facilities**, 4 tiles with inline gold line-icons → **black band: Queen of the Hills**, the Darjeeling paragraph and the Hollywood premise explained → **The Four Namesakes**, short cards for Erick Avari, Anna Kashfi, Sylvia Coleridge and Vivien Leigh → **Where we are**, the between-two-landmarks diagram → booking band → footer.

The namesakes section is the piece the current site is missing entirely. Rooms named after Darjeeling-born screen actors is the single most distinctive thing about this property, and right now it's mentioned once and never explained.

---

## 7. Rooms — `rooms.html`

Compact arch hero → intro (the recycled Erick Avari paragraph) → four alternating full-width blocks, arch image alternating left/right, each with `id` for deep links → shared amenities strip → booking band.

### The new per-room copy

Written from what is genuinely visible in each photograph.

**Erick Avari** — `#erick-avari`
> The largest of the four. A wall of glass slides open onto the balcony, and a full-length mirror opposite catches the valley light and carries it back across the room. Cane stools, a carved teak door, a ceiling of pale pine.

`BALCONY · VALLEY FACING · FULL-LENGTH MIRROR`

**Vivien Leigh** — `#vivien-leigh`
> A corner room with the widest balcony doors in the house. Twin brass sconces above the bed, cane stools by the mirror, and on clear mornings the mist lifting off the valley while you're still under the covers.

`WIDE BALCONY · CORNER ROOM · TWIN SCONCES`

**Sylvia Coleridge** — `#sylvia-coleridge`
> Pine-panelled to the eaves, with a skylight cut into the pitched roof — the one room that wakes with the mountain. Open shelving along one wall, red chairs on the balcony, and a headboard built the full width of the bed.

`SKYLIGHT · PINE PANELLING · BALCONY`

**Anna Kashfi** — `#anna-kashfi`
> West facing, and it shows. Late light comes through the sliding doors and turns the room amber for the last hour of the day. Two chairs and a small table on the balcony, positioned for exactly that.

`SUNSET FACING · BALCONY · WEST LIGHT`

*Bed sizes and occupancy aren't in the photos — see Open Question 1.*

---

## 8. Gallery — `gallery.html`

Built from your second reference: big serif title, tight mosaic, floating filter pill.

```
╔══════════════════════════════════════════════════════════════════════╗
║  HEADER                                                    [CALL NOW] ║
║                                                                       ║
║  Gallery                                                              ║
║  ──────  twelve photographs of a house above a valley                 ║
║                                                                       ║
║  ┌────────┐ ┌──────────────┐ ┌────────┐ ┌──────────┐                 ║
║  │        │ │              │ │        │ │          │                 ║
║  │        │ │              │ └────────┘ │          │                 ║
║  └────────┘ │              │ ┌────────┐ │          │                 ║
║  ┌────────┐ └──────────────┘ │        │ └──────────┘                 ║
║  │        │ ┌────────┐       │        │ ┌──────────┐                 ║
║  │        │ │        │       └────────┘ │          │                 ║
║  └────────┘ └────────┘                  └──────────┘                 ║
║                                                                       ║
║          ╭─────────────────────────────────────────────╮             ║
║          │ ALL │ ROOMS │ BALCONIES │ VIEWS │ BATHS │ ⌂ │             ║
║          ╰─────────────────────────────────────────────╯             ║
║              ↑ fixed black pill, gold indicator slides                ║
╚══════════════════════════════════════════════════════════════════════╝
```

- **Mosaic:** CSS grid, `grid-auto-rows: 8px` with per-item row spans, so real aspect ratios tile without cropping. 12px gutters.
- **Filter pill:** fixed bottom-centre, black, `backdrop-filter: blur(12px)`, gold pill indicator that slides between categories. Categories — All · Rooms · Balconies · Views · Bathrooms · Exterior.
- **Filtering:** items fade + scale to 0.96 out, then in. `hidden` attribute drives it, so it degrades to a plain visible grid with JS off.
- **Hover:** the arch mask draws down over the tile, caption rises from the bottom.
- **Lightbox:** full-bleed on black, arrow-key and swipe navigation, ESC to close, focus returned to the tile you came from, counter in tracked Jost (`04 / 12`).

Twelve photographs is a modest set — the mosaic is sized so it reads as curated rather than thin.

---

## 9. Contact — `contact.html` + WhatsApp

Compact hero → `#get-in-touch` two-column → map → booking band → footer.

```
┌───────────────────────────────┬──────────────────────────────────────┐
│  CONTACT INFO                 │  BOOK YOUR STAY                      │
│  ─────────                    │  ─────────                           │
│                               │                                      │
│  Address                      │  First name ______________________   │
│  Vallima Cottage 3            │  Telephone  ______________________   │
│  Hooker Road                  │  Email      ______________________   │
│  Darjeeling 734101            │  Check in   ____  Check out ____     │
│                               │  Guests     ____                     │
│  Email Us                     │  Message    ______________________   │
│  asraya.homestay@gmail.com    │             ______________________   │
│                               │                                      │
│  Call Us                      │  [  SEND VIA WHATSAPP  ]             │
│  +91 9564827858               │  Opens WhatsApp with your details    │
│  +91 9002153003               │  filled in. Prefer email? →          │
│  +91 7699183995               │                                      │
└───────────────────────────────┴──────────────────────────────────────┘
```

I've added **check-in, check-out and guests** to your original four fields. A booking enquiry that arrives without dates costs you a round-trip every time.

### How the WhatsApp handoff works

No backend, no third-party form service, nothing to maintain. On submit, JS validates, builds a formatted message, and opens `wa.me`:

```js
const msg =
  `Hello Asraya Homestay, I'd like to enquire about a stay.\n\n` +
  `Name: ${name}\n` +
  `Phone: ${phone}\n` +
  `Email: ${email}\n` +
  `Check in: ${checkIn}\n` +
  `Check out: ${checkOut}\n` +
  `Guests: ${guests}\n\n` +
  `${message}`;

window.open(`https://wa.me/919564827858?text=${encodeURIComponent(msg)}`,
            '_blank', 'noopener');
```

What arrives on your phone:

```
Hello Asraya Homestay, I'd like to enquire about a stay.

Name: Priya Sharma
Phone: +91 98300 12345
Email: priya@example.com
Check in: 12 Oct 2026
Check out: 15 Oct 2026
Guests: 2

Is the Sylvia Coleridge room available?
```

Handled properly:
- Validates **before** opening WhatsApp — no half-empty messages
- Opens the app on mobile, WhatsApp Web on desktop
- If the popup is blocked, an inline gold link appears: *"Tap here to open WhatsApp"*
- `mailto:` fallback beneath the button for anyone without WhatsApp
- Each room's **Book Now** deep-links with that room pre-filled in the message

### Floating WhatsApp button

Fixed bottom-right, 56px black circle, gold WhatsApp glyph, soft gold ring. Expands to a `Chat with us` pill on hover and focus. Appears after 400px of scroll with a gentle fade. Sits above the gallery filter pill in z-order but offsets sideways on the gallery page so the two never collide — a detail that's easy to miss and looks broken when missed.

### Map
Keyless Google Maps embed (`output=embed`), `loading="lazy"`, wrapped in a gold hairline frame, grayscale until hovered.

---

## 10. Folder structure

```
Asraya-Homestay/
├── index.html
├── about.html
├── rooms.html
├── gallery.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── plan.md
└── assets/
    ├── css/
    │   └── style.css          # one sectioned stylesheet
    ├── js/
    │   └── main.js            # nav · reveal · lightbox · filter · whatsapp
    ├── fonts/                 # bodoni-moda + jost, woff2 subsets
    └── img/
        ├── brand/   logo.svg · favicon.svg · og-cover.jpg
        ├── hero/    balcony-golden-hour.jpg
        ├── rooms/   erick-avari · vivien-leigh · sylvia-coleridge · anna-kashfi
        └── gallery/ valley-tea-view · guest-room · garden-blooms
                     balcony-night · bath-vanity · bath-shower · exterior-dusk
```

**No build step means header and footer are duplicated across 5 files.** That's the honest cost of a plain static site. Injecting them with JS would remove the duplication but breaks SEO and flashes an empty nav on load, so: duplication, kept in sync by hand.

---

## 11. Technical

**JS** (~300 lines, vanilla, no dependencies): mobile drawer with focus trap · sticky header state · scroll reveal · hero clip-path load sequence · arch parallax · gallery filter · lightbox with keyboard and swipe · WhatsApp message builder · form validation · active nav · footer year.

**Accessibility:** skip link · semantic landmarks · real alt text on all 12 photographs · visible focus rings · AA contrast verified on every pair · lightbox, drawer and filter fully keyboard-operable · `prefers-reduced-motion` honoured throughout · form errors announced via `aria-live`.

**Performance:** hero preloaded, everything else lazy · explicit `width`/`height` on every image to prevent layout shift · resized to max 1920px and re-encoded to webp+jpg, target under 250 KB each *(currently up to 856 KB)* · self-hosted subset fonts · target Lighthouse ≥ 90 across all four categories.

**SEO:** unique title and meta per page · Open Graph and Twitter cards · `LodgingBusiness` JSON-LD with address, geo, phones, email · sitemap · robots · canonicals.

**Paths stay relative** (`./assets/…`) — Pages serves from the `/Asraya-Homestay/` subpath, so absolute paths would 404. Already verified with the placeholder deploy.

---

## 12. Build phases

| Phase | Work | Checkpoint |
|---|---|---|
| **0** | Scaffold folders, rename + optimise 12 images, self-host fonts | Assets in, weight down |
| **1** | `style.css` foundation — tokens, type scale, arch system, header, footer | — |
| **2** | **`index.html` complete** | **Your review — this sets the system** |
| **3** | `about.html` + `rooms.html` | Review |
| **4** | `gallery.html` — mosaic, filter, lightbox | Review |
| **5** | `contact.html` + WhatsApp wiring + floating button | Test a real WhatsApp send |
| **6** | Accessibility, Lighthouse, responsive sweep (360 / 768 / 1440 / 1920) | Scores reported |
| **7** | SEO files, commit, push, verify live | Live URL confirmed |

Phase 2 is the real gate. Once the homepage lands, the rest follows its system.

---

## 13. Remaining open questions

None block the build — each has a default I'll proceed with.

| # | Question | Default |
|---|---|---|
| 1 | **Bed sizes and occupancy per room?** Not visible in the photos. | Omit from the chips |
| 2 | **Room rates?** None on the current site. | Omit; CTA stays "Book Now" → WhatsApp |
| 3 | **Check-in / check-out times?** | Omit — won't invent them |
| 4 | **Instagram or other socials?** | Omit |
| 5 | Keep the *"Site Developed and Maintained by: Govinda Kolhapure"* credit? | Drop it |
| 6 | Privacy / Terms / Accessibility — no pages for these in the new build. | Footer links point at the existing live pages |
| 7 | Exact GPS coordinates for the map pin? | Geocode from the Hooker Road address |
| 8 | Replace the dropped duplicate photo with a new one? | Ship with 12 |
| 9 | **Is WhatsApp active on +91 9564827858?** | Assumed yes — worth confirming before launch, since every form depends on it |

---

## 14. Domain

`asrayahomestay.com` currently points at the live WordPress site. **Nothing in this plan touches it.** The new build lives at the Pages URL until you're satisfied; only then do we add a `CNAME` and switch DNS. Zero risk to what's live today.
