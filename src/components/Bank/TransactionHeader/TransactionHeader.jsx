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
      </div>
    </div>
  );
};

export default TransactionHeader;