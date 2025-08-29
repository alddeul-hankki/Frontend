import React, { useState } from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';
import AddressModal from './AddressModal';

const AddressSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className={styles.section}>
      <div className={styles.sectionTitle}>배달 주소</div>
      <div className={styles.selectRow}>
        <button type="button" className={styles.selectButton} onClick={() => setOpen(true)}>
          <span className={!value ? styles.placeholder : undefined}>{value || '배달 장소를 선택하세요'}</span>
          <span>▾</span>
        </button>
      </div>
      <AddressModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(name) => { onChange(name); setOpen(false); }}
      />
    </section>
  );
};

export default AddressSelect;


