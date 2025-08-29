import React from 'react';
import styles from './AccountManagePage.module.css';
import AccountManageContainer from '../../../../components/Account/AccountManageContainer/AccountManageContainer';

const AccountManagePage = () => {
  return (
    <div className={styles.accountManagePage}>
      <AccountManageContainer />
    </div>
  );
};

export default AccountManagePage;