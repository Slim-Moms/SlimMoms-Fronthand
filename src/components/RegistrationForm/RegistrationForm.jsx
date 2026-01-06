import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import s from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'At least 3 characters!').required('Required field'),
  email: Yup.string().email('Invalid email').required('Required field'),
  password: Yup.string().min(8, 'At least 8 characters!').required('Required field'),
});

const RegistrationForm = ({ onSubmit }) => {
  return (
    <div className={s.formContainer}>
      <h2 className={s.title}>REGISTER</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.inputWrapper}>
              <Field type="text" name="name" placeholder="Name *" className={s.input} />
              <ErrorMessage name="name" component="div" className={s.error} />
            </div>

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
                Register
              </button>
              <Link to="/login" className={s.secondaryBtn}>
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;