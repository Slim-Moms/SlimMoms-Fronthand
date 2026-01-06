import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import s from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required field'),
  password: Yup.string().required('Required field'),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <div className={s.formContainer}>
      <h2 className={s.title}>LOGIN</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.inputWrapper}>
              <Field type="email" name="email" placeholder="Email *" className={s.input} />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.inputWrapper}>
              <Field type="password" name="password" placeholder="Password *" className={s.input} />
              <ErrorMessage name="password" component="div" className={s.error} />
            </div>

            <div className={s.buttonGroup}>
              <button type="submit" disabled={isSubmitting} className={s.mainBtn}>
                Login
              </button>
              <Link to="/registration" className={s.secondaryBtn}>
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;