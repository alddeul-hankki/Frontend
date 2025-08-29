import styles from "./DayHeader.module.css"

const DayHeader = ({ gutterW }) => (
  <div className={styles.dayHeader} style={{ '--gutter-w': gutterW }}>
    <div className={styles.timeHeaderCell}>T</div>
    {['월','화','수','목','금'].map(d => (
      <div key={d} className={styles.dayCell}>{d}</div>
    ))}
  </div>
);

export default DayHeader;