import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageHeader.module.css';

const PageHeader = ({ title, onBack }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // 이전 페이지로 이동
    }
  };

  return (
    <div className={styles.pageHeader}>
      <div className={styles.backButton} onClick={handleBackClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className={styles.pageTitle}>{title}</h1>
      <div className={styles.headerRight}></div>
    </div>
  );
};

export default PageHeader;