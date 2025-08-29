import styles from "./TimeGutter.module.css"

const TimeGutter = ({ startHour, endHour, rows }) => {
  const hours = [];
  for (let h = startHour; h < endHour; h++) hours.push(h);
  return (
    <div className={styles.timeGutter} style={{ '--rows': rows }}>
      {hours.map(h => (
        <div key={h} className={styles.timeLabel}>{h}</div>
      ))}
    </div>
  );
};

export default TimeGutter;