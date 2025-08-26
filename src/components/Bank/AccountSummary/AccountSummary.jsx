import styles from './AccountSummary.module.css';

const AccountSummary = ({ bankName, accountNumber, balance, availableBalance }) => {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.accountInfo}>
        <div className={styles.bankSection}>
          <div className={styles.bankIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#0066CC"/>
              <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
            </svg>
          </div>
          <div className={styles.accountDetails}>
            <div className={styles.accountType}>
              <span className={styles.accountLabel}>입출금</span>
              <span className={styles.savingsType}>저축예금</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={styles.dropdown}>
                <path d="M1 1L6 6L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.accountNumber}>
              {bankName} {accountNumber}
              <button className={styles.copyButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="4" y="4" width="8" height="8" rx="1" stroke="#666" strokeWidth="1"/>
                  <rect x="2" y="2" width="8" height="8" rx="1" stroke="#666" strokeWidth="1" fill="none"/>
                </svg>
              </button>
            </div>
          </div>
          <button className={styles.settingsButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" stroke="#666" strokeWidth="1.5"/>
              <path d="M10 1V3M10 17V19M4.22 4.22L5.64 5.64M14.36 14.36L15.78 15.78M1 10H3M17 10H19M4.22 15.78L5.64 14.36M14.36 5.64L15.78 4.22" 
                    stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.balanceSection}>
        <div className={styles.currentBalance}>
          <span className={styles.balanceAmount}>{balance}원</span>
        </div>
        <div className={styles.availableBalance}>
          <span className={styles.availableLabel}>출금가능금액</span>
          <span className={styles.availableAmount}>{availableBalance}원</span>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.actionButton}>
          <span>이체</span>
        </button>
        <button className={styles.actionButton}>
          <span>계좌관리</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSummary;