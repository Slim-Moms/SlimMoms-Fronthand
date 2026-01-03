import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import { selectIsLoading } from './redux/loader/loaderSelectors';
import './App.css';

import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';


const CalculatorPage = lazy(() => import('./pages/CalculatorPage/CalculatorPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));

const AppContent = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className="App">
      <Header />
      
      
      {isLoading && <Loader />}
      
      <main className="app-main">
        <Suspense fallback={<Loader />}>
          <Routes>
            
            <Route path="/" element={<Navigate to="/calculator" replace />} />
            <Route path="/diary" element={<div>Diary Page Under Construction</div>} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />        
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
