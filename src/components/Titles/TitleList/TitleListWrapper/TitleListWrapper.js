import React from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import styles from './TitleListWrapper.module.scss';

const TitleListWrapper = ({ children, hasAnimation, hasLayoutAnimation }) => {
  if (hasAnimation) {
    return (
      <motion.ul
        className={styles.titles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.ul>
    );
  }
  if (hasLayoutAnimation) {
    return (
      <LayoutGroup>
        <motion.ul
          layout
          className={styles.titles}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          {children}
        </motion.ul>
      </LayoutGroup>
    );
  }
  return <ul className={styles.titles}>{children}</ul>;
};

export default TitleListWrapper;
