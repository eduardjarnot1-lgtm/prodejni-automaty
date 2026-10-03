// Small progressive enhancements. The site works without JavaScript.
//
// Structure:
//   - site-wide features (navigation, header) are set up once;
//   - page features are set up by SiteApp.initPage(main), which runs for the
//     initial page and again for content swapped in by zoom-through.js.
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = function () {
    return !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  // =========================================================================
  // Site-wide (once)
  // =========================================================================

  // ---- Mobile navigation ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hlavni-navigace');
  var setNavOpen = function () {};
  if (toggle && nav) {
    setNavOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setNavOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNavOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1061px)').addEventListener('change', function (mq) {
      if (mq.matches) setNavOpen(false);
    });
  }

  // ---- Header: floating pill after scrolling past the top ----
  var header = document.querySelector('.site-header');
  var updateHeader = function () {};
  if (header) {
    var stuck = false;
    updateHeader = function () {
      var should = window.scrollY > 160;
      if (should === stuck) return;
      stuck = should;
      header.classList.toggle('is-stuck', stuck);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ---- Scroll reveals (one observer for the whole session) ----
  // Content is visible by default. Elements are only hidden after this code
  // has run, and each is revealed once when it enters the viewport.
  var REVEAL = [
    '.reasons__list > li', '.section-head', '.cat', '.pcard', '.svc', '.step',
    '.svc-item', '.examples__list > li', '.product-info > section', '.about-short > *',
    '.about__text', '.facts', '.band-dark__grid > *', '.disclosure', '.narrow > h2',
    '.gallery__item', '.gallery__text', '.featured__head', '.showcase',
  ].join(',');
  var io = null;
  if (!reduceMotion() && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        el.setAttribute('data-reveal', 'in');
        // Drop the reveal styles afterwards so hover transitions are not delayed.
        var done = function () { el.setAttribute('data-reveal', 'done'); el.style.removeProperty('--i'); };
        el.addEventListener('transitionend', function handler(ev) {
          if (ev.target !== el || ev.propertyName !== 'opacity') return;
          el.removeEventListener('transitionend', handler);
          done();
        });
        setTimeout(done, 1600); // fallback if transitionend does not fire
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    root.classList.add('reveal-ready');
  }

  // Preselect product/service in the inquiry form from kontakt.html#poptat-<id>.
  function preselect() {
    var select = document.getElementById('f-zajem');
    var m = /^#poptat-([a-z0-9-]+)$/.exec(location.hash);
    if (!select || !m) return;
    var opt = select.querySelector('option[data-id="' + m[1] + '"]');
    if (opt) select.value = opt.value;
  }
  window.addEventListener('hashchange', preselect);

  // =========================================================================
  // Page features (per <main>)
  // =========================================================================

  // opts.skipInView: content swapped in by a page transition is already shown,
  // so elements currently in the viewport are not hidden again.
  function initReveals(scope, opts) {
    if (!io) return;
    each(scope.querySelectorAll(REVEAL), function (el) {
      if (opts && opts.skipInView && el.getBoundingClientRect().top < window.innerHeight) return;
      // Stagger siblings of the same group, capped so long lists stay quick.
      var idx = 0, sib = el.previousElementSibling;
      while (sib && idx < 4) { if (sib.matches(REVEAL)) idx++; sib = sib.previousElementSibling; }
      el.style.setProperty('--i', idx);
      el.setAttribute('data-reveal', 'pending');
      io.observe(el);
    });
  }

  // ---- Map: loaded only on request (third-party content) ----
  function initMap(scope) {
    var map = scope.querySelector('[data-map-src]');
    if (!map) return;
    var loadBtn = map.querySelector('[data-map-load]');
    var frame = map.querySelector('.map__frame');
    loadBtn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = map.getAttribute('data-map-src');
      iframe.title = 'Mapa s adresou provozovny';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      frame.appendChild(iframe);
      frame.hidden = false;
      loadBtn.hidden = true;
    });
  }

  // ---- Hero showcase: user-controlled switching between featured machines ----
  // Previous/next arrows and dots; nothing changes automatically. Photo and
  // detail card share one panel, so they always change together.
  function initShowcase(scope) {
    each(scope.querySelectorAll('[data-showcase]'), function (box) {
      var panels = Array.prototype.slice.call(box.querySelectorAll('.showcase__panel'));
      var dots = Array.prototype.slice.call(box.querySelectorAll('[data-sc-go]'));
      var idxOut = box.querySelector('[data-sc-index]');
      var nameOut = box.querySelector('[data-sc-name]');
      if (panels.length < 2) {
        var controls = box.querySelector('.showcase__controls');
        if (controls) controls.hidden = true;
        return;
      }
      var current = 0;
      panels.forEach(function (panel, i) { if (i !== current) panel.setAttribute('inert', ''); });

      function go(i) {
        i = (i + panels.length) % panels.length;
        if (i === current) return;
        box.classList.add('has-switched');
        panels[current].classList.remove('is-active');
        panels[current].setAttribute('inert', '');
        panels[i].classList.add('is-active');
        panels[i].removeAttribute('inert');
        dots.forEach(function (d, k) { d.setAttribute('aria-pressed', String(k === i)); });
        current = i;
        if (idxOut) idxOut.textContent = String(i + 1);
        if (nameOut) nameOut.textContent = dots[i] ? dots[i].textContent.trim() : '';
      }

      var prev = box.querySelector('[data-sc-prev]');
      var next = box.querySelector('[data-sc-next]');
      if (prev) prev.addEventListener('click', function () { go(current - 1); });
      if (next) next.addEventListener('click', function () { go(current + 1); });
      dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
      box.addEventListener('keydown', function (e) {
        if (!e.target.closest('.showcase__controls')) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
      });
    });
  }

  // ---- Accordions (<details>): smooth height animation ----
  // Native <details> keeps working without JavaScript.
  function initAccordions(scope) {
    each(scope.querySelectorAll('details.disclosure'), function (d) {
      var summary = d.querySelector('summary');
      var body = d.querySelector('.disclosure__body');
      var anim = null;
      summary.addEventListener('click', function (e) {
        if (reduceMotion() || !d.animate) return; // default toggle
        e.preventDefault();
        if (anim) anim.cancel();
        var opening = !d.open;
        var start = d.offsetHeight;
        if (opening) d.open = true;
        var end = opening ? d.offsetHeight : summary.offsetHeight;
        d.classList.add('is-animating');
        anim = d.animate([{ height: start + 'px' }, { height: end + 'px' }], {
          duration: 320, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        });
        if (opening) body.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
        anim.onfinish = function () {
          if (!opening) d.open = false;
          d.classList.remove('is-animating');
          anim = null;
        };
        anim.oncancel = function () { d.classList.remove('is-animating'); };
      });
    });
  }

  // ---- Inquiry form ----
  // No submission backend exists yet. The form validates input and prepares
  // an e-mail (mailto:) for the visitor to send. It never claims the inquiry
  // was delivered.
  function initForm(scope) {
    var form = scope.querySelector('#poptavka-form');
    if (!form) return;

    var select = form.querySelector('#f-zajem');
    var result = scope.querySelector('#poptavka-vysledek');
    var output = scope.querySelector('#f-text');
    var mailtoLink = scope.querySelector('#f-mailto');
    var status = result.querySelector('.copy-status');
    var to = form.getAttribute('data-email');

    preselect();

    var fields = [
      { el: form.querySelector('#f-jmeno'), ok: function (v) { return v.trim().length > 1; } },
      { el: form.querySelector('#f-email'), ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
      { el: select, ok: function (v) { return v !== ''; } },
      { el: form.querySelector('#f-zprava'), ok: function (v) { return v.trim().length > 2; } },
    ];

    function check(f) {
      var valid = f.ok(f.el.value);
      var err = scope.querySelector('#' + f.el.id + '-err');
      f.el.setAttribute('aria-invalid', String(!valid));
      err.hidden = valid;
      var described = (f.el.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== err.id; });
      if (!valid) described.push(err.id);
      if (described.length) f.el.setAttribute('aria-describedby', described.join(' '));
      else f.el.removeAttribute('aria-describedby');
      return valid;
    }

    fields.forEach(function (f) {
      f.el.addEventListener('blur', function () { if (f.el.hasAttribute('aria-invalid')) check(f); });
      f.el.addEventListener('input', function () { if (f.el.getAttribute('aria-invalid') === 'true') check(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      fields.forEach(function (f) { if (!check(f) && !firstInvalid) firstInvalid = f.el; });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = new FormData(form);
      var subject = 'Nezávazná poptávka – ' + data.get('zajem');
      var body = [
        'Zájem o: ' + data.get('zajem'),
        'Jméno: ' + data.get('jmeno').trim(),
        'E-mail: ' + data.get('email').trim(),
        data.get('telefon').trim() ? 'Telefon: ' + data.get('telefon').trim() : null,
        '',
        data.get('zprava').trim(),
      ].filter(function (x) { return x !== null; }).join('\n');

      var href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      output.value = 'Komu: ' + to + '\nPředmět: ' + subject + '\n\n' + body;
      mailtoLink.href = href;
      status.textContent = '';
      form.hidden = true;
      result.hidden = false;
      result.focus();
      window.location.href = href;
    });

    result.querySelector('[data-form-back]').addEventListener('click', function () {
      result.hidden = true;
      form.hidden = false;
      fields[0].el.focus();
    });

    result.querySelector('[data-copy]').addEventListener('click', function () {
      var done = function () { status.textContent = 'Text je zkopírovaný do schránky.'; };
      var fallback = function () {
        output.focus();
        output.select();
        status.textContent = 'Text je označený. Zkopírujte ho klávesami Ctrl+C (na Macu Cmd+C).';
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output.value).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  // ---- Hero video ----
  // Muted, inline, decorative clip. Autoplay starts after the page has loaded
  // and only while the video is on screen; it pauses when scrolled away or
  // when the tab is hidden. The clip ends in a close-up, so it plays once
  // (unless data-loop="true") and the full-machine poster fades back in.
  // With reduced motion, or if the browser blocks autoplay, the poster stays
  // and the visitor can start playback with the button.
  function initHeroVideo(scope) {
    each(scope.querySelectorAll('[data-hero-video]'), function (fig) {
      var video = fig.querySelector('video');
      var btn = fig.querySelector('.hero-video__toggle');
      if (!video || !btn || typeof video.play !== 'function') return;

      video.removeAttribute('controls');
      video.setAttribute('aria-hidden', 'true');
      video.setAttribute('tabindex', '-1');
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = fig.getAttribute('data-loop') === 'true';
      btn.hidden = false;

      var autoAllowed = !reduceMotion();
      var userPaused = false;
      var ended = false;
      var inView = false;
      var rewindTimer = 0;

      function setIcon(state) {
        var label = state === 'pause' ? 'Pozastavit video' : state === 'replay' ? 'Přehrát video znovu' : 'Přehrát video';
        btn.setAttribute('data-icon', state);
        btn.setAttribute('aria-label', label);
        btn.title = label;
      }
      setIcon('play');

      function play() {
        clearTimeout(rewindTimer);
        if (ended || video.ended) { try { video.currentTime = 0; } catch (e) { /* ignore */ } }
        ended = false;
        var result = video.play();
        if (result && result.catch) {
          result.catch(function () {           // autoplay blocked or failed: keep the poster
            fig.classList.remove('is-playing');
            setIcon('play');
          });
        }
      }

      video.addEventListener('playing', function () { fig.classList.add('is-playing'); setIcon('pause'); });
      video.addEventListener('pause', function () { if (!ended && !video.ended) setIcon('play'); });
      video.addEventListener('ended', function () {
        ended = true;
        fig.classList.remove('is-playing');   // poster (full machine) fades back in
        setIcon('replay');
        rewindTimer = setTimeout(function () { // rewind once the poster covers the video
          if (ended) { try { video.currentTime = 0; } catch (e) { /* ignore */ } }
        }, 800);
      });
      // Give up only when no source can be played (one failing <source> is fine).
      var fail = function () {
        if (video.error || video.networkState === video.NETWORK_NO_SOURCE) {
          fig.classList.remove('is-playing');
          btn.hidden = true;
        }
      };
      video.addEventListener('error', fail);
      var sources = video.querySelectorAll('source');
      if (sources.length) sources[sources.length - 1].addEventListener('error', fail);

      btn.addEventListener('click', function () {
        if (!video.paused && !video.ended) {
          userPaused = true;
          video.pause();
        } else {
          userPaused = false;
          play();
        }
      });

      function maybeAutoplay() {
        if (autoAllowed && inView && !userPaused && !ended && video.paused && !document.hidden) play();
      }
      function pauseQuietly() { if (!video.paused) video.pause(); }

      var start = function () {
        if ('IntersectionObserver' in window) {
          var vio = new IntersectionObserver(function (entries) {
            if (!fig.isConnected) { vio.disconnect(); return; }
            inView = entries[entries.length - 1].isIntersecting;
            if (inView) maybeAutoplay(); else pauseQuietly();
          }, { threshold: 0.35 });
          vio.observe(fig);
        } else {
          inView = true;
          maybeAutoplay();
        }
        document.addEventListener('visibilitychange', function () {
          if (!fig.isConnected) return;
          if (document.hidden) pauseQuietly(); else maybeAutoplay();
        });
      };
      // Never compete with the page itself: wait until it has loaded.
      if (document.readyState === 'complete') start();
      else window.addEventListener('load', start, { once: true });
    });
  }

  function initPage(main, opts) {
    initHeroVideo(main);
    initMap(main);
    initShowcase(main);
    initAccordions(main);
    initForm(main);
    initReveals(main, opts);
  }

  window.SiteApp = {
    initPage: initPage,
    closeNav: function () { setNavOpen(false); },
    updateHeader: function () { updateHeader(); },
    reduceMotion: reduceMotion,
  };

  var main = document.getElementById('obsah');
  if (main) initPage(main);
})();
