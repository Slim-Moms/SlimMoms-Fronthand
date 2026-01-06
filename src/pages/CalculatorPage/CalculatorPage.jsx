import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CalculatorCalorieForm from "../../components/CalculatorCalorieForm/CalculatorCalorieForm";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import Loader from "../../components/Loader/Loader";
import { fetchDailyRate } from "../../redux/diet/dietOperations";
import { selectIsLoading } from "../../redux/diet/dietSelectors";
import styles from "./CalculatorPage.module.css";

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = async (values) => {
    await dispatch(fetchDailyRate(values));
  };

  return (
    <div className={styles.page}>
      {isLoading && <Loader />}

      <div className={styles.pageContainer}>
        <div className={styles.calculatorSection}>
          <CalculatorCalorieForm
            onSubmit={handleSubmit}
            initialValues={{
              height: "",
              age: "",
              weight: "",
              desiredWeight: "",
              bloodType: "1",
            }}
          />
        </div>

        <div className={styles.sidebarSection}>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
