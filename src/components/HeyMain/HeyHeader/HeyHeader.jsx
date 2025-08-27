import React from 'react';
import styles from './HeyHeader.module.css';

const HeyHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.menuIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={styles.appName}>헤이영대학교</span>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.searchIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className={styles.moreIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1" fill="white"/>
            <circle cx="12" cy="12" r="1" fill="white"/>
            <circle cx="12" cy="19" r="1" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeyHeader;