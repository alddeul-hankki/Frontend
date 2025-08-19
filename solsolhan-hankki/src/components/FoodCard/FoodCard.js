import React from 'react';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  return (
    <div className="food-card">
      <div className="food-image">
        <div className="image-placeholder">
          <span>X</span>
        </div>
      </div>
      <div className="food-info">
        <h3 className="food-name">{food.name}</h3>
        <p className="food-location">{food.location}</p>
        {food.details && (
          <p className="food-details">{food.details}</p>
        )}
        <p className="food-delivery">{food.delivery}</p>
        {food.reviews && (
          <div className="food-reviews">
            <span>리뷰 {food.reviews}</span>
            <span>평점 {food.rating}</span>
          </div>
        )}
        {food.targetAmount && (
          <p className="target-amount">무료 배달 가능 금액 {food.targetAmount}</p>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
