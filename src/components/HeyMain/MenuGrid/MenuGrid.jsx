import React from 'react';
import styles from './MenuGrid.module.css';

const MenuGrid = () => {
  const menuItems = [
    { icon: '📋', title: '출결 신청내역', id: 'attendance' },
    { icon: '📅', title: '일정관리', id: 'schedule' },
    { icon: '🎓', title: '성적 조회', id: 'grades' },
    { icon: '📚', title: '수강 신청', id: 'registration' },
    { icon: '🏠', title: '주거 신청', id: 'housing' },
    { icon: '🔊', title: '공지 사항', id: 'notice' },
    { icon: '⚙️', title: '환경 설정', id: 'settings' },
    { icon: '🎯', title: '포인트 관리', id: 'points' },
    { icon: '💳', title: '학생증 재발급', id: 'card' },
    { icon: '🏫', title: '시설물 관리', id: 'facility' },
    { icon: '💰', title: '학습관리', id: 'study' },
    { icon: '🍽️', title: '식당정보', id: 'dining' }
  ];

  const renderIcon = (iconType, id) => {
    const iconMap = {
      'attendance': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#666" strokeWidth="2"/>
          <path d="M9 12l2 2 4-4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      'schedule': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#666" strokeWidth="2"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'grades': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'registration': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="#666" strokeWidth="2"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'housing': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#666" strokeWidth="2"/>
          <polyline points="9,22 9,12 15,12 15,22" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'notice': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'settings': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="#666" strokeWidth="2"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'points': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2"/>
          <circle cx="12" cy="12" r="6" fill="#666"/>
          <circle cx="12" cy="12" r="2" fill="white"/>
        </svg>
      ),
      'card': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="#666" strokeWidth="2"/>
          <line x1="1" y1="10" x2="23" y2="10" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'facility': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="#666" strokeWidth="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'study': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="#666" strokeWidth="2"/>
        </svg>
      ),
      'dining': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="#666" strokeWidth="2"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="#666" strokeWidth="2"/>
          <line x1="6" y1="1" x2="6" y2="4" stroke="#666" strokeWidth="2"/>
          <line x1="10" y1="1" x2="10" y2="4" stroke="#666" strokeWidth="2"/>
          <line x1="14" y1="1" x2="14" y2="4" stroke="#666" strokeWidth="2"/>
        </svg>
      )
    };

    return iconMap[id] || <span style={{fontSize: '24px'}}>{iconType}</span>;
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuTitle}>MY메뉴</div>
      <div className={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <div className={styles.menuIcon}>
              {renderIcon(item.icon, item.id)}
            </div>
            <span className={styles.menuText}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;