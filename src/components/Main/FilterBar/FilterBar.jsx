import React from 'react';
import styles from './FilterBar.module.css';

const FilterBar = () => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterItem}>
        <span>정렬</span>
        <span className={styles.arrow}>▼</span>
      </div>
      <div className={styles.filterItem}>
        <span>필터</span>
        <span className={styles.arrow}>▼</span>
      </div>
      <div className={styles.filterItem}>
        <span>장소</span>
        <span className={styles.arrow}>▼</span>
      </div>
      <div className={styles.filterItem}>
        <span>시간</span>
        <span className={styles.arrow}>▼</span>
      </div>
    </div>
  );
};

export default FilterBar;
