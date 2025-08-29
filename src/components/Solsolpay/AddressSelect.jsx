import React, { useState } from 'react';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';
import AddressModal from './AddressModal';

const AddressSelect = ({ value, onChange, pickupZones = [], isGroupOrder = false }) => {
  const [open, setOpen] = useState(false);
  
  console.log('📍 AddressSelect - pickupZones:', pickupZones);
  console.log('📍 AddressSelect - pickupZones.length:', pickupZones.length);
  console.log('📍 AddressSelect - pickupZones 상세:', pickupZones.map(z => ({ id: z.id, name: z.name, lat: z.latitude, lng: z.longitude })));
  console.log('📍 AddressSelect - isGroupOrder:', isGroupOrder);
  
  const handleZoneSelect = (zoneId) => {
    const selectedZone = pickupZones.find(zone => zone.id === zoneId);
    if (selectedZone) {
      onChange(zoneId); // zoneId를 반환
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionTitle}>픽업 장소</div>
      <div className={styles.selectRow}>
        <button 
          type="button" 
          className={`${styles.selectButton} ${isGroupOrder ? styles.disabled : ''}`} 
          onClick={() => !isGroupOrder && setOpen(true)}
          disabled={isGroupOrder}
        >
          <span className={!value ? styles.placeholder : undefined}>
            {value || '픽업 장소를 선택하세요'}
          </span>
          <span>▾</span>
        </button>
      </div>
      {isGroupOrder && (
        <div className={styles.groupOrderNote}>
        </div>
      )}
      <AddressModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={handleZoneSelect}
        pickupZones={pickupZones}
      />
    </section>
  );
};

export default AddressSelect;


