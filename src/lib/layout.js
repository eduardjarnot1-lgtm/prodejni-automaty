// Page shell: <head>, header with navigation, footer.

import { esc, join } from './html.js';
import { icons, logoMark } from './icons.js';
import { site, addressOneLine } from '../data/site.js';
import { publishedProducts, productUrl } from '../data/products.js';
import { button, emailLink, inquiryHref, phoneLink } from './components.js';

const c = site.contact;

export function layout({ r, path, navKey, title, description, body, preview = false }) {
  const fullTitle = `${title} | ${site.brandName}`;
  const canonical = site.baseUrl ? `${site.baseUrl.replace(/\/$/, '')}/${path}` : '';

  const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${site.indexable ? '' : '<meta name="robots" content="noindex, nofollow">'}
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="cs_CZ">
<meta property="og:site_name" content="${esc(site.brandName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${r('assets/favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${r('assets/fonts/ibm-plex-sans-latin-400-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${r('assets/fonts/ibm-plex-sans-latin-600-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.classList.add('js')</script>
<link rel="stylesheet" href="${r('assets/css/styles.css')}">
<script src="${r('assets/js/main.js')}" defer></script>`;

  const header = `<a class="skip-link" href="#obsah">Přeskočit na obsah</a>
<header class="site-header">
  <div class="wrap site-header__bar">
    <a class="brand" href="${r('index.html')}"${navKey === 'home' ? ' aria-current="page"' : ''}>
      ${logoMark}
      <span class="brand__text"><span class="brand__name">${esc(site.brandName)}</span><span class="brand__tag">Prodej · pronájem · servis</span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="hlavni-navigace">
      <span class="nav-toggle__open">${icons.menu(22)}</span><span class="nav-toggle__close">${icons.close(22)}</span>
      <span class="nav-toggle__label">Menu</span>
    </button>
    <nav class="site-nav" id="hlavni-navigace" aria-label="Hlavní navigace">
      <ul>
        ${join(site.nav, (n) => `<li><a href="${r(n.href)}"${n.key === navKey ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`)}
      </ul>
      <div class="site-nav__actions">
        <a class="header-phone" href="${c.phoneHref}">${icons.phone(18)}<span>${esc(c.phone)}</span></a>
        ${button(inquiryHref(r), 'Nezávazně poptat', 'primary', ' data-size="sm"')}
      </div>
    </nav>
  </div>
</header>`;

  const footer = `<footer class="site-footer">
  <div class="wrap site-footer__grid">
    <div class="site-footer__brand">
      <a class="brand brand--footer" href="${r('index.html')}">${logoMark}<span class="brand__text"><span class="brand__name">${esc(site.brandName)}</span></span></a>
      <p>${esc(site.brandTagline)}. V oboru od roku ${site.since}. Působíme po celé České republice.</p>
    </div>
    <div>
      <h2 class="site-footer__h">Kontakt</h2>
      <ul class="site-footer__list">
        <li>${esc(c.person)}</li>
        <li>${phoneLink()}</li>
        <li>${emailLink()}</li>
        ${c.emailAlt ? `<li>${emailLink(c.emailAlt)}</li>` : ''}
        <li>${esc(addressOneLine())}</li>
        ${c.companyId ? `<li>IČO: ${esc(c.companyId)}</li>` : ''}
      </ul>
    </div>
    <div>
      <h2 class="site-footer__h">Automaty</h2>
      <ul class="site-footer__list">
        ${join(publishedProducts, (p) => `<li><a href="${r(productUrl(p))}">${esc(p.name)}</a></li>`)}
      </ul>
    </div>
    <div>
      <h2 class="site-footer__h">Navigace</h2>
      <ul class="site-footer__list">
        ${join(site.nav, (n) => `<li><a href="${r(n.href)}">${esc(n.label)}</a></li>`)}
      </ul>
    </div>
  </div>
  <div class="wrap site-footer__bottom">
    <p>© ${new Date().getFullYear()} ${esc(site.brandName)}</p>
  </div>
</footer>
<div class="mobile-bar" aria-label="Rychlý kontakt" role="region">
  <a class="mobile-bar__call" href="${c.phoneHref}">${icons.phone(18)} Zavolat</a>
  <a class="mobile-bar__inquiry" href="${inquiryHref(r)}">Nezávazně poptat</a>
</div>`;

  const content = `${header}
<main id="obsah" tabindex="-1">
${body}
</main>
${footer}`;

  // The preview build (artifact) is wrapped in its own document skeleton,
  // so the root page is emitted without <html>/<head>/<body> tags there.
  if (preview) return `${head}\n${content}\n`;

  return `<!doctype html>
<html lang="${site.lang}">
<head>
${head}
</head>
<body>
${content}
</body>
</html>
`;
}
