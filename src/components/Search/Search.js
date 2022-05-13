import React, { useState, useEffect, useRef } from 'react';
import { ImSearch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Search.module.scss';
import ClearInputBtn from './ClearInputBtn/ClearInputBtn';

const Search = ({ type = 'regular', initValue = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const inputRef = useRef();

  useEffect(() => {
    setQuery(initValue);
  }, [initValue]);

  const onChangeHandler = e => {
    setQuery(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form
      className={`${styles.search} ${type === 'top' && styles.searchTop}`}
      role='search'
      onSubmit={onSubmitHandler}
    >
      <div className={styles.wrapper}>
        <label
          htmlFor='search-input'
          id='search-input-label'
          className={styles.visuallyHidden}
        >
          Search a tv show
        </label>
        <input
          id='search-input'
          ref={inputRef}
          className={styles.input}
          type='text'
          placeholder='Search a TV show'
          onChange={onChangeHandler}
          value={query}
          autoComplete='off'
          aria-labelledby='search-input-label'
        />
        <ClearInputBtn query={query} setQuery={setQuery} inputRef={inputRef} />
        <button
          className={styles.searchBtn}
          type='submit'
          id='searchBtn'
          aria-label='Search a tv show'
        >
          <ImSearch />
        </button>
      </div>
    </form>
  );
};

Search.propTypes = {
  type: PropTypes.string,
  initValue: PropTypes.string,
};

export default Search;
