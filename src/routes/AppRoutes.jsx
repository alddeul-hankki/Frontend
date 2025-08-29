import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeyMainPage from '../pages/heyyoung/Main/HeyMainPage';
import AccountManagePage from '../pages/heyyoung/Account/AccountManagePage/AccountManagePage'
import AccountConnectPage from '../pages/heyyoung/Account/AccountConnectPage/AccountConnectPage'
import VerifyTransactionPage from '../pages/external/VerifyTransactionPage/VerifyTransactionPage';
import Solsolhanhankki from '../pages/Solsolhanhankki/Solsolhanhankki';
import DdangyoMock from '../pages/DdangyoMock';
import RestaurantDetail from '../pages/RestaurantDetail/RestaurantDetail';
import MenuDetail from '../pages/MenuDetail/MenuDetail';
import Solsolpay from '../pages/SolsolPay/Solsolpay';
import TimeTableMainPage from '../pages/heyyoung/TimeTable/TimeTableMainPage/TimeTableMainPage';

import PayMoneyDashboard from "../pages/heyyoung/PayMoney/PayMoneyDashboard";
import PayMoneyTopUpPage from '../pages/heyyoung/PayMoney/PayMoneyTopUpPage';
import PayMoneyTopUpConfirmPage from '../pages/heyyoung/PayMoney/PayMoneyTopUpConfirmPage';
import PayMoneyTransactionSuccessPage from '../pages/heyyoung/PayMoney/PayMoneyTransactionSuccessPage';
import PayMoneyTransactionFailPage from '../pages/heyyoung/PayMoney/PayMoneyTransactionFailPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HeyMainPage />} />
      <Route path="/solsol" element={<Solsolhanhankki />} />
      <Route path="/account-manage" element={<AccountManagePage />} />
      <Route path="/account-connect" element={<AccountConnectPage />} />
      <Route path='/verify-transaction' element={<VerifyTransactionPage />} />
      <Route path="/ddangyo-mock" element={<DdangyoMock />} />
      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      <Route path="/menus/:menuId" element={<MenuDetail />} />
      <Route path="/solsolpay" element={<Solsolpay />} />
      <Route path="/timetable" element={<TimeTableMainPage/>} />

      <Route path="/paymoney" element={<PayMoneyDashboard />} />
      <Route path="/paymoney/topup" element={<PayMoneyTopUpPage />} />
      <Route path="/paymoney/topup/confirm" element={<PayMoneyTopUpConfirmPage />} />
      <Route path="/paymoney/topup/success" element={<PayMoneyTransactionSuccessPage />} />
      <Route path="/paymoney/topup/fail" element={<PayMoneyTransactionFailPage />} />
    </Routes>
  );
};

export default AppRoutes;