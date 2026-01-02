import React, { useState } from "react";
import DailyCalorieIntake from "../DailyCalorieIntake";
import "./DailyCaloriesForm.css";
import { validateForm } from "./validations";
import { translations } from "../../i18n/translations";



export default function DailyCaloriesForm() {
  const [formData, setFormData] = useState({ age: "", weight: "", height: "" });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setShowModal(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="daily-calories-form">
      <form onSubmit={handleSubmit}>
        <input
          name="age"
          placeholder="Yaş"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <span>{errors.age}</span>}

        <input
          name="weight"
          placeholder="Kilo"
          value={formData.weight}
          onChange={handleChange}
        />
        {errors.weight && <span>{errors.weight}</span>}

        <input
          name="height"
          placeholder="Boy"
          value={formData.height}
          onChange={handleChange}
        />
        {errors.height && <span>{errors.height}</span>}

        <button type="submit">Start losing weight</button>
      </form>

      {showModal && (
        <div className="modal">
          <div>
            <DailyCalorieIntake data={formData} />
            <button onClick={() => setShowModal(false)}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
}
