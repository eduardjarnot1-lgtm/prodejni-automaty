// Tiny helpers for building HTML with template literals.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

// Joins arrays / skips null, undefined and false in templates.
export const join = (items, fn = (x) => x) =>
  (items || []).filter((x) => x !== null && x !== undefined && x !== false).map(fn).join('');

// Relative URL from a page at `depth` (0 = site root, 1 = automaty/…).
export const rel = (depth) => (href) => {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  return '../'.repeat(depth) + href;
};
