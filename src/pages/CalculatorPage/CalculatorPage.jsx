
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { showLoader, hideLoader } from '../../redux/loader/loaderSlice';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  
  // DOĞRU FORMÜL: 10*weight + 6.25*height - 5*age - 161 - 10*(weight - desiredWeight)
  const calculateDailyCalories = (data) => {
    const { height, age, weight, desiredWeight, bloodType } = data;
    
    let bmr;
    
    // Referans projeye göre kan grubuna göre farklı formüller
    if (bloodType === '1' || bloodType === '3') {
      // Kan grubu 1 ve 3 için
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      // Kan grubu 2 ve 4 için - KADINLAR FORMÜLÜ
      bmr = 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
    }
    
    // Activity factor (sedentary)
    const dailyCalories = Math.round(bmr * 1.2);
    
    return {
      dailyCalories: Math.max(dailyCalories, 1200),
      height,
      age,
      weight,
      desiredWeight,
      bloodType,
      weightDifference: weight - desiredWeight,
      bmr: Math.round(bmr),
      formulaUsed: bloodType === '1' || bloodType === '3' 
        ? '10 × weight + 6.25 × height - 5 × age + 5' 
        : '10 × weight + 6.25 × height - 5 × age - 161 - 10 × (weight - desiredWeight)'
    };
  };

  const handleSubmit = async (values) => {
    dispatch(showLoader());
    
    // Simulate API call
    setTimeout(() => {
      const result = calculateDailyCalories(values);
      setCalculationResult(result);
      dispatch(hideLoader());
      setIsModalOpen(true);
    }, 1000);
  };

  return (
    <div className={styles.page}>
      {isLoading && <Loader />}
      
      <div className={styles.pageContainer}>
        <div className={styles.calculatorSection}>
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
        </div>
        
        <div className={styles.sidebarSection}>
          <RightSideBar />
        </div>
      </div>
      
      {isModalOpen && calculationResult && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              Your Recommended Daily Calorie Intake
            </h2>
            
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {calculationResult.dailyCalories}
                <span className={styles.resultUnit}>kcal</span>
              </div>
              <p className={styles.resultDescription}>
                This is calculated based on your inputs and blood type {calculationResult.bloodType}
              </p>
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
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Weight to Lose:</span>
                  <span className={styles.detailValue}>{calculationResult.weightDifference} kg</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.actions}>
              <button 
                type="button"
                className={styles.actionButton}
                onClick={() => setIsModalOpen(false)}
              >
                Start Losing Weight
              </button>
              <button 
                type="button"
                className={styles.actionButtonSecondary}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;