# Awaiting confirmation from the client

Items below are either not shown on the website, or are shown in a neutral
form until confirmed.

## Company & contact
- [ ] **Brand name.** The old site uses both “Prodej stravovacích automatů” and
      “Prodej výdejních automatů”. The new site uses “Stravovací automaty”
      (from the domain stravovaciautomaty.cz). Change it in `src/data/site.js`.
- [ ] **Legal entity and IČO.** Not shown. Czech business sites should show them;
      add `companyId` in `site.js`.
- [ ] **Which e-mail receives inquiries.** The form uses stravovaciautomaty@email.cz
      (shown on the current site); info@stravovaciautomaty.cz is listed as second.
      Confirm both mailboxes work.
- [ ] **Address use.** Is Kaštanová 489/34, Brno (Brno-Tuřany) an office, a
      showroom or only a registered address? Opening hours / visits by appointment?
- [ ] **Coverage.** Site states Czech Republic only. Slovakia / Poland pending.
      (The old site's “Profesionální prodej automatů” section also mentions sales
      and service in Slovakia; confirm before adding it.)
- [ ] **Facebook.** The “@facebookovástránka” placeholder was removed. Send the
      real profile URL if there is one.
- [ ] **Logo.** Temporary blue logo mark. Supply the official logo if one exists.
- [ ] **Production domain.** Needed for canonical URLs, Open Graph URLs, sitemap
      and an absolute-path 404 page.

## Products
- [ ] **Prices** (170 000 Kč “od” for the chilled-food machine): confirm amount and
      whether prices are with or without VAT. The site currently says only
      “Orientační cena”.
- [ ] **Chilled-food machine dimensions** 1330 × 815 × 1915 mm: confirm order
      (width × depth × height).
- [ ] **Chilled-food machine**: model name / manufacturer, payment options
      (cash, card, contactless), warranty. Not shown until confirmed.
- [ ] **Automatic locker system**: dimensions, number/size of compartments,
      control terminal, payment options.
- [ ] **Modular locker system**: any typical configurations or parameters.
- [ ] **Old item “???? upravit” (200 000 Kč).** Kept in `products.js` with
      `status: 'pending'`; not published. Need name, type and specs.
- [ ] **Rental** – which machines can be rented and on what basic terms.
- [ ] **Spare parts** – for which brands/machines.

## Photos
- [ ] Batch 1 photos are cropped from a screenshot of the old site and are low
      resolution (240–361 px wide). Please send the original files.
- [ ] Which model each locker photo shows (white / green / blue). Currently used
      only as category examples (“Ukázky provedení”), not assigned to a model.
- [ ] No photo of the chilled-food vending machine yet (placeholder shown).
- [ ] Batch 2 (received): added the orange locker visual
      (`boxovy-system-oranzovy-potisk`) as a category example. It is a manufacturer
      mock-up with English text (“Refrigerated Locker 24/7”, “Put Your Brand Here”);
      the website does not promise 24/7 operation or custom branding. Confirm whether
      custom door printing is offered and send the original file without the texts.
- [ ] Not used from batch 2: stock photos of a button panel, a food stand and a
      van bar (the brief excludes unrelated stock photos). The remaining
      screenshots contained only text, and no new facts were taken from them.
- [ ] Batch 3 (received, good quality): now the main photos of the site, shown as
      labelled examples ("Ukázka provedení") until the model is confirmed:
  - `chlazeny-automat-dotykovy-displej`: is this the chilled-food machine
    (21.5″ display, elevator, 54 positions)? If yes, assign it in `products.js`
    and the "Ukázka provedení" label disappears.
  - `chlazeny-automat-dvojita-sestava` (two cabinets, shared panel): is this the
    unnamed 200 000 Kč assembly from the old site? If yes, send its name and specs.
  - `boxovy-system-12-schranek`: which locker model is it (automatic or modular)?
  - The dimension drawing (`media/pending/`) shows **1352 × 951 × 1950 mm**, but the
    chilled-food machine is listed as **1330 × 815 × 1915 mm**. Which is correct, and
    which model does the drawing belong to? It's not published until confirmed.
- [ ] Real installation photos would strengthen the site.

## Later phases
- [ ] Real form submission (form service or serverless function) + privacy policy page.
- [ ] Privacy/cookie information (site uses no cookies; the map loads Google only on click).
- [ ] Analytics only after explicit approval.

## Product videos
- [ ] All three clips are AI-generated (PixVerse) with watermarks. Replace with clean,
      authorised exports before launch (README → Product videos).
- [ ] Hero clip shows a single glass-front machine; it is presented as an illustration,
      not as the chilled-food machine's verified look or specifications.
- [ ] Locker clip: is it the "Automatický výdejní boxový systém"? It is used only there.
      The interior is a generated setting, not a customer installation.
- [ ] Double-machine clip: confirm the two-cabinet assembly is offered and send its
      name, parameters and price basis (currently "individually").
