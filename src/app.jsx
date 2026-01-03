import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import DailyCalorieIntake from "./components/DailyCalorieIntake/DailyCalorieIntake.jsx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <Provider store={store}>
      <div className="App">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="app-main">
          {/* SADECE HESAPLAYICI SAYFASI */}
          {activeTab === "calculator" && (
            <div className="calculator-container">
              {/* CalculatorPage içinde zaten form ve sonuçlar olduğu için buraya başka bir şey ekleme */}
              <CalculatorPage />
            </div>
          )}

          {/* GÜNLÜK (DAILY) SAYFASI */}
          {activeTab === "diary" && (
            <div className="diary-container">
              {/* Bu sayfada sadece sonuç özetini gösteriyoruz */}
              <DailyCalorieIntake />
              <div
                style={{
                  textAlign: "center",
                  marginTop: "30px",
                  color: "#999",
                }}
              >
                <p>📅 Food diary list will be here soon.</p>
              </div>
            </div>
          )}

          {/* HAKKINDA SAYFASI */}
          {activeTab === "about" && (
            <div
              className="placeholder-section"
              style={{ textAlign: "center", padding: "100px" }}
            >
              <h2>About SlimMom</h2>
              <p>Healthy living starts with right calculations.</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </Provider>
  );
}

export default App;
