import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const attemptResetPassword = (email, setEmailSent) => {
    // eslint-disable-next-line
    const validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validEmail = validEmailFormat.test(email);

    validEmail
      ? resetPassword(email, setEmailSent)
      : setError('Please enter a valid email address');
  };

  const resetPassword = async (email, setEmailSent) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);

      setLoading(false);
      setEmailSent(true);
    } catch (error) {
      setLoading(false);
      setEmailSent(false);
      if (error.code === 'auth/user-not-found') {
        setError("We couldn't find an account with that email address");
      } else {
        setError("Couldn't send a reset email... Try again later");
      }
    }
  };

  return { loading, error, attemptResetPassword };
};

export default useResetPassword;
