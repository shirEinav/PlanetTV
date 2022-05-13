import { useMutation } from 'react-query';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const deleteFromWatchlist = async title => {
  const { uid, ...titleData } = title;

  const docRef = doc(db, 'watchlist', titleData.id.toString());
  const docSnap = await getDoc(docRef);

  const userIds = docSnap.data().userIds;

  if (userIds.length === 1) {
    await deleteDoc(docRef);
  } else {
    const updatedUserIds = userIds.filter(id => id !== uid);
    await setDoc(docRef, {
      ...titleData,
      userIds: updatedUserIds,
    });
  }
};

const useDeleteWatchlist = () => {
  return useMutation(deleteFromWatchlist);
};

export default useDeleteWatchlist;
