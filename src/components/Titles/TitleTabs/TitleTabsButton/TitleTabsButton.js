import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './TitleTabsButton.module.scss';

const TitleTabsButton = React.forwardRef(
  (
    {
      children,
      btnTitlesType,
      currentTitles,
      setCurrentTitles,
      btnIndex,
      lastIndex,
      focusNextBtn,
    },
    ref
  ) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
      setCurrentTitles(btnTitlesType);
      navigate(`/filters?genre=${btnTitlesType}`);
    };

    const onKeydownHandler = e => {
      let nextBtnIndex;
      if (e.code === 'ArrowLeft') {
        if (btnIndex === 0) return;
        nextBtnIndex = btnIndex - 1;
      }
      if (e.code === 'ArrowRight') {
        if (btnIndex === lastIndex) return;
        nextBtnIndex = btnIndex + 1;
      }

      focusNextBtn(nextBtnIndex);
    };

    const isActive = currentTitles === btnTitlesType;

    return (
      <button
        className={`${styles.btn} ${isActive ? styles.active : ''}`}
        role='tab'
        id={btnTitlesType}
        tabIndex={isActive ? '0' : '-1'}
        aria-selected={isActive}
        aria-controls={`${btnTitlesType}-tab`}
        onClick={onClickHandler}
        onKeyDown={onKeydownHandler}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

TitleTabsButton.propTypes = {
  btnTitlesType: PropTypes.string,
  currentTitles: PropTypes.string,
  setCurrentTitles: PropTypes.func,
};

export default TitleTabsButton;
