import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

import { searchTitle } from '../../api';

const useSearchResults = query => {
  return useInfiniteQuery(
    ['searchResults', query],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${searchTitle(query)}&page=${pageParam}`
      );
      return data;
    }
  );
};

export default useSearchResults;
