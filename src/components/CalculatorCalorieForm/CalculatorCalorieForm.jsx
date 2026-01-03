// src/components/CalculatorCalorieForm/CalculatorCalorieForm.jsx
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from './CalculatorCalorieForm.module.css';

const CalculatorSchema = Yup.object().shape({
  height: Yup.number()
    .required('Height is required')
    .typeError('Only numeric values are accepted')
    .min(100, 'Enter your height from 100 cm')
    .max(250, 'Enter your height up to 250 cm')
    .integer(),
  
  age: Yup.number()
    .required('Age is required')
    .typeError('Only numeric values are accepted')
    .min(18, 'Enter your age from 18 years')
    .max(99, 'Enter your age up to 100 years')
    .integer(),
  
  weight: Yup.number()
    .required('Current weight is required')
    .typeError('Only numeric values are accepted')
    .min(20, 'Enter your current weight from 20 kg')
    .max(500, 'Enter your current weight up to 500 kg')
    .integer(),
  
  desiredWeight: Yup.number()
    .required('Desired weight is required')
    .typeError('Only numeric values are accepted')
    .min(20, 'Enter your desired weight from 20 kg')
    .max(500, 'Enter your desired weight up to 500 kg')
    .integer(),
  
  bloodType: Yup.string()
    .required('Blood type is required')
    .oneOf(['1', '2', '3', '4'], 'Invalid blood type'),
});

const CalculatorCalorieForm = ({ onSubmit, initialValues }) => {
  return (
    <div className={styles.calculator}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Calculate Your Daily Calorie Intake Right Now
        </h1>
        
        <div className={styles.inputWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={CalculatorSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className={styles.formContainer}>
                <div className={styles.formWrapper}>
                  <div className={styles.leftColumn}>
                    <div className={styles.formGroup}>
                      <label htmlFor="height" className={styles.formLabel}>
                        Height *
                      </label>
                      <Field 
                        name="height" 
                        type="number" 
                        className={styles.field} 
                        placeholder="cm"
                      />
                      {errors.height && touched.height && (
                        <div className={styles.fieldError}>{errors.height}</div>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="age" className={styles.formLabel}>
                        Age *
                      </label>
                      <Field 
                        name="age" 
                        type="number" 
                        className={styles.field} 
                        placeholder="years"
                      />
                      {errors.age && touched.age && (
                        <div className={styles.fieldError}>{errors.age}</div>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="weight" className={styles.formLabel}>
                        Current Weight *
                      </label>
                      <Field 
                        name="weight" 
                        type="number" 
                        className={styles.field} 
                        placeholder="kg"
                      />
                      {errors.weight && touched.weight && (
                        <div className={styles.fieldError}>{errors.weight}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.rightColumn}>
                    <div className={styles.formGroup}>
                      <label htmlFor="desiredWeight" className={styles.formLabel}>
                        Desired Weight *
                      </label>
                      <Field 
                        name="desiredWeight" 
                        type="number" 
                        className={styles.field} 
                        placeholder="kg"
                      />
                      {errors.desiredWeight && touched.desiredWeight && (
                        <div className={styles.fieldError}>{errors.desiredWeight}</div>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <div className={styles.formLabel}>Blood Type *</div>
                      <div role="group" className={styles.radioGroup}>
                        {['1', '2', '3', '4'].map((type) => (
                          <label key={type} className={styles.radioLabel}>
                            <Field
                              type="radio"
                              name="bloodType"
                              value={type}
                              className={styles.radioInput}
                              checked={values.bloodType === type}
                            />
                            <span className={styles.radioCustom}></span>
                            <span className={styles.radioText}>{type}</span>
                          </label>
                        ))}
                      </div>
                      {errors.bloodType && touched.bloodType && (
                        <div className={styles.fieldError}>{errors.bloodType}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Lose Weight
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

CalculatorCalorieForm.defaultProps = {
  initialValues: {
    height: '',
    age: '',
    weight: '',
    desiredWeight: '',
    bloodType: '1',
  },
};

export default CalculatorCalorieForm;