import React, { useState, useEffect } from 'react';
import DiaryDateCalendar from '../../components/DiaryDateCalendar/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';
import styles from '../CalculatorPage/CalculatorPage.module.css';
import './DiaryPageMobile.css';

const DiaryPage = () => {
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const handleOpenForm = () => setIsMobileFormOpen(true);
    const handleCloseForm = () => setIsMobileFormOpen(false);
    window.addEventListener('openDiaryMobileForm', handleOpenForm);
    window.addEventListener('closeDiaryMobileForm', handleCloseForm);
    return () => {
      window.removeEventListener('openDiaryMobileForm', handleOpenForm);
      window.removeEventListener('closeDiaryMobileForm', handleCloseForm);
    };
  }, []);

  const openMobileForm = () => {
    setIsMobileFormOpen(true);
    window.dispatchEvent(new CustomEvent('openDiaryMobileForm'));
  };

  const handleFormSubmitSuccess = () => {
    setIsMobileFormOpen(false);
    window.dispatchEvent(new CustomEvent('closeDiaryMobileForm'));
  };

  return (
    <div className={styles.page}>
      {isLoading && <Loader />}

      <div className={styles.pageContainer}>
        <div className={`${styles.calculatorSection} ${isMobileFormOpen ? 'diary-mobile-form-open' : ''}`}>
          <DiaryDateCalendar />
          <div className="diary-form-inline">
            <DiaryAddProductForm />
          </div>
          {!isMobileFormOpen && <DiaryProductsList />}
          {isMobileFormOpen && (
            <div className="diary-mobile-form-container">
              <DiaryAddProductForm onSubmitSuccess={handleFormSubmitSuccess} isMobile={true} />
            </div>
          )}
          {!isMobileFormOpen && (
            <button type="button" className="diary-mobile-add-btn" onClick={openMobileForm}>
              +
            </button>
          )}
        </div>

        <div className={styles.sidebarSection}>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
