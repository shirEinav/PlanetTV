import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = props => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/filters') return;
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
