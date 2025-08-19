import React from 'react';
import './WaitingRoomCard.css';

const WaitingRoomCard = ({ room }) => {
  return (
    <div className="waiting-room-card">
      <div className="room-image">
        <div className="image-placeholder">
          <span>🍗</span>
        </div>
        
        <div className="room-status">
          <span className="status-badge">대기중</span>
        </div>
        
        </div>
          <div className="room-info">
            <h3 className="room-name">{room.name}</h3>
         
          <div className="room-time-location-container">
            <div className="room-time-info">
              <span className="order-deadline">주문마감: {room.orderDeadline}</span>
              <span className="eta">배달예정: {room.eta}</span>
            </div>
            
              <p className="room-location">{room.deliveryAddress}</p>
            </div> 
            <span className="target-amount">{room.amountToTarget}원만 주문해도 배달</span>  
        </div>
    </div>
  );
};

export default WaitingRoomCard;
