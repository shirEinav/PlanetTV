import React, { useState } from 'react';
import { IoChevronUp } from 'react-icons/io5';
import styles from './ScrollToTopButton.module.scss';

const ScrollToTopButton = () => {
  const [btnVisible, setBtnVisble] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 300 ? setBtnVisble(true) : setBtnVisble(false);
  };

  const onClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <button
      className={styles.btn}
      onClick={onClickHandler}
      style={{
        visibility: btnVisible ? 'visible' : 'hidden',
        opacity: btnVisible ? '1' : '0',
      }}
      tabIndex={-1}
      aria-hidden={true}
    >
      <IoChevronUp />
    </button>
  );
};

export default ScrollToTopButton;
