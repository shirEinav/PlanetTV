import React, { useState } from 'react';
import styles from './ResetPassword.module.scss';
import useResetPassword from '../../hooks/auth/useResetPassword';
import Container from '../../components/UI/Container/Container';
import AuthForm from '../../components/Auth/AuthForm/AuthForm';
import AuthHeader from '../../components/Auth/AuthHeader/AuthHeader';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Footer from '../../components/Footer/Footer';

const ResetPassword = () => {
  const [emailValue, setEmailValue] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const { loading, error, attemptResetPassword } = useResetPassword();

  const onSubmitHandler = e => {
    e.preventDefault();
    if (loading) return;
    attemptResetPassword(emailValue, setEmailSent);
  };

  return (
    <>
      <Container isMainContainer>
        <Container size='sm'>
          <AuthHeader heading={!emailSent ? 'Reset Password' : 'Email Sent!'}>
            {!emailSent && (
              <p>
                Enter the email address you used when you joined and we'll send
                you a link to reset your password
              </p>
            )}
            {emailSent && (
              <>
                <p className={styles.resetInstructions}>
                  An email has been sent to{' '}
                  <span className={styles.bold}>{emailValue}</span>. Check your
                  inbox and use the reset link to create your new password.
                </p>
                <Button
                  btnClasses={['primary', 'full-width']}
                  isLink
                  url='/login'
                >
                  Done
                </Button>
              </>
            )}
          </AuthHeader>
          {!emailSent && (
            <AuthForm type='Reset Password' onSubmitHandler={onSubmitHandler}>
              <Input
                type='email'
                id='login-email'
                label='Email'
                value={emailValue}
                setValue={setEmailValue}
                errorMessage={error}
              />
              <Button btnType='submit' btnClasses={['primary', 'full-width']}>
                {loading ? <Spinner size='sm' /> : 'Email Me'}
              </Button>
            </AuthForm>
          )}
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default ResetPassword;
