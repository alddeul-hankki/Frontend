import React from 'react';
import './FilterBar.css';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <div className="filter-item">
        <span>정렬</span>
        <span className="arrow">▼</span>
      </div>
      <div className="filter-item">
        <span>필터</span>
        <span className="arrow">▼</span>
      </div>
      <div className="filter-item">
        <span>장소</span>
        <span className="arrow">▼</span>
      </div>
      <div className="filter-item">
        <span>시간</span>
        <span className="arrow">▼</span>
      </div>
    </div>
  );
};

export default FilterBar;
