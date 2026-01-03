// src/components/CalculatorCalorieForm/CalculatorCalorieForm.jsx - RADIO BUTTON KISMI GÜNCELLENMİŞ
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import styles from './CalculatorCalorieForm.module.css';

const CalculatorSchema = Yup.object().shape({
  height: Yup.number()
    .required('Height is required')
    .typeError('Please enter a valid number')
    .min(100, 'Height must be at least 100 cm')
    .max(250, 'Height must be at most 250 cm')
    .integer('Height must be a whole number'),
  
  age: Yup.number()
    .required('Age is required')
    .typeError('Please enter a valid number')
    .min(18, 'Age must be at least 18 years')
    .max(99, 'Age must be at most 99 years')
    .integer('Age must be a whole number'),
  
  weight: Yup.number()
    .required('Current weight is required')
    .typeError('Please enter a valid number')
    .min(20, 'Weight must be at least 20 kg')
    .max(500, 'Weight must be at most 500 kg')
    .integer('Weight must be a whole number'),
  
  desiredWeight: Yup.number()
    .required('Desired weight is required')
    .typeError('Please enter a valid number')
    .min(20, 'Desired weight must be at least 20 kg')
    .max(500, 'Desired weight must be at most 500 kg')
    .integer('Desired weight must be a whole number')
    .test('less-than-current', 'Desired weight must be less than current weight', 
      function(value) {
        const { weight } = this.parent;
        return value < weight;
      }),
  
  bloodType: Yup.string()
    .required('Blood type is required')
    .oneOf(['1', '2', '3', '4'], 'Please select a valid blood type'),
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
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ errors, touched, values, isValid, dirty }) => (
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
                        className={`${styles.field} ${errors.height && touched.height ? styles.error : ''}`}
                        placeholder="cm"
                        min="100"
                        max="250"
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
                        className={`${styles.field} ${errors.age && touched.age ? styles.error : ''}`}
                        placeholder="years"
                        min="18"
                        max="99"
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
                        className={`${styles.field} ${errors.weight && touched.weight ? styles.error : ''}`}
                        placeholder="kg"
                        min="20"
                        max="500"
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
                        className={`${styles.field} ${errors.desiredWeight && touched.desiredWeight ? styles.error : ''}`}
                        placeholder="kg"
                        min="20"
                        max="500"
                      />
                      {errors.desiredWeight && touched.desiredWeight && (
                        <div className={styles.fieldError}>{errors.desiredWeight}</div>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <div id="blood-type-group" className={styles.formLabel}>
                        Blood Type *
                      </div>
                      <div
                        role="group"
                        aria-labelledby="blood-type-group"
                        className={styles.radioGroup}
                      >
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
                            <small className={styles.radioText}>{type}</small>
                          </label>
                        ))}
                      </div>
                      {errors.bloodType && touched.bloodType && (
                        <div className={styles.fieldError}>{errors.bloodType}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={!isValid || !dirty}
                >
                  Calculate Daily Calories
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