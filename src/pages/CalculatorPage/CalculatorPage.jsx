// src/pages/CalculatorPage/CalculatorPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import DailyCalorieIntake from '../../components/DailyCalorieIntake';
import { showLoader, hideLoader } from '../../redux/loader/loaderSlice';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);
  const isLoading = useSelector((state) => state.loader.isLoading);
  
  // KADINLAR İÇİN FORMÜL: 
  // 10 * ağırlık + 6,25 * boy - 5 * yaş - 161 - 10 * (ağırlık - istenen ağırlık)
  const calculateDailyCalories = (data) => {
    const { height, age, weight, desiredWeight, bloodType } = data;
    
    let dailyCalories;
    
    // Kan grubuna göre farklı formüller (referans projeden)
    if (bloodType === '1' || bloodType === '3') {
      // Kan grubu 1 ve 3 için
      dailyCalories = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      // Kan grubu 2 ve 4 için (kadınlar için formül)
      dailyCalories = 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
    }
    
    return {
      dailyCalories: Math.max(Math.round(dailyCalories), 1200), // Minimum 1200 kalori
      height,
      age,
      weight,
      desiredWeight,
      bloodType,
      weightDifference: weight - desiredWeight,
    };
  };

  const handleSubmit = async (values) => {
    dispatch(showLoader());
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      const result = calculateDailyCalories(values);
      setCalculationResult(result);
      dispatch(hideLoader());
      setIsModalOpen(true);
    }, 1500);
  };

  return (
    <div className={styles.page}>
      {isLoading && <Loader />}
      
      <CalculatorCalorieForm 
        onSubmit={handleSubmit}
        initialValues={{
          height: '',
          age: '',
          weight: '',
          desiredWeight: '',
          bloodType: '1',
        }}
      />
      
      {isModalOpen && calculationResult && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              Ваша рекомендуемая суточная норма калорий составляет
            </h2>
            
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {calculationResult.dailyCalories}
                <span className={styles.resultUnit}>ккал</span>
              </div>
            </div>
            
            <div className={styles.details}>
              <h3 className={styles.detailsTitle}>Calculation Details</h3>
              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Height:</span>
                  <span className={styles.detailValue}>{calculationResult.height} cm</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Age:</span>
                  <span className={styles.detailValue}>{calculationResult.age} years</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Current Weight:</span>
                  <span className={styles.detailValue}>{calculationResult.weight} kg</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Desired Weight:</span>
                  <span className={styles.detailValue}>{calculationResult.desiredWeight} kg</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Blood Type:</span>
                  <span className={styles.detailValue}>{calculationResult.bloodType}</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.actions}>
              <button 
                className={styles.actionButton}
                onClick={() => setIsModalOpen(false)}
              >
                Начать худеть
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;