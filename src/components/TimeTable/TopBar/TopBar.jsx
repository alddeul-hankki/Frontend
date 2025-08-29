import styles from "./TopBar.module.css"
import InfoIcon from "../InfoIcon/InfoIcon";

const TopBar = () => (
  <div className={styles.topBar}>
    <div className={styles.termWrap}>
      <div className={styles.checkbox} />
      <button className={styles.termBtn} type="button">
        2024년도 2학기 <span className={styles.caret} />
      </button>
    </div>
    <button className={styles.noticeBtn} type="button">
      시간표 정정 안내 <span className={styles.noticeIcon}><InfoIcon /></span>
    </button>
  </div>
);

export default TopBar;