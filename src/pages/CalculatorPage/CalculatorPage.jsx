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
    {/* Elle yazdığın HTML'leri sildik, bileşeni koyduk */}
    <DailyCalorieIntake onClose={() => setIsModalOpen(false)} />
  </Modal>
)}
    </div>
  );
};

export default CalculatorPage;