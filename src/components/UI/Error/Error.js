import React from 'react';
import { ImSpinner11, ImArrowLeft2 } from 'react-icons/im';
import PropTypes from 'prop-types';

import styles from './Error.module.scss';
import { ReactComponent as ErrorIllustration } from '../../../assets/error-illustration.svg';
import Button from '../Button/Button';

const Error = ({ heading, message, errorStatus, resetErrorBoundary }) => {
  return (
    <div className={styles.wrapper}>
      <ErrorIllustration className={styles.illustration} />
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.text}>{message}</p>
      {errorStatus === '404' ? (
        <Button btnClasses={['primary']} isLink url='/'>
          <ImArrowLeft2 />
          Back to hompepage
        </Button>
      ) : (
        <Button btnClasses={['primary']} onClickHandler={resetErrorBoundary}>
          <ImSpinner11 />
          Try again
        </Button>
      )}
    </div>
  );
};

Error.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
  errorStatus: PropTypes.string,
  resetErrorBoundary: PropTypes.func,
};

export default Error;
