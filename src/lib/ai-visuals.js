// Schematic illustrations for the "AI automaty" page (inline SVG).
//
// One drawing style for all: dark outline, light fills, one green accent.
// They explain a step; they never imitate readable app screens or data, and
// the page labels them as illustrations ("Ilustrační náhled").

const INK = '#1c2027';
const LINE = '#c9cdd2';
const SOFT = '#f1f2f3';
const GREEN = '#3fa34d';
const JUICE = '#8cc47a';

const svg = (body, label, vb = '0 0 240 180') =>
  `<svg class="ai-ill" viewBox="${vb}" role="img" aria-label="${label}" focusable="false">${body}</svg>`;

// --- Adding a product -------------------------------------------------------

// 01 Product details: a form with four fields, one of them a barcode (GTIN).
export const formIll = () => svg(`
  <rect x="58" y="14" width="124" height="152" rx="14" fill="#fff" stroke="${INK}" stroke-width="3"/>
  ${[44, 76, 108].map((y, i) => `
    <rect x="74" y="${y - 10}" width="${[46, 30, 38][i]}" height="5" rx="2.5" fill="${LINE}"/>
    <rect x="74" y="${y}" width="92" height="16" rx="5" fill="${SOFT}" stroke="${LINE}" stroke-width="2"/>`).join('')}
  <g stroke="${INK}" stroke-width="2">${[0, 4, 6, 11, 14, 16, 20, 25, 27, 31].map((x) => `<path d="M${80 + x * 2} 112v8"/>`).join('')}</g>
  <rect x="96" y="138" width="48" height="16" rx="8" fill="${GREEN}"/>`,
  'Formulář s poli pro údaje o produktu a čárovým kódem');

// 02 Photographs: one bottle from the front, back, side and top.
const bottleFront = (x, back = false) => `
  <g transform="translate(${x} 34)">
    <rect x="9" y="0" width="14" height="12" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M7 14h18l4 10v66a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V24z" fill="${JUICE}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="3" y="42" width="26" height="24" fill="#fff" stroke="${INK}" stroke-width="2"/>
    ${back
      ? `<g stroke="${INK}" stroke-width="1.5">${[0, 2, 5, 7, 10, 12, 15].map((d) => `<path d="M${8 + d} 49v10"/>`).join('')}</g>`
      : `<rect x="8" y="48" width="16" height="4" rx="2" fill="${GREEN}"/><rect x="8" y="56" width="11" height="3" rx="1.5" fill="${LINE}"/>`}
  </g>`;
const bottleSide = (x) => `
  <g transform="translate(${x} 34)">
    <rect x="5" y="0" width="10" height="12" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M3 14h14l3 10v66a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V24z" fill="${JUICE}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="0" y="42" width="20" height="24" fill="#fff" stroke="${INK}" stroke-width="2"/>
  </g>`;
const bottleTop = (x) => `
  <g transform="translate(${x} 64)">
    <circle cx="20" cy="20" r="19" fill="${JUICE}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="20" cy="20" r="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
  </g>`;
export const photosIll = () => svg(`
  ${bottleFront(18)}${bottleFront(76, true)}${bottleSide(142)}${bottleTop(184)}
  ${[34, 92, 152, 204].map((x) => `<circle cx="${x}" cy="150" r="3" fill="${GREEN}"/>`).join('')}`,
  'Stejná lahev vyfocená zepředu, zezadu, z boku a shora');

// 03 Submit for review: a document with a check mark in a circle.
export const reviewIll = () => svg(`
  <path d="M74 18h66l26 26v118H74z" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M140 18v26h26" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  ${[64, 80, 96].map((y, i) => `<rect x="90" y="${y}" width="${[56, 46, 52][i]}" height="6" rx="3" fill="${LINE}"/>`).join('')}
  <circle cx="160" cy="132" r="24" fill="#fff" stroke="${GREEN}" stroke-width="4"/>
  <path d="m149 132 8 8 14-15" fill="none" stroke="${GREEN}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Žádost o nový produkt odeslaná ke kontrole');

// 04 Added to the assortment: a shelf with a new product highlighted.
const can = (x, hl = false) => `
  <rect x="${x}" y="78" width="30" height="50" rx="6" fill="${hl ? JUICE : SOFT}" stroke="${INK}" stroke-width="2.5"/>
  <rect x="${x}" y="94" width="30" height="14" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
export const shelfIll = () => svg(`
  <rect x="24" y="128" width="192" height="10" rx="3" fill="${INK}"/>
  ${can(40)}${can(80)}${can(160)}
  <g>${can(120, true)}</g>
  <rect x="113" y="70" width="44" height="66" rx="10" fill="none" stroke="${GREEN}" stroke-width="3" stroke-dasharray="7 5"/>
  <circle cx="157" cy="66" r="13" fill="${GREEN}"/><path d="M157 59v14M150 66h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
  'Police se zbožím, nový produkt je zvýrazněný');

// --- Recording a restock -----------------------------------------------------
// Three small diagrams in one style. They explain how the restock is
// RECORDED in the app; the machine is always restocked by staff.
const machine = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="0" y="0" width="56" height="96" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/>
  <rect x="7" y="8" width="42" height="68" rx="3" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>
  ${[28, 48].map((yy) => `<path d="M7 ${yy}h42" stroke="${INK}" stroke-width="2"/>`).join('')}
  ${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${12 + c * 12}" y="${13 + r * 20}" width="8" height="12" rx="2" fill="${JUICE}"/>`).join('')).join('')}
  <rect x="7" y="82" width="42" height="6" rx="2" fill="${INK}"/>
</g>`;
const box = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M0 14h48v38H0z" fill="#d9b98b" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M0 14l7-12h34l7 12" fill="#e8cfa6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M24 14v38" stroke="${INK}" stroke-width="2" opacity=".35"/>
</g>`;
const list = (x, y, nums = false) => `<g transform="translate(${x} ${y})">
  <rect x="0" y="0" width="46" height="60" rx="6" fill="#fff" stroke="${GREEN}" stroke-width="3"/>
  <rect x="14" y="-6" width="18" height="10" rx="3" fill="${GREEN}"/>
  ${[16, 30, 44].map((yy) => `<rect x="8" y="${yy - 3}" width="${nums ? 18 : 30}" height="6" rx="3" fill="${LINE}"/>${nums ? `<rect x="30" y="${yy - 3}" width="9" height="6" rx="3" fill="${GREEN}"/>` : ''}`).join('')}
</g>`;
const arrow = (x1, y, x2) => `<path d="M${x1} ${y}H${x2 - 7}" stroke="${INK}" stroke-width="2.5"/><path d="m${x2 - 9} ${y - 6} 7 6-7 6" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const phoneNoQty = (x, y) => `<g transform="translate(${x} ${y})">
  <rect x="0" y="0" width="34" height="58" rx="7" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
  <rect x="7" y="14" width="20" height="5" rx="2.5" fill="${LINE}"/>
  <rect x="6" y="26" width="22" height="14" rx="3" fill="${SOFT}" stroke="${LINE}" stroke-width="2"/>
  <path d="M4 44 30 22" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
</g>`;
const check = (x, y) => `<circle cx="${x}" cy="${y}" r="15" fill="${GREEN}"/><path d="m${x - 7} ${y} 5 5 9-10" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;

export const restockIll = (mode) => {
  const body = {
    // Stock box → machine; in the app no quantity per product.
    fast: `${box(10, 62)}${arrow(64, 88, 96)}${machine(100, 20)}${phoneNoQty(186, 46)}`,
    // Machine + calculated list + confirmation.
    oneclick: `${machine(12, 20)}${list(98, 38, true)}${check(170, 68)}<path d="M76 68h14" stroke="${INK}" stroke-width="2.5" stroke-dasharray="3 4"/>`,
    // Restocking order → stock box → machine.
    order: `${list(6, 40)}${arrow(56, 74, 80)}${box(82, 50)}${arrow(134, 74, 158)}${machine(160, 26)}`,
  }[mode];
  const label = {
    fast: 'Schéma: zboží z krabice do automatu, v aplikaci bez zadávání počtu kusů',
    oneclick: 'Schéma: automat, seznam s vypočteným množstvím k doplnění a potvrzení',
    order: 'Schéma: objednávka na doplnění, krabice se zbožím, automat',
  }[mode];
  // Tight bounds per diagram (artwork + strokes + equal 6-unit margin), all
  // 225 × 112 units (narrower art padded evenly), so all three are centred
  // and always drawn at the same scale.
  const vb = { fast: '2.5 12.5 225 112', oneclick: '-14.75 12.5 225 112', order: '-1.5 18.5 225 112' }[mode];
  return svg(body, label, vb);
};
