import React from 'react';
import { IoEye, IoEyeOff, IoAlertCircle } from 'react-icons/io5';

import styles from './Input.module.scss';

const Input = ({
  type,
  id,
  label,
  value,
  setValue,
  isError,
  errorMessage,
  showPassword,
  setShowPassword,
  maxLength,
  onChange,
}) => {
  const inputChangeHandler = e => {
    setValue(e.target.value);
    if (onChange) onChange();
  };
  const togglePasswordVisible = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <input
          id={id}
          className={`${styles.input} ${value && styles.hasText} ${
            (errorMessage || isError) && styles.errorInput
          }`}
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          maxLength={maxLength}
          onChange={inputChangeHandler}
          aria-invalid={!!errorMessage || isError}
          aria-errormessage={errorMessage ? `${id}-error` : ''}
        />
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>

        {type === 'password' && (
          <button
            type='button'
            className={styles.passwordBtn}
            aria-label={showPassword ? 'Hide password' : 'Show Password'}
            onClick={togglePasswordVisible}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        )}
      </div>
      {errorMessage && (
        <p className={styles.errorLabel} id={`${id}-error`}>
          <IoAlertCircle /> {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
