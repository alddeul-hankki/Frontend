import React from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';

const PaymentMethod = () => (
  <section className={styles.section}>
    <div className={styles.sectionTitle}>결제수단</div>
    <label className={styles.payRow}>
      <input type="radio" defaultChecked />
      <span>신한pay머니 결제</span>
    </label>
  </section>
);

export default PaymentMethod;


