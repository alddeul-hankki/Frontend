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
import PaymentPage from '../pages/heyyoung/Payment/PaymentPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HeyMainPage />} />
      <Route path="/solsol" element={<Solsolhanhankki />} />
      <Route path="/pay" element={<WalletMainPage />} />
      <Route path="/account-manage" element={<AccountManagePage />} />
      <Route path="/account-connect" element={<AccountConnectPage />} />
      <Route path='/verify-transaction' element={<VerifyTransactionPage />} />
      <Route path="/payment" element={<PaymentPage />} /> 
      <Route path="/ddangyo-mock" element={<DdangyoMock />} />
      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      <Route path="/menus/:menuId" element={<MenuDetail />} />
    </Routes>
  );
};

export default AppRoutes;