import React from "react";
import "./DailyCalorieIntake.css";

export default function DailyCalorieIntake({ data }) {
  if (!data || !data.dailyRate) {
    return (
      <div className="intake_modal_content">
        <h2 className="modal_title" style={{ color: "black" }}>
          Calculations in progress...
        </h2>
      </div>
    );
  }

  const { dailyRate, notAllowedProducts } = data;

  return (
    <div className="intake_modal_content">
      <h2
        className="modal_title"
        style={{ color: "#212121", marginBottom: "20px" }}
      >
        Your daily calorie intake should be
      </h2>

      <div
        className="calories_display"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <span
          className="calories_number"
          style={{ fontSize: "48px", color: "#264061", fontWeight: "bold" }}
        >
          {Math.round(dailyRate)}
        </span>
        <span
          className="calories_unit"
          style={{ fontSize: "20px", color: "#264061", marginLeft: "5px" }}
        >
          kcal
        </span>
      </div>

      <div
        className="forbidden_foods"
        style={{ borderTop: "1px solid #E0E0E0", paddingTop: "20px" }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "15px",
            textAlign: "left",
            color: "#212121",
          }}
        >
          Foods you should not eat
        </h3>
        <ol style={{ textAlign: "left", paddingLeft: "20px", color: "#666" }}>
          {notAllowedProducts && notAllowedProducts.length > 0 ? (
            notAllowedProducts.slice(0, 5).map((product, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {product}
              </li>
            ))
          ) : (
            <li>No specific restrictions.</li>
          )}
        </ol>
      </div>

      <button
        type="button"
        className="orange_btn"
        style={{ marginTop: "30px", width: "100%" }}
      >
        Start losing weight
      </button>
    </div>
  );
}
