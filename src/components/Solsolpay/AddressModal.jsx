import React, { useEffect, useRef } from 'react';
import { useKakaoLoader } from '../../hooks/useKakaoMap';
import styles from '../../pages/Solsolpay/Solsolpay.module.css';

const AddressModal = ({ open, onClose, onSelect }) => {
  const loaded = useKakaoLoader();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  // 하드코딩된 픽업존 좌표 // || 픽업존 좌표
  const pickupZones = [
    { name: 'A관', lat: 37.56649, lng: 126.97826 },
    { name: 'B관', lat: 37.56689, lng: 126.9791 },
    { name: 'C관', lat: 37.566, lng: 126.9798 },
    { name: '도서관', lat: 37.5656, lng: 126.9789 },
  ];

  useEffect(() => {
    console.log('[KAKAO] modal effect open=%s loaded=%s container=%s', open, loaded, !!containerRef.current);
    if (!open || !loaded || !containerRef.current) return;
    const { kakao } = window;
    console.log('[KAKAO] maps available?', !!kakao?.maps);
    const center = new kakao.maps.LatLng(pickupZones[0].lat, pickupZones[0].lng);
    const map = new kakao.maps.Map(containerRef.current, { center, level: 3 });
    mapRef.current = map;
    console.log('[KAKAO] map created');

    pickupZones.forEach((zone) => {
      const pos = new kakao.maps.LatLng(zone.lat, zone.lng);
      const marker = new kakao.maps.Marker({ position: pos, map });
      const info = new kakao.maps.InfoWindow({ content: `<div style=\"padding:6px 8px;\">${zone.name}</div>` });
      let opened = false;
      kakao.maps.event.addListener(marker, 'click', () => {
        console.log('[KAKAO] marker click:', zone.name, 'opened=', opened);
        if (!opened) {
          info.open(map, marker); // 1차 클릭: 인포윈도우 오픈
          opened = true;
        } else {
          onSelect(zone.name);    // 2차 클릭: 장소 선택
          onClose();
        }
      });
    });
    // 바텀시트 애니메이션 완료 후 리레이아웃
    setTimeout(() => {
      if (mapRef.current) {
        console.log('[KAKAO] triggering resize & recenter');
        kakao.maps.event.trigger(mapRef.current, 'resize');
        mapRef.current.setCenter(center);
      }
    }, 260);
  }, [open, loaded]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.sheet}>
        <div className={styles.modalHeader}>
          <span>장소 선택</span>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        <div ref={containerRef} className={styles.mapContainer} />
      </div>
    </div>
  );
};

export default AddressModal;


