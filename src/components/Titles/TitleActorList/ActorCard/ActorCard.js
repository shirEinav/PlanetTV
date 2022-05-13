import React from 'react';
import { ImUser } from 'react-icons/im';
import PropTypes from 'prop-types';

import styles from './ActorCard.module.scss';
import { actorImgUrl } from '../../../../api';

const ActorCard = ({ name, character, image }) => {
  return (
    <li className={styles.actorsItem}>
      {image ? (
        <img
          className={styles.img}
          src={actorImgUrl(image)}
          alt={name}
          loading='lazy'
        />
      ) : (
        <div className={styles.noImg}>
          <ImUser />
        </div>
      )}
      <div>
        <h3 className={styles.name}>{name}</h3>
        {character && <p className={styles.character}>as {character}</p>}
      </div>
    </li>
  );
};

ActorCard.propTypes = {
  actorData: PropTypes.object,
};

export default ActorCard;
