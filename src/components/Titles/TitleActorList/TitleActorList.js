import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import styles from './TitleActorList.module.scss';
import ActorCard from './ActorCard/ActorCard';

const TitleActorList = ({ actorList }) => {
  return (
    <motion.section
      className={styles.actorsSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.actorsTitle}>Starring</h2>
      <ul className={styles.actorsList}>
        {actorList?.slice(0, 12).map((actor, index) => (
          <ActorCard
            key={index}
            name={actor.name}
            character={actor.character}
            image={actor.profile_path}
          />
        ))}
      </ul>
    </motion.section>
  );
};

TitleActorList.propTypes = {
  actorList: PropTypes.array,
};

export default TitleActorList;
