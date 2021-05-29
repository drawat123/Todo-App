importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const assets = [
  '/',
  '/Todo-App',
  '/Todo-App/index.html',
  '/Todo-App/style.css',
  '/Todo-App/script.js',
  '/Todo-App/logo.png',
  '/Todo-App/icons/android/android-launchericon-72-72.png',
  '/Todo-App/icons/android/android-launchericon-96-96.png',
  '/Todo-App/icons/android/android-launchericon-144-144.png',
  '/Todo-App/icons/android/android-launchericon-192-192.png',
  '/Todo-App/icons/android/android-launchericon-512-512.png',
];

const CACHE = 'pwabuilder-page';

const offlineFallbackPage = [
  'index.html',
  '/Todo-App/script.js',
  '/Todo-App/style.css',
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.matchAll(offlineFallbackPage);
          console.log(cache);
          return cachedResp;
        }
      })()
    );
  }
});
