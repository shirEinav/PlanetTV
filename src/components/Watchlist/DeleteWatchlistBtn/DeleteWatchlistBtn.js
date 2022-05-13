import React from 'react';
import { MdBookmarkRemove } from 'react-icons/md';
import styles from './DeleteWatchlistBtn.module.scss';
import useAuthContext from '../../../hooks/auth/useAuthContext';
import useDeleteWatchlist from '../../../hooks/react-query/useDeleteWatchlist';
import Spinner from '../../UI/Spinner/Spinner';

const DeleteWatchlistBtn = ({
  id,
  name,
  year,
  genres,
  posterPath,
  refetchTitles,
  isRefetching,
}) => {
  const { user } = useAuthContext();
  const { mutateAsync, isLoading } = useDeleteWatchlist();

  const watchlistClickHandler = () => {
    if (isLoading || isRefetching) return;

    const titleData = {
      uid: user.uid,
      id: id,
      name: name,
      year: year,
      genres: genres,
      posterPath: posterPath,
    };

    mutateAsync(titleData).then(() => refetchTitles());
  };

  return (
    <button
      type='button'
      className={styles.btn}
      onClick={watchlistClickHandler}
    >
      {isLoading || isRefetching ? <Spinner size='sm' /> : <MdBookmarkRemove />}
    </button>
  );
};

export default DeleteWatchlistBtn;
