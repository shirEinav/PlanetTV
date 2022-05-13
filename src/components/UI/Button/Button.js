import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({
  children,
  btnType = 'button',
  btnClasses,
  onClickHandler,
  isLink,
  url,
}) => {
  const classes = btnClasses.map(className => styles[className]).join(' ');

  if (isLink) {
    return (
      <Link to={url} className={`${styles.btn} ${classes}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={btnType}
      className={`${styles.btn} ${classes}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  btnClasses: PropTypes.array,
  onClickHandler: PropTypes.func,
  isLink: PropTypes.bool,
  url: PropTypes.string,
};

export default Button;
