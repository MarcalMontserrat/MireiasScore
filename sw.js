const CACHE = 'mireias-score-v1';
const ASSETS = [
  '/MireiasScore/',
  '/MireiasScore/index.html',
  '/MireiasScore/css/style.css',
  '/MireiasScore/js/state.js',
  '/MireiasScore/js/render.js',
  '/MireiasScore/js/app.js',
  '/MireiasScore/manifest.json',
  '/MireiasScore/icons/icon-192.png',
  '/MireiasScore/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
