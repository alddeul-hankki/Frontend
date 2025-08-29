"use client";
import { useLocation, useNavigate } from "react-router-dom";
import PayMoneyTopUpConfirm from "../../../components/PayMoney/PayMoneyTopUpConfirm";
import styles from "./PayMoneyTopUpConfirmPage.module.css";
import { topupPayMoney } from "../../../util/paymoneyApi";

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

export default function PayMoneyTopUpConfirmPage() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const amount = state?.amount ?? 0;
  const account = state?.account ?? null;

  const bankName = account?.bankName ?? "SSAFY";
  const productName = account?.productName ?? "입출금계좌";
  const accountNo = formatAccountNo(account?.accountNo ?? "1104568554");
  const bankLogoUrl = account?.bankLogoUrl;

  const disabled = !amount || amount <= 0;

  const handleSubmit = async () => {
    if (disabled) return;
    try {
      const email = localStorage.getItem("userEmail");
      const result = await topupPayMoney({
        email,
        transactionBalance: amount,
        transactionSummary: "쏠쏠한Pay머니 충전",
      });
      console.log("충전 성공:", result);
      navigate("/paymoney/topup/success")
    } catch (err) {
      console.error("충전 중 오류:", err);
      navigate("/paymoney/topup/fail")
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.message}>
          쏠쏠한Pay머니 {formatKRW(amount)}원을
          <br />
          충전합니다.
        </p>

        <div
          className={styles.accountBox}
          role="button"
          tabIndex={0}
          aria-label={`${bankName} ${productName} ${accountNo}에서 출금`}
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
              <span className={styles.gray}>에서 출금</span>
            </div>
            <div className={styles.accountNumber}>{accountNo}</div>
          </div>
        </div>
      </div>

      <div className={styles.actionWrap}>
        <PayMoneyTopUpConfirm onClick={handleSubmit} disabled={disabled}>
          충전하기
        </PayMoneyTopUpConfirm>
      </div>
    </div>
  );
}
