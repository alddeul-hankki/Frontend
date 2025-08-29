"use client";
import { useLocation, useNavigate } from "react-router-dom";
import PayMoneyConfirmBtn from "./PayMoneyConfirmBtn";
import styles from "./PayMoneyTransactionResult.module.css";

/**
 * props:
 * - variant: "success" | "fail"
 * - mode: "topup" | "refund"
 * - classes?: CSS Module override (선택) - { container, header, main, badge, check, failIcon, title, sub, actionWrap }
 * - nextPath?: 확인 버튼 눌렀을 때 이동 (기본: "/paymoney")
 * - amount?: 성공 시 표시 금액 (없으면 location.state.amount 사용)
 * - errorMessage?: 실패 사유 (없으면 location.state.errorMessage 사용)
 * - onConfirm?: 커스텀 확인 동작 (선택)
 */
export default function PayMoneyTransactionResult({
  variant = "success",
  mode = "topup",
  classes,            // ✅ 이름 변경
  nextPath = "/paymoney",
  amount: amountProp,
  errorMessage: errorProp,
  onConfirm,
}) {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const amount = amountProp ?? state?.amount;

  const errorMessage =
    errorProp ??
    state?.errorMessage ??
    (mode === "topup"
      ? "잔액 부족으로 충전할 수 없습니다."
      : "처리 중 오류로 환불할 수 없습니다.");

  const isSuccess = variant === "success";
  const isTopup = mode === "topup";

  const title = isSuccess
    ? isTopup ? "충전완료!" : "환불완료!"
    : isTopup ? "충전 실패" : "환불 실패";

  const amountNum = Number(amount);
  const subText = isSuccess
    ? (Number.isFinite(amountNum) && amountNum > 0
        ? `총 ${amountNum.toLocaleString("ko-KR")}원 ${isTopup ? "충전" : "환불"}`
        : null)
    : errorMessage;

  const handleConfirm = () => {
    if (onConfirm) return onConfirm({ amount, isSuccess, mode });
    navigate(nextPath, {
      state: isSuccess ? { amount } : undefined,
      replace: true,
    });
  };

  // 사용할 클래스 선택 (override 지원)
  const cx = classes ?? styles;

  return (
    <div className={cx.container}>
      <header className={cx.header} aria-hidden="true" />
      <main className={cx.main}>
        <div className={cx.badge} aria-hidden="true">
          {isSuccess ? (
            <svg viewBox="0 0 24 24" className={cx.check}>
              <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span className={cx.failIcon}>❌</span>
          )}
        </div>
        <h1 className={cx.title}>{title}</h1>
        {subText && <p className={cx.sub}>{subText}</p>}
      </main>

      <div className={cx.actionWrap}>
        <PayMoneyConfirmBtn onClick={handleConfirm}>확인</PayMoneyConfirmBtn>
      </div>
    </div>
  );
}
