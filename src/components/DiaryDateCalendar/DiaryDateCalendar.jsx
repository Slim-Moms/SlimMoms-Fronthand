import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../redux/diet/dietSlice';
import { fetchDiaryProductsByDate } from '../../redux/diet/dietOperations';
import { selectSelectedDate } from '../../redux/diet/dietSelectors';
import { FaCalendar } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import styles from '../CalculatorCalorieForm/CalculatorCalorieForm.module.css';
import './DiaryDateCalendar.css';

const DiaryDateCalendar = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const token = useSelector((state) => state.auth.token);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(new Date(selectedDate || new Date()));

  useEffect(() => {
    if (selectedDate) {
      setValue(new Date(selectedDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && token) {
      const date = new Date(selectedDate);
      dispatch(fetchDiaryProductsByDate(date));
    }
  }, [token]);

  const onChange = (newValue) => {
    setValue(newValue);
    const dateString = newValue.toISOString().split('T')[0];
    dispatch(setSelectedDate(dateString));
    dispatch(fetchDiaryProductsByDate(newValue));
    setIsOpen(false);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const displayDate = selectedDate ? formatDate(new Date(selectedDate)) : formatDate(new Date());

  return (
    <div className={styles.calculator}>
      <div className={styles.container}>
        <div className="diary-date-calendar">
          <div className="diary-date-display">
            <span>{displayDate}</span>
            <FaCalendar 
              className="diary-calendar-icon" 
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          {isOpen && (
            <div className="diary-calendar-wrapper">
              <Calendar
                onChange={onChange}
                value={value}
                locale="en-US"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryDateCalendar;
