// 서비스 워커 설치 시 실행
self.addEventListener('install', (event) => {
  console.log('Service Worker 설치됨');
  // 캐시할 파일들
  const filesToCache = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json'
  ];

  event.waitUntil(
    caches.open('v1')
      .then((cache) => {
        console.log('캐시 열림');
        return cache.addAll(filesToCache);
      })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에서 찾으면 반환
        if (response) {
          return response;
        }
        // 캐시에 없으면 네트워크에서 가져오기
        return fetch(event.request);
      }
    )
  );
});

// 서비스 워커 업데이트 시
self.addEventListener('activate', (event) => {
  console.log('Service Worker 활성화됨');
});
