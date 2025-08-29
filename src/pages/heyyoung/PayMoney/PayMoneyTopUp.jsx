"use client";
import React, { useMemo, useState } from "react";
import { ArrowLeft, Menu, MessageCircle } from "lucide-react";
import styles from "./PayMoneyTopUp.module.css";

function formatKRW(num) {
  const n = Number.isFinite(num) ? num : 0;
  return new Intl.NumberFormat("ko-KR").format(n);
}

export default function PayMoneyTopUp({
  defaultAmount = 10000,
  min = 5000,
  max = 430000,
  balance = 430000,
  onBack,
  onMenu,
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [autoTopup, setAutoTopup] = useState(false);

  const invalid = amount < min || amount > max;

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const next = raw === "" ? 0 : parseInt(raw, 10);
    setAmount(next);
  };

  const presets = useMemo(() => [10000, 50000, 100000, 500000], []);

  return (
    <div className={styles.container}>
      <div className={styles.phone}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.iconBtn} onClick={onBack} aria-label="back">
            <ArrowLeft size={20} />
          </button>
          <h1 className={styles.title}>충전하기</h1>
          <button className={styles.iconBtn} onClick={onMenu} aria-label="menu">
            <Menu size={20} />
          </button>
        </div>

        {/* Auto top-up pill */}
        <div className={styles.pillRow}>
          <button
            className={[styles.autoPill, autoTopup ? styles.autoOn : styles.autoOff].join(" ")}
            onClick={() => setAutoTopup((v) => !v)}
          >
            정기충전 설정
            <span className={styles.autoState}>{autoTopup ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* Amount input */}
        <div className={styles.amountWrap}>
          <input
            className={[styles.amountInput, invalid ? styles.amountInvalid : ""].join(" ")}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="충전 금액"
            value={formatKRW(amount)}
            onChange={handleChange}
          />
          <div className={styles.underline} />

          <div className={styles.metaRow}>
            <div className={styles.limits}>
              최소 {formatKRW(min)}원 <span className={styles.dot}>·</span> 최대 {formatKRW(max)}원
              <MessageCircle size={14} className={styles.metaIcon} />
            </div>
            <div className={styles.balance}>잔액 : <span className={styles.balanceNum}>{formatKRW(balance)}원</span></div>
          </div>
        </div>

        {/* Preset buttons */}
        <div className={styles.presets}>
          {presets.map((p) => (
            <button key={p} className={styles.presetBtn} onClick={() => setAmount(p)}>
              {formatKRW(p)}원
            </button>
          ))}
        </div>

        {/* Spacer for clean bottom */}
        <div className={styles.bottomSpace} />
      </div>
    </div>
  );
}


