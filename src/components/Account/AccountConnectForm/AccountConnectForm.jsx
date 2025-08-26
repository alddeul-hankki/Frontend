import React, { useState } from 'react';
import styles from './AccountConnectForm.module.css';
import BankSelectForm from '../BankSelectForm/BankSelectForm';

const AccountConnectForm = ({ account }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      {/* 타이틀 섹션 */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>계좌연결</h1>
      </div>

      {/* 콘텐츠 */}
      <div className={styles.content}>
        {/* 은행 선택 버튼 */}
        <div className={styles.stepItem}>
          <div className={styles.stepNumber}>1</div>
          <button 
            className={`${styles.selectButton} ${isFormOpen ? styles.active : ''}`}
            onClick={toggleForm}
          >
            <span>은행 선택</span>
            <svg 
              className={`${styles.dropdownIcon} ${isFormOpen ? styles.rotated : ''}`}
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <path d="M4 6l4 4 4-4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 폼 영역 */}
        <BankSelectForm isOpen={isFormOpen} account={account} />

        {/* 다른 단계들 */}
        <div className={styles.stepItem}>
          <div className={`${styles.stepNumber} ${styles.disabled}`}>2</div>
          <div className={styles.stepText}>계좌인증</div>
        </div>

        <div className={styles.stepItem}>
          <div className={`${styles.stepNumber} ${styles.disabled}`}>3</div>
          <div className={styles.stepText}>자동이체 출금동의</div>
        </div>
      </div>
    </>
  );
};

export default AccountConnectForm;