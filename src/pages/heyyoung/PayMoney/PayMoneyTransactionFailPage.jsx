"use client";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PayMoneyTransactionFailPage.module.css";
import PayMoneyTopUpConfirm from "../../../components/PayMoney/PayMoneyTopUpConfirm";

export default function PayMoneyTransactionFailPage() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  // 실패 사유 더미 (실제에선 state.errorMessage 같은 걸 내려받으면 됨)
  const errorMessage = state?.errorMessage ?? "잔액 부족으로 충전할 수 없습니다.";

  return (
    <div className={styles.container}>
      <header className={styles.header} aria-hidden="true" />
      <main className={styles.main}>
        <div className={styles.badge} aria-hidden="true">
          <span className={styles.failIcon}>❌</span>
        </div>
        <h1 className={styles.title}>충전 실패</h1>
        <p className={styles.sub}>{errorMessage}</p>
      </main>

      <div className={styles.actionWrap}>
        <PayMoneyTopUpConfirm
          onClick={() =>
            navigate("/paymoney", {
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
