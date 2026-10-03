import { button, inquiryHref } from '../lib/components.js';

export default {
  path: '404.html',
  navKey: null,
  title: 'Stránka nenalezena',
  description: 'Požadovaná stránka neexistuje.',
  render(r) {
    return `
<section class="section section--first">
  <div class="wrap narrow">
    <h1>Stránka nenalezena</h1>
    <p class="lead">Tuto stránku jsme nenašli. Mohla být přesunuta, nebo je chyba v adrese.</p>
    <div class="actions">
      ${button(r('index.html'), 'Zpět na úvod', 'primary')}
      ${button(r('automaty.html'), 'Prohlédnout automaty', 'secondary')}
      ${button(inquiryHref(r), 'Kontakt', 'ghost')}
    </div>
  </div>
</section>
`;
  },
};
