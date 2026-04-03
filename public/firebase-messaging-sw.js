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

// 🔔 HANDLE NOTIF SAAT BACKGROUND
messaging.onBackgroundMessage(function (payload) {
  console.log("📩 Background message:", payload);

  const title = payload.notification?.title || "Notifikasi";
  const body = payload.notification?.body || "Ada pesan baru";
  const url = payload.data?.url || "/";

  self.registration.showNotification(title, {
    body: body,
    icon: "/icon-192.png", // ✅ logo utama
    badge: "/icon-75.png", // ✅ icon kecil (status bar)
    data: {
      url: url, // ✅ dikirim ke event click
    },
  });
});

// 🖱️ HANDLE CLICK NOTIF
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // 🔁 kalau tab sudah ada → fokus
        for (const client of clientList) {
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }

        // 🚀 kalau belum ada → buka tab baru
        return clients.openWindow(url);
      }),
  );
});
