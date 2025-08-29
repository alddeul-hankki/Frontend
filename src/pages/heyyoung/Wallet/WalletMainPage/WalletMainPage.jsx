import React, { useEffect } from 'react';
import styles from './WalletMainPage.module.css';
import { useNavigate } from 'react-router-dom';
import { getOrCreateUser } from '../../../../util/userApi';

// TODO: 영준님이 작업하신 내용으로 교체 필요
// TODO: component로 분리 필요
const PayPage = () => {
  const navigate = useNavigate();

  const handleAccountManageButtonClick = () => {
    navigate('/account-manage');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRequest = {
          // TODO: 처음에 헤이영 입장 시 user email 을 입력하기 위한 폼 필요
          email: 'hong@test.com',
        };
        const userData = await getOrCreateUser(userRequest);
        // localStorage에 저장
        localStorage.setItem('userId', userData.data.userId);
        localStorage.setItem('userEmail', userData.data.email);
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.payPage}>
      <div className={styles.payHeader}>
        <h2>페이</h2>
        <p>편리한 디지털 결제 서비스</p>
      </div>

      <div className={styles.balanceCard}>
        <div className={styles.balanceInfo}>
          <span className={styles.balanceLabel}>잔액</span>
          <span className={styles.balanceAmount}>₩25,000</span>
        </div>
        <div className={styles.chargeButton}>
          <span>충전</span>
        </div>
      </div>
      <div className={styles.accountButton} onClick={handleAccountManageButtonClick}>
        <span>연결계좌</span>
      </div>
    </div>
  );
};

export default PayPage;