import React from 'react';
import styles from './AddAccountButton.module.css';

const AddAccountButton = ({ onClick }) => {
  return (
    <div className={styles.addAccountButtonContainer}>
      <button className={styles.addAccountButton} onClick={onClick}>
        <div className={styles.buttonContent}>
          <span className={styles.buttonText}>계좌추가</span>
        </div>
      </button>
    </div>
  );
};

export default AddAccountButton;