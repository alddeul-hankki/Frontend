// Firebase SDK 로드
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// 즉시 활성화 설정
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyC4c9XCWJm21xPz-ZClsJbcql8A3KP58bo",
  authDomain: "solsolhan-hankki-v2.firebaseapp.com",
  projectId: "solsolhan-hankki-v2",
  storageBucket: "solsolhan-hankki-v2.firebasestorage.app",
  messagingSenderId: "719329564465",
  appId: "1:719329564465:web:5fc279dbc864f2f4b8c210",
  measurementId: "G-BQNTZML441"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  // notification payload가 있으면 브라우저/FCM이 자동 표시 → 수동 표시 건너뜀
  if (payload.notification) {
    return;
  }

  // data-only 메시지만 수동 표출
  const title = payload.data?.title || '새 알림';
  const options = {
    body: payload.data?.body || '새로운 메시지가 도착했습니다.',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: payload.data,
    tag: 'fcm-notification'
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});