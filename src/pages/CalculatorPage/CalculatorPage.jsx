
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import DailyCalorieIntake from '../../components/DailyCalorieIntake';
import { showLoader, hideLoader } from '../../redux/loader/loaderSlice';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  
  // CORRECT FORMULA: 10*weight + 6.25*height - 5*age - 161 - 10*(weight - desiredWeight)
  const calculateDailyCalories = (data) => {
    const { height, age, weight, desiredWeight, bloodType } = data;
    
    // According to reference project, different formulas for blood types
    let bmr;
    
    if (bloodType === '1' || bloodType === '3') {
      // For blood types 1 and 3 (men's formula)
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      // For blood types 2 and 4 (women's formula from assignment)
      // 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight)
      bmr = 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
    }
    
    // Activity factor (sedentary)
    const dailyCalories = Math.round(bmr * 1.2);
    
    return {
      dailyCalories: Math.max(dailyCalories, 1200), // Minimum 1200 calories
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
                  <span className={styles.detailLabel}>Formula Used:</span>
                  <span className={styles.detailValue}>{calculationResult.formulaUsed}</span>
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
                onClick={() => {
                  setIsModalOpen(false);
                  // Here you could add logic to reset the form
                }}
              >
                Calculate Again
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;