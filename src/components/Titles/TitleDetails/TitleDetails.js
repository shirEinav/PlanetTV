import React from 'react';
import { ImCamera } from 'react-icons/im';
import { IoPlay } from 'react-icons/io5';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './TitleDetails.module.scss';
import { posterUrl, backdropUrl } from '../../../api';
import Button from '../../UI/Button/Button';
import ToggleWatchlistBtn from '../../Watchlist/ToggleWatchlistBtn/ToggleWatchlistBtn';

const TitleDetails = ({ title, setIsModalOpen }) => {
  const trailerClickHandler = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const hasTableData = !!(
    (title.imdbRating && title.imdbRating !== 'N/A') ||
    title.rottenTomatoesRating ||
    title.creators.length !== 0 ||
    (title.language && title.imdbRating !== 'N/A') ||
    title.seasons
  );

  return (
    <motion.div
      className={styles.detailsWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className={styles.detailsTop}
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--color-primary-dark-3-a95), var(--color-primary-dark-3-a80), var(--color-primary-dark-3-a95)), url(${backdropUrl(
            title.backdropPath
          )})`,
        }}
      >
        <div className={styles.detailsBgBlur}>
          <div className={styles.detailsTopWrapper}>
            {title.posterPath ? (
              <img
                className={styles.poster}
                src={posterUrl(title.posterPath)}
                alt={title.name}
                loading='lazy'
              />
            ) : (
              <div className={styles.noPoster}>
                <ImCamera />
              </div>
            )}

            <div className={styles.flexSpacer}></div>
            <div className={styles.detailsTopContent}>
              <h1 className={styles.heading}>{title.name}</h1>
              <p className={styles.metaData}>
                {title.year}
                {title.year && title.genres.length !== 0 ? (
                  <span className={styles.metaDataDivider}>‧</span>
                ) : null}
                {title.genres?.join(', ')}
                {title.runtime && title.runtime !== 'N/A' ? (
                  <>
                    <span className={styles.metaDataDivider}>‧</span>
                    {`${title.runtime}m`}
                  </>
                ) : null}
              </p>

              <div className={styles.buttonsWrapper}>
                <ToggleWatchlistBtn title={title} />
                {title.trailer && (
                  <Button
                    btnClasses={['outline']}
                    onClickHandler={trailerClickHandler}
                  >
                    <IoPlay /> Watch trailer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailsBottom}>
        <div className={styles.flexSpacer}></div>
        <div className={styles.detailsBottomWrapper}>
          <p className={styles.overview}>{title.overview}</p>
          {hasTableData && (
            <table className={styles.table}>
              <tbody>
                {(title.imdbRating && title.imdbRating !== 'N/A') ||
                title.rottenTomatoesRating ? (
                  <tr className={styles.row}>
                    <th>Ratings:</th>
                    <td className={styles.rowText}>
                      {title.imdbRating && title.imdbRating !== 'N/A' && (
                        <>
                          <img
                            className={styles.ratingLogo}
                            src='https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg'
                            alt='Imdb Logo'
                          />
                          <span
                            className={styles.ratingText}
                          >{`${title.imdbRating}/10`}</span>
                        </>
                      )}
                      {title.rottenTomatoesRating && (
                        <>
                          <img
                            className={styles.ratingLogo}
                            src='https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg'
                            alt='Imdb Logo'
                          />
                          <span className={styles.ratingText}>
                            {title.rottenTomatoesRating.Value}
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                ) : null}
                {title.creators?.length !== 0 && (
                  <tr className={styles.row}>
                    <th>Creators:</th>
                    <td className={styles.rowText}>
                      {title.creators?.join(', ')}
                    </td>
                  </tr>
                )}
                {title.language && title.language !== 'N/A' && (
                  <tr className={styles.row}>
                    <th>Language:</th>
                    <td className={styles.rowText}>{title.language}</td>
                  </tr>
                )}
                {title.seasons && (
                  <tr className={styles.row}>
                    <th>Seasons:</th>
                    <td className={styles.rowText}>{title.seasons}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </motion.div>
  );
};

TitleDetails.propTypes = {
  title: PropTypes.object,
  setIsModalOpen: PropTypes.func,
};

export default TitleDetails;
