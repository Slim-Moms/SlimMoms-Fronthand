import React, { useState } from "react";
import DailyCalorieIntake from "../DailyCalorieIntake/DailyCalorieIntake";
import Modal from "../Modal/Modal";
import { validateForm } from "./validations";
import "./DailyCaloriesForm.css";

export default function DailyCaloriesForm() {
  const [formData, setFormData] = useState({
    height: "",
    desiredWeight: "",
    age: "",
    bloodType: "",
    currentWeight: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setShowModal(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="calories-form-container">
      <form onSubmit={handleSubmit}>
        {/* Form inputs will go here (Height, Age, etc.) */}
        <button type="submit" className="orange-btn">
          Start losing weight
        </button>
      </form>

      {/* Modal containing DailyCalorieIntake */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DailyCalorieIntake data={formData} />
        </Modal>
      )}
    </div>
  );
}
