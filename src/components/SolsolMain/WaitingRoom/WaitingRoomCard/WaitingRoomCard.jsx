import React, { useEffect, useState } from 'react';
import styles from './WaitingRoomCard.module.css';
import { useNavigate } from 'react-router-dom';

const WaitingRoomCard = ({ room }) => {
  const navigate = useNavigate();
  const [minutesLeft, setMinutesLeft] = useState(null);

  // 한국 시간으로 변환하고 시간만 표시하는 함수
  const formatTime = (dateString) => {
    if (!dateString) return '시간 미정';
    try {
      const date = new Date(dateString);
      // 한국 시간으로 변환 (UTC+9)
      const koreanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000));
      const hours = koreanTime.getUTCHours().toString().padStart(2, '0');
      const minutes = koreanTime.getUTCMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return '시간 오류';
    }
  };

  // 무료배달까지 남은 금액 계산
  const remainingAmount = room.amountToTarget

  // 마감까지 남은 분 계산 (deadlineAt 기준)
  useEffect(() => {
    const calc = () => {
      const deadlineIso = room.deadlineAt || room.scheduledDeadlineAt;
      if (!deadlineIso) {
        setMinutesLeft(null);
        return;
      }
      const nowMs = Date.now();
      const deadlineMs = new Date(deadlineIso).getTime(); // ISO Z 파싱(UTC)
      const diffMin = Math.ceil((deadlineMs - nowMs) / (60 * 1000));
      setMinutesLeft(diffMin);
    };
    calc();
    const t = setInterval(calc, 30000); // 30초마다 갱신
    return () => clearInterval(t);
  }, [room.deadlineAt, room.scheduledDeadlineAt]);

  // 그룹 클릭 시 처리
  const handleGroupClick = () => {
    // 시간 정보 생성 (예: 16:30-17:10)
    const deadlineTime = formatTime(room.scheduledDeadlineAt);
    const pickupTime = formatTime(room.scheduledPickupAt);
    const timeRange = `${deadlineTime}-${pickupTime}`;
    
    const groupOrderInfo = {
      isFixed: true,
      deadlineTime: deadlineTime,
      pickupTime: pickupTime,
      pickupZoneId: room.pickupZoneId || 1,
      pickupZoneName: room.pickupZoneName || '연수동'
    };

    const navigationState = {
      isGroupOrder: true,
      groupId: room.groupId,
      timeRange: timeRange,
      pickupZoneId: room.pickupZoneId || 1, // 기본값 1
      pickupZoneName: room.pickupZoneName || '연수동', // 기본값
      deadlineAt: room.scheduledDeadlineAt,
      pickupAt: room.scheduledPickupAt,
      amountToTarget: room.amountToTarget,
      currentTotalPrice: room.currentTotalPrice,
      // 그룹 주문 고정 정보 추가
      groupOrderInfo: groupOrderInfo
    };
    
    navigate(`/restaurants/${room.storeId}`, {
      state: navigationState
    });
  };

  return (
    <div className={styles.waitingRoomCard} onClick={handleGroupClick}>
      <div className={styles.roomImage}>
        {room.imageUrl ? (
          <img 
            src={room.imageUrl} 
            alt={room.storeName} 
            className={styles.storeImage}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={styles.imagePlaceholder} style={{ display: room.imageUrl ? 'none' : 'flex' }}>
          <span>🍗</span>
        </div>
        
        <div className={styles.roomStatus}>
          {typeof minutesLeft === 'number' && minutesLeft >= 0 && minutesLeft <= 5 ? (
            <span className={styles.statusBadge}> {minutesLeft}분 후 주문마감! 서두르세요!</span>
          ) : (
            <span className={styles.statusBadge}>대기중</span>
          )}
        </div>
      </div>
      
      <div className={styles.roomInfo}>
        <h3 className={styles.roomName}>{room.storeName}</h3>
        
        <div className={styles.roomTimeLocationContainer}>
          <div className={styles.roomTimeInfo}>
            <span className={styles.orderDeadline}>
              주문마감시간: {formatTime(room.deadlineAt || room.scheduledDeadlineAt)}{typeof minutesLeft === 'number' && minutesLeft >= 0 ? ` (${minutesLeft}분 후)` : ''}
            </span>
            <span className={styles.pickupTime}>
              예상픽업시간: {formatTime(room.scheduledPickupAt)}
            </span>
          </div>
          
          <p className={styles.roomLocation}>{room.pickupZoneName}</p>
        </div>
        
        <div className={styles.amountInfo}>
          <span className={styles.targetAmount}>
            {remainingAmount > 0 
              ? `${remainingAmount.toLocaleString()}원 만 주문하면 무료배달!`
              : '무료배달 달성! 🎉'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomCard;
