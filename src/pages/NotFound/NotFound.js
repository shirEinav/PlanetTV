import React from 'react';
import Error from '../../components/UI/Error/Error';
import Header from '../../components/Header/Header';

const NotFound = () => {
  return (
    <>
      <Header navClassName='navbar' />
      <Error
        heading='Oops! Page not found...'
        message='The page you are trying to access does not exist'
        errorStatus='404'
      />
    </>
  );
};

export default NotFound;
