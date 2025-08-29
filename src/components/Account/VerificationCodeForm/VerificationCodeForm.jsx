import React, { useState } from 'react';
import styles from './VerificationCodeForm.module.css';
import { confirmAccount } from '../../../util/accountAuthApi';

const VerificationCodeForm = ({ isOpen, account, onVerificationComplete }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력
    if (value.length <= 4) {
      setVerificationCode(value);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (verificationCode.length !== 4) {
      setError('인증번호 6자리를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const email = localStorage.getItem("userEmail");
      const result = await confirmAccount(email, account.accountId, verificationCode);
      if (result.status === 200) {
        onVerificationComplete();
        setIsSubmitting(false);
        setVerificationCode('');
      } else {
        setError('인증번호가 올바르지 않습니다.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('인증 코드 검증 실패:', error);
      setError('인증번호가 올바르지 않습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.formContainer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.formContent}>
        <div className={styles.header}>
          <h3 className={styles.title}>1원을 송금했습니다.</h3>
          <p className={styles.subtitle}>
            {account.bankName} {account.accountNumber}로<br />
            전송된 인증번호를 입력해주세요.
          </p>
        </div>

        {/* 인증번호 입력 */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>인증번호</label>
          <p className={styles.subtitle}>
            거래내역에서 입금자명을 확인하고, '쏠쏠한 한끼' 뒤의 4자리 숫자를 입력해주세요.
          </p>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={`${styles.input} ${error ? styles.error : ''}`}
              placeholder="4자리 인증번호"
              value={verificationCode}
              onChange={handleCodeChange}
              maxLength="4"
              disabled={isSubmitting}
            />
          </div>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>

        {/* 확인 버튼 */}
        <button 
          className={`${styles.confirmButton} ${verificationCode.length === 4 ? styles.active : ''}`}
          onClick={handleSubmit}
          disabled={verificationCode.length !== 4 || isSubmitting}
        >
          {isSubmitting ? '인증 중...' : '인증 완료'}
        </button>

        {/* 안내 메시지 */}
        <div className={styles.notice}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#e3f2fd"/>
            <path d="M8 4v4M8 10h0" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>인증번호가 오지 않으면 재전송 버튼을 눌러주세요.</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeForm;