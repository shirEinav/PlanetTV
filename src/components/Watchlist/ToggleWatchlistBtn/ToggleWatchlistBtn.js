import React, { useState, useEffect } from 'react';
import { FaPlus, FaCheck } from 'react-icons/fa';
import styles from './ToggleWatchlistBtn.module.scss';
import useAuthContext from '../../../hooks/auth/useAuthContext';
import useWatchlistTitles from '../../../hooks/react-query/useWatchlistTitles';
import useAddToWatchlist from '../../../hooks/react-query/useAddToWatchlist';
import useDeleteWatchlist from '../../../hooks/react-query/useDeleteWatchlist';
import Spinner from '../../UI/Spinner/Spinner';

const ToggleWatchlistBtn = ({ title }) => {
  const { user } = useAuthContext();

  const { mutateAsync: mutateAdd, isLoading: addLoading } = useAddToWatchlist();
  const { mutateAsync: mutateDelete, isLoading: deleteLoading } =
    useDeleteWatchlist();
  const { data, isLoading: stateLoading } = useWatchlistTitles(user?.uid);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [titleInWatchlist, setTitleInWatchlist] = useState();

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  useEffect(() => {
    if (data && data.some(watchlistTitle => watchlistTitle.id === title.id)) {
      setTitleInWatchlist(true);
      return;
    }
    setTitleInWatchlist(false);
  }, [data, title.id]);

  const watchlistClickHandler = () => {
    if (addLoading || deleteLoading || stateLoading) return;

    const titleData = {
      uid: user.uid,
      id: title.id,
      name: title.name,
      year: title.year,
      genres: title.genres.join(', '),
      posterPath: title.posterPath,
    };

    if (!titleInWatchlist) {
      mutateAdd(titleData).then(() => setTitleInWatchlist(true));
    } else {
      mutateDelete(titleData).then(() => setTitleInWatchlist(false));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.disabled}>
        <button
          className={`${styles.btn} ${styles.addWatchlist}`}
          aria-disabled='true'
          aria-describedby='login-tooltip'
        >
          <FaPlus /> <span>Add to Watchlist</span>
        </button>
        <div id='login-tooltip' className={styles.tooltip} role='tooltip'>
          <div className={styles['tooltip-text']}>
            Login to add shows to your watchlist
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className={`${styles.btn} ${
        titleInWatchlist ? styles.inWatchlist : styles.addWatchlist
      }`}
      onClick={watchlistClickHandler}
    >
      {stateLoading || addLoading || deleteLoading ? (
        <Spinner size='sm' />
      ) : titleInWatchlist ? (
        <>
          <FaCheck /> <span>In your Watchlist</span>
        </>
      ) : (
        <>
          <FaPlus /> <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
};

export default ToggleWatchlistBtn;
