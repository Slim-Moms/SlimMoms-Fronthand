import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { fetchDailyRate } from '../../redux/diet/dietOperations';
import { selectIsLoading, selectDailyRate, selectNotAllowedProducts } from '../../redux/diet/dietSelectors';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Redux state'den verileri çekiyoruz
  const isLoading = useSelector(selectIsLoading);
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);

  const handleSubmit = async (values) => {
    // Backend'e istek atıyoruz
    const resultAction = await dispatch(fetchDailyRate(values));
    
    if (fetchDailyRate.fulfilled.match(resultAction)) {
      setIsModalOpen(true);
    }
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
      
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              Your Recommended Daily Calorie Intake
            </h2>
            
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {Math.round(dailyRate)}
                <span className={styles.resultUnit}>kcal</span>
              </div>
              
              <div className={styles.details}>
                <h3 className={styles.detailsTitle}>Foods you should not eat</h3>
                <ol className={styles.detailsList}>
                  {notAllowedProducts.slice(0, 5).map((product, index) => (
                    <li key={index} className={styles.detailItem}>
                       {index + 1}. {product}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button 
                type="button"
                className={styles.actionButton}
                onClick={() => setIsModalOpen(false)}
              >
                Start Losing Weight
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;