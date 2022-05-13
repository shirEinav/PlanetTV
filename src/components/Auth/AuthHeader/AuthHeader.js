import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './AuthHeader.module.scss';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

const AuthHeader = ({ children, heading }) => {
  return (
    <>
      <header>
        <div className={styles.logoWrapper}>
          <Link
            to='/'
            className={styles.logo}
            aria-label='Planet tv logo - link to home page'
          >
            <Logo alt='PlanetTV logo' />
          </Link>
        </div>

        <h1 className={styles.heading}>{heading}</h1>
        {children}
      </header>
    </>
  );
};

AuthHeader.propTypes = {
  heading: PropTypes.string,
};

export default AuthHeader;
