import React, { useRef } from 'react';
import { ImSearch } from 'react-icons/im';
import ClearInputBtn from './ClearInputBtn/ClearInputBtn';
import styles from './Search.module.scss';

const SearchWatchlist = ({ query, setQuery }) => {
  const inputRef = useRef();

  const onChangeHandler = e => {
    setQuery(e.target.value);
  };

  return (
    <form
      className={`${styles.search} ${styles.searchWatchlist}`}
      role='search'
      onSubmit={e => e.preventDefault()}
    >
      <div className={styles.wrapper}>
        <span className={styles.searchIcon}>
          <ImSearch />
        </span>
        <label
          htmlFor='search-input'
          id='search-input-label'
          className={styles.visuallyHidden}
        >
          Search watchlist
        </label>
        <input
          id='search-input'
          ref={inputRef}
          className={styles.inputWatchlist}
          type='text'
          placeholder='Search watchlist'
          onChange={onChangeHandler}
          value={query}
          autoComplete='off'
          aria-labelledby='search-input-label'
        />
        <ClearInputBtn query={query} setQuery={setQuery} inputRef={inputRef} />
      </div>
    </form>
  );
};

export default SearchWatchlist;
