import React from 'react';
import DiaryDateCalendar from '../../components/DiaryDateCalendar/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';
import styles from '../CalculatorPage/CalculatorPage.module.css';

const DiaryPage = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={styles.page}>
      {isLoading && <Loader />}

      <div className={styles.pageContainer}>
        <div className={styles.calculatorSection}>
          <DiaryDateCalendar />
          <DiaryAddProductForm />
          <DiaryProductsList />
        </div>

        <div className={styles.sidebarSection}>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
