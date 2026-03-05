/* =============================================
   lang.js — Language Toggle Engine
   Tomoaki Eguchi Portfolio
   ============================================= */
(function () {
  const STORAGE_KEY = 'portfolio-lang';

  function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ja';
  }

  function applyLang(lang) {
    // 1. Set html[lang] attribute
    document.documentElement.lang = lang;

    // 2. Swap plain-text elements (data-ja / data-en)
    document.querySelectorAll('[data-ja][data-en]').forEach(function (el) {
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.ja;
    });

    // 3. Swap elements with HTML children (data-ja-html / data-en-html)
    //    e.g. .tl-text containing <strong> and <span> children
    document.querySelectorAll('[data-ja-html][data-en-html]').forEach(function (el) {
      el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.jaHtml;
    });

    // 4. Swap link hrefs (data-ja-href / data-en-href)
    document.querySelectorAll('[data-ja-href][data-en-href]').forEach(function (el) {
      el.href = lang === 'en' ? el.dataset.enHref : el.dataset.jaHref;
    });

    // 5. Update toggle button label
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? 'JA' : 'EN';

    // 6. Persist preference
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function injectButton() {
    var nav = document.querySelector('nav');
    if (!nav || document.getElementById('lang-toggle')) return;

    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.textContent = getCurrentLang() === 'en' ? 'JA' : 'EN';
    btn.setAttribute('aria-label', 'Toggle language / 言語切替');

    btn.addEventListener('click', function () {
      applyLang(getCurrentLang() === 'ja' ? 'en' : 'ja');
    });

    // Register custom cursor effects (mirrors the inline script in each page)
    btn.addEventListener('mouseenter', function () {
      var cursor = document.getElementById('cursor');
      var ring = document.getElementById('cursorRing');
      if (cursor) cursor.style.transform = 'scale(2)';
      if (ring) { ring.style.transform = 'scale(1.5)'; ring.style.borderColor = 'rgba(0,212,255,0.8)'; }
    });
    btn.addEventListener('mouseleave', function () {
      var cursor = document.getElementById('cursor');
      var ring = document.getElementById('cursorRing');
      if (cursor) cursor.style.transform = 'scale(1)';
      if (ring) { ring.style.transform = 'scale(1)'; ring.style.borderColor = 'rgba(0,212,255,0.4)'; }
    });

    nav.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectButton();
    var saved = getCurrentLang();
    if (saved === 'en') applyLang('en');
    // If 'ja', no-op — page already loads in Japanese
  });
})();
