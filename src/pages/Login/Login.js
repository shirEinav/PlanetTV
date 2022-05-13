import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';
import authStyles from '../../components/Auth/Auth.module.scss';
import { ReactComponent as GoogleLogo } from '../../assets/google-logo.svg';

import useLogin from '../../hooks/auth/useLogin';
import useGoogleOAuth from '../../hooks/auth/useGoogleOAuth';

import Container from '../../components/UI/Container/Container';
import AuthHeader from '../../components/Auth/AuthHeader/AuthHeader';
import AuthForm from '../../components/Auth/AuthForm/AuthForm';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Footer from '../../components/Footer/Footer';

const Login = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, errState: errors, attemptLogin } = useLogin();
  const { loading: googleLoading, googleLogin } = useGoogleOAuth();

  const onSubmitHandler = e => {
    e.preventDefault();
    if (loading) return;
    attemptLogin(emailValue, passwordValue);
  };

  return (
    <>
      <Container isMainContainer>
        <Container size='sm'>
          <AuthHeader heading='Log In'>
            <p className={authStyles.text}>
              New to Planet TV?{' '}
              <Link to='/signup' className={authStyles.link}>
                Sign up now
              </Link>
            </p>
          </AuthHeader>
          <AuthForm
            onSubmitHandler={onSubmitHandler}
            errorMessage={errors.form}
          >
            <Input
              type='email'
              id='login-email'
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
            />
            <Button btnType='submit' btnClasses={['primary', 'full-width']}>
              {loading ? <Spinner size='sm' /> : 'Log In'}
            </Button>
            <Link to='/reset-password' className={authStyles.link}>
              Forgot password?
            </Link>
          </AuthForm>
          <p className={styles.separator}>or</p>
          <button className={styles.googleBtn} onClick={googleLogin}>
            {googleLoading ? (
              <Spinner size='sm' />
            ) : (
              <>
                <GoogleLogo className={styles.googleLogo} /> Continue with
                Google
              </>
            )}
          </button>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
