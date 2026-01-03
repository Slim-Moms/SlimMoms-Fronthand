
import React from 'react';
import styles from './RightSideBar.module.css';

const RightSideBar = () => {
  // Örnek veriler - gerçek uygulamada Redux'tan gelecek
  const dailyData = {
    caloriesLeft: 1250,
    caloriesConsumed: 1550,
    dailyRate: 2800,
    percentOfNorm: 55,
    notRecommendedFoods: [
      'White bread and pastries',
      'Fried foods',
      'Sugary drinks',
      'Processed meats',
      'High-fat dairy',
      'Alcohol',
      'Candy and sweets',
      'Fast food'
    ]
  };

  return (
    <div className={styles.rightSideBar}>
      <div className={styles.summarySection}>
        <h2 className={styles.sectionTitle}>Daily Summary</h2>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Calories Left</span>
            <span className={styles.statValue}>{dailyData.caloriesLeft} kcal</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Calories Consumed</span>
            <span className={styles.statValue}>{dailyData.caloriesConsumed} kcal</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Daily Rate</span>
            <span className={styles.statValue}>{dailyData.dailyRate} kcal</span>
          </div>
          
          <div className={styles.statItem}>
            <span className={styles.statLabel}>% of Daily Norm</span>
            <span className={styles.statValue}>{dailyData.percentOfNorm}%</span>
          </div>
        </div>
      </div>

      <div className={styles.foodsSection}>
        <h2 className={styles.sectionTitle}>Foods Not Recommended</h2>
        <div className={styles.foodsList}>
          {dailyData.notRecommendedFoods.slice(0, 5).map((food, index) => (
            <div key={index} className={styles.foodItem}>
              <span className={styles.foodBullet}>•</span>
              <span className={styles.foodName}>{food}</span>
            </div>
          ))}
        </div>
        <p className={styles.foodsNote}>
          {dailyData.notRecommendedFoods.length > 5 
            ? `+${dailyData.notRecommendedFoods.length - 5} more items` 
            : 'Based on your blood type and goals'}
        </p>
      </div>

      <div className={styles.tipsSection}>
        <h3 className={styles.tipsTitle}>Daily Tips</h3>
        <ul className={styles.tipsList}>
          <li>Drink at least 8 glasses of water daily</li>
          <li>Include protein in every meal</li>
          <li>Exercise for 30 minutes daily</li>
          <li>Get 7-8 hours of sleep</li>
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;