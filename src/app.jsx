// src/app.jsx - GÜNCELLENMİŞ
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <Provider store={store}>
      <div className="App">
        {/* HEADER */}
        <header className="app-header">
          <div className="header-container">
            {/* Logo */}
            <div className="logo-section">
              <img 
                src="/src/img/svg/logo.svg" 
                alt="SlimMoms Logo" 
                className="logo-image"
              />
              <div className="app-title">
                <span className="main">SlimMoms</span>
                <span className="sub">Healthy Living Calculator</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="app-nav">
              <button 
                className={`nav-button ${activeTab === 'calculator' ? 'active' : ''}`}
                onClick={() => setActiveTab('calculator')}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V16H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11M15,18V20H17V18H15Z" />
                </svg>
                <span className="nav-text hidden-mobile">Calculator</span>
              </button>
              
              <button 
                className={`nav-button ${activeTab === 'diary' ? 'active' : ''}`}
                onClick={() => setActiveTab('diary')}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z" />
                </svg>
                <span className="nav-text hidden-mobile">Diary</span>
              </button>
              
              <button 
                className={`nav-button ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <svg className="nav-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <span className="nav-text hidden-mobile">About</span>
              </button>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="app-main">
          {/* Calculator Page */}
          {activeTab === 'calculator' && <CalculatorPage />}
          
          {/* Diary Page */}
          {activeTab === 'diary' && (
            <div className="info-page">
              <div className="diary-placeholder">
                <img 
                  src="/src/img/svg/calendar.svg" 
                  alt="Calendar" 
                  className="diary-icon"
                />
                <h2>Food Diary</h2>
                <p>Track your daily food intake and monitor your progress.</p>
                <div className="feature-note">
                  This feature is coming soon!
                </div>
              </div>
            </div>
          )}
          
          {/* About Page */}
          {activeTab === 'about' && (
            <div className="info-page">
              <div className="info-card">
                <h2>About SlimMoms</h2>
                <div className="about-content">
                  <div className="about-image">
                    <img 
                      src="/src/img/spot.png" 
                      alt="Healthy Living" 
                      className="feature-image"
                    />
                  </div>
                  <div className="about-text">
                    <p>SlimMoms helps you calculate your daily calorie needs based on scientific formulas.</p>
                    
                    <h3>Features:</h3>
                    <ul>
                      <li>Personalized calorie calculation</li>
                      <li>Blood type based recommendations</li>
                      <li>Food diary tracking</li>
                      <li>Progress monitoring</li>
                      <li>Responsive design for all devices</li>
                    </ul>
                    
                    <h3>Formula Used:</h3>
                    <div className="formula">
                      10 × weight + 6.25 × height - 5 × age - 161 - 10 × (weight - desired weight)
                    </div>
                    
                    <p className="mt-20">
                      <strong>Note:</strong> This calculator is for educational purposes. 
                      Always consult with a healthcare professional for medical advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img 
                src="/src/img/svg/logo.svg" 
                alt="SlimMoms Logo" 
                className="footer-logo-image"
              />
              <span>SlimMoms</span>
            </div>
            <p>© 2024 SlimMoms - Healthy Living Calculator</p>
            <p className="footer-note">
              For educational purposes only. Consult a healthcare professional for medical advice.
            </p>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;