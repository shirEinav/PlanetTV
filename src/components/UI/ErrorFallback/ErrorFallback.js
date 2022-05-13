import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../Header/Header';
import Error from '../Error/Error';

const ErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <>
      <Header navClassName='navbar' />
      <Error
        heading='Oh no! Something went wrong...'
        message='It Looks like something went wrong... Please try again.'
        resetErrorBoundary={resetErrorBoundary}
      />
    </>
  );
};

Error.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
  hasButton: PropTypes.bool,
};

export default ErrorFallback;
