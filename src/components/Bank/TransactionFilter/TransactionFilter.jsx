import React, { useState } from 'react';
import styles from './TransactionFilter.module.css';

const TransactionFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.searchIcon}>
            <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="1.5"/>
            <path d="M17 17L13.5 13.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <button 
          className={styles.filterButton}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span>1개월・전체・최신순</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={styles.filterArrow}>
            <path d="M1 1L6 6L11 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {isFilterOpen && (
        <div className={styles.filterDropdown}>
          <div className={styles.filterOptions}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>기간</span>
              <div className={styles.filterTags}>
                <button className={`${styles.filterTag} ${styles.active}`}>1개월</button>
                <button className={styles.filterTag}>3개월</button>
                <button className={styles.filterTag}>6개월</button>
                <button className={styles.filterTag}>1년</button>
              </div>
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>유형</span>
              <div className={styles.filterTags}>
                <button className={`${styles.filterTag} ${styles.active}`}>전체</button>
                <button className={styles.filterTag}>입금</button>
                <button className={styles.filterTag}>출금</button>
              </div>
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>정렬</span>
              <div className={styles.filterTags}>
                <button className={`${styles.filterTag} ${styles.active}`}>최신순</button>
                <button className={styles.filterTag}>과거순</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilter;