"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  CreditCard,
  QrCode,
  Send,
  MoreHorizontal,
  RotateCcw
} from "lucide-react";
import styles from "./PayMoneyDashboard.module.css";
import { inquirePayMoney } from "../../../util/paymoneyApi";
import { getOrCreateUser } from "../../../util/userApi";

// JS 버전 (타입 제거)
const formatKRW = (n) =>
  new Intl.NumberFormat("ko-KR").format(Number.isFinite(n) ? n : 0);

function Pill({ children, tone = "default" }) {
  const cls = [
    styles.pill,
    tone === "green" ? styles.pillGreen : "",
    tone === "dark" ? styles.pillDark : "",
  ].join(" ");
  return <span className={cls}>{children}</span>;
}

function SecondaryButton({ children, onClick }) {
  return (
    <button className={styles.secondaryButton} onClick={onClick}>
      {children}
    </button>
  );
}

function SectionTabs() {
  const [active, setActive] = useState(0);
  const tabs = ["결제·뱅킹", "멤버십", "전자문서", "부가서비스"];
  return (
    <div className={[styles.tabs, styles.noScrollbars].join(" ")}>
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => setActive(i)}
          className={[styles.tab, active === i ? styles.tabActive : ""].join(
            " "
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function ActionRail({ onTopUpClick, onRefundClick }) {
  const Item = ({ Icon, label, onClick }) => (
    <button className={styles.railItem} onClick={onClick}>
      <Icon size={16} className={styles.railIcon} />
      <span className={styles.flex1}>{label}</span>
    </button>
  );
  return (
    <aside className={styles.actionRail}>
      <Item Icon={CreditCard} label={"터치\n결제"} />
      <Item Icon={QrCode} label={"QR·\n바코드"} />
      <Item Icon={Send} label="충전" onClick={onTopUpClick} />
      <Item Icon={RotateCcw} label="환불" onClick={onRefundClick} />
    </aside>
  );
}

function PayWalletCard({ logoSrc, onTopUpClick, onRefundClick, onAccountManageClick, balance = 0 }) {
  return (
    <div className={styles.walletRow}>
      <div className={styles.verticalLabel}></div>
      <div className={styles.walletCard}>
        <div className={styles.miniHeader}>
          <div className={styles.logoFrame}>
            <img src={logoSrc} alt="서비스 로고" className={styles.logoImg} />
          </div>
        </div>
        <div className={styles.cardTitle}>쏠쏠한Pay머니</div>
        <div className={styles.rowBetween}>
          <div className={styles.labelSmall}>Shinhan_univ_20251234</div>
        </div>
        <div className={styles.labelSmall}>
          잔액 <span className={styles.balance}>{formatKRW(balance)}원</span>
        </div>
        <div className={styles.actionsLine}>
          <SecondaryButton onClick={onAccountManageClick}>
            충전계좌관리
          </SecondaryButton>
        </div>
        <div className={styles.usageLabel}>8월 이용금액</div>
        <div className={styles.usageValue}>400,000원</div>
      </div>
      <ActionRail onTopUpClick={ onTopUpClick } onRefundClick={ onRefundClick }/>
    </div>
  );
}

export default function PayMoneyDashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const userRequest = { email: "hong@test.com" };
        const userResp = await getOrCreateUser(userRequest);
        console.log("getOrCreateUser resp:", userResp);

        const email = userResp?.data?.email ?? userRequest.email;
        localStorage.setItem("userId", userResp?.data?.userId ?? "");
        localStorage.setItem("userEmail", email);

        const res = await inquirePayMoney({ email });
        console.log("inquirePayMoney resp:", res);

        // 응답 형태 유연 처리
        const amount =
          (res && res.data && typeof res.data.amount === "number" && res.data.amount) ||
          (typeof res?.amount === "number" && res.amount) ||
          0;

        setBalance(amount);
      } catch (err) {
        console.error("초기 로드 에러:", err);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("balance updated:", balance);
  }, [balance]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.leftTop}>
          <h1 className={styles.title}>쏠쏠한Pay머니</h1>
        </div>
      </div>

      <div className={styles.sectionPad}>
        <SectionTabs />
      </div>

      <div className={styles.pillRow}>
        <div>
          <Pill tone="green">상생소비지원금, 월 최대 10만원 캐시백!</Pill>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.rightControls}>
          <SecondaryButton>이용내역</SecondaryButton>
        </div>
      </div>

      <div className={styles.sectionPad}>
        <PayWalletCard
          logoSrc="src/assets/solsolhancard.png"
          balance={balance}
          onTopUpClick={() => navigate("/paymoney/topup")}
          onRefundClick={() => navigate("/paymoney/refund")}
          onAccountManageClick={() => navigate("/account-manage")}
        />
      </div>

      <div className={styles.cardsList}>
        <div
          className={styles.bankCard}
          onClick={() => navigate("/account-manage")}
        >
          <div className={styles.miniHeader}>
            <img
              src="src/assets/ssafyLogo.png"
              alt="계좌 로고"
              className={styles.miniCardImg}
            />
            <div className={styles.cardTitle}>SSAFY 계좌</div>
          </div>
          <div className={styles.rowBetweenSmall}>
            <span>본인 1234</span>
            <ChevronRight size={18} className={styles.mutedIcon} />
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}
