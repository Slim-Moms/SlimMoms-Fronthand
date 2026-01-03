// src/app.jsx
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import CalculatorCalorieForm from './components/CalculatorCalorieForm/CalculatorCalorieForm';
import DailyCalorieIntake from './components/DailyCalorieIntake';
import './App.css';

// Demo için ayrı bir sayfa bileşeni
const DemoComponentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    height: '165',
    age: '30',
    weight: '70',
    desiredWeight: '60',
    bloodType: '2'
  });

  const handleFormSubmit = (values) => {
    console.log('Form submitted:', values);
    setFormData(values);
    setShowModal(true);
  };

  const toggleLoader = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 2000);
  };

  return (
    <div className="demo-container">
      <h1 className="demo-title">SlimMoms - Component Demo</h1>
      
      {/* Loader Demo */}
      <section className="demo-section">
        <h2>1. Loader Component</h2>
        <button 
          className="demo-button"
          onClick={toggleLoader}
        >
          Show Loader for 2 seconds
        </button>
        {showLoader && <Loader />}
      </section>

      {/* CalculatorCalorieForm Demo */}
      <section className="demo-section">
        <h2>2. CalculatorCalorieForm Component</h2>
        <div className="form-demo">
          <CalculatorCalorieForm 
            onSubmit={handleFormSubmit}
            initialValues={formData}
          />
        </div>
      </section>

      {/* Modal Demo */}
      <section className="demo-section">
        <h2>3. Modal Component</h2>
        <button 
          className="demo-button"
          onClick={() => setShowModal(true)}
        >
          Open Modal with Results
        </button>
        
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="modal-demo-content">
              <h3>Daily Calorie Calculation Results</h3>
              <DailyCalorieIntake data={formData} />
              <div className="modal-actions">
                <button 
                  className="demo-button"
                  onClick={() => setShowModal(false)}
                >
                  Close Modal
                </button>
              </div>
            </div>
          </Modal>
        )}
      </section>

      {/* CalculatorPage Demo (Full Page) */}
      <section className="demo-section">
        <h2>4. CalculatorPage Component (Full Implementation)</h2>
        <div className="full-page-demo">
          <CalculatorPage />
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* Tüm bileşenlerin demo'su */}
        <DemoComponentsPage />
      </div>
    </Provider>
  );
}

export default App;