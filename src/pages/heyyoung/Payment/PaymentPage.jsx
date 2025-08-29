import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ProductInfo from '../../../components/Payment/ProductInfo/ProductInfo';
import PayMoneyCard from '../../../components/Payment/PayMoneyCard/PayMoneyCard';
import PaymentMethodSelector from '../../../components/Payment/PaymentMethodSelector/PaymentMethodSelector';
import PaymentButton from '../../../components/Payment/PaymentButton/PaymentButton';
import styles from './PaymentPage.module.css';
import PageHeader from './../../../components/PageHeader/PageHeader';
import { postPayment, withdrawPayment } from './../../../util/paymentApi';

const PaymentPage = () => {
  const location = useLocation();
  const [paymentResponse, setPaymentResponse] = useState(null);

  // 쿼리 스트링 파싱
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  // 서버 호출
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await postPayment(token, userId);
        console.log(response)
        setPaymentResponse(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPayment();
  }, [token]);

  // 결제 정보
  const paymentData = useMemo(() => {
    if (!paymentResponse) return null;
    return {
      productName: paymentResponse.summary,
      totalAmount: paymentResponse.amount,
      currentBalance: paymentResponse.balance,
      redirectUrl: paymentResponse.redirectUrl,
      accountNumber: paymentResponse.maskedAccountNumber
    };
  }, [paymentResponse]);

  // 자동충전 필요 여부 계산
  const needAutoCharge = paymentData?.currentBalance < paymentData?.totalAmount;
  const autoChargeAmount = needAutoCharge ? paymentData?.totalAmount - paymentData?.currentBalance : 0;


  const handlePayment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const request = {
        orderId: 1, // 임시 데이터
        userId: userId,
        redirectUrl: paymentData?.redirectUrl,
        amount: paymentData?.totalAmount,
        summary: paymentData?.productName
      }
      const response = await withdrawPayment(request);
      console.log(response);
      window.location.href = response.data;
    } catch (err) {
      console.error(err);
    }
  };
  

  if (!paymentData) {
    return <div>결제 정보를 불러오는 중...</div>; // 로딩 상태 표시
  }

  return (
    <div className={styles.container}>
      <PageHeader title={"쏠쏠한 페이 결제"} />
      
      <ProductInfo 
        productName={paymentData.productName}
        totalAmount={paymentData.totalAmount}
      />
      
      <PayMoneyCard 
        currentBalance={paymentData.currentBalance}
        autoChargeAmount={autoChargeAmount}
        needAutoCharge={needAutoCharge}
        totalAmount={paymentData.totalAmount}
      />
      
      <PaymentMethodSelector 
        selectedMethod={paymentData.accountNumber}
      />
      
      <PaymentButton 
        amount={paymentData.totalAmount}
        onPayment={handlePayment}
      />
    </div>
  );
};

export default PaymentPage;