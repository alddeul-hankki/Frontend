"use client";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PayMoneyTransactionSuccessPage.module.css";
import PayMoneyTopUpConfirm from "../../../components/PayMoney/PayMoneyTopUpConfirm"; // ⬅️ 추가

export default function PayMoneyTransactionSuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const amount = state?.amount;

  return (
    <div className={styles.container}>
      <header className={styles.header} aria-hidden="true" />
      <main className={styles.main}>
        <div className={styles.badge} aria-hidden="true">
          <svg viewBox="0 0 24 24" className={styles.check}>
            <path
              d="M20 6L9 17l-5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className={styles.title}>충전완료!</h1>
        {Number.isFinite(amount) && amount > 0 && (
          <p className={styles.sub}>
            총 {amount.toLocaleString("ko-KR")}원 충전
          </p>
        )}
      </main>

      <div className={styles.actionWrap}>
        <PayMoneyTopUpConfirm
          onClick={() =>
            navigate("/paymoney", {
              state: { amount },
              replace: true,
            })
          }
        >
          확인
        </PayMoneyTopUpConfirm>
      </div>
    </div>
  );
}
