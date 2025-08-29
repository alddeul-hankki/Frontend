"use client";
import PayMoneyTransactionResult from "../../../../components/PayMoney/PayMoneyTransactionResult";

export default function PayMoneyTopUpFailPage() {
  return (
    <PayMoneyTransactionResult
      variant="fail"
      mode="topup"
      errorMessage="네트워크 오류로 충전에 실패했습니다."
    />
  );
}
