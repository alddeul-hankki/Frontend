import React from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';
import { formatCurrency } from '../../shared/format';

const BottomAction = ({ orderAmount }) => (
  <footer className={styles.footer}>
    <button className={styles.cta}>주문 예약 하기 | {formatCurrency(orderAmount)}원</button>
  </footer>
);

export default BottomAction;


