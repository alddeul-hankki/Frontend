import React from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';
import { formatCurrency } from '../../shared/format';

const SummaryPanel = ({ 
  orderAmount, 
  originalDeliveryFee, 
  expectedDiscountedDeliveryFee, 
  totalAmount, 
  remainForFreeDelivery,
  isPickupZoneSelected = false,
  isTimeSelected = false
}) => {
  // 배달비 표시 로직
  const showDeliveryFee = isPickupZoneSelected && isTimeSelected;
  
  return (
    <section className={styles.summary}>
      <div className={styles.summaryRow}>
        <span>주문금액</span>
        <span>{formatCurrency(orderAmount)}원</span>
      </div>
      <div className={styles.summaryRow}>
        <span>예상 배달비</span>
        {showDeliveryFee ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <span className={styles.dim}>{formatCurrency(originalDeliveryFee)}원</span>
            <span className={styles.green}>
              {expectedDiscountedDeliveryFee === 0 ? '무료' : `${formatCurrency(expectedDiscountedDeliveryFee)}원`}
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <span className={styles.dim}>--원</span>
            <span className={styles.red}>
              {!isPickupZoneSelected && !isTimeSelected ? '픽업존과 시간을 선택하세요' : 
               !isPickupZoneSelected ? '픽업존을 선택하세요' : '시간을 선택하세요'}
            </span>
          </div>
        )}
      </div>
      <hr className={styles.divider} />
      <div className={styles.totalRow}>
        <span>총 결제 금액</span>
        <span>{formatCurrency(totalAmount)}원</span>
      </div>
       </section>
  );
};

export default SummaryPanel;

