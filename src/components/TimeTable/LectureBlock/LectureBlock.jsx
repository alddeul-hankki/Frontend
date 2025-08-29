import styles from "./LectureBlock.module.css"

/** 분 단위 절대 배치 이벤트 */
const LectureBlock = ({ cols, baseHour, col, startMin, endMin, title, prof, color }) => {
  // baseHour 기준 시작·지속 시간을 "시간" 단위 소수로 변환
  const startH = (startMin - baseHour * 60) / 60;              // 예: 16:30 → 0.5
  const durH   = (endMin - startMin) / 60;                     // 예: 1시간 30분 → 1.5
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