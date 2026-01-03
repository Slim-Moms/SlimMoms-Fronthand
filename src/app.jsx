// src/app.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CalculatorPage />
      </div>
    </Provider>
  );
}

export default App;