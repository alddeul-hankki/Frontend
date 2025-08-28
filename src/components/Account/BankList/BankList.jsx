import React from 'react';
import styles from './BankList.module.css';

const BankList = () => {
  const banks = [
    {
      id: 'shinhan',
      name: '신한은행',
      description: '수수료 3회 면제',
      logo: '$',
      logoColor: '#0066cc'
    },
    {
      id: 'hana',
      name: '하나은행',
      description: '수수료 완전면제',
      logo: 'H',
      logoColor: '#00a651'
    }
  ];

  return (
    <div className={styles.bankList}>
      {banks.map((bank) => (
        <div key={bank.id} className={styles.bankItem}>
          <div className={styles.bankLogo} style={{ backgroundColor: bank.logoColor }}>
            <span>{bank.logo}</span>
          </div>
          <div className={styles.bankInfo}>
            <span className={styles.bankName}>{bank.name}</span>
            <span className={styles.bankDescription}>{bank.description}</span>
          </div>
          <div className={styles.moreButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5l5 5-5 5" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankList;