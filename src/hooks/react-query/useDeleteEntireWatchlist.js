import { useMutation } from 'react-query';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const deleteEntireWatchlist = async ({ titles, uid }) => {
  titles.forEach(async title => {
    const docRef = doc(db, 'watchlist', title.id.toString());
    const docSnap = await getDoc(docRef);

    const titleData = docSnap.data();
    const userIds = titleData.userIds;

    if (userIds.length === 1) {
      await deleteDoc(docRef);
    } else {
      console.log(uid);
      const updatedUserIds = userIds.filter(id => id !== uid);
      await setDoc(docRef, {
        ...titleData,
        userIds: updatedUserIds,
      });
    }
  });
};

const useDeleteEntireWatchlist = () => {
  return useMutation(deleteEntireWatchlist);
};

export default useDeleteEntireWatchlist;
