import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import authStyles from '../../components/Auth/Auth.module.scss';
import useSignup from '../../hooks/auth/useSignup';

import Container from '../../components/UI/Container/Container';
import AuthHeader from '../../components/Auth/AuthHeader/AuthHeader';
import AuthForm from '../../components/Auth/AuthForm/AuthForm';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Footer from '../../components/Footer/Footer';

const Signup = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, errState: errors, attemptSignup } = useSignup();

  const onSubmitHandler = e => {
    e.preventDefault();
    if (loading) return;
    attemptSignup(emailValue, passwordValue, nameValue);
  };

  return (
    <>
      <Container isMainContainer>
        <Container size='sm'>
          <AuthHeader heading='Sign Up'>
            <p className={authStyles.text}>
              Already have an account?{' '}
              <Link to='/login' className={authStyles.link}>
                Log in now
              </Link>
            </p>
          </AuthHeader>
          <AuthForm
            onSubmitHandler={onSubmitHandler}
            errorMessage={errors.form}
          >
            <Input
              type='text'
              id='signup-name'
              label='Name'
              errorMessage={errors.name}
              value={nameValue}
              setValue={setNameValue}
              maxLength={30}
            />
            <Input
              type='email'
              id='signup-email'
              label='Email'
              errorMessage={errors.email}
              value={emailValue}
              setValue={setEmailValue}
            />
            <Input
              type='password'
              id='login-password'
              label='Password'
              errorMessage={errors.password}
              value={passwordValue}
              setValue={setPasswordValue}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              maxLength={25}
            />
            <Button btnType='submit' btnClasses={['primary', 'full-width']}>
              {loading ? <Spinner size='sm' /> : 'Sign Up'}
            </Button>
          </AuthForm>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Signup;
