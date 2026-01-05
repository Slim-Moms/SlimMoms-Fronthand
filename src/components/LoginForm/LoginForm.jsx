import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import s from './LoginForm.module.css'; // Stil dosyası varsayımıyla

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Geçersiz e-posta').required('Zorunlu alan'),
  password: Yup.string().required('Zorunlu alan'),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <div className={s.formContainer}>
      <h2 className={s.title}>GİRİŞ YAP</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
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
                Giriş Yap
              </button>
              <Link to="/registration" className={s.secondaryBtn}>
                Kayıt Ol
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;