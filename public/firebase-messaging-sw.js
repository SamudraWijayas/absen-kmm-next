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
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
