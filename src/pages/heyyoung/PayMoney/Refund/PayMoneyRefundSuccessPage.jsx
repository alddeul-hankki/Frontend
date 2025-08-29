"use client";
import PayMoneyTransactionResult from "../../../../components/PayMoney/PayMoneyTransactionResult";

export default function PayMoneyRefundSuccessPage() {
  return (
    <PayMoneyTransactionResult
      variant="success"
      mode="refund"
    />
  );
}
