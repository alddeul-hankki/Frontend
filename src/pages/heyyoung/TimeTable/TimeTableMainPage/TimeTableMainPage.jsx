import React, { useMemo } from "react";
import styles from "./TimeTableMainPage.module.css";
import TopBar from "../../../../components/TimeTable/TopBar/TopBar";
import DayHeader from "../../../../components/TimeTable/DayHeader/DayHeader";
import TimeGutter from "../../../../components/TimeTable/TimeGutter/TimeGutter";
import LectureBlock from "../../../../components/TimeTable/LectureBlock/LectureBlock";

function TimeTableMainPage() {
  const lectures = useMemo(
    () => [
      {
        col: 1,
        startMin: 9 * 60 + 0,
        endMin: 10 * 60 + 15,
        title: "기초수학",
        prof: "박교수",
        color: "#68c397",
      },
      {
        col: 3,
        startMin: 10 * 60 + 30,
        endMin: 11 * 60 + 45,
        title: "기초수학",
        prof: "박교수",
        color: "#68c397",
      },
      {
        col: 1,
        startMin: 13 * 60 + 0,
        endMin: 13 * 60 + 50,
        title: "대학생활설계",
        prof: "박교수",
        color: "#79a6ff",
      },
      {
        col: 1,
        startMin: 15 * 60 + 0,
        endMin: 16 * 60 + 15,
        title: "생명과학입문",
        prof: "문교수",
        color: "#f7b267",
      },
      {
        col: 4,
        startMin: 10 * 60 + 30,
        endMin: 11 * 60 + 45,
        title: "생명과학입문",
        prof: "문교수",
        color: "#f7b267",
      },
      {
        col: 2,
        startMin: 9 * 60 + 0,
        endMin: 10 * 60 + 15,
        title: "소프트웨어와컴퓨팅사고",
        prof: "김교수",
        color: "#f48498",
      },
      {
        col: 5,
        startMin: 10 * 60 + 30,
        endMin: 11 * 60 + 45,
        title: "소프트웨어와컴퓨티사고",
        prof: "김교수",
        color: "#f48498",
      },
      {
        col: 2,
        startMin: 12 * 60 + 0,
        endMin: 13 * 60 + 15,
        title: "의사소통기술",
        prof: "사공교수",
        color: "#c084fc",
      },
      {
        col: 5,
        startMin: 16 * 60 + 30,
        endMin: 17 * 60 + 45,
        title: "의사소통기술",
        prof: "사공교수",
        color: "#c084fc",
      },
      {
        col: 2,
        startMin: 17 * 60 + 0,
        endMin: 17 * 60 + 50,
        title: "PROFESSIONAL ENGLISH",
        prof: "미쉘교수",
        color: "#4dd0e1",
      },
      {
        col: 4,
        startMin: 17 * 60 + 0,
        endMin: 17 * 60 + 50,
        title: "PROFESSIONAL ENGLISH",
        prof: "미쉘교수",
        color: "#4dd0e1",
      },
      {
        col: 3,
        startMin: 12 * 60 + 0,
        endMin: 13 * 60 + 15,
        title: "일반물리",
        prof: "허교수",
        color: "#ffd166",
      },
      {
        col: 5,
        startMin: 9 * 60 + 0,
        endMin: 10 * 60 + 15,
        title: "일반물리",
        prof: "허교수",
        color: "#ffd166",
      },
    ],
    []
  );
  const COLS = 5;

  const DEFAULT_START = 9;
  const DEFAULT_END = 18;

  const { startHour, endHour, rows } = useMemo(() => {
    if (!lectures.length) {
      const s = DEFAULT_START,
        e = DEFAULT_END + 1;
      return { startHour: s, endHour: e, rows: e - s };
    }
    const minStart = Math.min(...lectures.map((e) => e.startMin));
    const maxEnd = Math.max(...lectures.map((e) => e.endMin));
    const sHour = (minStart - 60) / 60;
    const eHour = (maxEnd + 60) / 60;
    const s = Math.floor(sHour);
    const e = Math.ceil(eHour);
    return { startHour: s, endHour: e, rows: e - s };
  }, [lectures]);

  return (
    <div className={styles.page}>
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
