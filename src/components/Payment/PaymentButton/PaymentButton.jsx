import React from 'react';
import styles from './PaymentButton.module.css';

const PaymentButton = ({ amount, onPayment }) => {
  return (
    <div className={styles.paymentButtonContainer}>
      <button className={styles.paymentButton} onClick={onPayment}>
        <span className={styles.checkIcon}>✓</span>
        <span>동의하고 {amount.toLocaleString()}원 결제하기</span>
      </button>
    </div>
  );
};

export default PaymentButton;