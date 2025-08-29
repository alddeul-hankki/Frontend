import React from 'react';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ productName, totalAmount }) => {
  return (
    <div className={styles.productInfo}>
      <div className={styles.productName}>{productName}</div>
      <div className={styles.totalPrice}>{totalAmount.toLocaleString()}원</div>
    </div>
  );
};

export default ProductInfo;