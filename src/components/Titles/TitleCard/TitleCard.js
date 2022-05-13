import React from 'react';
import { Link } from 'react-router-dom';
import { ImCamera } from 'react-icons/im';
import PropTypes from 'prop-types';
import styles from './TitleCard.module.scss';
import { posterUrl } from '../../../api';
import DeleteWatchlistBtn from '../../Watchlist/DeleteWatchlistBtn/DeleteWatchlistBtn';

const TitleCard = ({
  titleType,
  id,
  firstAirDate,
  year,
  name,
  posterPath,
  genreIds,
  genreList,
  genresString,
  refetchTitles,
  isRefetching,
}) => {
  const genresFormated =
    genreList && !genresString
      ? genreList
          .filter(genre => genreIds.includes(genre.id))
          .map(item => item.name)
          .join(', ')
      : '';

  return (
    <li
      className={`${styles.titleItem} ${
        titleType === 'watchlist' ? styles.watchlistItem : ''
      }`}
    >
      <Link to={`/title/${id}`} className={styles.titleLink}>
        {posterPath ? (
          <>
            <img
              className={styles.poster}
              src={posterUrl(posterPath)}
              alt=''
              loading='lazy'
            />
            <div className={styles.posterOverlay}></div>
          </>
        ) : (
          <div className={styles.noPoster}>
            <ImCamera />
          </div>
        )}
        <div className={styles.data}>
          {(firstAirDate || year) && (
            <p className={styles.year}>
              {firstAirDate ? new Date(firstAirDate).getFullYear() : year}
            </p>
          )}
          <h2 className={styles.name}>{name}</h2>
          {(genresFormated || genresString) && (
            <p className={styles.genres}>
              {genresFormated ? genresFormated : genresString}
            </p>
          )}
        </div>
      </Link>
      {titleType === 'watchlist' && (
        <div className={styles.removeBtn}>
          <DeleteWatchlistBtn
            id={id}
            name={name}
            year={year}
            genres={genresString}
            posterPath={posterPath}
            refetchTitles={refetchTitles}
            isRefetching={isRefetching}
          />
        </div>
      )}
    </li>
  );
};

TitleCard.propTypes = {
  titleType: PropTypes.string,
  id: PropTypes.number,
  firstAirdate: PropTypes.string,
  name: PropTypes.string,
  posterPath: PropTypes.string,
  genreIds: PropTypes.array,
  genreList: PropTypes.array,
  genresString: PropTypes.string,
  refetchTitles: PropTypes.func,
  isRefetching: PropTypes.bool,
};

export default TitleCard;
