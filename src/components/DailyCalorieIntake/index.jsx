import React from "react";
import "./DailyCalorieIntake.css";
import { translations } from "../../i18n/translations";


export default function DailyCalorieIntake({ data }) {
  const { age, weight, height } = data;

  // Basit hesaplama örneği (BMR formülü)
  const calories = 10 * weight + 6.25 * height - 5 * age + 5;

  return (
    <div className="daily-calorie-intake">
      <h2> Your recommended daily calorie intake is</h2>
      <p>{calories || "2800 ккал"}</p>

      <div className="food-list">
        <h3>Foods you should not eat</h3>
        <ul>
          <li>1. Flour products</li>
          <li>2. Milk</li>
          <li>3. Red meat</li>
          <li>4. Smoked meats</li>
        </ul>
      </div>

      <button className="start-button">Start losing weight</button>
    </div>
  );
}
