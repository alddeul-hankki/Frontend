import React from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';
import { formatCurrency } from '../../shared/format';

const BottomAction = ({ 
  orderAmount, 
  loading = false, 
  disabled = false,
  onOrderSubmit
}) => {
  const handleOrderSubmit = async () => {
    if (onOrderSubmit) {
      onOrderSubmit();
    }
  };

  return (
    <footer className={styles.footer}>
      <button 
        className={`${styles.cta} ${disabled ? styles.disabled : ''}`} 
        disabled={disabled || loading}
        onClick={handleOrderSubmit}
      >
        {loading ? '로딩 중...' : `주문 예약 하기 | ${formatCurrency(orderAmount)}원`}
      </button>
    </footer>
  );
};

export default BottomAction;


