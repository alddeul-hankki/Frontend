import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeyMainPage from '../pages/heyyoung/Main/HeyMainPage';
import SolMainPage from '../pages/solsolhanhankki/Main/SolMainPage';
import WalletMainPage from '../pages/heyyoung/Wallet/WalletMainPage/WalletMainPage';
import AccountManagePage from '../pages/heyyoung/Wallet/AccountManagePage/AccountManagePage'
import AccountConnectPage from '../pages/heyyoung/Wallet/AccountConnectPage/AccountConnectPage'
import VerifyTransactionPage from '../pages/external/VerifyTransactionPage/VerifyTransactionPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HeyMainPage />} />
      <Route path="/solsol" element={<SolMainPage />} />
      <Route path="/pay" element={<WalletMainPage />} />
      <Route path="/account-manage" element={<AccountManagePage />} />
      <Route path="/account-connect" element={<AccountConnectPage />} />
      <Route path='/verify-transaction' element={<VerifyTransactionPage />} />
    </Routes>
  );
};

export default AppRoutes;