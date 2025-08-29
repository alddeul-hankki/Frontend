import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionFilter from '../../../components/Bank/TransactionFilter/TransactionFilter';
import TransactionHeader from '../../../components/Bank/TransactionHeader/TransactionHeader';
import TransactionList from '../../../components/Bank/TransactionList/TransactionList';
import AccountSummary from '../../../components/Bank/AccountSummary/AccountSummary';
import styles from './VerifyTransactionPage.module.css';

const VerifyTransactionPage = () => {
  const location = useLocation();
  const { account } = location.state || {};
  const [balance, setBalance] = useState(0);
  
  return (
    <div className={styles.pageContainer}>
      <TransactionHeader />
      <AccountSummary 
        bankName={account?.bankName || '신한'}
        accountNumber={account?.accountNumber}
        balance={balance}
        availableBalance={balance}
      />
      <TransactionFilter />
      <TransactionList 
        accountId={account.accountId} 
        onBalancesFetched={(balance) => {
          setBalance(balance);
        }}
      />
    </div>
  );
};

export default VerifyTransactionPage;