// 페이지 전용 유틸은 유지, 공용 포맷은 shared/format.js 사용 권장

export const buildTimeOptions = () => {
  const pairs = [];
  const now = new Date();
  const nowMinutes = now.getMinutes();
  const nowHour = now.getHours();

  // 현재 시각 기준 다음 슬롯의 정각/30분을 계산
  const nextSlotMinutes = nowMinutes < 30 ? 30 : 60; // 0~29 → 30, 30~59 → 60(=다음 시각의 00)
  const firstSlot = new Date(now);
  firstSlot.setMinutes(nextSlotMinutes, 0, 0);
  if (nextSlotMinutes === 60) {
    firstSlot.setHours(nowHour + 1, 0, 0, 0);
  }

  // firstSlot부터 21:00 전까지 30분 간격으로 생성
  const endHour = 21;
  let cursor = new Date(firstSlot);

  while (cursor.getHours() < endHour) {
    const orderH = String(cursor.getHours()).padStart(2, '0');
    const orderM = String(cursor.getMinutes()).padStart(2, '0');
    const orderTime = `${orderH}:${orderM}`;

    // 픽업은 규칙: 정각 주문 → +40분, 30분 주문 → +40분(=다음 시각 10분)
    const pickup = new Date(cursor);
    pickup.setMinutes(pickup.getMinutes() + 40);
    const pickupH = String(pickup.getHours()).padStart(2, '0');
    const pickupM = String(pickup.getMinutes()).padStart(2, '0');
    const pickupTime = `${pickupH}:${pickupM}`;

    pairs.push({
      value: `${orderTime}-${pickupTime}`,
      label: `${orderTime} 주문 → ${pickupTime} 픽업`
    });

    // 30분 증가
    cursor.setMinutes(cursor.getMinutes() + 30);
  }

  return pairs;
};

// 특정 시간을 Instant 형식으로 변환
export const timeToOffsetDateTime = (timeString, addMinutes = 0) => {
  const [orderTime] = timeString.split('-');
  const [hours, minutes] = orderTime.split(':').map(Number);
  
  const now = new Date();
  const deadline = new Date(now);
  deadline.setHours(hours, minutes, 0, 0);
  
  // 오늘 날짜가 이미 지났으면 내일로 설정
  if (deadline <= now) {
    deadline.setDate(deadline.getDate() + 1);
  }
  
  // addMinutes가 있으면 추가
  if (addMinutes > 0) {
    deadline.setMinutes(deadline.getMinutes() + addMinutes);
  }
  
  return deadline.toISOString();
};



