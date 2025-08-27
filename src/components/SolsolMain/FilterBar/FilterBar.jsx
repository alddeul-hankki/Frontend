import React, { useState } from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({ onFilterChange }) => {
  const [sortType, setSortType] = useState('06'); // 기본값: 리뷰순
  const [categoryType, setCategoryType] = useState('03'); // 기본값: 치킨
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleSortChange = (newSortType) => {
    setSortType(newSortType);
    setShowSortDropdown(false);
    onFilterChange({ sort_cd: newSortType, category_cd: categoryType });
  };

  const handleCategoryChange = (newCategoryType) => {
    setCategoryType(newCategoryType);
    setShowCategoryDropdown(false);
    onFilterChange({ sort_cd: sortType, category_cd: newCategoryType });
  };

  const getSortLabel = (sortCode) => {
    switch (sortCode) {
      case '06': return '리뷰순';
      case '05': return '맛있어요순';
      default: return '정렬';
    }
  };

  const getCategoryLabel = (categoryCode) => {
    switch (categoryCode) {
      case '03': return '치킨';
      case '04': return '피자';
      default: return '카테고리';
    }
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterItem} onClick={() => setShowSortDropdown(!showSortDropdown)}>
        <span>{getSortLabel(sortType)}</span>
        <span className={styles.arrow}>▼</span>
        {showSortDropdown && (
          <div className={styles.dropdown}>
            <div onClick={() => handleSortChange('06')}>리뷰순</div>
            <div onClick={() => handleSortChange('05')}>맛있어요순</div>
          </div>
        )}
      </div>
      <div className={styles.filterItem} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
        <span>{getCategoryLabel(categoryType)}</span>
        <span className={styles.arrow}>▼</span>
        {showCategoryDropdown && (
          <div className={styles.dropdown}>
            <div onClick={() => handleCategoryChange('03')}>치킨</div>
            <div onClick={() => handleCategoryChange('04')}>피자</div>
          </div>
        )}
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
