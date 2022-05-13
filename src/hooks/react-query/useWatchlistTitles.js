import { useQuery } from 'react-query';
import { query, where, getDocs, orderBy, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

const useWatchlistTitles = userId => {
  return useQuery(
    'watchlist',
    async () => {
      const watchlistRef = collection(db, 'watchlist');

      const q = query(
        watchlistRef,
        where('userIds', 'array-contains', userId),
        orderBy('name', 'asc')
      );
      const querySnap = await getDocs(q);

      let watchlistTitles = [];

      querySnap.forEach(doc => {
        const { userIds, ...titleData } = doc.data();
        return watchlistTitles.push(titleData);
      });

      return watchlistTitles;
    },
    { enabled: !!userId }
  );
};

export default useWatchlistTitles;
