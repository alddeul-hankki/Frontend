import React, { useEffect } from 'react';
import Header from '../../../components/Header/Header';
import Main from '../../../components/Main/Main';
import { getStoresByCategory } from '../../../util/ddangApi';

const SolMainPage = () => {

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

export default SolMainPage;