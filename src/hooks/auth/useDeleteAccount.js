import { useState } from 'react';
import { deleteUser } from 'firebase/auth';
import { auth } from '../../firebase/config';
import useAuthContext from './useAuthContext';
import useDeleteEntireWatchlist from '../react-query/useDeleteEntireWatchlist';
import useWatchlistTitles from '../react-query/useWatchlistTitles';
import useLogout from './useLogout';

const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);

  const { dispatch, user: contextUser } = useAuthContext();
  const { logout } = useLogout();
  const { mutateAsync: deleteWatchlist } = useDeleteEntireWatchlist();
  const { data: titles } = useWatchlistTitles(contextUser.uid);

  const deleteAccount = async () => {
    setLoading(true);
    try {
      if (!titles) return;

      await deleteUser(auth.currentUser);
      await deleteWatchlist({ titles: titles, uid: contextUser.uid });
      dispatch({ type: 'LOGOUT' });

      setLoading(false);
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        logout();
      }
      console.log(error.code);
      setLoading(false);
    }
  };

  return { loading, deleteAccount };
};

export default useDeleteAccount;
