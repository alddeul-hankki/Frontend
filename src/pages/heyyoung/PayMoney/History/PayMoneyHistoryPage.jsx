"use client";
import { useEffect, useState, useMemo } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import styles from "./PayMoneyHistoryPage.module.css";
import { getLedgerHistory } from "../../../../util/paymoneyApi";

function formatKRW(n) {
  return Number.isFinite(n) ? n.toLocaleString() : "0";
}
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function typeLabel(t) {
  // 백엔드 enum 문자열에 맞춰 필요시 수정
  switch (String(t).toUpperCase()) {
    case "DEPOSIT":
    case "DEPOSIT_CREDIT":
      return "충전";
    case "WITHDRAW":
    case "WITHDRAW_DEBIT":
      return "출금";
    case "PURCHASE":
    case "PURCHASE_DEBIT":
      return "결제";
    case "REFUND":
    case "REFUND_CREDIT":
      return "환불";
    default:
      return "거래";
  }
}
function isCredit(t) {
  const s = String(t).toUpperCase();
  return s.includes("DEPOSIT") || s.includes("CREDIT") || s === "REFUND";
}

export default function PayMoneyHistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        const res = await getLedgerHistory({ email });
        setHistory(Array.isArray(res) ? res : res?.data ?? []);
      } catch (e) {
        console.error("거래 내역 불러오기 실패:", e);
      }
    })();
  }, []);

  const empty = useMemo(() => history.length === 0, [history.length]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>이용내역</h1>
      </header>

      <main className={styles.historyWrap}>
        {empty ? (
          <div className={styles.emptyBox}>
            <p className={styles.emptyTitle}>거래 내역이 없습니다</p>
            <p className={styles.emptySub}>충전·결제 시 여기에 기록이 표시돼요.</p>
          </div>
        ) : (
          history.map((item) => {
            const credit = isCredit(item.type);
            const label = typeLabel(item.type);
            return (
              <div key={item.id} className={styles.historyItem}>
                <div className={styles.iconWrap} aria-hidden="true">
                  {credit ? (
                    <ArrowDownCircle className={styles.depositIcon} size={28} />
                  ) : (
                    <ArrowUpCircle className={styles.withdrawIcon} size={28} />
                  )}
                </div>

                <div className={styles.historyContent}>
                  <div className={styles.rowTop}>
                    <span className={styles.description}>
                      {item.description || label}
                    </span>
                    <span
                      className={`${styles.amount} ${
                        credit ? styles.depositAmount : styles.withdrawAmount
                      }`}
                    >
                      {credit ? "+" : "-"}
                      {formatKRW(item.amount)}원
                    </span>
                  </div>

                  <div className={styles.rowBottom}>
                    <span className={styles.badge}>{label}</span>
                    <span className={styles.dot} aria-hidden="true">•</span>
                    <span className={styles.date}>{formatDate(item.createdAt)}</span>
                    <span className={styles.dot} aria-hidden="true">•</span>
                    <span className={styles.balance}>
                      잔액 {formatKRW(item.balanceAfter)}원
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
