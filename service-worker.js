const CACHE_NAME = 'ege-master-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/data.js',
  './js/storage.js',
  './js/spaced-repetition.js',
  './js/burnout.js',
  './js/timer.js',
  './js/planner.js',
  './js/practice.js',
  './js/courses.js',
  './js/mistakes.js',
  './js/progress.js',
  './js/analytics.js',
  './js/mentor.js',
  './js/nto.js',
  './js/sql-sandbox.js',
  './js/bpmn-trainer.js',
  './js/diagnostics.js',
  './js/readiness.js',
  './js/bughunt.js',
  './data/lessons-informatics.js',
  './data/lessons-russian.js',
  './data/lessons-math.js',
  './data/tasks-ege.js',
  './data/nto-content.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js',
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Try network first, then cache (for development convenience), 
  // or cache first for true offline. Since data files are static, cache-first is fine, 
  // but let's do Stale-While-Revalidate pattern.
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          if (event.request.method === 'GET' && networkResponse.ok && !event.request.url.startsWith('chrome-extension')) {
            cache.put(event.request, networkResponse.clone());
          }
        });
        return networkResponse;
      }).catch(() => {
        // If offline and not in cache, just let it fail gracefully
      });
      return cachedResponse || fetchPromise;
    })
  );
});
