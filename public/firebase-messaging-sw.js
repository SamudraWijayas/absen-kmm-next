// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyDO13UJoYieglXJYSGnENrTi0CCjGbn6yM",
  authDomain: "ppgbdl-eea35.firebaseapp.com",
  projectId: "ppgbdl-eea35",
  messagingSenderId: "849226916208",
  appId: "1:849226916208:web:78b578303377706467afb5",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const title = payload.notification?.title || "Notifikasi";
  const body = payload.notification?.body || "Ada pesan baru";
  const url = payload.data?.url || "/";

  self.registration.showNotification(title, {
    body,
    icon: "/icon-192.png",
    badge: "/icon-75.png",
    data: { url },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(url) && "focus" in client)
            return client.focus();
        }
        return clients.openWindow(url);
      }),
  );
});
