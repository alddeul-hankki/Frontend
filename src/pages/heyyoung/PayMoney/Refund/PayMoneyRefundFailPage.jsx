"use client";
import PayMoneyTransactionResult from "../../../../components/PayMoney/PayMoneyTransactionResult";

export default function PayMoneyRefundFailPage() {
  return (
    <PayMoneyTransactionResult
      variant="fail"
      mode="refund"
      errorMessage="네트워크 오류로 환불 처리에 실패했습니다."
    />
  );
}
