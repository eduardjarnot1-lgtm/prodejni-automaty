// Inline SVG icons (stroke-based, inherit currentColor). Decorative only:
// every icon sits next to visible text, so they are hidden from screen readers.

const svg = (body, size = 20) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  phone: (s) => svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>', s),
  mail: (s) => svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', s),
  pin: (s) => svg('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>', s),
  user: (s) => svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', s),
  arrow: (s) => svg('<path d="M5 12h14M13 6l6 6-6 6"/>', s),
  check: (s) => svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', s),
  plus: (s) => svg('<path d="M12 5v14M5 12h14"/>', s),
  menu: (s) => svg('<path d="M4 7h16M4 12h16M4 17h16"/>', s),
  close: (s) => svg('<path d="M6 6l12 12M18 6 6 18"/>', s),
  copy: (s) => svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>', s),
  external: (s) => svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', s),
  // Service / reason pictograms
  calendar: (s) => svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', s),
  chat: (s) => svg('<path d="M4 5h16v11H9l-5 4z"/>', s),
  tool: (s) => svg('<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5"/><path d="M14.5 6.5 17 4"/>', s),
  plug: (s) => svg('<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>', s),
  machine: (s) => svg('<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M8 6h5M8 9.5h5M8 13h5M16 6v7M8 17.5h8"/>', s),
  box: (s) => svg('<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 9h18M3 15h18M12 3v18"/>', s),
};

// Brand mark: front view of a vending machine (cells + touch panel).
export const logoMark = `<svg class="logo-mark" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="4" y="2" width="24" height="28" rx="2.5" fill="currentColor"/><g fill="#fff"><rect x="7.5" y="5.5" width="4.5" height="4" rx=".6"/><rect x="13.5" y="5.5" width="4.5" height="4" rx=".6"/><rect x="7.5" y="11" width="4.5" height="4" rx=".6"/><rect x="13.5" y="11" width="4.5" height="4" rx=".6"/><rect x="7.5" y="16.5" width="4.5" height="4" rx=".6"/><rect x="13.5" y="16.5" width="4.5" height="4" rx=".6"/><rect x="7.5" y="23.5" width="10.5" height="3" rx=".6"/></g><rect x="20.5" y="5.5" width="4" height="9" rx=".6" fill="#3fa34d"/></svg>`;
