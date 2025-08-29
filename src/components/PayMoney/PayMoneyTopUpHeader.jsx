"use client";
import { ArrowLeft, Menu } from "lucide-react";
import styles from "./PayMoneyTopUpHeader.module.css"; // ✅ 헤더 전용 CSS로 변경

export default function PayMoneyTopUpHeader({ title = "충전하기", onBack, onMenu }) {
  return (
    <div className={styles.topBar}>
      <button className={styles.iconBtn} onClick={onBack} aria-label="back">
        <ArrowLeft size={20} />
      </button>
      <h1 className={styles.title}>{title}</h1>
      {onMenu ? (
        <button className={styles.iconBtn} onClick={onMenu} aria-label="menu">
          <Menu size={20} />
        </button>
      ) : (
        <div style={{ width: 40 }} />
      )}
    </div>
  );
}
