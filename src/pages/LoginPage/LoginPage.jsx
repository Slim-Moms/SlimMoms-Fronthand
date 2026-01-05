import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import s from './LoginPage.module.css';

const LoginPage = () => {
  const handleLogin = (values) => {
    console.log('Giriş verileri:', values);
    // Buraya login API isteği (Redux dispatch vb.) gelecek
  };

  return (
    <main className={s.pageWrapper}>
      <div className={s.container}>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </main>
  );
};

export default LoginPage;