const CACHE_NAME = 'ege-master-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/js/data.js',
  '/js/storage.js',
  '/js/spaced-repetition.js',
  '/js/burnout.js',
  '/js/timer.js',
  '/js/planner.js',
  '/js/practice.js',
  '/js/courses.js',
  '/js/mistakes.js',
  '/js/progress.js',
  '/js/analytics.js',
  '/js/advisor.js',
  '/js/nto.js',
  '/js/sql-sandbox.js',
  '/js/bpmn-trainer.js',
  '/js/app.js',
  '/data/lessons-informatics.js',
  '/data/lessons-russian.js',
  '/data/lessons-math.js',
  '/data/tasks-ege.js',
  '/data/nto-content.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('Cache error:', err));
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
  if (event.request.url.includes('cdnjs.cloudflare.com') || event.request.url.includes('fonts.googleapis.com') || event.request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchRes) => {
          return caches.open('ege-master-cdns').then((cache) => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
