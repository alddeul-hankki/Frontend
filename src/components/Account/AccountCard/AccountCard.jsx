import React from 'react';
import styles from './AccountCard.module.css';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../../util/accountApi';


const AccountCard = ({ hasAccount, accountInfo }) => {
  const navigate = useNavigate();

  const handleAccountAddButtonClick = async () => {
    const email = localStorage.getItem('userEmail');
    const accountData = await createAccount(email);
    if (accountData.status != 201) {
      console.log(accountData.message);
    }
    if (accountData) {
      navigate('/account-connect', {state: { account: accountData.data }});
    }
  };

  if (!hasAccount) {
    return (
      <div className={`${styles.accountCard} ${styles.emptyCard}`} onClick={handleAccountAddButtonClick}>
        <div className={styles.emptyMessage}>
          <span>계좌를 추가해주세요.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.accountCard}>
      <div className={styles.bankBadge}>
        <span>주계좌</span>
      </div>
      <div className={styles.accountContent}>
        <div className={styles.bankInfo}>
          <div className={styles.bankLogo}>
            <div className={styles.logoCircle}>
              <span>K</span>
            </div>
          </div>
          <div className={styles.bankDetails}>
            <span className={styles.bankName}>{accountInfo.bankName}</span>
            <span className={styles.accountNumber}>{accountInfo.accountNumber}</span>
          </div>
        </div>
        <div className={styles.moreButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5l5 5-5 5" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;