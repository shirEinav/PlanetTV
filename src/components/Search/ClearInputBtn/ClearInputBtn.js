import React from 'react';
import { IoClose } from 'react-icons/io5';
import styles from './ClearInputBtn.module.scss';

const ClearInputBtn = ({ query, setQuery, inputRef }) => {
  const onClearInputHandler = () => {
    setQuery('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.clearBtn}
        style={{
          visibility: query ? 'visible' : 'hidden',
          opacity: query ? '1' : '0',
        }}
        type='button'
        aria-label='Clear Input'
        onClick={onClearInputHandler}
      >
        <IoClose />
      </button>
    </div>
  );
};

export default ClearInputBtn;
