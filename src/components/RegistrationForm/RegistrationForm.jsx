import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import s from './RegistrationForm.module.css'; // Stil dosyası varsayımıyla

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'En az 3 karakter!').required('Zorunlu alan'),
  email: Yup.string().email('Geçersiz e-posta').required('Zorunlu alan'),
  password: Yup.string().min(8, 'En az 8 karakter!').required('Zorunlu alan'),
});

const RegistrationForm = ({ onSubmit }) => {
  return (
    <div className={s.formContainer}>
      <h2 className={s.title}>KAYIT OL</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.inputWrapper}>
              <Field type="text" name="name" placeholder="İsim *" className={s.input} />
              <ErrorMessage name="name" component="div" className={s.error} />
            </div>

            <div className={s.inputWrapper}>
              <Field type="email" name="email" placeholder="E-posta *" className={s.input} />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.inputWrapper}>
              <Field type="password" name="password" placeholder="Şifre *" className={s.input} />
              <ErrorMessage name="password" component="div" className={s.error} />
            </div>

            <div className={s.buttonGroup}>
              <button type="submit" disabled={isSubmitting} className={s.mainBtn}>
                Kayıt Ol
              </button>
              <Link to="/login" className={s.secondaryBtn}>
                Giriş Yap
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;