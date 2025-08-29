"use client";
import styles from "./PayMoneyConfirmBtn.module.css";

export default function PayMoneyConfirmBtn({
  children = "충전하기",
  disabled,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={styles.actionBtn}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
