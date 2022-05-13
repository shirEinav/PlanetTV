import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoPerson, IoChevronDown } from 'react-icons/io5';
import PropTypes from 'prop-types';

import styles from './Navbar.module.scss';
import useAuthContext from '../../hooks/auth/useAuthContext';
import useLogout from '../../hooks/auth/useLogout';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import UserAvatar from '../../assets/user-avatar.png';
import Spinner from '../UI/Spinner/Spinner';

const Navbar = ({ navClassName }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user } = useAuthContext();
  const { loading, logout } = useLogout();

  const menuRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (
        userMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [userMenuOpen]);

  const onBlurHandler = () => {
    if (!document.hasFocus()) {
      setUserMenuOpen(false);
    }
  };

  return (
    <div className={styles[navClassName]}>
      <div className={styles.container}>
        <Link
          to='/'
          className={styles.logoLink}
          aria-label='Planet tv logo - link to home page'
        >
          <Logo className={styles.logoImg} alt='PlanetTV logo' />
        </Link>

        {user && (
          <div className={styles.userMenu} ref={menuRef} onBlur={onBlurHandler}>
            <button
              type='button'
              className={styles.userMenuBtn}
              aria-haspopup='true'
              aria-expanded={userMenuOpen}
              aria-label='account menu'
              onClick={() => setUserMenuOpen(prev => !prev)}
            >
              <img src={UserAvatar} alt='' className={styles.userPic} />
              <IoChevronDown
                className={`${styles.iconArrow} ${
                  userMenuOpen && styles.rotate
                }`}
              />
            </button>
            {userMenuOpen && (
              <ul className={styles.userMenuList} role='menu' tabIndex='0'>
                <li
                  className={`${styles.userMenuItem} ${styles.username}`}
                  role='menuitem'
                >
                  {user.displayName}
                </li>
                <li className={styles.divider} role='separator'></li>
                <li>
                  <Link
                    to='/watchlist'
                    className={`${styles.userMenuItem} ${styles.link}`}
                    role='menuitem'
                  >
                    Your watchlist
                  </Link>
                </li>
                <li>
                  <Link
                    to='/account'
                    className={`${styles.userMenuItem} ${styles.link}`}
                    role='menuitem'
                  >
                    Account settings
                  </Link>
                </li>
                <li className={styles.divider} role='separator'></li>
                <li>
                  <button
                    type='button'
                    onClick={logout}
                    className={`${styles.userMenuItem} ${styles.link}`}
                    role='menuitem'
                  >
                    {loading ? <Spinner size='sm' /> : 'Log out'}
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
        {!user && (
          <Link to='/login' className={styles.loginBtn}>
            <IoPerson className={styles.loginIcon} />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  navClassName: PropTypes.string,
};

export default Navbar;
