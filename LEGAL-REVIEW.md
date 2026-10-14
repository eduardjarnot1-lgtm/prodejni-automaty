# Legal, privacy and accessibility review (14. 10. 2026)

This is a technical review of the website as built, not legal advice. The
legal pages were written for the site's actual behaviour and contain no
invented business terms. Before a public launch, have a Czech lawyer (or
your accountant/advisor) read the three legal pages and the open items below.

## What the website actually does (verified in the browser)

| Area | Finding |
| --- | --- |
| Cookies | The site sets **no cookies** (0 cookies after visiting every page). |
| Browser storage | `localStorage` key `sa-media-motion` only when the visitor turns video motion off; `history.state` for the Back-button scroll position. Both strictly functional, no personal data. |
| Analytics / tracking | **None.** No Google Analytics, Tag Manager, pixels, fonts or CDNs. All scripts (incl. GSAP) are self-hosted. |
| Third-party embeds | One: Google Maps on Kontakt, loaded **only after a click** on “Zobrazit mapu”. 0 external requests before the click; after it, requests go to maps.google.com. The button area now says Google may process the IP address and set cookies, with a link to the cookie page. |
| Inquiry form | Sends nothing to a server. It prepares an e-mail in the visitor's own mail program (`mailto:`). Fields: name, e-mail, phone (optional), interest, message, acknowledgement. Only data needed to reply. |
| Search engines | `noindex, nofollow` is still on (`site.indexable: false`). Turn it on only after the open items are fixed. |

## Changes made in this pass

- **New pages** (footer “Ochrana osobních údajů · Cookies · Podmínky užívání webu”):
  - `ochrana-osobnich-udaju.html`: GDPR art. 13 information (controller, data, purposes, legal bases, recipients, retention, rights, ÚOOÚ complaint).
  - `cookies.html`: what is stored, why no consent banner is needed, Google Maps.
  - `podminky-uzivani.html`: website terms. Prices are indicative, not an offer. Inquiries are non-binding. Contracts are individual. Complaints, withdrawal and refunds are covered, as are ADR (ČOI), copyright/trademarks, AI imagery and governing law.
- **Cookie consent:** not needed for the site as built (no non-essential cookies or trackers; § 89(3) ZEK exemption for strictly necessary storage). The map is click-to-load with notice. **If you ever add analytics, a chat widget, YouTube, Facebook pixel, etc., you will need a consent banner before they load.**
- **Form:** a required acknowledgement checkbox linked to the privacy page (“Beru na vědomí…”). It is deliberately **not** a consent to processing: the legal basis is replying to your request (art. 6(1)(b)/(f)), and asking for “consent” would be the wrong basis.
- **Business details:** operator name and address in the footer and on the legal pages. IČO and registration render automatically once filled in `src/data/site.js`. `npm run check` now warns while IČO is empty.
- **AI labelling:** every AI-generated video now says “vytvořená pomocí AI” (EU AI Act art. 50 transparency, applicable from 2. 8. 2026).
- **Accessibility:**
  - axe-core 4.14 (WCAG 2.0/2.1/2.2 A+AA + best practice) on all 14 pages, desktop and mobile: no violations.
  - Text over images and gradients was checked by pixel sampling: all at least 4.5:1 (3:1 for large text).
  - Fixed: accent green darkened (#2c7a37 → #226429), inactive tour text lightened on dark backgrounds, duplicated image captions in the catalogue.
  - Keyboard: logical tab order; errors are announced, linked with `aria-describedby`, and focus moves to the first error; checkbox works with Space; visible focus rings; mobile menu closes with Esc.
- **Content audit:**
  - No reviews, testimonials, ratings, “best/cheapest”, guarantee or ROI claims exist on the site.
  - Manufacturer figures (99 % accuracy, ~60 s, 6 h) are always labelled “podle výrobce” / “ne o záruku”.
  - Company facts come from the client brief: since 1992, free consultation, all of the Czech Republic, Ing. Jan Petr.

## MUST fix before the site is public (high)

1. **IČO and legal form are missing.** § 435 of the Civil Code requires a business to show its name, registered address, IČO and registration (trade or commercial register) on its website. Fill `site.contact.companyId` and `site.operator` (name and `register`). If the business is a company, the controller name on the privacy page changes too. *The current Netlify deployment is reachable by anyone with the link, so this already applies.*
2. **Prices and VAT.** “Orientační cena od 170 000 Kč” does not say whether VAT is included. Prices offered to consumers must be final, including VAT. Either state “bez DPH” and make clear the offer is for businesses, or show the price including VAT.
3. **Image and video rights.** See the inventory below. You need written permission or a licence for every manufacturer photo, and confirmation that the AI tools' terms allow commercial use.
4. **Hosting processor.** Confirm Netlify is the host and accept its Data Processing Addendum in the Netlify account. Confirm which provider hosts `info@stravovaciautomaty.cz`. Update `site.processors` if anything differs.

## Should fix (medium)

- **Retention periods.** The privacy page uses general wording (“po dobu nezbytnou…”). Decide concrete periods (e.g. unanswered inquiries deleted after X months) and add them.
- **Commercial terms.** If you sell or rent to consumers, especially when the contract is concluded remotely (e-mail/phone), you need proper business terms (obchodní podmínky), a complaints procedure (reklamační řád), and the information and form for the 14-day withdrawal right. These belong in the contract and can then be linked from the website. They were **not** invented here.
- **Trademarks / reseller status.** The site uses the HAHA VENDING and AI VENDING names and manufacturer material. Confirm you are an authorised reseller or have permission. Apple Pay and Google Pay are used only descriptively.
- **Unconfirmed facts** (from CONTENT-TODO.md): which e-mail receives inquiries, the brand name “Stravovací automaty”, the 1992 date, rental availability, the conflicting Pro 542 figures (brochure vs. marketing image). The site uses the brochure values.

## Low / monitor

- **Accessibility law** (zákon č. 424/2023 Sb., European Accessibility Act). It covers consumer e-commerce services. This site sells nothing online, and micro-enterprises are exempt for services. The site already meets WCAG 2.1 AA in automated tests anyway. Manual screen-reader testing (NVDA/VoiceOver) is still recommended.
- **AI Act.** Keep the “vytvořená pomocí AI” labels on any new generated media.
- **Watermarks.** The PixVerse watermark is still visible in the videos. A clean, licensed export would look more professional.

## Image, video and asset inventory (copyright)

| Asset | Source | Status / action |
| --- | --- | --- |
| `chlazeny-automat-dotykovy-displej`, `chlazeny-automat-dvojita-sestava` | Client-supplied (batch 3), manufacturer-style product photos | **Confirm permission from the manufacturer/supplier.** |
| `boxovy-system-12-schranek` | Manufacturer photo (“YOUR LOGO HERE” on the panel) | **Confirm permission.** |
| `boxovy-system-bily`, `-zeleny`, `-oranzovy-potisk` | Cropped from screenshots of the old website | Confirm who owns the originals (likely the manufacturer). |
| `boxovy-system-modry` | Manufacturer visual | **Confirm permission.** |
| `haha-pro-542-*` (3 photos) | Client-supplied manufacturer material | **Confirm reseller permission from HAHA VENDING.** |
| `ai-*` illustrations (7) | Client-supplied, appear AI-generated | Confirm the generating tool and that its terms allow commercial use. Labelled “Ilustrační náhled”. |
| Background `ai-pozadi` | Client-supplied | Confirm origin/licence. |
| Videos (`haha-pro-542-orbit`, `haha-pro-542-tour`, `chilled-machine-tour`, `locker-cabinet-showcase`, `double-machine-details`) | Generated with PixVerse (watermark visible) | **Check that your PixVerse plan permits commercial use.** Some videos and the Pro 542 photos show third-party product brands on the shelves (e.g. Pepsi, Nutella); this is usually tolerated for product shots, but clean exports without recognisable brands are safer. |
| GSAP 3.15 | GreenSock “Standard no charge” licence (file included) | OK |
| Icons, SVG diagrams, texts, layout | Created for this project | OK |
| Font | Georgia / Times New Roman system fonts, nothing embedded | OK |
