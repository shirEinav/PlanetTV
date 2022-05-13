import React from 'react';
import { ImGithub } from 'react-icons/im';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href='https://github.com/shirEinav/PlanetTV'
        className={styles.footerLink}
        target='_blank'
        rel='noreferrer'
      >
        <ImGithub />
        <p>Built by Shir Einav</p>
      </a>
    </footer>
  );
};

export default Footer;
