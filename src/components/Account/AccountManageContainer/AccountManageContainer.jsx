import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCard from '../AccountCard/AccountCard';
import BankList from '../BankList/BankList';
import AddAccountButton from '../AddAccountButton/AddAccountButton';
import styles from './AccountManageContainer.module.css';
import { getAccounts } from '../../../util/accountApi';

const AccountManageContainer = () => {
  // 현재는 account가 1개만 있다고 가정
  // const [accounts, setAccounts] = useState([]);
  const [hasAccount, setHasAccount] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const email = localStorage.getItem('userEmail');
        
        if (!email) {
          console.warn('사용자 이메일이 없습니다.');
          setLoading(false);
          return;
        }

        const accountData = await getAccounts(email);
        const accountList = accountData || [];
        
        // setAccounts(accountList);
        setHasAccount(accountList.length > 0);

        // 주거래 계좌 선택
        const primary = accountList.find(acc => acc.isPrimary);

        if (primary) {
          const primaryAccount = {
            bankName: primary.bankName,
            bankLogo: 'https://via.placeholder.com/40x40/6f4ef2/ffffff?text=K', // 실제로는 로고 URL
            accountNumber: primary.maskedAccountNumber,
            accountId: primary.accountId,
            status: primary.isPrimary
          };
          setAccountInfo(primaryAccount);
        } else if (accountList.length > 0) {
          // primary가 없으면 첫 번째 계좌를 사용
          const firstAccount = accountList[0];
          const accountData = {
            bankName: firstAccount.bankName,
            bankLogo: 'https://via.placeholder.com/40x40/6f4ef2/ffffff?text=K',
            accountNumber: firstAccount.maskedAccountNumber,
            accountId: firstAccount.accountId,
            status: false
          };
          setAccountInfo(accountData);
        } else {
          setAccountInfo(null);
        }
      } catch (error) {
        console.error('계좌 조회 실패:', error);
        setHasAccount(false);
        setAccountInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountAddButtonClick = () => {
    navigate('/account-connect', {
    replace: true,
    state: { 
      account: {
        accountNumber: accountInfo.accountNumber,
        bankName: accountInfo.bankName,
        accountId: accountInfo.accountId
      }
    }});
  };

  const handleAccountCardClick = () => {
    // 계좌 상세 페이지로 이동 등의 로직
    console.log('계좌 카드 클릭됨');
  };

  const handleBankItemClick = (bankId) => {
    // 해당 은행의 계좌 개설 페이지로 이동
    console.log('은행 선택됨:', bankId);
    navigate('/account-connect');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>계좌 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageContent}>
        <div className={styles.myAccountSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>내 계좌</span>
            {hasAccount && (
              <span className={styles.accountCount}>1</span>
            )}
          </div>
          <AccountCard 
            hasAccount={hasAccount}
            accountInfo={hasAccount ? accountInfo : null}
            onClick={handleAccountCardClick}
          />
        </div>
        <div className={styles.bankListSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>즉시 계좌개설</span>
            <span className={styles.adLabel}>AD</span>
          </div>
          <BankList onBankSelect={handleBankItemClick} />
        </div>
      </div>
      <AddAccountButton onClick={handleAccountAddButtonClick} />
    </div>
  );
};

export default AccountManageContainer;