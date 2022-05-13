import React from 'react';
import styles from './TitleCard.module.scss';

const TitleCardSkeleton = () => {
  return <li aria-hidden={true} className={styles.skeleton}></li>;
};

export default TitleCardSkeleton;
