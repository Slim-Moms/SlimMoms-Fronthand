import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalculatorCalorieForm from "../../components/CalculatorCalorieForm/CalculatorCalorieForm";
import Modal from "../../components/Modal/Modal";
import DailyCalorieIntake from "../../components/DailyCalorieIntake/DailyCalorieIntake";
import { fetchDailyRate } from "../../redux/diet/dietOperations";
import { selectDailyRate, selectNotAllowedProducts } from "../../redux/diet/dietSelectors";
import "./MainPage.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);

  const handleSubmit = async (values) => {
    const resultAction = await dispatch(fetchDailyRate(values));
    if (fetchDailyRate.fulfilled.match(resultAction)) {
      setIsModalOpen(true);
    }
  };

  return (
    <main className="main-page">
      <div className="container">
        <section className="hero-section">
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
        </section>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <DailyCalorieIntake 
            data={{ dailyRate, notAllowedProducts }} 
          />
        </Modal>
      )}
    </main>
  );
};

export default MainPage;
