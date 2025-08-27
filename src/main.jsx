import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// PWA와 Firebase 서비스 워커 수동 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/pwa-sw.js', { scope: '/pwa/' })
      .then((registration) => { console.log('PWA SW 등록 성공:', registration.scope); })
      .catch((error) => { console.log('PWA SW 등록 실패:', error); });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


