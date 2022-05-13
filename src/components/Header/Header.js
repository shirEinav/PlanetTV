import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import Container from '../UI/Container/Container';

const Header = ({ children, navClassName, hasContainer }) => {
  return (
    <header>
      <Navbar navClassName={navClassName} />
      {hasContainer ? <Container>{children}</Container> : children}
    </header>
  );
};

Header.propTypes = {
  navClassName: PropTypes.string,
};

export default Header;
