import React from 'react';
import styles from './WaitingRoomCard.module.css';

const WaitingRoomCard = ({ room }) => {
  return (
    <div className={styles.waitingRoomCard}>
      <div className={styles.roomImage}>
        <div className={styles.imagePlaceholder}>
          <span>🍗</span>
        </div>
        
        <div className={styles.roomStatus}>
          <span className={styles.statusBadge}>대기중</span>
        </div>
        
        </div>
          <div className={styles.roomInfo}>
            <h3 className={styles.roomName}>{room.name}</h3>
         
          <div className={styles.roomTimeLocationContainer}>
            <div className={styles.roomTimeInfo}>
              <span className={styles.orderDeadline}>주문마감: {room.orderDeadline}</span>
              <span className={styles.eta}>배달예정: {room.eta}</span>
            </div>
            
              <p className={styles.roomLocation}>{room.deliveryAddress}</p>
            </div> 
            <span className={styles.targetAmount}>{room.amountToTarget}원만 주문해도 배달</span>  
        </div>
    </div>
  );
};

export default WaitingRoomCard;
