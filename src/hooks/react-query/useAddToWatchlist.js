import { useMutation } from 'react-query';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const addToWatchlist = async title => {
  const { uid, ...titleData } = title;

  const docRef = doc(db, 'watchlist', titleData.id.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const updatedUserIds = data.userIds.includes(uid)
      ? data.userIds
      : [...data.userIds, uid];
    await setDoc(doc(db, 'watchlist', titleData.id.toString()), {
      ...titleData,
      userIds: updatedUserIds,
    });
  } else {
    await setDoc(doc(db, 'watchlist', titleData.id.toString()), {
      ...titleData,
      userIds: [title.uid],
    });
  }
};

const useAddToWatchlist = () => {
  return useMutation(addToWatchlist);
};

export default useAddToWatchlist;
