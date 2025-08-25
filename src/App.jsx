import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import './App.css';
import { getRestaurants } from './util/ddangApi';

function App() {

  // api 호출 test 용 코드
  useEffect(() => {
    getRestaurants({
      category_cd: "03", // 03 : 치킨집 
      sort_cd: "07", // 07 : 기본순
      page_no: 1,
      page_size: 30
    }).then(response => {
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
