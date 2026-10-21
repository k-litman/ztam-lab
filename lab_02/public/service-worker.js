self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) =>
  event.waitUntil(self.clients.claim()),
);
// Kliknięcie w powiadomienie: zamykamy je i przywołujemy otwarte okno aplikacji
// (jeśli adres z "data.url" jest adresem aplikacji), a w przeciwnym razie otwieramy nowe.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL(
    event.notification.data?.url || './',
    self.registration.scope,
  ).href;
  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windows) => {
        const existing = windows.find((w) => w.url === url);
        return existing ? existing.focus() : self.clients.openWindow(url);
      }),
  );
});

self.addEventListener('push', (event) => {
  let message = {
    title: 'Web Push',
    body: event.data ? event.data.text() : '',
  };
  try {
    message = event.data.json();
  } catch (err) {
    // to nie był JSON - zostaje tekst
  }
  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.body,
      icon: 'android.png',
      data: { url: './' },
    }),
  );
});
