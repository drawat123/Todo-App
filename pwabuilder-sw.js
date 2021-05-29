const CACHE = 'pwabuilder-page';

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

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(CACHE).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
