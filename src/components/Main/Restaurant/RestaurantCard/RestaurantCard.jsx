import React from 'react';
import styles from './RestaurantCard.module.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className={styles.restaurantCard}>
      <div className={styles.restaurantImage}>
        <div className={styles.imagePlaceholder}>
          <span>X</span>
        </div>
      </div>
      <div className={styles.restaurantInfo}>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.restaurantLocation}>{restaurant.location}</p>
        {restaurant.details && (
          <p className={styles.restaurantDetails}>{restaurant.details}</p>
        )}
        <p className={styles.restaurantDelivery}>{restaurant.delivery}</p>
        {restaurant.reviews && (
          <div className={styles.restaurantReviews}>
            <span>리뷰 {restaurant.reviews}</span>
            <span>평점 {restaurant.rating}</span>
          </div>
        )}
        {restaurant.targetAmount && (
          <p className={styles.restaurantTargetAmount}>무료 배달 가능 금액 {restaurant.targetAmount}</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
