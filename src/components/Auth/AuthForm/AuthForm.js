import React from 'react';
import PropTypes from 'prop-types';
import { IoAlertCircle } from 'react-icons/io5';
import styles from './AuthForm.module.scss';

const AuthForm = ({ children, onSubmitHandler, errorMessage }) => {
  return (
    <form className={styles.form} onSubmit={onSubmitHandler} noValidate>
      {errorMessage && (
        <p className={styles.errorLabel} role='alert'>
          <IoAlertCircle /> {errorMessage}
        </p>
      )}
      {children}
    </form>
  );
};

AuthForm.propTypes = {
  onSubmitHandler: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default AuthForm;
