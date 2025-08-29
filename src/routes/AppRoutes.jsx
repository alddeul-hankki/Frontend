import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeyMainPage from '../pages/heyyoung/Main/HeyMainPage';
import WalletMainPage from '../pages/heyyoung/Wallet/WalletMainPage/WalletMainPage';
import AccountManagePage from '../pages/heyyoung/Account/AccountManagePage/AccountManagePage'
import AccountConnectPage from '../pages/heyyoung/Account/AccountConnectPage/AccountConnectPage'
import VerifyTransactionPage from '../pages/external/VerifyTransactionPage/VerifyTransactionPage';
import Solsolhanhankki from '../pages/Solsolhanhankki/Solsolhanhankki';
import DdangyoMock from '../pages/DdangyoMock';
import RestaurantDetail from '../pages/RestaurantDetail/RestaurantDetail';
import MenuDetail from '../pages/MenuDetail/MenuDetail';
import Solsolpay from '../pages/SolsolPay/Solsolpay';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HeyMainPage />} />
      <Route path="/solsol" element={<Solsolhanhankki />} />
      <Route path="/pay" element={<WalletMainPage />} />
      <Route path="/account-manage" element={<AccountManagePage />} />
      <Route path="/account-connect" element={<AccountConnectPage />} />
      <Route path='/verify-transaction' element={<VerifyTransactionPage />} />
      <Route path="/ddangyo-mock" element={<DdangyoMock />} />
      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      <Route path="/menus/:menuId" element={<MenuDetail />} />
      <Route path="/solsolpay" element={<Solsolpay />} />
    </Routes>
  );
};

export default AppRoutes;