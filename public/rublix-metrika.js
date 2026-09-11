(function () {
  "use strict";
  if (document.getElementById("rublix-analytics-settings")) return;

  var counterId = 112468969;
  var storageKey = "rublix.analytics-consent.v1";
  var lifetime = 180 * 24 * 60 * 60 * 1000;
  var choice = null;
  var ready = false;
  var loading = false;
  var libraryLoaded = false;

  function parseChoice(value) {
    try {
      var stored = JSON.parse(value);
      if (stored && stored.expiresAt > Date.now() &&
          (stored.value === "accepted" || stored.value === "declined")) return stored.value;
    } catch { /* Invalid preferences do not grant consent. */ }
    return null;
  }
  try { choice = parseChoice(localStorage.getItem(storageKey)); } catch { /* Ask again without storage. */ }

  function element(tag, text, className) {
    var node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  var style = element("style");
  style.textContent = [
    ".rublix-analytics{font:14px/1.5 Manrope,Arial,sans-serif;color:#172821;box-sizing:border-box}",
    ".rublix-analytics-panel{position:fixed;z-index:1000;left:16px;bottom:56px;width:min(560px,calc(100% - 32px));padding:20px;background:#fff;border:1px solid #b9c8c0;border-radius:16px;box-shadow:0 8px 32px #17282126}",
    ".rublix-analytics-panel[hidden]{display:none}",
    ".rublix-analytics-panel p{margin:0 0 12px}",
    ".rublix-analytics-panel a{color:#17553e;text-decoration:underline;text-underline-offset:3px}",
    ".rublix-analytics-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}",
    ".rublix-analytics-button{font:inherit;min-height:44px;padding:10px 14px;border:1px solid #466453;border-radius:10px;background:#fff;color:#172821;cursor:pointer}",
    ".rublix-analytics-button:focus-visible{outline:3px solid #126749;outline-offset:3px}",
    ".rublix-analytics-settings{position:fixed;z-index:1000;left:16px;bottom:8px;min-height:40px;font-size:12px;padding:7px 11px}",
    "@media(max-width:480px){.rublix-analytics-actions{display:grid}.rublix-analytics-panel{padding:16px;max-height:calc(100dvh - 88px);overflow:auto}}"
  ].join("\n");
  document.head.appendChild(style);

  var panel = element("section", "", "rublix-analytics rublix-analytics-panel");
  panel.id = "rublix-analytics-choice";
  panel.setAttribute("aria-label", "Выбор аналитики сайта");
  panel.appendChild(element("p", "Разрешить аналитику сайта?"));
  panel.appendChild(element("p", "Яндекс Метрика помогает понять, сколько людей посещают сайт и переходят в Telegram или личный кабинет. Она использует cookies и обрабатывает технические данные, в том числе IP-адрес и сведения о браузере. Счётчик включится только после вашего согласия."));
  var privacy = element("a", "Как Яндекс обрабатывает данные");
  privacy.href = "https://yandex.ru/legal/confidential/";
  privacy.target = "_blank";
  privacy.rel = "noopener noreferrer";
  panel.appendChild(privacy);
  var actions = element("div", "", "rublix-analytics-actions");
  var accept = element("button", "Разрешить аналитику", "rublix-analytics-button");
  var decline = element("button", "Продолжить без аналитики", "rublix-analytics-button");
  accept.type = decline.type = "button";
  actions.appendChild(accept);
  actions.appendChild(decline);
  panel.appendChild(actions);
  document.body.appendChild(panel);

  var settings = element("button", "Настройки аналитики", "rublix-analytics rublix-analytics-button rublix-analytics-settings");
  settings.id = "rublix-analytics-settings";
  settings.type = "button";
  settings.setAttribute("aria-controls", panel.id);
  document.body.appendChild(settings);

  function showPanel(show) {
    panel.hidden = !show;
    settings.setAttribute("aria-expanded", String(show));
  }

  function publicUrl() {
    return location.origin + location.pathname;
  }

  function publicReferrer() {
    try {
      var referrer = new URL(document.referrer);
      return /^https?:$/.test(referrer.protocol) ? referrer.origin + "/" : "";
    } catch {
      return "";
    }
  }

  function startCounter() {
    if (ready || choice !== "accepted" || !libraryLoaded) return;
    try {
      window.ym(counterId, "init", {
        defer: true,
        webvisor: false,
        clickmap: false,
        trackLinks: false,
        trackHash: false,
        ecommerce: false,
        disableYtm: true,
        sendTitle: false,
        accurateTrackBounce: true,
        url: publicUrl(),
        referrer: publicReferrer()
      });
      ready = true;
      window.ym(counterId, "hit", publicUrl(), {
        title: "Rublix",
        referer: publicReferrer()
      });
    } catch {
      ready = false;
    }
  }

  function enableCounter() {
    // Preview builds and local checks must never send production statistics.
    if (choice !== "accepted" || location.hostname !== "rublix-wallet.com") return;
    if (libraryLoaded) return startCounter();
    if (loading) return;
    loading = true;
    window.ym = window.ym || function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = window.ym.l || Date.now();
    var script = element("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js?id=" + counterId;
    script.referrerPolicy = "origin";
    script.onload = function () {
      loading = false;
      libraryLoaded = true;
      startCounter();
    };
    script.onerror = function () {
      loading = false;
      script.remove();
    };
    document.head.appendChild(script);
  }

  function choose(value) {
    choice = value;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ value: value, expiresAt: Date.now() + lifetime }));
    } catch {
      // The current-page choice still works when storage is unavailable.
    }
    if (value === "accepted") {
      enableCounter();
    } else stopCounter();
    showPanel(false);
    settings.focus();
  }

  function stopCounter() {
    if (!ready) return;
    ready = false;
    try { window.ym(counterId, "destruct"); } catch { /* Keep navigation usable. */ }
  }

  window.addEventListener("storage", function (event) {
    if (event.key !== storageKey && event.key !== null) return;
    choice = event.key === null ? null : parseChoice(event.newValue);
    if (choice === "accepted") enableCounter();
    else stopCounter();
    showPanel(choice === null);
  });

  settings.addEventListener("click", function () { showPanel(true); accept.focus(); });
  accept.addEventListener("click", function () { choose("accepted"); });
  decline.addEventListener("click", function () { choose("declined"); });

  document.addEventListener("click", function (event) {
    if (!ready || choice !== "accepted" || event.isTrusted === false) return;
    var target = event.target;
    var anchor = target && typeof target.closest === "function" ? target.closest("a[href]") : null;
    if (!anchor) return;
    try {
      var url = new URL(anchor.href, location.href);
      var goal = url.hostname === "t.me" ? "telegram_click" :
        url.hostname === "lk.rublix-wallet.com" ? "account_click" : null;
      if (goal) window.ym(counterId, "reachGoal", goal);
    } catch {
      // Analytics never delays, rewrites or cancels the visitor's link.
    }
  }, true);

  showPanel(choice === null);
  enableCounter();
})();
