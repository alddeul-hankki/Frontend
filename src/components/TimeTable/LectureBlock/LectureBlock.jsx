import styles from "./LectureBlock.module.css"

const LectureBlock = ({ cols, baseHour, col, startMin, endMin, title, prof, color }) => {
  const startH = (startMin - baseHour * 60) / 60;
  const durH   = (endMin - startMin) / 60;
  return (
    <div
      className={styles.lectureBlockAbs}
      style={{
        '--cols': cols,
        '--col': col,
        '--startH': startH,
        '--durH': durH,
        background: color
      }}
    >
      <div className={styles.lectureBlockTitle}>{title}</div>
      <div className={styles.lectureBlockProf}>{prof}</div>
    </div>
  );
};

export default LectureBlock;