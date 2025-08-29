import React from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';

const HeaderSection = ({ storeName }) => (
  <header className={styles.header}>
    <div className={styles.brandRow}>
      <span className={styles.badge}>배달</span>
      <h1 className={styles.store}>{storeName}</h1>
    </div>
  </header>
);

export default HeaderSection;


