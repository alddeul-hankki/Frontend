"use client";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import styles from "./PayMoneyTopUpPage.module.css";
import PayMoneyTopUpConfirm from "../../../components/PayMoney/PayMoneyTopUpConfirm";

function formatKRW(num) {
  const n = Number.isFinite(num) ? num : 0;
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function PayMoneyTopUpPage({
  defaultAmount = 0,
  min = 5000,
  max = 500000,
  balance = 1000000,
  onBack,
  onMenu,
}) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(defaultAmount);

  const invalid = amount < min || amount > max;

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const next = raw === "" ? 0 : Math.min(parseInt(raw, 10), 999999999);
    setAmount(next);
  };

  const presets = useMemo(
    () => [
      { value: 10000, label: "1만원" },
      { value: 50000, label: "5만원" },
      { value: 100000, label: "10만원" },
      { value: 500000, label: "50만원" },
    ],
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.amountWrap}>
        <input
          className={styles.amountInput}
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label="충전 금액"
          value={amount === 0 ? "" : formatKRW(amount)}
          onChange={handleChange}
          placeholder="0"
        />
        <div className={styles.underline} />

        <div className={styles.metaRow}>
          <div className={styles.limits}>
            최소 {formatKRW(min)}원
            <span className={styles.bar} />
            최대 {formatKRW(max)}원
            <MessageCircle
              size={14}
              className={styles.metaIcon}
              aria-hidden="true"
            />
          </div>
          <div className={styles.balance}>
            잔액&nbsp;
            <span className={styles.balanceNum}>{formatKRW(balance)}원</span>
          </div>
        </div>
      </div>

      <div className={styles.presets}>
        {presets.map((p) => (
          <button
            key={p.value}
            type="button"
            className={styles.presetBtn}
            onClick={() => setAmount(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={styles.actionWrap}>
        <PayMoneyTopUpConfirm
          disabled={invalid || amount === 0}
          onClick={() =>
            navigate("/paymoney/topup/confirm", {
              state: { amount },
            })
          }
        >
          충전하기
        </PayMoneyTopUpConfirm>
      </div>
    </div>
  );
}
