// WithdrawalAgreementForm.js
import React, { useState } from 'react';
import styles from './WithdrawalAgreementForm.module.css';

const WithdrawalAgreementForm = ({ isOpen, account, onAgreementComplete }) => {
  const [agreements, setAgreements] = useState({
    serviceTerms: false,
    personalInfo: false,
    autoWithdrawal: false,
    allAgreed: false
  });

  const handleIndividualCheck = (key) => {
    const newAgreements = {
      ...agreements,
      [key]: !agreements[key]
    };
    
    // 개별 체크박스 상태에 따라 전체 동의 체크박스 상태 업데이트
    const individualChecks = ['serviceTerms', 'personalInfo', 'autoWithdrawal'];
    const allIndividualChecked = individualChecks.every(item => newAgreements[item]);
    newAgreements.allAgreed = allIndividualChecked;
    
    setAgreements(newAgreements);
  };

  const handleAllCheck = () => {
    const newAllAgreed = !agreements.allAgreed;
    setAgreements({
      serviceTerms: newAllAgreed,
      personalInfo: newAllAgreed,
      autoWithdrawal: newAllAgreed,
      allAgreed: newAllAgreed
    });
  };

  const handleSubmit = () => {
    if (agreements.allAgreed) {
      onAgreementComplete();
    }
  };

  const isAllAgreed = agreements.serviceTerms && agreements.personalInfo && agreements.autoWithdrawal;

  return (
    <div className={`${styles.formContainer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.formContent}>
        <div className={styles.header}>
          <h3 className={styles.title}>자동이체 출금동의</h3>
          <p className={styles.subtitle}>
            {account.bankName} {account.accountNumber}에서<br />
            자동이체 서비스를 이용하시려면 아래 약관에 동의해주세요.
          </p>
        </div>

        {/* 전체 동의 */}
        <div className={styles.agreementItem}>
          <label className={`${styles.checkboxLabel} ${styles.allAgreement}`}>
            <input
              type="checkbox"
              checked={agreements.allAgreed}
              onChange={handleAllCheck}
              className={styles.checkbox}
            />
            <span className={styles.checkboxIcon}>
              {agreements.allAgreed && <span className={styles.checkmark}>✓</span>}
            </span>
            <span className={styles.agreementText}>전체 약관에 동의합니다</span>
          </label>
        </div>

        <div className={styles.divider}></div>

        {/* 개별 동의 항목들 */}
        <div className={styles.agreementList}>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreements.serviceTerms}
                onChange={() => handleIndividualCheck('serviceTerms')}
                className={styles.checkbox}
              />
              <span className={styles.checkboxIcon}>
                {agreements.serviceTerms && <span className={styles.checkmark}>✓</span>}
              </span>
              <span className={styles.agreementText}>
                서비스 이용약관 동의 <span className={styles.required}>(필수)</span>
              </span>
            </label>
            <button className={styles.detailButton}>상세보기</button>
          </div>

          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreements.personalInfo}
                onChange={() => handleIndividualCheck('personalInfo')}
                className={styles.checkbox}
              />
              <span className={styles.checkboxIcon}>
                {agreements.personalInfo && <span className={styles.checkmark}>✓</span>}
              </span>
              <span className={styles.agreementText}>
                개인정보 수집·이용 동의 <span className={styles.required}>(필수)</span>
              </span>
            </label>
            <button className={styles.detailButton}>상세보기</button>
          </div>

          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreements.autoWithdrawal}
                onChange={() => handleIndividualCheck('autoWithdrawal')}
                className={styles.checkbox}
              />
              <span className={styles.checkboxIcon}>
                {agreements.autoWithdrawal && <span className={styles.checkmark}>✓</span>}
              </span>
              <span className={styles.agreementText}>
                자동이체 출금 동의 <span className={styles.required}>(필수)</span>
              </span>
            </label>
            <button className={styles.detailButton}>상세보기</button>
          </div>
        </div>

        {/* 동의 완료 버튼 */}
        <button 
          className={`${styles.confirmButton} ${isAllAgreed ? styles.active : ''}`}
          onClick={handleSubmit}
          disabled={!isAllAgreed}
        >
          동의 완료
        </button>

        {/* 안내 메시지 */}
        <div className={styles.notice}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#e3f2fd"/>
            <path d="M8 4v4M8 10h0" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>모든 필수 약관에 동의해야 자동이체 서비스를 이용할 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalAgreementForm;