"use client";
import { useLocation, useNavigate } from "react-router-dom";
import PayMoneyConfirmBtn from "./PayMoneyConfirmBtn.jsx";
import styles from "./PayMoneyTransactionConfirm.module.css";
import { topupPayMoney, refundPayMoney } from "../../util/paymoneyApi.js";

function formatKRW(n) {
  const v = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("ko-KR").format(v);
}

function formatAccountNo(no) {
  if (!no) return "";
  const s = String(no).replace(/\D/g, "");
  if (s.length <= 3) return s;
  if (s.length <= 6) return `${s.slice(0, 3)}-${s.slice(3)}`;
  return `${s.slice(0, 3)}-${s.slice(3, 6)}-${s.slice(6)}`;
}

export default function PayMoneyTransactionConfirm({ mode = "topup" }) {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const amount = state?.amount ?? 0;
  const account = state?.account ?? null;

  const bankName = account?.bankName ?? "SSAFY";
  const productName = account?.productName ?? "입출금계좌";
  const accountNo = formatAccountNo(account?.accountNo ?? "1104568554");
  const bankLogoUrl = account?.bankLogoUrl;

  const disabled = !amount || amount <= 0;

  // mode 별 설정
  const isTopup = mode === "topup";
  const actionLabel = isTopup ? "충전하기" : "환불하기";
  const summaryText = isTopup
    ? `쏠쏠한Pay머니 ${formatKRW(amount)}원을\n충전합니다.`
    : `쏠쏠한Pay머니 ${formatKRW(amount)}원을\n환불(출금)합니다.`;
  const successPath = isTopup
    ? "/paymoney/topup/success"
    : "/paymoney/refund/success";
  const failPath = isTopup
    ? "/paymoney/topup/fail"
    : "/paymoney/refund/fail";

  const handleSubmit = async () => {
    if (disabled) return;
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) throw new Error("로그인 정보 없음");

      const payload = {
        email,
        transactionBalance: amount,
        transactionSummary: isTopup
          ? "쏠쏠한Pay머니 충전"
          : "쏠쏠한Pay머니 환불",
      };

      if (isTopup) {
        await topupPayMoney(payload);
      } else {
        await refundPayMoney(payload);
      }

      navigate(successPath);
    } catch (err) {
      console.error(`${isTopup ? "충전" : "환불"} 중 오류:`, err);
      navigate(failPath);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.message}>{summaryText}</p>

        <div
          className={styles.accountBox}
          role="button"
          tabIndex={0}
          aria-label={`${bankName} ${productName} ${accountNo}에서 ${
            isTopup ? "출금" : "입금"
          }`}
        >
          <div className={styles.bankLogoWrap}>
            {bankLogoUrl ? (
              <img
                src={bankLogoUrl}
                alt={`${bankName} 로고`}
                className={styles.bankLogoImg}
              />
            ) : (
              <div className={styles.bankLogoFallback}>S</div>
            )}
          </div>

          <div className={styles.accountText}>
            <div className={styles.accountTitle}>
              <strong>
                {bankName} {productName}
              </strong>
              <span className={styles.gray}>
                {isTopup ? "에서 출금" : "으로 입금"}
              </span>
            </div>
            <div className={styles.accountNumber}>{accountNo}</div>
          </div>
        </div>
      </div>

      <div className={styles.actionWrap}>
        <PayMoneyConfirmBtn onClick={handleSubmit} disabled={disabled}>
          {actionLabel}
        </PayMoneyConfirmBtn>
      </div>
    </div>
  );
}
