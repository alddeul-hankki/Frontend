import React, { useMemo } from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';
import { buildTimeOptions } from '../../pages/Solsolpay/utils';

const isAfterNow = (value) => {
  // value: "HH:MM-HH:MM" (order-guarantee)
  const [order] = value.split('-');
  const [h, m] = order.split(':').map(Number);
  const now = new Date();
  const orderDate = new Date();
  orderDate.setHours(h, m, 0, 0);
  return orderDate.getTime() > now.getTime();
};

const TimeModal = ({ open, onClose, onSelect }) => {
  const options = useMemo(buildTimeOptions, []);
  if (!open) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.sheet}>
        <div className={styles.modalHeader}>
          <span>시간 선택</span>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        <div className={styles.timeList}>
          {options.map(opt => {
            const selectable = isAfterNow(opt.value);
            return (
              <button
                key={opt.value}
                className={styles.timeBtn}
                disabled={!selectable}
                onClick={() => { if (!selectable) return; onSelect(opt.value); onClose(); }}
                aria-disabled={!selectable}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeModal;


