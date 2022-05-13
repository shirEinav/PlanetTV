import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import styles from './TitleSlider.module.scss';
import useGenres from '../../../hooks/react-query/useGenres';
import useSlider from '../../../hooks/useSlider';
import TitleCard from '../TitleCard/TitleCard';
import SliderButton from '../../UI/SliderButton.js/SliderButton';

const TitleSlider = ({ titles, totalSlides }) => {
  const { data: genreList } = useGenres();

  const sliderRef = useRef();

  const { scrollStart, scrollEnd, sliderClickHandler, sliderScrollHandler } =
    useSlider(sliderRef, totalSlides);

  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.heading}>You may also like</h2>
      <div className={styles.sliderWrapper}>
        {!scrollStart && (
          <SliderButton
            direction='prev'
            size='large'
            onClickHandler={sliderClickHandler}
          />
        )}
        <ul
          className={styles.sliderInner}
          ref={sliderRef}
          onScroll={sliderScrollHandler}
        >
          {titles?.map(title => (
            <TitleCard
              key={title.id}
              id={title.id}
              firstAirDate={title.first_air_date}
              name={title.name}
              posterPath={title.poster_path}
              genreIds={title.genre_ids}
              genreList={genreList?.genres ?? []}
            />
          ))}
        </ul>
        {!scrollEnd && totalSlides > 1 && (
          <SliderButton
            direction='next'
            size='large'
            onClickHandler={sliderClickHandler}
          />
        )}
      </div>
    </motion.section>
  );
};

TitleSlider.propTypes = {
  titles: PropTypes.array,
  totalSlides: PropTypes.number,
};

export default TitleSlider;
