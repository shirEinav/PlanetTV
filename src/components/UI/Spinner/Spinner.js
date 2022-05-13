import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Spinner.module.scss';

const Spinner = forwardRef(({ size = '', isCentered }, ref) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.wrapper} ${styles[size]} ${
          isCentered ? styles.centered : ''
        }`}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles.spinner}></div>
      </motion.div>
    </AnimatePresence>
  );
});

export default Spinner;
