// Choose a cache name
const CACHE = 'pwabuilder-page';
// List the files to precache
const precacheResources = [
  '/Todo-App',
  '/Todo-App/index.html',
  '/Todo-App/script.js',
  '/Todo-App/style.css',
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const r = await cache.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
