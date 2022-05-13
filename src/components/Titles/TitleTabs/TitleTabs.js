import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './TitleTabs.module.scss';
import useSlider from '../../../hooks/useSlider';
import SliderButton from '../../UI/SliderButton.js/SliderButton';
import TitleTabsButton from './TitleTabsButton/TitleTabsButton';

const TitleTabs = ({ children, currentTitles, setCurrentTitles }) => {
  const sliderRef = useRef();

  const { scrollStart, scrollEnd, sliderClickHandler, sliderScrollHandler } =
    useSlider(sliderRef, 2);

  const tabButtons = [
    { type: 'popular', value: 'Popular', ref: useRef() },
    { type: 'drama', value: 'Drama', ref: useRef() },
    { type: 'comedy', value: 'Comedy', ref: useRef() },
    { type: 'crime', value: 'Crime', ref: useRef() },
    { type: 'action', value: 'Action & Adventure', ref: useRef() },
    { type: 'fantasy', value: 'Sci-Fi & Fantasy', ref: useRef() },
    { type: 'mystery', value: 'Mystery', ref: useRef() },
    { type: 'documentary', value: 'Documentary', ref: useRef() },
    { type: 'animation', value: 'Animation', ref: useRef() },
    { type: 'kids', value: 'Kids', ref: useRef() },
    { type: 'reality', value: 'Reality', ref: useRef() },
  ];

  const preventKeyboardScroll = e => {
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') e.preventDefault();
  };

  const focusNextBtn = nextBtnIndex => {
    tabButtons[nextBtnIndex].ref.current.focus();
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.wrapper}>
          {!scrollStart && (
            <SliderButton
              direction='prev'
              size='small'
              onClickHandler={sliderClickHandler}
            />
          )}
          <div
            className={styles.inner}
            ref={sliderRef}
            onScroll={sliderScrollHandler}
            onKeyDown={preventKeyboardScroll}
            role='tablist'
            aria-label='Tv show genres'
          >
            {tabButtons.map((btn, index) => (
              <TitleTabsButton
                key={btn.type}
                ref={btn.ref}
                btnTitlesType={btn.type}
                currentTitles={currentTitles}
                setCurrentTitles={setCurrentTitles}
                btnIndex={index}
                lastIndex={tabButtons.length - 1}
                focusNextBtn={focusNextBtn}
              >
                {btn.value}
              </TitleTabsButton>
            ))}
          </div>
          {!scrollEnd && (
            <SliderButton
              direction='next'
              size='small'
              onClickHandler={sliderClickHandler}
            />
          )}
        </div>
      </div>
      <div role='tabpanel' aria-labelledby={currentTitles} tabIndex='0'>
        {children}
      </div>
    </>
  );
};

TitleTabs.propTypes = {
  currentTitles: PropTypes.string,
  setCurrentTitle: PropTypes.func,
};

export default TitleTabs;
