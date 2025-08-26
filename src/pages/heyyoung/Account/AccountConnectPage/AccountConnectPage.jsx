import React from 'react';
import { useLocation } from "react-router-dom";
import styles from './AccountConnectPage.module.css';
import AccountConnectForm from '../../../../components/Account/AccountConnectForm/AccountConnectForm';

const AccountConnectPage = () => {
  const location = useLocation();
  const { account } = location.state || {};
  return (
    <div className={styles.accountConnectPage}>
      <AccountConnectForm account={account} />
    </div>
  );
};

export default AccountConnectPage;