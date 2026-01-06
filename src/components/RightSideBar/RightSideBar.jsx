import React from "react";
import { useSelector } from "react-redux";
import {
  selectDailyRate,
  selectNotAllowedProducts,
  selectDiaryProducts,
  selectSelectedDate,
} from "../../redux/diet/dietSelectors";
import styles from "./RightSideBar.module.css";

const RightSideBar = () => {
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);
  const diaryProducts = useSelector(selectDiaryProducts);
  const selectedDate = useSelector(selectSelectedDate);
  
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const date = selectedDate 
    ? formatDate(new Date(selectedDate))
    : formatDate(new Date());

  const consumed = diaryProducts.reduce((total, product) => {
    return total + (product.calories || 0);
  }, 0);

  const left = dailyRate ? Math.max(0, Math.round(dailyRate) - consumed) : 0;
  const percentage = dailyRate ? Math.round((consumed / dailyRate) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.summarySection}>
        <h2 className={styles.header}>Summary for {date}</h2>
        <ul className={styles.statList}>
          <li className={styles.statItem}>
            <span>Left</span>
            <span>{left} kcal</span>
          </li>
          <li className={styles.statItem}>
            <span>Consumed</span>
            <span>{consumed} kcal</span>
          </li>
          <li className={styles.statItem}>
            <span>Daily Rate</span>
            <span>{dailyRate ? Math.round(dailyRate) : 0} kcal</span>
          </li>
          <li className={styles.statItem}>
            <span>n% of normal</span>
            <span>{percentage} %</span>
          </li>
        </ul>
      </div>
      <div className={styles.foodSection}>
        <h2 className={styles.header}>Food not recommended</h2>
        {notAllowedProducts && notAllowedProducts.length > 0 ? (
          <ul className={styles.productList}>
            {notAllowedProducts.slice(0, 10).map((prod, index) => (
              <li key={index}>{prod}</li>
            ))}
          </ul>
        ) : (
          <p>Your diet will be displayed here</p>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
