import React from 'react';
import styles from './PayMoneyCard.module.css';

const PayMoneyCard = ({ currentBalance, autoChargeAmount, needAutoCharge, totalAmount }) => {
  return (
    <div className={styles.paymentCard}>
      <div className={styles.cardHeader}>
        <div className={styles.payLogo}>
          <span className={styles.payIcon}></span>
          <span className={styles.payText}>쏠쏠한 pay 머니</span>
        </div>
      </div>
      <div className={styles.cardContent}>
        {needAutoCharge ? (
          <>
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>자동충전</span>
              <span className={styles.balanceAmount}>{autoChargeAmount.toLocaleString()}원</span>
            </div>
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>현재잔액</span>
              <span className={styles.balanceAmount}>{currentBalance.toLocaleString()}원</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>현재잔액</span>
              <span className={styles.balanceAmount}>{currentBalance.toLocaleString()}원</span>
            </div>
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>결제 후 잔액</span>
              <span className={styles.balanceAmount}>{(currentBalance - totalAmount).toLocaleString()}원</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PayMoneyCard;