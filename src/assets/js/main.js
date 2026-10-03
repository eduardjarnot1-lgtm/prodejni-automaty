// Small progressive enhancements. The site works without JavaScript.
(function () {
  'use strict';

  // ---- Mobile navigation ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hlavni-navigace');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1061px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  // ---- Map: loaded only on request (third-party content) ----
  var map = document.querySelector('[data-map-src]');
  if (map) {
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

  // ---- Inquiry form ----
  // No submission backend exists yet. The form validates input and prepares
  // an e-mail (mailto:) for the visitor to send. It never claims the inquiry
  // was delivered.
  var form = document.getElementById('poptavka-form');
  if (!form) return;

  var select = document.getElementById('f-zajem');
  var result = document.getElementById('poptavka-vysledek');
  var output = document.getElementById('f-text');
  var mailtoLink = document.getElementById('f-mailto');
  var status = result.querySelector('.copy-status');
  var to = form.getAttribute('data-email');

  // Preselect product/service from links like kontakt.html#poptat-<id>.
  function preselect() {
    var m = /^#poptat-([a-z0-9-]+)$/.exec(location.hash);
    if (!m) return;
    var opt = select.querySelector('option[data-id="' + m[1] + '"]');
    if (opt) select.value = opt.value;
  }
  preselect();
  window.addEventListener('hashchange', preselect);

  var fields = [
    { el: document.getElementById('f-jmeno'), ok: function (v) { return v.trim().length > 1; } },
    { el: document.getElementById('f-email'), ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
    { el: select, ok: function (v) { return v !== ''; } },
    { el: document.getElementById('f-zprava'), ok: function (v) { return v.trim().length > 2; } },
  ];

  function check(f) {
    var valid = f.ok(f.el.value);
    var err = document.getElementById(f.el.id + '-err');
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
})();
