import React, { useMemo, useState } from 'react';
import styles from './Solsolpay.module.css';
import HeaderSection from '../../components/SolsolPay/HeaderSection';
import AddressSelect from '../../components/SolsolPay/AddressSelect';
import TimeSelect from '../../components/SolsolPay/TimeSelect';
import PaymentMethod from '../../components/SolsolPay/PaymentMethod';
import SummaryPanel from '../../components/SolsolPay/SummaryPanel';
import BottomAction from '../../components/SolsolPay/BottomAction';
import { buildTimeOptions } from './utils';

const Solsolpay = () => {
  const timeOptions = useMemo(buildTimeOptions, []);
  const DEFAULT_ADDRESS = '';
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [time, setTime] = useState(timeOptions[2]?.value || '11:30-12:10');

  const minOrderAmount = 18000; // || 최소배달금액
  const orderAmount = 5000; // || 주문금액
  const deliveryFee = 3000; // || 배달비
  const totalAmount = 5000; // || 총 결제 금액
  const remainForFreeDelivery = 15000; // || 무료 배달까지 남은 금액
  const storeName = '신한피자 강남점';

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <HeaderSection storeName={storeName} />

        <AddressSelect value={address} onChange={setAddress} />

        <TimeSelect value={time} onChange={setTime} options={timeOptions} />

        {/* 쿠폰 섹션 제거 */}

        <PaymentMethod />

        <SummaryPanel
          minOrderAmount={minOrderAmount}
          orderAmount={orderAmount}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
          remainForFreeDelivery={remainForFreeDelivery}
        />

        <BottomAction orderAmount={orderAmount} />
      </div>
    </div>
  );
};

export default Solsolpay;
