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
  return (
    <main className="main-page">
      {isLoading && <Loader />}
      <div className="container">
        <section className="hero-section">
          <h1 className="hero-title">
            Calculate your daily calorie intake right now
          </h1>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
