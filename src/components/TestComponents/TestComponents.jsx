// src/components/TestComponents.jsx
import React, { useState } from 'react';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import CalculatorCalorieForm from './CalculatorCalorieForm/CalculatorCalorieForm';

export const TestComponents = () => {
  const [activeTest, setActiveTest] = useState('loader');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const tests = [
    { id: 'loader', name: 'Loader Test' },
    { id: 'modal', name: 'Modal Test' },
    { id: 'form', name: 'Calculator Form Test' },
  ];

  const handleFormSubmit = (values) => {
    console.log('Form Values:', values);
    alert(`Form submitted successfully!\n\nHeight: ${values.height}cm\nAge: ${values.age}\nWeight: ${values.weight}kg\nDesired Weight: ${values.desiredWeight}kg\nBlood Type: ${values.bloodType}`);
  };

  return (
    <div className="test-components">
      <h2>Component Tests</h2>
      
      <div className="test-buttons">
        {tests.map(test => (
          <button
            key={test.id}
            className={`test-button ${activeTest === test.id ? 'active' : ''}`}
            onClick={() => setActiveTest(test.id)}
          >
            {test.name}
          </button>
        ))}
      </div>

      <div className="test-content">
        {activeTest === 'loader' && (
          <div className="loader-test">
            <h3>Loader Component Test</h3>
            <button 
              className="action-button"
              onClick={() => {
                setShowLoader(true);
                setTimeout(() => setShowLoader(false), 2000);
              }}
            >
              Show Loader for 2 seconds
            </button>
            {showLoader && <Loader />}
            <div className="test-info">
              <p><strong>Expected Behavior:</strong> Loader should appear for 2 seconds when clicked</p>
              <p><strong>Features:</strong> Centered, animated dots, responsive sizing</p>
            </div>
          </div>
        )}

        {activeTest === 'modal' && (
          <div className="modal-test">
            <h3>Modal Component Test</h3>
            <button 
              className="action-button"
              onClick={() => setShowModal(true)}
            >
              Open Modal
            </button>
            
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <div className="modal-test-content">
                  <h4>Modal Test Content</h4>
                  <p>This modal should:</p>
                  <ul>
                    <li>Close when clicking the X button</li>
                    <li>Close when clicking outside (backdrop)</li>
                    <li>Close when pressing Escape key</li>
                    <li>Prevent body scrolling when open</li>
                    <li>Be responsive for mobile/tablet/desktop</li>
                  </ul>
                  <button 
                    className="action-button secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close Modal
                  </button>
                </div>
              </Modal>
            )}
          </div>
        )}

        {activeTest === 'form' && (
          <div className="form-test">
            <h3>CalculatorCalorieForm Test</h3>
            <CalculatorCalorieForm 
              onSubmit={handleFormSubmit}
              initialValues={{
                height: '',
                age: '',
                weight: '',
                desiredWeight: '',
                bloodType: '1',
              }}
            />
            <div className="test-info">
              <p><strong>Expected Behavior:</strong></p>
              <ul>
                <li>Form validation should work</li>
                <li>Radio buttons should select properly</li>
                <li>Submit button should be disabled until form is valid</li>
                <li>Responsive layout for all screen sizes</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// CSS for test component
const testCSS = `
.test-components {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 20px;
}

.test-components h2 {
  color: #264061;
  text-align: center;
  margin-bottom: 30px;
}

.test-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.test-button {
  padding: 10px 20px;
  background: #e0e0e0;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.test-button.active {
  background: #FC842D;
  color: white;
}

.test-button:hover {
  transform: translateY(-2px);
}

.test-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-height: 400px;
}

.test-content h3 {
  color: #212121;
  margin-bottom: 20px;
}

.action-button {
  padding: 10px 20px;
  background: #FC842D;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 10px 0;
  transition: all 0.3s ease;
}

.action-button:hover {
  background: #e67624;
}

.action-button.secondary {
  background: #264061;
}

.action-button.secondary:hover {
  background: #1a2f47;
}

.test-info {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 6px;
  border-left: 4px solid #FC842D;
}

.modal-test-content {
  padding: 20px;
}

.modal-test-content h4 {
  color: #212121;
  margin-bottom: 15px;
}

.modal-test-content ul {
  margin: 15px 0;
  padding-left: 20px;
}

.modal-test-content li {
  margin-bottom: 5px;
  color: #555;
}

@media (max-width: 768px) {
  .test-buttons {
    flex-direction: column;
    align-items: stretch;
  }
  
  .test-button {
    text-align: center;
  }
}
`;

// CSS'i head'a ekleyelim
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = testCSS;
document.head.appendChild(styleSheet);

export default TestComponents;