// Firebase SDK 로드
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase 설정
firebase.initializeApp({
  apiKey: "AIzaSyDWC1huqE0ZKu6YFHoQ7wOehm1hf9sfiTw",
  authDomain: "solsolhan-hankki.firebaseapp.com",
  projectId: "solsolhan-hankki",
  storageBucket: "solsolhan-hankki.firebasestorage.app",
  messagingSenderId: "456367914801",
  appId: "1:456367914801:web:29a05223b9b2ea13f37a10",
  measurementId: "G-KJVFL2P952"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload);
  
  const notificationTitle = payload.notification?.title || '새 알림';
  const notificationOptions = {
    body: payload.notification?.body || '새로운 메시지가 도착했습니다.',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});