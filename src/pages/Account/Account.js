import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import styles from './Account.module.scss';
import useAuthContext from '../../hooks/auth/useAuthContext';
import useUpdateAccount from '../../hooks/auth/useUpdateAccount';
import useDeleteAccount from '../../hooks/auth/useDeleteAccount';
import Header from '../../components/Header/Header';
import Container from '../../components/UI/Container/Container';
import Footer from '../../components/Footer/Footer';
import AuthForm from '../../components/Auth/AuthForm/AuthForm';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import ModalWrapper from '../../components/UI/ModalWrapper/ModalWrapper';

const Account = () => {
  const { user } = useAuthContext();

  const [nameValue, setNameValue] = useState(user.displayName);
  const [emailValue, setEmailValue] = useState(user.email);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { loading: deleteLoading, deleteAccount } = useDeleteAccount();
  const {
    loading: updateLoading,
    error: updateError,
    success,
    setSuccess,
    attemptUpdateAccount,
  } = useUpdateAccount();

  const onSaveChangesHandler = e => {
    e.preventDefault();
    if (updateLoading) return;
    attemptUpdateAccount(emailValue, nameValue);
  };

  return (
    <>
      <Container isMainContainer>
        <Header navClassName='navbar-filled'>
          <div className={styles.bgWrapper}>
            <Container>
              <h1 className={styles.heading}>Account</h1>
            </Container>
          </div>
        </Header>
        <Container size='sm'>
          <AuthForm
            onSubmitHandler={onSaveChangesHandler}
            errorMessage={updateError.message}
          >
            <AnimatePresence>
              {success && (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  role='alert'
                  className={styles.success}
                >
                  <FaCheck />
                  Changes saved!
                </motion.div>
              )}
            </AnimatePresence>
            <Input
              type='text'
              id='account-name'
              label='Name'
              value={nameValue}
              setValue={setNameValue}
              maxLength={30}
              isError={updateError.input === 'name'}
              onChange={() => setSuccess(false)}
            />
            <Input
              type='email'
              id='account-email'
              label='Email'
              value={emailValue}
              setValue={setEmailValue}
              isError={updateError.input === 'email'}
              onChange={() => setSuccess(false)}
            />
            <div className={styles.btnWrapper}>
              <Button btnType='submit' btnClasses={['primary', 'full-width']}>
                {updateLoading ? <Spinner size='sm' /> : 'Save changes'}
              </Button>
              <Button
                btnClasses={['outline', 'full-width']}
                onClickHandler={() => setDeleteModalOpen(true)}
              >
                {deleteLoading ? <Spinner size='sm' /> : 'Delete account'}
              </Button>
            </div>
          </AuthForm>

          <ModalWrapper
            setIsModalOpen={setDeleteModalOpen}
            isModalOpen={deleteModalOpen}
            hasAnimation
          >
            <div
              className={styles.modal}
              role='dialog'
              aria-labelledby='model-title'
              aria-modal='true'
            >
              <button
                type='button'
                className={styles.closeBtn}
                onClick={() => setDeleteModalOpen(false)}
              >
                <IoClose />
              </button>
              <h2 id='model-title' className={styles.modalHeading}>
                Are you sure you want to delete your account?
              </h2>
              <p className={styles.modalText}>
                Deleting your account is irreversible. You will be unable to
                access your account immediately.
              </p>
              <div className={styles.modalBtnWrapper}>
                <Button
                  btnClasses={['primary', 'full-width']}
                  onClickHandler={deleteAccount}
                >
                  Delete account
                </Button>
                <Button
                  btnClasses={['outline', 'full-width']}
                  onClickHandler={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ModalWrapper>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Account;
