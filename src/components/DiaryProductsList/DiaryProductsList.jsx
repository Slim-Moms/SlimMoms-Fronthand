import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiaryProductsByDate } from '../../redux/diet/dietOperations';
import { selectDiaryProducts, selectSelectedDate } from '../../redux/diet/dietSelectors';
import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';
import styles from '../CalculatorCalorieForm/CalculatorCalorieForm.module.css';
import './DiaryProductsList.css';

const DiaryProductsList = () => {
  const dispatch = useDispatch();
  const diaryProducts = useSelector(selectDiaryProducts);
  const selectedDate = useSelector(selectSelectedDate);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (selectedDate && token) {
      const date = new Date(selectedDate);
      dispatch(fetchDiaryProductsByDate(date));
    }
  }, [dispatch, selectedDate, token]);

  return (
    <div className={styles.calculator}>
      <div className={styles.container}>
        <div className="diary-products-list">
          {diaryProducts && diaryProducts.length > 0 ? (
            diaryProducts.map((product) => (
              <DiaryProductsListItem key={product._id} product={product} />
            ))
          ) : (
            <div className="diary-products-empty">No products added for this date</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryProductsList;
