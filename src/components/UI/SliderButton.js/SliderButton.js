import React from 'react';
import PropTypes from 'prop-types';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import styles from './SliderButton.module.scss';

const SliderButton = ({ direction, size, onClickHandler }) => {
  const btnClasses = `${styles.btn} ${styles[size]} ${styles[direction]}`;

  return (
    <button
      className={btnClasses}
      onClick={() => onClickHandler(direction)}
      aria-hidden
      tabIndex={-1}
    >
      {direction === 'next' ? <IoChevronForward /> : <IoChevronBack />}
    </button>
  );
};

SliderButton.propTypes = {
  direction: PropTypes.string,
  size: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default SliderButton;
