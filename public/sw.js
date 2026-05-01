const CACHE_NAME = 'contes-en-quete-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/data.ts',
  '/AppContext.tsx',
  '/EpisodeContent.tsx',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
