import React from 'react';
import styles from './Container.module.scss';

const Container = ({ children, size = '', isMainContainer }) => {
  if (isMainContainer) {
    return <div className={styles.mainContainer}>{children}</div>;
  }
  return (
    <div className={`${styles.container} ${styles[size]}`}>{children}</div>
  );
};

export default Container;
