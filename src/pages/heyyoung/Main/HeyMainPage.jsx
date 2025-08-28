import Header from '../../../components/HeyMain/HeyHeader/HeyHeader';
import UserCard from '../../../components/HeyMain/UserCard/UserCard';
import MenuGrid from '../../../components/HeyMain/MenuGrid/MenuGrid';
import BottomNavigation from '../../../components/BottomNavigation/BottomNavigation';
import styles from './HeyMainPage.module.css'

const HeyMainPage = () => {

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <UserCard />
        <MenuGrid />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default HeyMainPage;