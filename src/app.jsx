import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoading } from './redux/loader/loaderSelectors';
import './App.css';


import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { RestrictedRoute } from './components/Routes/RestrictedRoute';

const CalculatorPage = lazy(() => import('./pages/CalculatorPage/CalculatorPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));

const App = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      
      {isLoading && <Loader />}
      
      <main className="app-main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route 
              path="/diary" 
                element={<PrivateRoute redirectTo="/login" component={<DiaryPage />} />} 
            />
            <Route 
              path="/calculator" 
              element={<PrivateRoute redirectTo="/login" component={<CalculatorPage />} />} 
            />
            <Route 
              path="/login" 
              element={<RestrictedRoute redirectTo="/diary" component={<LoginPage />} />} 
            />
            <Route 
              path="/registration" 
              element={<RestrictedRoute redirectTo="/diary" component={<RegistrationPage />} />} 
            />        
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

    </div>
      </BrowserRouter>
  );
};

export default App;