import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 서비스 워커 등록 (개발 중에는 비활성화)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW 등록 성공:', registration);
      })
      .catch((registrationError) => {
        console.log('SW 등록 실패:', registrationError);
      });
  });
}


