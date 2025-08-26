import Header from './components/Header/Header';
import Solsolhanhankki from './pages/Solsolhanhankki/Solsolhanhankki';
import DdangyoMock from './pages/DdangyoMock';
import RestaurantDetail from './pages/RestaurantDetail/RestaurantDetail';
import MenuDetail from './pages/MenuDetail/MenuDetail';
import './App.css';
import { useFCM } from './hooks/useFCM';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
function App() {
  
  const location = useLocation();
  const{
    token,
    notification,
    isLoading,
    permission,
    requestPermission,
    refreshToken,
    logout,
  } = useFCM();

  // 컴포넌트 마운트 시 권한 요청
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  //알림 수신 시 처리
  useEffect(() => {
    if(notification){
      console.log('알림 수신 : ', notification);
    }
  }, [notification]);


  // 라우트 변경시마다 스크롤 상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/solsolhanhankki" element={<Solsolhanhankki />} />
        <Route path="/ddangyo-mock" element={<DdangyoMock />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/menus/:menuId" element={<MenuDetail />} />  
      </Routes>
    </div>
  );
}

export default App;
