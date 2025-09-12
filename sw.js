const CACHE_NAME = 'sharkfin-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/scripts.js',
  '/assets/images/logo-041f3d.svg',
  '/assets/images/logo-fff.svg',
  '/assets/images/mobile-mockup-4.png',
  '/assets/images/mobile-mockup-2.png',
  '/assets/icons/submarine.svg',
  '/assets/icons/sammy-icon.svg',
  '/assets/icons/ai-sparkles.svg',
  '/assets/icons/favicon.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
