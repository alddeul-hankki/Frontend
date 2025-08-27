import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RestaurantCard.module.css';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const id = restaurant.id ?? restaurant.patstoNo ?? restaurant.patsto_no;

  const handleClick = () => {
    if (id) {
      navigate(`/restaurants/${id}`);
    }
  };

  return (
    <div className={styles.restaurantCard} onClick={handleClick} style={{ cursor: id ? 'pointer' : 'default' }}>
      <div className={styles.restaurantImage}>
        {restaurant.patstoImageFile ? (
          <img 
            src={restaurant.patstoImageFile} 
            alt={restaurant.name}
            className={styles.restaurantImage}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={styles.imagePlaceholder} style={{ display: restaurant.patstoImageFile ? 'none' : 'flex' }}>
          <span>🍗</span>
        </div>
      </div>
      <div className={styles.restaurantInfo}>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <div className={styles.restaurantStats}>
          <span className={styles.reviewCount}>리뷰 {restaurant.reCnt}</span>
          <span className={styles.rating}>맛있어요 {restaurant.goodCnt}</span>
        </div>
        <div className={styles.deliveryInfo}>
          <p className={styles.deliveryFee}>배달비 {restaurant.delvFeeNm}</p>
          <p className={styles.deliveryTime}>배달시간 {restaurant.delvTm}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
