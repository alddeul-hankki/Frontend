"use client";
import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import PayMoneyConfirmBtn from "./PayMoneyConfirmBtn.jsx";
import styles from "./PayMoneyTransaction.module.css"; 

function formatKRW(num) {
  const n = Number.isFinite(num) ? num : 0;
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function PayMoneyTransaction({
  mode = "topup",
  defaultAmount = 10000,
  min = 5000,
  max = 430000,
  balance = 1000000,
  onAmountChange,
  presets: _presets,
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const navigate = useNavigate();
  const location = useLocation();

  const invalid = amount < min || amount > max;
  const disabled = invalid || amount === 0;

  const presets = useMemo(
    () => _presets ?? [10000, 50000, 100000, 500000],
    [_presets]
  );

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const next = raw === "" ? 0 : parseInt(raw, 10);
    setAmount(next);
    onAmountChange?.(next);
  };

  const handleSubmit = () => {
    navigate(`${location.pathname}/confirm`, {
      state: { amount, mode },
    });
  };

  const isTopup = mode === "topup";
  const title = isTopup ? "충전하기" : "환불하기";
  const balanceLabel = isTopup ? "잔액" : "환불 가능 잔액";
  const actionLabel = isTopup ? "충전하기" : "환불하기";

  return (
    <div className={styles.container}>
        <div className={styles.amountWrap}>
          <input
            className={[
              styles.amountInput,
              invalid ? styles.amountInvalid : "",
            ].join(" ")}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label={isTopup ? "충전 금액" : "환불 금액"}
            value={formatKRW(amount)}
            onChange={handleChange}
          />
          <div className={styles.underline} />

          <div className={styles.metaRow}>
            <div className={styles.limits}>
              최소 {formatKRW(min)}원 <span className={styles.dot}>·</span> 최대{" "}
              {formatKRW(max)}원
              <MessageCircle size={14} className={styles.metaIcon} />
            </div>
            <div className={styles.balance}>
              {balanceLabel} :{" "}
              <span className={styles.balanceNum}>{formatKRW(balance)}원</span>
            </div>
          </div>
        </div>

        <div className={styles.presets}>
          {presets.map((p) => (
            <button
              key={p}
              className={styles.presetBtn}
              onClick={() => {
                setAmount(p);
                onAmountChange?.(p);
              }}
            >
              {formatKRW(p)}원
            </button>
          ))}
        </div>

        <div className={styles.actionWrap}>
          <PayMoneyConfirmBtn onClick={handleSubmit} disabled={disabled}>
            {actionLabel}
          </PayMoneyConfirmBtn>
        </div>
      </div>
  );
}
