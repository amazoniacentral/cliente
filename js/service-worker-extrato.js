const CACHE_NAME = 'extrato_version_2';
const OFFLINE_URL = '/offline.html';
const FILES_TO_CACHE = [
    OFFLINE_URL,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
    '/img/icone-192x192.png',
    '/img/icone-512x512.png',
];

// Função para limpar caches antigos
async function clearOldCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    })
  );
}

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        (async () => {
            await clearOldCaches(); // Limpa caches antigos
            const cache = await caches.open(CACHE_NAME);
            console.log('Arquivos cacheados');
            await cache.addAll(FILES_TO_CACHE);
            self.skipWaiting(); // Força a ativação do novo SW
        })()
    );
});

// Evento de ativação do Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        self.clients.claim() // Assume o controle das páginas abertas
    );
});

// Evento de fetch
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL);
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
        );
    }
});
