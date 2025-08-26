import React from 'react';
import { useLocation } from 'react-router-dom';
import TransactionFilter from '../../../components/Bank/TransactionFilter/TransactionFilter';
import TransactionHeader from '../../../components/Bank/TransactionHeader/TransactionHeader';
import TransactionList from '../../../components/Bank/TransactionList/TransactionList';
import AccountSummary from '../../../components/Bank/AccountSummary/AccountSummary';
import styles from './VerifyTransactionPage.module.css';

const VerifyTransactionPage = () => {
  const location = useLocation();
  const { account } = location.state || {};
  
  return (
    <div className={styles.pageContainer}>
      <TransactionHeader />
      <AccountSummary 
        bankName={account?.bankName || '신한'}
        accountNumber={account?.accountNumber}
        balance={0}
        availableBalance={0}
      />
      <TransactionFilter />
      <TransactionList accountId={account.accountId} />
    </div>
  );
};

export default VerifyTransactionPage;