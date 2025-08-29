import React, { useEffect, useCallback } from 'react';
import './App.css';
import { useFCM } from './hooks/useFCM';
import AppRoutes from './routes/AppRoutes';

function App() {

  const{
    notification,
    requestPermission,
  } = useFCM();

  // iOS PWA에서는 사용자 제스처로만 권한 요청 허용 → 자동 호출 제거
  useEffect(() => {
    const handler = () => {
      requestPermission();
    };
    document.addEventListener('click', handler, { once: true });
    document.addEventListener('touchstart', handler, { once: true });
    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [requestPermission]);

  //알림 수신 시 처리
  useEffect(() => {
    if(notification){
      console.log('알림 수신 : ', notification);
    }
  }, [notification]);


  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
