import { useNavigate } from 'react-router-dom';
import styles from './TransactionHeader.module.css';

const TransactionHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div className={styles.header}>
      {/* 네비게이션 바 */}
      <div className={styles.navbar}>
        <button className={styles.backButton} onClick={handleGoBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className={styles.title}>거래내역조회</h1>
        <div className={styles.rightActions}>
          <button className={styles.actionButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="black" strokeWidth="2"/>
              <circle cx="9" cy="9" r="2" stroke="black" strokeWidth="2"/>
              <path d="M21 15L16 10L5 21" stroke="black" strokeWidth="2"/>
            </svg>
          </button>
          <button className={styles.actionButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 1Z" 
                    stroke="black" strokeWidth="2" fill="none"/>
            </svg>
          </button>
          <button className={styles.actionButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                    stroke="black" strokeWidth="2"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="black" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;