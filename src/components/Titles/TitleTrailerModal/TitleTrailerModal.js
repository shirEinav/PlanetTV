import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';

import styles from './TitleTrailerModal.module.scss';
import Spinner from '../../UI/Spinner/Spinner';
import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';

const TitleTrailerModal = ({ trailer, setIsModalOpen }) => {
  const [trailerLoaded, setTrailerLoaded] = useState(false);
  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalWrapper setIsModalOpen={setIsModalOpen}>
      <div
        role='dialog'
        aria-label='Trailer'
        aria-modal='true'
        className={styles.modal}
      >
        <button className={styles.closeBtn} onClick={modalCloseHandler}>
          <IoClose />
        </button>
        <div className={styles.trailerResponsive}>
          {!trailerLoaded && (
            <div className={styles.trailerLoading}>
              <Spinner />
            </div>
          )}
          <iframe
            className={styles.trailerIframe}
            width='853'
            height='480'
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?&autoplay=1`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            onLoad={() => setTrailerLoaded(true)}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

TitleTrailerModal.propTypes = {
  trailer: PropTypes.object,
  setIsModalOpen: PropTypes.func,
};

export default TitleTrailerModal;
