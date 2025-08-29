import styles from './PaymentMethodSelector.module.css';

const PaymentMethodSelector = ({ selectedMethod }) => {


  return (
    <div className={styles.paymentMethodSection}>
      <div className={styles.sectionLabel}>쏠쏠한 페이 머니</div>
      
      <div className={styles.dropdownContainer}>
        <button 
          className={styles.dropdownButton}
        >
          <span>{selectedMethod}</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;