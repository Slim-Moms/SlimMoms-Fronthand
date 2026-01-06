import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalculatorCalorieForm from "../../components/CalculatorCalorieForm/CalculatorCalorieForm";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import DailyCalorieIntake from "../../components/DailyCalorieIntake/DailyCalorieIntake";
import { fetchDailyRate } from "../../redux/diet/dietOperations";
import { selectIsLoading, selectDailyRate, selectNotAllowedProducts } from "../../redux/diet/dietSelectors";
import "./MainPage.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localResult, setLocalResult] = useState(null);

  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = async (values) => {
    const resultAction = await dispatch(fetchDailyRate(values));

    if (fetchDailyRate.fulfilled.match(resultAction)) {
      setLocalResult({
        dailyRate: resultAction.payload.dailyRate,
        notAllowedProducts: resultAction.payload.notAllowedProducts || []
      });
      setIsModalOpen(true);
    }
  };

  return (
    <main className="main-page">
      {isLoading && <Loader />}
      <div className="container">
        <section className="hero-section">
          <h1 className="hero-title">
            Calculate your daily calorie intake right now
          </h1>
          <CalculatorCalorieForm
            onSubmit={handleSubmit}
            hideTitle={true}
            initialValues={{
              height: "",
              age: "",
              weight: "",
              desiredWeight: "",
              bloodType: "1",
            }}
          />
        </section>
      </div>

      {isModalOpen && localResult && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <DailyCalorieIntake
            data={localResult}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </main>
  );
};

export default MainPage;
