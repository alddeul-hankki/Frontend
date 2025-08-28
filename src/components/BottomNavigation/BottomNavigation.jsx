import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('전체메뉴');

  // URL에 따라 활성 탭 설정
  useEffect(() => {
    switch (location.pathname) {
      case '/pay':
        setActiveTab('페이');
        break;
      default:
        setActiveTab('학사');
    }
  }, [location.pathname]);

  const handleNavClick = (item) => {
    setActiveTab(item.label);
    
    switch (item.label) {
      case '페이':
        navigate('/pay');
        break;
      default:
        navigate('/');
    }
  };

  const navItems = [
    { 
      id: 'academic',
      label: '학사',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2" strokeLinejoin="round"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'benefits',
      label: '혜택',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2" fill={isActive ? '#6366f1' : 'none'}/>
        </svg>
      )
    },
    { 
      id: 'pay',
      label: '페이',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2"/>
          <line x1="1" y1="10" x2="23" y2="10" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2"/>
        </svg>
      )
    },
    { 
      id: 'all-menu',
      label: '전체메뉴',
      icon: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2" fill={isActive ? '#6366f1' : 'none'}/>
          <rect x="15" y="3" width="6" height="6" rx="1" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2" fill={isActive ? '#6366f1' : 'none'}/>
          <rect x="3" y="15" width="6" height="6" rx="1" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2" fill={isActive ? '#6366f1' : 'none'}/>
          <rect x="15" y="15" width="6" height="6" rx="1" stroke={isActive ? '#6366f1' : '#999'} strokeWidth="2" fill={isActive ? '#6366f1' : 'none'}/>
        </svg>
      )
    }
  ];

  return (
    <div className={styles.bottomNavigation}>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.navItem} ${activeTab === item.label ? styles.active : ''}`}
          onClick={() => handleNavClick(item)}
        >
          <div className={styles.navIcon}>
            {item.icon(activeTab === item.label)}
          </div>
          <span className={styles.navLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;