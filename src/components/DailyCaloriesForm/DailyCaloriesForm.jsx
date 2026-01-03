import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validateForm } from "./validations";
import DailyCalorieIntake from "../DailyCalorieIntake/DailyCalorieIntake";
import Modal from "../Modal/Modal"; // Modal bileşenini buradan içe aktar
import "./DailyCaloriesForm.css";

export default function DailyCaloriesForm() {
  const dispatch = useDispatch();
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
    const validationErrors = validateForm(formData); // Form doğrulama

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setShowModal(true); // Hesaplama sonrası Modal açılışı
      // Buraya hesaplama action'ı veya operation'ı eklenebilir
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="calories-form">
        {/* Input alanları buraya gelecek */}
        <button type="submit" className="submit-btn">
          Start losing weight
        </button>
      </form>

      {/* Modal içinde DailyCalorieIntake bileşeni */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DailyCalorieIntake data={formData} />
        </Modal>
      )}
    </div>
  );
}
