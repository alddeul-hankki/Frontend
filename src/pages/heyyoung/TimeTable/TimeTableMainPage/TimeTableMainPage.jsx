import React, { useMemo } from "react";
import styles from "./TimeTableMainPage.module.css";
import PageHeader from "../../../../components/PageHeader/PageHeader";
import TopBar from "../../../../components/TimeTable/TopBar/TopBar";
import DayHeader from "../../../../components/TimeTable/DayHeader/DayHeader";
import TimeGutter from "../../../../components/TimeTable/TimeGutter/TimeGutter";
import LectureBlock from "../../../../components/TimeTable/LectureBlock/LectureBlock";

function TimeTableMainPage() {
  //TODO: api로 불러오기
  /** 데모 데이터: 분 단위 (09:00=540) */
  const lectures = useMemo(
    () => [
      {
        col: 1,
        startMin: 19 * 60 + 0,
        endMin: 21 * 60 + 50,
        title: "캡스톤디자인2",
        prof: "손성훈",
        color: "#68c397",
      },
      {
        col: 2,
        startMin: 18 * 60 + 30,
        endMin: 20 * 60 + 50,
        title: "일본사회문화의이해",
        prof: "성윤아",
        color: "#79a6ff",
      },
    ],
    []
  );
  const COLS = 5; // 월~금

  // 기본 시간 범위(없을 때)
  const DEFAULT_START = 9;
  const DEFAULT_END = 18;

  // 데이터 기반 시간 범위(분 단위) → 시간 단위로 올림/내림
  const { startHour, endHour, rows } = useMemo(() => {
    if (!lectures.length) {
      const s = DEFAULT_START,
        e = DEFAULT_END + 1;
      return { startHour: s, endHour: e, rows: e - s };
    }
    const minStart = Math.min(...lectures.map((e) => e.startMin));
    const maxEnd = Math.max(...lectures.map((e) => e.endMin));
    const sHour = (minStart - 60) / 60; // 시 단위
    const eHour = (maxEnd + 60) / 60;
    const s = Math.floor(sHour);
    const e = Math.ceil(eHour);
    return { startHour: s, endHour: e, rows: e - s };
  }, [lectures]);

  return (
    <div className={styles.page}>
      <PageHeader title="강의시간표" />
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`} type="button">
          강의시간표
        </button>
        <button className={styles.tab} type="button">
          수강내역
        </button>
      </div>

      <TopBar />
      <div className={styles.stickyHeader}>
        <DayHeader />
      </div>

      <div className={styles.scrollArea}>
        <div
          className={styles.gridWrap}
          style={{ "--gutter-w": "clamp(56px, 8vw, 96px)" }}
        >
          <TimeGutter startHour={startHour} endHour={endHour} rows={rows} />

          {/* 본 그리드 */}
          <div className={styles.gridBody}>
            <div
              className={styles.cells}
              style={{
                "--cols": COLS,
                "--rows": rows,
              }}
            >
              {lectures.map((ev, i) => (
                <LectureBlock
                  key={i}
                  cols={COLS}
                  baseHour={startHour}
                  col={ev.col}
                  startMin={ev.startMin}
                  endMin={ev.endMin}
                  title={ev.title}
                  prof={ev.prof}
                  color={ev.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTableMainPage;
