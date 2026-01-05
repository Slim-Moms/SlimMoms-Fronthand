import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import s from './RegistrationPage.module.css';

const RegistrationPage = () => {
  const handleRegister = (values) => {
    console.log('Kayıt verileri:', values);
    // Buraya backend API isteği gelecek
  };

  return (
    <main className={s.pageWrapper}>
      <div className={s.container}>
        <RegistrationForm onSubmit={handleRegister} />
      </div>
      {/* İsteğe bağlı: Arka plan dekoratif görselleri buraya eklenebilir */}
    </main>
  );
};

export default RegistrationPage;