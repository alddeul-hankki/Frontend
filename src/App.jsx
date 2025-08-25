import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import './App.css';
import { getStoresByCategory } from './util/ddangApi';
import { useFCM } from './hooks/useFCM';

function App() {

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

  useEffect(() => {
    getStoresByCategory("36.11176327871577", "03", "128.42631888739962", "4719067000").then(response => {
      console.log(response);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Main />  
    </div>
  );
}

export default App;
