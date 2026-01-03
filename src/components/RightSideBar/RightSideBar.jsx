import React from 'react';
import { useSelector } from 'react-redux';
import { selectDailyRate, selectNotAllowedProducts } from '../../redux/diet/dietSelectors';
import styles from './RightSideBar.module.css';

const RightSideBar = () => {
  // Redux'tan verileri al
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);
  
  // Henüz giriş yapılmadıysa veya hesaplama yoksa varsayılan değerler
  // Not: Giriş yapmış kullanıcı için ileride "auth" selectorları da eklenecek.
  const caloriesLeft = dailyRate || 0;
  const caloriesConsumed = 0; // İleride ürün eklendikçe değişecek
  const percentage = dailyRate ? Math.round((caloriesConsumed / dailyRate) * 100) : 0;

  // Veri yoksa gösterme (veya boş bir state göster)
  if (!dailyRate) {
    return (
      <div className={styles.rightSideBar}>
        <p className={styles.placeholderText}>
          Calculate your calories to see your summary here.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.rightSideBar}>
      <div className={styles.summarySection}>
        <h2 className={styles.sectionTitle}>Daily Summary</h2>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Calories Left</span>
            <span className={styles.statValue}>{Math.round(caloriesLeft)} kcal</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Calories Consumed</span>
            <span className={styles.statValue}>{caloriesConsumed} kcal</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Daily Rate</span>
            <span className={styles.statValue}>{Math.round(dailyRate)} kcal</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statLabel}>% of Daily Norm</span>
            <span className={styles.statValue}>{percentage}%</span>
          </div>
        </div>
      </div>

      <div className={styles.foodsSection}>
        <h2 className={styles.sectionTitle}>Foods Not Recommended</h2>
        <div className={styles.foodsList}>
          {notAllowedProducts.length > 0 ? (
            notAllowedProducts.map((food, index) => (
              <div key={index} className={styles.foodItem}>
                <span className={styles.foodBullet}>•</span>
                <span className={styles.foodName}>{food}</span>
              </div>
            ))
          ) : (
            <p className={styles.foodsNote}>Your diet is very flexible!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;