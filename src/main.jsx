import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// PWA 서비스 워커는 프로덕션에서만, 그리고 플래그가 켜졌을 때만 등록
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  if (import.meta.env.VITE_ENABLE_PWA === 'true') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/pwa-sw.js', { scope: '/pwa/' })
        .then((registration) => { console.log('PWA SW 등록 성공:', registration.scope); })
        .catch((error) => { console.log('PWA SW 등록 실패:', error); });
    });
  } else {
    // 비활성화 시 기존 PWA SW와 캐시 정리
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => {
        if (reg.active && reg.active.scriptURL && reg.active.scriptURL.includes('/pwa-sw.js')) {
          reg.unregister();
        }
      });
    });
    if ('caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((k) => {
          if (k.startsWith('solsolhan-hankki-')) {
            caches.delete(k);
          }
        });
      });
    }
  }
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </StrictMode>,
  <BrowserRouter>
    <App />
  </BrowserRouter>
)