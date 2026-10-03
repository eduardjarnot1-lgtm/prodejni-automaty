// Motion system (GSAP + ScrollTrigger + Flip).
//
// All JavaScript animation on the site goes through this file, so there is
// one set of timings and eases (MOTION below) and one place that cleans up.
// Hover/focus feedback stays in CSS (quick, no JS needed); its timings are the
// --dur-* / --ease-* tokens in styles.css.
//
// Entrances and reveals animate opacity (never visibility), so content that
// has not been revealed yet can still be focused, clicked and read by
// assistive technology; focusing it scrolls it into view, which reveals it.
//
// Each page's animations live in a gsap.matchMedia() context created by
// Motion.initPage(main) and reverted by Motion.destroyPage(main). The page
// transition (zoom-through.js) calls these when it swaps <main>, so no
// ScrollTrigger or timeline survives a route change.
//
// If GSAP fails to load, window.Motion is not defined and the site works
// without these animations (content is never hidden in that case).
(function () {
  'use strict';

  var gsap = window.gsap;
  if (!gsap) { document.documentElement.classList.remove('anim-pending'); return; }
  var ScrollTrigger = window.ScrollTrigger;
  var Flip = window.Flip;
  gsap.registerPlugin.apply(gsap, [ScrollTrigger, Flip].filter(Boolean));

  // ---- Settings: adjust timing and easing here ----
  var MOTION = {
    ease: 'power3.out',        // default entrance ease
    easeInOut: 'power2.inOut', // movements between two states
    fast: 0.22,                // s, small UI changes (menus, indicators)
    base: 0.45,                // s, panels, swaps
    reveal: 0.8,               // s, section entrances
    stagger: 0.08,             // s, between items in a group
    distance: 32,              // px, entrance offset on desktop
    distanceMobile: 18,        // px, entrance offset on small screens
    start: 'top 86%',          // when a scroll reveal starts
  };
  gsap.defaults({ ease: MOTION.ease, duration: MOTION.reveal });

  var root = document.documentElement;
  var QUERIES = {
    reduce: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
    mobile: '(max-width: 899px) and (prefers-reduced-motion: no-preference)',
  };
  var reduceMotion = function () { return window.matchMedia(QUERIES.reduce).matches; };
  var toArray = function (x) { return Array.prototype.slice.call(x || []); };
  var contexts = new WeakMap();

  // ---------------------------------------------------------------------
  // Page entrance (initial load only; after a route change the zoom-through
  // transition is the entrance, so it is not repeated)
  // ---------------------------------------------------------------------
  function heroIntro(main, mobile) {
    var hero = main.querySelector('.hero');
    var head = main.querySelector('.page-head__inner');
    var bar = document.querySelector('.site-header__bar');
    var d = mobile ? MOTION.distanceMobile : MOTION.distance;
    var tl = gsap.timeline({ defaults: { duration: MOTION.reveal } });
    if (bar) tl.from(bar, { opacity: 0, y: -10, duration: 0.6 }, 0);
    if (hero) {
      tl.from(hero.querySelectorAll('.hero__line'), { opacity: 0, yPercent: 45, duration: 0.9, stagger: 0.1 }, 0.05)
        .from(hero.querySelector('.hero__lead'), { opacity: 0, y: d * 0.6 }, 0.25)
        .from(hero.querySelectorAll('.hero__actions > *'), { opacity: 0, y: d * 0.5, stagger: MOTION.stagger, duration: 0.6 }, 0.35)
        .from(hero.querySelector('.hero__call'), { opacity: 0, y: d * 0.4, duration: 0.6 }, 0.45)
        // The video zooms by itself, so it only fades and rises: no scaling here.
        .from(hero.querySelector('.hero-video'), { opacity: 0, y: d, duration: 1 }, 0.15);
    } else if (head) {
      tl.from(head.children, { opacity: 0, y: d * 0.6, stagger: MOTION.stagger }, 0.05);
    }
    return tl;
  }

  // ---------------------------------------------------------------------
  // Scroll reveals: each section type has its own choreography
  // ---------------------------------------------------------------------
  function reveals(main, mobile, skipInView) {
    if (!ScrollTrigger) return;
    var d = mobile ? MOTION.distanceMobile : MOTION.distance;
    var vh = window.innerHeight;
    var later = function (els) {
      // Content already on screen after a route change stays as it is.
      return toArray(els).filter(function (el) { return !skipInView || el.getBoundingClientRect().top >= vh; });
    };
    function batch(selector, from, to) {
      var els = later(main.querySelectorAll(selector));
      if (!els.length) return;
      gsap.set(els, from);
      ScrollTrigger.batch(els, {
        start: MOTION.start,
        once: true,
        onEnter: function (group) {
          gsap.to(group, Object.assign({ opacity: 1, x: 0, y: 0, stagger: MOTION.stagger, overwrite: true, clearProps: 'transform,opacity,visibility' }, to || {}));
        },
      });
    }

    // Section headings: heading first, then its text.
    later(main.querySelectorAll('.section-head, .featured__head')).forEach(function (head) {
      gsap.from(head.children, { opacity: 0, y: d * 0.7, stagger: 0.1, scrollTrigger: { trigger: head, start: MOTION.start, once: true } });
    });
    // Trust points slide in from the left, one after another.
    batch('.reasons__list > li', { opacity: 0, x: mobile ? 0 : -d * 0.6, y: mobile ? d * 0.5 : 0 });
    // Product and category cards rise in sequence; the photo settles inside its frame.
    later(main.querySelectorAll('.pcard, .cat')).forEach(function (card) {
      var img = card.querySelector('.pcard__media img, .cat__media img');
      gsap.set(card, { opacity: 0, y: d * 1.4 });
      if (img) gsap.set(img, { scale: 0.94 });
    });
    ScrollTrigger.batch(later(main.querySelectorAll('.pcard, .cat')), {
      start: MOTION.start, once: true,
      onEnter: function (group) {
        gsap.to(group, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, clearProps: 'transform,opacity,visibility' });
        gsap.to(group.map(function (c) { return c.querySelector('.pcard__media img, .cat__media img'); }).filter(Boolean),
          { scale: 1, stagger: 0.12, duration: 1.1, ease: 'power2.out', clearProps: 'transform' });
      },
    });
    // Service tiles cascade across the grid.
    batch('.svc-grid > li', { opacity: 0, y: d * 0.6 }, { stagger: { each: 0.05, grid: 'auto', from: 'start' }, duration: 0.6 });
    // Process steps: the top rule draws, then the text follows.
    later(main.querySelectorAll('.steps')).forEach(function (list) {
      var bars = list.querySelectorAll('.step__bar');
      var texts = list.querySelectorAll('.step > :not(.step__bar)');
      var tl = gsap.timeline({ scrollTrigger: { trigger: list, start: MOTION.start, once: true } });
      tl.from(bars, { scaleX: 0, transformOrigin: 'left center', duration: 0.7, stagger: 0.15, ease: MOTION.easeInOut })
        .from(texts, { opacity: 0, y: 12, duration: 0.5, stagger: 0.05 }, 0.2);
    });
    // Featured machines: text from the side, the switcher from below.
    batch('.featured .showcase', { opacity: 0, y: d * 1.2 }, { duration: 1 });
    // Contact band: list items one by one.
    batch('.band-dark__grid > div:first-child, .contact-list--dark > li', { opacity: 0, y: d * 0.5 }, { stagger: 0.07, duration: 0.6 });
    // Everything else: a short, quiet rise.
    batch('.svc-item, .examples__list > li, .product-info > section, .about__text, .facts > div, .disclosure, .narrow > h2, .contact > *, .pgallery__thumbs',
      { opacity: 0, y: d * 0.6 }, { duration: 0.65 });

    // Gallery panel: the guide lines open out from the centre, then the photos arrive with depth.
    later(main.querySelectorAll('.gallery')).forEach(function (g) {
      var tl = gsap.timeline({ scrollTrigger: { trigger: g, start: 'top 75%', once: true } });
      var lines = g.querySelector('.gallery__lines');
      if (lines) tl.from(lines, { opacity: 0, scale: 1.08, transformOrigin: '50% 43%', duration: 1.2, ease: MOTION.easeInOut }, 0);
      tl.from(g.querySelector('.gallery__slot--b'), { opacity: 0, y: d * 2, duration: 1 }, 0)
        .from(g.querySelectorAll('.gallery__slot--a, .gallery__slot--c'), { opacity: 0, y: d * 1.4, stagger: 0.12, duration: 0.9 }, 0.15)
        .from(g.querySelectorAll('.gallery__text, .gallery__caption'), { opacity: 0, y: d * 0.5, stagger: 0.08, duration: 0.6 }, 0.35);
    });
  }

  // Subtle scroll-linked depth in the gallery panel: the small photos drift at
  // different speeds (desktop only; normal scrolling).
  function parallax(main) {
    if (!ScrollTrigger) return;
    toArray(main.querySelectorAll('.gallery')).forEach(function (g) {
      var st = { trigger: g, start: 'top bottom', end: 'bottom top', scrub: 0.6 };
      gsap.fromTo(g.querySelector('.gallery__slot--a'), { y: 36 }, { y: -36, ease: 'none', scrollTrigger: st });
      gsap.fromTo(g.querySelector('.gallery__slot--c'), { y: -28 }, { y: 28, ease: 'none', scrollTrigger: st });
    });
  }

  function initPage(main, opts) {
    opts = opts || {};
    destroyPage(main);
    var mm = gsap.matchMedia();
    mm.add(QUERIES, function (ctx) {
      var c = ctx.conditions;
      if (c.reduce) return;
      var mobile = !!c.mobile;
      if (!opts.fromRoute && !initPage.done) heroIntro(main, mobile);
      reveals(main, mobile, !!opts.skipInView);
      if (c.desktop) parallax(main);
    });
    initPage.done = true;
    contexts.set(main, mm);
    root.classList.remove('anim-pending');
    if (ScrollTrigger) ScrollTrigger.refresh();
  }

  function destroyPage(main) {
    var mm = contexts.get(main);
    if (mm) { mm.revert(); contexts.delete(main); }
    gsap.killTweensOf(main.querySelectorAll('*'));
  }

  // ---------------------------------------------------------------------
  // Reusable UI motion
  // ---------------------------------------------------------------------

  // Expand/collapse to the content height (FAQ, etc.).
  function toggleHeight(el, open, done) {
    gsap.killTweensOf(el);
    if (reduceMotion()) { if (done) done(); return; }
    if (open) {
      gsap.fromTo(el, { height: 0, autoAlpha: 0, overflow: 'hidden' },
        { height: 'auto', autoAlpha: 1, duration: MOTION.base, ease: MOTION.easeInOut, clearProps: 'height,overflow,opacity,visibility', onComplete: done });
    } else {
      gsap.to(el, { height: 0, autoAlpha: 0, overflow: 'hidden', duration: MOTION.fast + 0.08, ease: 'power2.in',
        onComplete: function () { gsap.set(el, { clearProps: 'height,overflow,opacity,visibility' }); if (done) done(); } });
    }
  }

  // Mobile navigation panel.
  function navPanel(nav, open, done) {
    gsap.killTweensOf([nav, nav.querySelectorAll('a, .btn')]);
    if (reduceMotion()) { if (done) done(); return; }
    if (open) {
      gsap.fromTo(nav, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: MOTION.fast + 0.06, ease: MOTION.ease, clearProps: 'all' });
      gsap.from(nav.querySelectorAll('.site-nav__list a, .site-nav__actions > *'), { autoAlpha: 0, y: 8, stagger: 0.035, duration: 0.3, delay: 0.05, clearProps: 'all' });
      if (done) done();
    } else {
      gsap.to(nav, { autoAlpha: 0, y: -8, duration: MOTION.fast, ease: 'power2.in', onComplete: function () { if (done) done(); gsap.set(nav, { clearProps: 'all' }); } });
    }
  }

  // Animated navigation indicator (desktop): a bar that follows the
  // hovered/focused link and rests under the current page.
  function initNavIndicator() {
    var desktop = window.matchMedia('(min-width: 1061px)');
    var lists = toArray(document.querySelectorAll('.site-nav__list'));
    if (!lists.length) return;
    root.classList.add('has-nav-ind');
    var items = lists.map(function (list) {
      var ind = document.createElement('li');
      ind.className = 'nav-ind';
      ind.setAttribute('aria-hidden', 'true');
      ind.setAttribute('role', 'presentation');
      list.appendChild(ind);
      return { list: list, ind: ind };
    });
    function place(item, link, instant) {
      var props = link
        ? { x: link.offsetLeft, width: link.offsetWidth, autoAlpha: 1, backgroundColor: link.getAttribute('aria-current') ? '#3fa34d' : '#121417' }
        : { autoAlpha: 0 };
      gsap.to(item.ind, Object.assign({ duration: instant || reduceMotion() ? 0 : MOTION.base * 0.8, ease: MOTION.ease, overwrite: true }, props));
    }
    function rest(item, instant) { place(item, item.list.querySelector('a[aria-current="page"]'), instant); }
    items.forEach(function (item) {
      item.list.addEventListener('pointerover', function (e) { var a = e.target.closest('a'); if (a && desktop.matches) place(item, a); });
      item.list.addEventListener('focusin', function (e) { var a = e.target.closest('a'); if (a && desktop.matches) place(item, a); });
      item.list.addEventListener('pointerleave', function () { rest(item); });
      item.list.addEventListener('focusout', function (e) { if (!item.list.contains(e.relatedTarget)) rest(item); });
      rest(item, true);
    });
    var update = function () { items.forEach(function (item) { rest(item, true); }); };
    window.addEventListener('resize', update);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    Motion.updateNav = function () { items.forEach(function (item) { rest(item); }); };
  }

  // Photo swap inside a fixed frame: outgoing fades up, incoming rises in.
  function crossfade(outEl, inEl, done) {
    if (reduceMotion()) { if (done) done(); return; }
    gsap.killTweensOf([outEl, inEl]);
    var tl = gsap.timeline({ onComplete: done });
    if (outEl) tl.to(outEl, { autoAlpha: 0, y: -10, duration: MOTION.fast, ease: 'power2.in' });
    tl.fromTo(inEl, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: MOTION.base, ease: MOTION.ease, clearProps: 'transform,opacity,visibility' }, outEl ? '-=0.05' : 0);
    return tl;
  }

  // Swap elements between positions with GSAP Flip (gallery panel).
  function flip(targets, change, onDone) {
    if (!Flip || reduceMotion()) { change(); if (onDone) onDone(); return; }
    var state = Flip.getState(targets);
    change();
    Flip.from(state, { duration: 0.75, ease: MOTION.easeInOut, absolute: true, zIndex: 5, onComplete: onDone });
  }

  var Motion = window.Motion = {
    settings: MOTION,
    initPage: initPage,
    destroyPage: destroyPage,
    toggleHeight: toggleHeight,
    navPanel: navPanel,
    crossfade: crossfade,
    flip: flip,
    updateNav: function () {},
    refresh: function () { if (ScrollTrigger) ScrollTrigger.refresh(); },
  };

  initNavIndicator();
})();
