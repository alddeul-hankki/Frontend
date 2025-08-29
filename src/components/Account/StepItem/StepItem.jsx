import React from "react";
import styles from "./StepItem.module.css";

const StepItem = ({ step, title, isDisabled, isCompleted, isOpen, onToggle, children }) => {
  return (
    <>
    <div className={styles.stepItem}>
      <div
        className={`${styles.stepNumber} ${
          isDisabled ? styles.disabled : isCompleted ? styles.completed : ""
        }`}
      >
        {step}
      </div>
      <button
        className={`${styles.selectButton} ${isOpen ? styles.active : ""} ${
          isDisabled ? styles.disabled :  isCompleted ? styles.completed : ""}`}
        onClick={onToggle}
        disabled={isDisabled}
      >
        <span>{title}</span>
        {!isCompleted && !isDisabled && (
          <svg
            className={`${styles.dropdownIcon} ${isOpen ? styles.rotated : ""}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
    <div className={`${styles.formWrapper} ${isOpen ? styles.open : ''}`}>
        {children}
    </div>
    </>
  );
};

export default StepItem;
