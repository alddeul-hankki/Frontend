import React, { useEffect, useCallback } from 'react';
import './App.css';
import { useFCM } from './hooks/useFCM';
import AppRoutes from './routes/AppRoutes';
import PageHeader from './components/PageHeader/PageHeader';
import { useLocation } from 'react-router-dom';

function App() {

  const{
    notification,
    requestPermission,
  } = useFCM();
  const { pathname } = useLocation();

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

  const routeTitleMap = {
    '/': '',
    '/solsol': '쏠쏠한 한끼',
    '/ddangyo-mock': '땡겨요 Mock',
    '/account-manage': '계좌 관리',
    '/account-connect': '계좌 연결',
    '/pay': '결제',
    '/solsolpay': '주문 결제',
    '/timetable': '강의 시간표',
  };
  const routeTitle = routeTitleMap[pathname] || '';


  return (
    <div className="App">
      {routeTitle && <PageHeader title={routeTitle} />}
      <AppRoutes />
    </div>
  );
}

export default App;
