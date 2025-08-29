import React, { useState } from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';
import TimeModal from './TimeModal';

const TimeSelect = ({ value, onChange, options, isGroupOrder = false }) => {
  const [open, setOpen] = useState(false);
  const currentLabel = options.find(o => o.value === value)?.label || '시간을 선택하세요';
  
  return (
    <section className={styles.section}>
      <div className={styles.sectionTitle}>시간</div>
      <div className={styles.selectRow}>
        <button 
          type="button" 
          className={`${styles.selectButton} ${isGroupOrder ? styles.disabled : ''}`} 
          onClick={() => !isGroupOrder && setOpen(true)}
          disabled={isGroupOrder}
        >
          <span>{currentLabel}</span>
          <span>▾</span>
        </button>
      </div>
      {isGroupOrder && (
        <div className={styles.groupOrderNote}>
        </div>
      )}
      <TimeModal open={open} onClose={() => setOpen(false)} onSelect={(v) => onChange(v)} />
    </section>
  );
};

export default TimeSelect;


