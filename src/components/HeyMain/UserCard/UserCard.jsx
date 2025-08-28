import React from 'react';
import styles from './UserCard.module.css';

const UserCard = () => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#FF6B6B"/>
            <circle cx="20" cy="16" r="6" fill="white"/>
            <path d="M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white"/>
          </svg>
        </div>
        <div className={styles.userDetails}>
          <span className={styles.greeting}>안녕하세요 반갑습니다</span>
          <span className={styles.userName}>최이영(20220123345)</span>
        </div>
      </div>
      <div className={styles.loginButton}>
        <span>로그인</span>
      </div>
    </div>
  );
};

export default UserCard;