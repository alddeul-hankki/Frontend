import React from 'react';
import styles from './AccountManagePage.module.css';
import AccountManageContainer from '../../../../components/Account/AccountManageContainer/AccountManageContainer';
import PageHeader from '../../../../components/PageHeader/PageHeader';

const AccountManagePage = () => {
  return (
    <div className={styles.accountManagePage}>
      <PageHeader title="연결계좌" />
      <AccountManageContainer />
    </div>
  );
};

export default AccountManagePage;