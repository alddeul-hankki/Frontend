import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoLeft}>
          <span>Hey</span>
        </div>
        <div className={styles.logoRight}>
          <span>땡겨요</span>
          <div className={styles.curlyLine}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
