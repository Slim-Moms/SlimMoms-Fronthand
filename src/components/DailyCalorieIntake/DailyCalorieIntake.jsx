import React from "react";
import "./DailyCalorieIntake.css";

export default function DailyCalorieIntake({ data }) {
  // Veri gelene kadar çökmemesi için koruma katmanı
  if (!data || Object.keys(data).length === 0) return null;

  const { height, age, currentWeight } = data;
  // Örnek dinamik hesaplama işlemi
  const calories = Math.round(10 * currentWeight + 6.25 * height - 5 * age + 5);

  return (
    <div className="daily-intake-container">
      <h2 className="intake-title">Your Daily Calorie Needs</h2>
      <p className="intake-result">{calories} kcal</p>

      <div className="prohibited-foods">
        <h3>Foods you should not eat</h3>
        <ul>
          <li>Flour products</li>
          <li>Milk</li>
          <li>Red meat</li>
          <li>Smoked meats</li>
        </ul>
      </div>
    </div>
  );
}
