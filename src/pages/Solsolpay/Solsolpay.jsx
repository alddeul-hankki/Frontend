import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Solsolpay.module.css';
import HeaderSection from '../../components/SolsolPay/HeaderSection';
import AddressSelect from '../../components/SolsolPay/AddressSelect';
import TimeSelect from '../../components/SolsolPay/TimeSelect';
import PaymentMethod from '../../components/SolsolPay/PaymentMethod';
import SummaryPanel from '../../components/SolsolPay/SummaryPanel';
import BottomAction from '../../components/SolsolPay/BottomAction';
import { buildTimeOptions } from '../../pages/Solsolpay/utils';
import { orderPreview, getPickupZones, createOrder } from '../../util/solsolApi';
import { getCampusId } from '../../util/campusUtils';

const Solsolpay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const timeOptions = useMemo(buildTimeOptions, []);
  
  // 상태 관리
  const [address, setAddress] = useState('');
  const [time, setTime] = useState(timeOptions[0]?.value || '');
  const [pickupZones, setPickupZones] = useState([]);
  const [selectedPickupZoneId, setSelectedPickupZoneId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  
  // 기본값들 
  const [orderData, setOrderData] = useState({
    storeName: '',
    orderItems: [],
    menuTotalPrice: 0,
    originalDeliveryFee: 0,
    expectedDiscountedDeliveryFee: 0,
    paymentAmount: 0
  });

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    console.log('🔍 Solsolpay 컴포넌트 마운트');
    console.log('📍 location.state:', location.state);
    console.log('📍 location.state?.previewData:', location.state?.previewData);
    
    if (location.state?.previewData) {
      setPreviewData(location.state.previewData);
      const groupInfo = location.state.previewData.groupOrderInfo;
      if (groupInfo) {
        const start = groupInfo.deadlineTime || (groupInfo.timeRange || '').split('-')[0] || '';
        const end = groupInfo.pickupTime || (groupInfo.timeRange || '').split('-')[1] || '';
        console.log('🎯 그룹 시간 파싱:', { start, end, rawRange: groupInfo.timeRange });
        if (groupInfo.pickupZoneId) {
          setSelectedPickupZoneId(groupInfo.pickupZoneId);
          setAddress(groupInfo.pickupZoneName || '');
        }
        if (start && end) {
          setTime(`${start}-${end}`);
        }
      }
    }
    loadPickupZones();
  }, [location.state, navigate]);

  const isGroupOrder = !!previewData?.groupOrderInfo;

  // PickupZones 로드
  const loadPickupZones = async () => {
    try {
      console.log('🔄 PickupZones 로드 시작');
      const campusId = getCampusId();
      console.log('📍 campusId:', campusId);
      
      const zones = await getPickupZones(campusId);
      console.log('✅ PickupZones 로드 성공:', zones);
      
      // API 응답이 배열인지 확인
      if (Array.isArray(zones)) {
        console.log('📍 zones 데이터 구조:', zones.map(z => ({ id: z.id, name: z.name, lat: z.latitude, lng: z.longitude })));
        
        setPickupZones(zones);
        console.log('✅ pickupZones 상태 업데이트 완료, 길이:', zones.length);
        
        // 그룹 주문이 아닐 때만 기본값 설정
        if (!isGroupOrder && zones.length > 0) {
          setSelectedPickupZoneId(zones[0].id);
          setAddress(zones[0].name);
          if (previewData && time) setTimeout(() => handleOrderPreview(), 100);
        }
      } else {
        console.error('❌ API 응답이 배열이 아님:', zones);
        throw new Error('API 응답이 배열이 아닙니다');
      }
    } catch (error) {
      console.error('❌ PickupZones 로드 실패:', error);
      console.error('❌ 에러 상세:', error.response?.data || error.message);
      
      // 에러 발생 시 기본 픽업존 설정 (fallback)
      const fallbackZones = [
        { id: 1, name: '연수동', latitude: 37.22499700, longitude: 127.11670500 },
        { id: 2, name: '숙소동', latitude: 37.22588100, longitude: 127.11601900 },
        { id: 3, name: '잔디밭', latitude: 37.22490600, longitude: 127.11538100 }
      ];
      
      console.log('⚠️ Fallback 픽업존 사용:', fallbackZones);
      setPickupZones(fallbackZones);
      setSelectedPickupZoneId(fallbackZones[0].id);
      setAddress(fallbackZones[0].name);
      
      // 에러 발생 시에도 기본값으로 주문 확인 시도
      if (previewData && time) {
        console.log('⚠️ PickupZones 에러 후에도 주문 확인 시도');
        setTimeout(() => handleOrderPreview(), 100);
      }
    }
  };

  // 주문 확인 요청
  const handleOrderPreview = async () => {
    console.log('🔄 주문 확인 요청 시작');
    console.log('📍 selectedPickupZoneId:', selectedPickupZoneId);
    console.log('📍 time:', time);
    console.log('📍 previewData:', previewData);
    
    if (!selectedPickupZoneId || !time) {
      console.log('⚠️ 픽업존 또는 시간이 선택되지 않음');
      return;
    }

    try {
      setLoading(true);
      
      const requestBody = {
        storeId: previewData?.storeId || '',
        pickupZoneId: selectedPickupZoneId,
        deadlineAt: convertTimeToOffsetDateTime(time.split('-')[0]), // 주문 시간만 추출하여 변환
        orderItems: previewData?.orderItems || []
      };
      
      console.log('📤 API 요청 데이터:', requestBody);

      const response = await orderPreview(requestBody);
      console.log('✅ API 응답 데이터:', response);
      
      // 응답 데이터로 상태 업데이트
      setOrderData(response);
      console.log('✅ orderData 업데이트 완료:', response);
      
    } catch (error) {
      console.error('❌ 주문 확인 요청 실패:', error);
      console.error('❌ 에러 상세:', error.response?.data || error.message);
      alert('주문 미리보기를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 시간 변경 시 자동으로 preview 업데이트
  useEffect(() => {
    if (selectedPickupZoneId && time && previewData) {
      handleOrderPreview();
    }
  }, [selectedPickupZoneId, time]);

  // PickupZone 변경 시 주소 업데이트
  const handlePickupZoneChange = (zoneId) => {
    const selectedZone = pickupZones.find(zone => zone.id === zoneId);
    if (selectedZone) {
      setSelectedPickupZoneId(zoneId);
      setAddress(selectedZone.name);
    }
  };

  // 시간을 OffsetDateTime 형식으로 변환하는 함수
  const convertTimeToOffsetDateTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setHours(hours, minutes, 0, 0);
    
    // 오늘 날짜가 이미 지났으면 내일로 설정
    if (targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    
    // KST(UTC+9) 오프셋을 포함한 ISO 문자열 생성
    // 단순하게 현재 날짜에 선택한 시간을 적용하고 +09:00 오프셋 추가
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const hour = String(hours).padStart(2, '0');
    const minute = String(minutes).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hour}:${minute}:00+09:00`;
  };

  const isPickupZoneSelected = selectedPickupZoneId !== null;
  const isTimeSelected = time !== '';

  if (!previewData) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <HeaderSection storeName="메뉴를 선택해주세요" />
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>메뉴 상세 페이지에서 주문담기를 눌러주세요.</p>
            <button onClick={() => navigate('/solsol')} style={{ marginTop: '10px' }}>
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <HeaderSection storeName={orderData.storeName || previewData?.storeName || '가게명'} />

        <AddressSelect 
          value={address} 
          onChange={handlePickupZoneChange}
          pickupZones={pickupZones}
          isGroupOrder={isGroupOrder}
        />

        <TimeSelect 
          value={time} 
          onChange={setTime} 
          options={timeOptions} 
          isGroupOrder={isGroupOrder}
        />

        <PaymentMethod />

        <SummaryPanel
          minOrderAmount={orderData.menuTotalPrice || previewData?.orderItems?.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0) || 0}
          orderAmount={orderData.menuTotalPrice || previewData?.orderItems?.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0) || 0}
          originalDeliveryFee={orderData.originalDeliveryFee || 0}
          expectedDiscountedDeliveryFee={orderData.expectedDiscountedDeliveryFee || 0}
          totalAmount={orderData.paymentAmount || (previewData?.orderItems?.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0) || 0)}
          remainForFreeDelivery={Math.max(0, (orderData.menuTotalPrice || previewData?.orderItems?.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0) || 0) - (orderData.expectedDiscountedDeliveryFee || 0))}
          isPickupZoneSelected={isPickupZoneSelected}
          isTimeSelected={isTimeSelected}
        />

        <BottomAction 
          orderAmount={orderData.paymentAmount || (previewData?.orderItems?.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0) || 0)}
          loading={loading}
          disabled={!isPickupZoneSelected || !isTimeSelected}
          onOrderSubmit={async () => {
            
            if (!selectedPickupZoneId || !time) {
              alert('픽업존과 시간을 선택해주세요.');
              return;
            }

            try {
              setLoading(true);
              
              // userId 가져오기
              const userId = localStorage.getItem('userId') || '1';
              console.log('📍 userId:', userId);
              
              // TimeModal의 시간을 파싱 (예: "18:30-19:10" -> orderTime: "18:30", pickupTime: "19:10")
              const [orderTime, pickupTime] = time.split('-');
              console.log('📍 파싱된 시간:', { orderTime, pickupTime });
              
              // OrderRequest 데이터 구성
              const orderRequest = {
                userId: parseInt(userId),
                storeId: previewData?.storeId || '',
                storeName: orderData.storeName || previewData?.storeName || '',
                minOrderPrice: orderData.menuTotalPrice || previewData?.orderItems?.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0) || 0,
                deliveryFee: orderData.expectedDiscountedDeliveryFee || 0,
                pickupZoneId: selectedPickupZoneId,
                deadlineAt: convertTimeToOffsetDateTime(orderTime), // 주문 시간 그대로 사용
                pickupAt: convertTimeToOffsetDateTime(pickupTime), // 픽업 시간 그대로 사용
                orderItems: previewData?.orderItems || []
              };
              // createOrder API 호출
              const response = await createOrder(orderRequest);
              console.log('✅ 주문 생성 성공:', response);
              
              const redirectUrl = response?.paymentRedirectUrl || response?.paymentUrl;

              if (redirectUrl) {
                console.log('🌐 결제 페이지로 리다이렉트:', redirectUrl);
                window.location.href = redirectUrl;
                return;
              }
              
            } catch (error) {
              console.error('❌ 주문 생성 실패:', error);
              console.error('❌ 에러 상세:', error.response?.data || error.message);
              alert('주문 예약에 실패했습니다. 다시 시도해주세요.');
            } finally {
              setLoading(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Solsolpay;
