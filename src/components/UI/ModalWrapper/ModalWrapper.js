import React from 'react';
import reactDom from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ModalWrapper.module.scss';

const ModalWrapper = ({
  children,
  isModalOpen,
  setIsModalOpen,
  hasAnimation,
}) => {
  if (hasAnimation) {
    return reactDom.createPortal(
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={styles.overlay}
            onClick={() => setIsModalOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>,
      document.getElementById('portal')
    );
  }
  return reactDom.createPortal(
    <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
      {children}
    </div>,
    document.getElementById('portal')
  );
};

export default ModalWrapper;
