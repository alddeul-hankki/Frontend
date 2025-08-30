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
import PayMoneyTopUpPage from "../pages/heyyoung/PayMoney/TopUp/PayMoneyTopUpPage.jsx";
import PayMoneyTopUpConfirmPage from "../pages/heyyoung/PayMoney/TopUp/PayMoneyTopUpConfirmPage.jsx";
import PayMoneyTopUpSuccessPage from "../pages/heyyoung/PayMoney/TopUp/PayMoneyTopUpSuccessPage.jsx";
import PayMoneyTopUpFailPage from "../pages/heyyoung/PayMoney/TopUp/PayMoneyTopUpFailPage.jsx";

import PayMoneyRefundPage from "../pages/heyyoung/PayMoney/Refund/PayMoneyRefundPage.jsx";
import PayMoneyRefundConfirmPage from "../pages/heyyoung/PayMoney/Refund/PayMoneyRefundConfirmPage.jsx";
import PayMoneyRefundSuccessPage from "../pages/heyyoung/PayMoney/Refund/PayMoneyRefundSuccessPage.jsx";
import PayMoneyRefundFailPage from "../pages/heyyoung/PayMoney/Refund/PayMoneyRefundFailPage.jsx";
import PaymentPage from '../pages/heyyoung/Payment/PaymentPage';

import PayMoneyHistoryPage from "../pages/heyyoung/PayMoney/History/PayMoneyHistoryPage.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HeyMainPage />} />
      <Route path="/solsol" element={<Solsolhanhankki />} />
      <Route path="/account-manage" element={<AccountManagePage />} />
      <Route path="/account-connect" element={<AccountConnectPage />} />
      <Route path='/verify-transaction' element={<VerifyTransactionPage />} />
      <Route path="/payment" element={<PaymentPage />} /> 
      <Route path="/ddangyo-mock" element={<DdangyoMock />} />
      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      <Route path="/menus/:menuId" element={<MenuDetail />} />
      <Route path="/solsolpay" element={<Solsolpay />} />
      <Route path="/timetable" element={<TimeTableMainPage/>} />

      <Route path="/paymoney" element={<PayMoneyDashboard />} />

      <Route path="/paymoney/topup" element={<PayMoneyTopUpPage />} />
      <Route path="/paymoney/topup/confirm" element={<PayMoneyTopUpConfirmPage />} />
      <Route path="/paymoney/topup/success" element={<PayMoneyTopUpSuccessPage />} />
      <Route path="/paymoney/topup/fail" element={<PayMoneyTopUpFailPage />} />

      <Route path="/paymoney/refund" element={<PayMoneyRefundPage />} />
      <Route path="/paymoney/refund/confirm" element={<PayMoneyRefundConfirmPage />} />
      <Route path="/paymoney/refund/success" element={<PayMoneyRefundSuccessPage />} />
      <Route path="/paymoney/refund/fail" element={<PayMoneyRefundFailPage />} />

      <Route path="/paymoney/history" element={<PayMoneyHistoryPage />} />

    </Routes>
  );
};

export default AppRoutes;