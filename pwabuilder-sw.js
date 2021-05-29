const CACHE = 'pwabuilder-page';

const assets = [
  'https://fonts.googleapis.com/css?family=Lato&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
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
    caches
      .open(CACHE)
      .then((cache) => {
        return cache.addAll(assets);
      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url === 'https://drawat123.github.io/Todo-App/') {
    event.respondWith(
      fetch(event.request).catch((err) =>
        self.cache
          .open(cache_name)
          .then((cache) => cache.match('/Todo-App/index.html'))
      )
    );
  } else {
    event.respondWith(
      fetch(event.request).catch((err) =>
        caches.match(event.request).then((response) => response)
      )
    );
  }
});
