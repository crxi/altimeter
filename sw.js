const CACHE_NAME = 'altimeter-v3'; // <--- BUMP THIS NUMBER EVERY TIME YOU EDIT HTML
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.png'
];

// Install: Cache files AND force activation immediately
self.addEventListener('install', (e) => {
    self.skipWaiting(); // <--- CRITICAL LINE
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Activate: Delete old caches
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // <--- CRITICAL LINE: Take control of open pages
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
