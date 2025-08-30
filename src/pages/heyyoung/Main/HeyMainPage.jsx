import Header from '../../../components/HeyMain/HeyHeader/HeyHeader';
import UserCard from '../../../components/HeyMain/UserCard/UserCard';
import MenuGrid from '../../../components/HeyMain/MenuGrid/MenuGrid';
import BottomNavigation from '../../../components/BottomNavigation/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import styles from './HeyMainPage.module.css'
import { useEffect } from 'react';

const HeyMainPage = () => {

  useEffect(() => {
    localStorage.setItem('userId', '14');
    localStorage.setItem('userEmail', 'hong1@test.com');

  }, []);

  const navigate = useNavigate();
  const handleMenuClick = (item) => {
    if (item.id === 'solsolhanhankki') navigate('/solsol');
    if (item.id === 'timetable') navigate('/timetable');
  };
  
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <UserCard />
      </div>
      <div className={styles.menuGridSpacer}>
        <MenuGrid onClickItem={handleMenuClick} />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default HeyMainPage;