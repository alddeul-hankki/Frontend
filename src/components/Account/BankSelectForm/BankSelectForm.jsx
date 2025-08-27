import styles from './BankSelectForm.module.css';
import { verifyAccount } from '../../../util/accountAuthApi';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useState } from 'react';

const BankSelectForm = ({ isOpen, account }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const overlayContent = (
    <div className={`${styles.transitionOverlay} ${isTransitioning ? styles.transitioning : ''}`}>
      <div className={styles.loadingContent}>
        <div className={styles.spinner}></div>
        <p>거래내역을 확인하기 위해 <br/> 신한은행 앱으로 이동합니다.</p>
      </div>
    </div>
  );

  const handleVerify = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const accountId = account.accountId;
      const result = await verifyAccount(email, accountId);
      console.log('검증 결과:', result);
      
      if (result.status === 200) {
        setIsTransitioning(true);
        
        // sessionStorage에 상태 저장
        sessionStorage.setItem('accountVerificationState', JSON.stringify({
          accountVerified: true,
          account: account,
          timestamp: Date.now()
        }));
        
        // 애니메이션 완료 후 페이지 이동
        setTimeout(() => {
          navigate('/verify-transaction', { 
            state: { 
              account: account,
            }
          });
          setIsTransitioning(false);
        }, 3000); // 애니메이션 시간과 맞춤
      }
    } catch (error) {
      console.error('검증 실패:', error);
      setIsTransitioning(false);
    }
  };

  return (
    <>
      {/* Portal을 사용해서 body에 직접 렌더링 */}
      {createPortal(overlayContent, document.body)}

      <div className={`${styles.formContainer} ${isOpen ? styles.open : ''} ${isTransitioning ? styles.slideOut : ''}`}>
        <div className={styles.formContent}>
          {/* 은행 선택 드롭다운 */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>은행</label>
            <select 
              className={styles.select}
              value={account.bankName}
              readOnly
            >
              <option value={account.bankName}>{account.bankName}</option>
            </select>
          </div>

          {/* 계좌번호 입력 */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>계좌번호</label>
            <input
              type="text"
              className={styles.input}
              placeholder={account.accountNumber}
              value={account.accountNumber}
              maxLength="20"
              readOnly
            />
          </div>

          {/* 안내 메시지 */}
          <div className={styles.notice}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#e3f2fd"/>
              <path d="M8 4v4M8 10h0" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>계좌 정보는 안전하게 암호화되어 저장됩니다.</span>
          </div>

          {/* 확인 버튼 */}
          <button 
            className={`${styles.confirmButton} ${styles.active}`}
            onClick={handleVerify}
            disabled={isTransitioning}
          >
            {isTransitioning ? '인증 중...' : '계좌 인증하기'}
          </button>
        </div>
      </div>
    </>
  );
};

export default BankSelectForm;
