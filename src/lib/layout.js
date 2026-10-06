// Page shell: <head>, header with navigation, footer.

import { esc, join } from './html.js';
import { icons, logoMark } from './icons.js';
import { site, addressOneLine } from '../data/site.js';
import { publishedProducts, productUrl } from '../data/products.js';
import { button, emailLink, inquiryHref, phoneLink } from './components.js';

const c = site.contact;

// Items left of the logo; the last two sit to its right, next to the
// inquiry button and phone (the right side is the busier one).
const NAV_SPLIT = site.nav.length - 2;

export function layout({ r, path, navKey, title, description, body, preview = false, inquiryAnchor }) {
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
<script>(function(d){d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches){d.classList.add('motion','anim-pending');setTimeout(function(){d.classList.remove('anim-pending')},2500)}}catch(e){}})(document.documentElement)</script>
<link rel="stylesheet" href="${r('assets/css/styles.css')}">
<script src="${r('assets/vendor/gsap/gsap.min.js')}" defer></script>
<script src="${r('assets/vendor/gsap/ScrollTrigger.min.js')}" defer></script>
<script src="${r('assets/vendor/gsap/Flip.min.js')}" defer></script>
<script src="${r('assets/js/motion.js')}" defer></script>
<script src="${r('assets/js/media.js')}" defer></script>
<script src="${r('assets/js/main.js')}" defer></script>
<script>window.ZOOM_THROUGH=${JSON.stringify(site.pageTransition)}</script>
<script src="${r('assets/js/zoom-through.js')}" defer></script>`;

  const header = `<a class="skip-link" href="#obsah">Přeskočit na obsah</a>
<header class="site-header">
  <div class="site-header__bar">
    <a class="brand" href="${r('index.html')}"${navKey === 'home' ? ' aria-current="page"' : ''}>
      ${logoMark}
      <span class="brand__text"><span class="brand__name">${esc(site.brandName)}</span><span class="brand__tag">Prodej · pronájem · servis</span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="hlavni-navigace">
      <span class="nav-toggle__open">${icons.menu(22)}</span><span class="nav-toggle__close">${icons.close(22)}</span>
      <span class="nav-toggle__label">Menu</span>
    </button>
    <nav class="site-nav" id="hlavni-navigace" aria-label="Hlavní navigace">
      <ul class="site-nav__list site-nav__list--start">
        ${join(site.nav.slice(0, NAV_SPLIT), (n) => `<li><a href="${r(n.href)}"${n.key === navKey ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`)}
      </ul>
      <div class="site-nav__end">
        <ul class="site-nav__list">
          ${join(site.nav.slice(NAV_SPLIT), (n) => `<li><a href="${r(n.href)}"${n.key === navKey ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`)}
        </ul>
        <div class="site-nav__actions">
          <a class="btn btn--dark" href="${inquiryHref(r, inquiryAnchor)}" data-size="sm">Nezávazně poptat</a>
          <a class="icon-btn" href="${c.phoneHref}" aria-label="Zavolat ${esc(c.phone)}" title="${esc(c.phone)}">${icons.phone(18)}</a>
          <a class="header-phone" href="${c.phoneHref}">${icons.phone(18)}<span>${esc(c.phone)}</span></a>
        </div>
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
  <a class="mobile-bar__inquiry" href="${inquiryHref(r, inquiryAnchor)}">Nezávazně poptat</a>
</div>`;

  const content = `${header}
<main id="obsah" tabindex="-1">
${body.split('<!--break-->').filter((x) => x.trim()).map((chunk) => `<div class="sheet">${chunk}</div>`).join('\n')}
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
