import React from 'react';
import styles from './UserCard.module.css';

const UserCard = () => {
  return (
    <div className={styles.userCard}>
      <div className={styles.badge}>모바일 학생증</div>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#FF6B6B"/>
            <circle cx="20" cy="16" r="6" fill="white"/>
            <path d="M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white"/>
          </svg>
        </div>
        <div className={styles.userDetails}>
          <span className={styles.dept}>공과대학 / 컴퓨터 공학부</span>
          <div className={styles.nameRow}>
            <span className={styles.userName}>헤이영</span>
            <span className={styles.userId}>(202012345)</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.qrButton}>
          QR
        </button>
      </div>
    </div>
  );
};

export default UserCard;