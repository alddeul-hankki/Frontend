import React, { useEffect, useRef } from 'react';
import { useKakaoLoader } from '../../hooks/useKakaoMap';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';

const AddressModal = ({ open, onClose, onSelect, pickupZones = [] }) => {
  const loaded = useKakaoLoader();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('[KAKAO] modal effect open=%s loaded=%s container=%s', open, loaded, !!containerRef.current);
    console.log('[KAKAO] pickupZones prop:', pickupZones);
    console.log('[KAKAO] pickupZones.length:', pickupZones.length);
    
    if (!open || !loaded || !containerRef.current) return;
    
    const { kakao } = window;
    console.log('[KAKAO] maps available?', !!kakao?.maps);
    
    // 지도 중심좌표 설정 (고정된 중심점)
    const center = new kakao.maps.LatLng(37.225500, 127.116062);
    const map = new kakao.maps.Map(containerRef.current, { center, level: 3 });
    mapRef.current = map;
    console.log('[KAKAO] map created with center:', center);

    // 마커 생성 (pickupZones가 있을 때만)
    if (pickupZones.length > 0) {
      console.log('[KAKAO] 마커 생성 시작, pickupZones.length:', pickupZones.length);
      
      pickupZones.forEach((zone, index) => {
        console.log(`[KAKAO] 마커 ${index + 1} 생성:`, zone);
        
        const lat = zone.latitude || zone.lat;
        const lng = zone.longitude || zone.lng;
        
        if (!lat || !lng) {
          console.error(`[KAKAO] 마커 ${index + 1} 좌표 누락:`, zone);
          return;
        }
        
        const pos = new kakao.maps.LatLng(lat, lng);
        console.log(`[KAKAO] 마커 ${index + 1} 위치:`, pos);
        
        const marker = new kakao.maps.Marker({ position: pos, map });
        console.log(`[KAKAO] 마커 ${index + 1} 생성 완료:`, marker);
        
        const info = new kakao.maps.InfoWindow({ 
          content: `<div style="padding:6px 8px; font-weight:bold;">${zone.name}</div>` 
        });
        let opened = false;
        
        kakao.maps.event.addListener(marker, 'click', () => {
          console.log(`[KAKAO] 마커 ${index + 1} 클릭:`, zone.name, 'opened=', opened);
          if (!opened) {
            info.open(map, marker); // 1차 클릭: 인포윈도우 오픈
            opened = true;
          } else {
            onSelect(zone.id);    // 2차 클릭: zoneId 선택
            onClose();
          }
        });
      });
    } else {
      console.log('[KAKAO] pickupZones가 비어있어 마커를 생성하지 않습니다.');
    }
    
    // 바텀시트 애니메이션 완료 후 리레이아웃
    setTimeout(() => {
      if (mapRef.current) {
        console.log('[KAKAO] triggering resize & recenter');
        kakao.maps.event.trigger(mapRef.current, 'resize');
        mapRef.current.setCenter(center);
      }
    }, 260);
  }, [open, loaded, pickupZones, onSelect, onClose]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.sheet}>
        <div className={styles.modalHeader}>
          <span>픽업 장소 선택</span>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        <div ref={containerRef} className={styles.mapContainer} />
      </div>
    </div>
  );
};

export default AddressModal;


