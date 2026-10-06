const CACHE_NAME = "ballistic-v2026-10-06-source-runtime-fix";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./browserconfig.xml",
  "./favicon.ico",
  "./favicon-16x16.png",
  "./favicon-32x32.png",
  "./apple-touch-icon.png",
  "./android-chrome-192x192.png",
  "./android-chrome-512x512.png",
  "./mstile-150x150.png",
  "./mstile-310x310.png",
  "./safari-pinned-tab.svg",
  "./js/pep.min.js",
  "./js/cannon.min.js",
  "./js/babylon.js",
  "./js/master.js",
  "./js/desktop-controls.js",
  "./js/register-service-worker.js",
  "./js/ballistic.babylon",
  "./audio/ambient_mixdown.mp3",
  "./audio/whoosh_mixdown.mp3",
  "./audio/thud_mixdown.mp3"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(APP_SHELL);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key !== CACHE_NAME;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put("./index.html", copy);
          });
          return response;
        })
        .catch(function () {
          return caches.match("./index.html");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type === "opaque") {
          return response;
        }

        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, copy);
        });
        return response;
      });
    })
  );
});
