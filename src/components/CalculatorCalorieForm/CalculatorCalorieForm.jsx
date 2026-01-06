import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './CalculatorCalorieForm.module.css';

const validationSchema = Yup.object().shape({
  height: Yup.number().min(100).max(250).required('Required'),
  age: Yup.number().min(18).max(100).required('Required'),
  weight: Yup.number().min(20).max(500).required('Required'),
  desiredWeight: Yup.number().min(20).max(500).required('Required'),
  bloodType: Yup.string().required('Please select'),
});

const CalculatorCalorieForm = ({ onSubmit, initialValues, hideTitle }) => {
  return (
    <div className={styles.calculator}>
      <div className={styles.container}>
        {!hideTitle && <h1 className={styles.title}>Calculate your daily calorie intake right now</h1>}
        
        <Formik
          initialValues={initialValues || { height: '', age: '', weight: '', desiredWeight: '', bloodType: '1' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className={styles.formContainer}>
              <div className={styles.formWrapper}>
                <div className={styles.inputColumn}>
                  <div className={styles.formInput}>
                    <Field name="height" placeholder="Height *" className={styles.field} />
                    <ErrorMessage name="height" component="div" className={styles.fieldError} />
                  </div>
                  <div className={styles.formInput}>
                    <Field name="age" placeholder="Age *" className={styles.field} />
                    <ErrorMessage name="age" component="div" className={styles.fieldError} />
                  </div>
                  <div className={styles.formInput}>
                    <Field name="weight" placeholder="Current weight *" className={styles.field} />
                    <ErrorMessage name="weight" component="div" className={styles.fieldError} />
                  </div>
                </div>
                <div className={styles.inputColumn}>
                  <div className={styles.formInput}>
                    <Field name="desiredWeight" placeholder="Desired weight *" className={styles.field} />
                    <ErrorMessage name="desiredWeight" component="div" className={styles.fieldError} />
                  </div>

                  <div className={styles.radioWrapper}>
                    <div style={{color: '#9b9faa', fontWeight: '700', fontSize: '14px', marginBottom: '10px'}}>Blood Type *</div>
                    <div className={styles.radioGroup}>
                      {['1', '2', '3', '4'].map((type) => (
                        <label key={type} className={styles.formRadio}>
                          <Field 
                            type="radio" 
                            name="bloodType" 
                            value={type} 
                            className={styles.customRadio} 
                          />
                          <span className={styles.radioSpan}></span>
                          <span className={styles.radioLabelText}>{type}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage name="bloodType" component="div" className={styles.fieldError} />
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.button}>
                Start losing weight
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CalculatorCalorieForm;