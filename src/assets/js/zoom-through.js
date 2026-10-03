// "Zoom Through" page transition between the main pages.
//
// Internal links between Úvod, Automaty, Služby, O nás and Kontakt load the
// destination page in the background, then animate the real page content:
//   outgoing <main>: scale 1 → scaleOut, opacity 1 → 0
//   incoming <main>: scale scaleIn → 1, opacity 0 → 1
// Both run together around the viewport centre. The header stays in place.
//
// Settings come from site.pageTransition (src/data/site.js), which the
// layout prints as window.ZOOM_THROUGH. Any failure falls back to a normal
// page load, so navigation never depends on the animation.
(function () {
  'use strict';

  var cfg = window.ZOOM_THROUGH || {};
  var app = window.SiteApp;
  if (cfg.enabled === false || !app) return;
  if (!window.fetch || !window.DOMParser || !window.history || !history.pushState ||
      !Element.prototype.animate || !('inert' in HTMLElement.prototype)) return;

  var doc = document;
  var root = doc.documentElement;
  var PAGES = cfg.pages || ['index.html', 'automaty.html', 'sluzby.html', 'o-nas.html', 'kontakt.html'];
  var DURATION = Number(cfg.duration) || 2500;
  var SCALE_OUT = Number(cfg.scaleOut) || 3;
  var SCALE_IN = Number(cfg.scaleIn) || 3;
  var EASING = cfg.easing || 'cubic-bezier(0.65, 0, 0.35, 1)'; // Web Animations fallback
  var GSAP_EASE = cfg.gsapEase || 'power2.inOut';              // used when GSAP is loaded
  var REDUCED_DURATION = cfg.reducedMotionDuration == null ? 180 : Number(cfg.reducedMotionDuration);
  var IMAGE_WAIT = 1500;   // ms, max wait for visible images of the destination
  var FETCH_TIMEOUT = 8000;

  // The site root is the directory of the home link in the header.
  var brand = doc.querySelector('.site-header .brand');
  if (!brand) return;
  var basePath = new URL(brand.getAttribute('href'), location.href).pathname.replace(/[^/]*$/, '');

  // Main page file name for a URL, or null for anything else.
  function pageOf(url) {
    if (url.origin !== location.origin || url.pathname.indexOf(basePath) !== 0) return null;
    var rest = url.pathname.slice(basePath.length) || 'index.html';
    return PAGES.indexOf(rest) >= 0 ? rest : null;
  }

  var currentPage = pageOf(new URL(location.href));
  if (!currentPage) return; // only main pages take part (product pages load normally)

  // ---- History & scroll restoration ----
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var saveScroll = function () {
    try { history.replaceState(Object.assign({}, history.state, { zt: true, scrollY: window.scrollY }), ''); } catch (e) { /* ignore */ }
  };
  var savedState = history.state;
  saveScroll();
  // Manual restoration also applies to reloads; restore the position ourselves.
  if (savedState && savedState.zt && savedState.scrollY && !location.hash) window.scrollTo(0, savedState.scrollY);
  var scrollTimer = 0;
  window.addEventListener('scroll', function () {
    if (active) return;
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(saveScroll, 150);
  }, { passive: true });

  // ---- Loading destination pages (with prefetch on hover/focus) ----
  var cache = {};
  function load(href) {
    var key = href.split('#')[0];
    if (!cache[key]) {
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, FETCH_TIMEOUT);
      cache[key] = fetch(key, { credentials: 'same-origin', signal: ctrl ? ctrl.signal : undefined })
        .then(function (res) {
          clearTimeout(timer);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.text();
        })
        .catch(function (err) { delete cache[key]; throw err; });
    }
    return cache[key];
  }

  function eligibleLink(a) {
    if (!a || !a.href) return null;
    if (a.target && a.target !== '_self') return null;
    if (a.hasAttribute('download')) return null;
    var raw = a.getAttribute('href') || '';
    if (raw.charAt(0) === '#') return null;                 // in-page anchor
    var url;
    try { url = new URL(a.href); } catch (e) { return null; }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null; // tel:, mailto:, …
    return pageOf(url) ? url : null;
  }

  function prefetch(e) {
    var a = e.target.closest && e.target.closest('a[href]');
    var url = eligibleLink(a);
    if (url && pageOf(url) !== currentPage) load(url.href).catch(function () {});
  }
  doc.addEventListener('pointerover', prefetch, { passive: true });
  doc.addEventListener('focusin', prefetch);
  doc.addEventListener('touchstart', prefetch, { passive: true });

  // ---- Click handling ----
  doc.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    var url = eligibleLink(a);
    if (!url) return;
    if (pageOf(url) === currentPage) {
      if (active) { e.preventDefault(); active.finishNow(); return; } // already heading there
      if (url.hash) return;                 // same page with an anchor: normal jump
      e.preventDefault();                   // current page: no replay
      app.closeNav();
      return;
    }
    e.preventDefault();
    navigate(url, { push: true });
  });

  window.addEventListener('popstate', function (e) {
    var url = new URL(location.href);
    var page = pageOf(url);
    if (!page) { location.reload(); return; }
    if (page === currentPage && !active) return; // hash change within the page
    navigate(url, { push: false, scrollY: (e.state && e.state.scrollY) || 0 });
  });

  // Never keep a half-finished transition in the back/forward cache.
  window.addEventListener('pagehide', function () { if (active) active.finishNow(); });

  // ---- Navigation ----
  var seq = 0;
  var active = null;

  function navigate(url, opts) {
    var id = ++seq;
    if (active) active.finishNow();          // replace, never stack
    app.closeNav();
    root.classList.add('zt-loading');

    load(url.href).then(function (html) {
      if (id !== seq) return;                // a newer navigation took over
      var next = new DOMParser().parseFromString(html, 'text/html');
      var newMain = next.querySelector('main#obsah');
      if (!newMain) throw new Error('No <main> in destination');

      if (opts.push) {
        saveScroll();
        history.pushState({ zt: true, scrollY: 0 }, '', url.href);
      }
      currentPage = pageOf(url);
      root.classList.remove('zt-loading');
      return run(doc.adoptNode(newMain), next, url, opts);
    }).catch(function () {
      if (id === seq) location.href = url.href; // fall back to a normal page load
    });
  }

  function run(newMain, nextDoc, url, opts) {
    var oldMain = doc.getElementById('obsah');
    var reduce = app.reduceMotion();
    // Stop the outgoing page's own motion first: its ScrollTriggers, timelines
    // and video. Nothing from it keeps running during or after the transition.
    if (app.destroyPage) app.destroyPage(oldMain);
    var rect = oldMain.getBoundingClientRect();
    var docTop = rect.top + window.scrollY;
    var targetScroll = opts.scrollY || 0;

    // Keep the document height while the old <main> is lifted out.
    // Moving nodes restarts CSS animations; entrance effects must not replay.
    oldMain.setAttribute('data-zt-swapped', '');
    newMain.setAttribute('data-zt-swapped', '');

    var holder = doc.createElement('div');
    holder.style.height = rect.height + 'px';
    oldMain.replaceWith(holder);
    oldMain.removeAttribute('id');
    root.classList.add('zt-lock');

    var stage = doc.createElement('div');
    stage.className = 'zt-stage';
    stage.inert = true;                      // nothing inside is focusable or announced
    var oldLayer = makeLayer(oldMain, rect.top, rect.left, rect.width);
    var newLayer = makeLayer(newMain, docTop - targetScroll, rect.left, rect.width);
    newLayer.style.opacity = '0';
    stage.appendChild(newLayer);
    stage.appendChild(oldLayer);
    doc.body.appendChild(stage);

    var anims = [];
    var committed = false;

    function commit() {
      if (committed) return;
      committed = true;
      anims.forEach(function (a) { try { a.cancel(); } catch (e) { /* ignore */ } });
      newMain.removeAttribute('style');
      holder.replaceWith(newMain);
      stage.remove();
      root.classList.remove('zt-lock');

      // Page metadata and current navigation item.
      doc.title = nextDoc.title;
      ['description', 'og:title', 'og:description'].forEach(function (name) {
        var src = nextDoc.querySelector('meta[name="' + name + '"], meta[property="' + name + '"]');
        var dst = doc.querySelector('meta[name="' + name + '"], meta[property="' + name + '"]');
        if (src && dst) dst.setAttribute('content', src.getAttribute('content'));
      });
      doc.querySelectorAll('.site-header a[href]').forEach(function (a) {
        var p = null;
        try { p = pageOf(new URL(a.href)); } catch (e) { /* ignore */ }
        if (!p || a.hash) return;
        if (p === currentPage) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });

      // Scroll: back/forward restores, links to an anchor jump there, others start at the top.
      var target = url.hash && doc.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (opts.push && target) target.scrollIntoView();
      else window.scrollTo(0, targetScroll);
      app.updateHeader();
      if (app.updateNav) app.updateNav();
      saveScroll();

      // The zoom was this page's entrance: set up its scroll animations only.
      app.initPage(newMain, { skipInView: true, fromRoute: true });

      // Move focus to the new page's main heading for keyboard and screen-reader users.
      var h1 = newMain.querySelector('h1');
      if (h1) {
        if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
      active = null;
    }

    active = { finishNow: commit };

    // Prepare the destination: wait (briefly) for images visible at the start.
    return waitForImages(newMain).then(function () {
      if (committed) return;
      var gsap = window.gsap;
      if (gsap && !reduce) {
        // One GSAP timeline drives both layers, so it can be stopped as a whole.
        var tl = gsap.timeline({ defaults: { duration: DURATION / 1000, ease: GSAP_EASE } });
        tl.fromTo(oldLayer, { scale: 1, autoAlpha: 1 }, { scale: SCALE_OUT, autoAlpha: 0 }, 0)
          .fromTo(newLayer, { scale: SCALE_IN, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 }, 0);
        anims.push({ cancel: function () { tl.kill(); } });
        newLayer.style.opacity = '';
        return new Promise(function (res) { tl.eventCallback('onComplete', res); });
      }
      if (reduce) {
        oldLayer.style.opacity = '0';
        anims.push(newLayer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: REDUCED_DURATION, easing: 'ease-out', fill: 'forwards' }));
      } else {
        var timing = { duration: DURATION, easing: EASING, fill: 'forwards' };
        anims.push(oldLayer.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(' + SCALE_OUT + ')', opacity: 0 },
        ], timing));
        anims.push(newLayer.animate([
          { transform: 'scale(' + SCALE_IN + ')', opacity: 0 },
          { transform: 'scale(1)', opacity: 1 },
        ], timing));
      }
      newLayer.style.opacity = '';
      return anims[anims.length - 1].finished;
    }).then(commit, commit);
  }

  // A viewport-sized, clipped layer holding one page's <main>, placed exactly
  // where that content appears on screen. Scaling the layer (not the tall
  // page) keeps the zoom centred on the viewport and bounds the work.
  function makeLayer(main, top, left, width) {
    var layer = doc.createElement('div');
    layer.className = 'zt-layer';
    main.style.position = 'absolute';
    main.style.top = top + 'px';
    main.style.left = left + 'px';
    main.style.width = width + 'px';
    main.style.margin = '0';
    layer.appendChild(main);
    return layer;
  }

  function waitForImages(main) {
    var vh = window.innerHeight;
    var imgs = Array.prototype.filter.call(main.querySelectorAll('img'), function (img) {
      var r = img.getBoundingClientRect();
      return r.bottom > 0 && r.top < vh;
    });
    var jobs = imgs.map(function (img) {
      img.loading = 'eager';
      if (img.complete && img.naturalWidth) return Promise.resolve();
      return img.decode ? img.decode().catch(function () {}) : new Promise(function (res) {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      });
    });
    var timeout = new Promise(function (res) { setTimeout(res, IMAGE_WAIT); });
    return Promise.race([Promise.all(jobs), timeout]);
  }
})();
