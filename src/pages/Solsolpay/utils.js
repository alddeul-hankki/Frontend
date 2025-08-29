// 페이지 전용 유틸은 유지, 공용 포맷은 shared/format.js 사용 권장

export const buildTimeOptions = () => {
  const pairs = [];
  for (let n = 9; n <= 21; n += 1) {
    const order = `${n.toString().padStart(2, '0')}:30`;
    const guaranteeHour = (n + 1).toString().padStart(2, '0');
    const label = `${order} 주문 → ${guaranteeHour}:10 보장`;
    pairs.push({ value: `${order}-${guaranteeHour}:10`, label });
  }
  return pairs;
};


