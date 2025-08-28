import React from 'react';
import { useLocation } from "react-router-dom";
import styles from './AccountConnectPage.module.css';
import AccountConnectForm from '../../../../components/Account/AccountConnectForm/AccountConnectForm';
import PageHeader from '../../../../components/PageHeader/PageHeader';

const AccountConnectPage = () => {
  const location = useLocation();
  const { account } = location.state || {};
  return (
    <div className={styles.accountConnectPage}>
      <PageHeader title="계좌연결" />
      <AccountConnectForm account={account} />
    </div>
  );
};

export default AccountConnectPage;