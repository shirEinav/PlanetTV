import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

import { popularTitles, titlesByGenre } from '../../api';

const useHomeTitles = titlesType => {
  const popularTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`${popularTitles}&page=${pageParam}`);
      return data;
    },
    { enabled: titlesType === 'popular' }
  );

  const dramaTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('18')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'drama' }
  );

  const comedyTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('35')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'comedy' }
  );

  const crimeTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('80')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'crime' }
  );

  const actionTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('10759')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'action' }
  );

  const fantasyTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('10765')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'fantasy' }
  );

  const mysteryTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('9648')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'mystery' }
  );

  const animTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('16')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'animation' }
  );

  const kidsTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('10762')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'kids' }
  );

  const realityTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('10764')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'reality' }
  );

  const docTitlesQuery = useInfiniteQuery(
    ['homeTitles', titlesType],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${titlesByGenre('99')}&page=${pageParam}`
      );
      return data;
    },
    { enabled: titlesType === 'documentary' }
  );

  switch (titlesType) {
    case 'popular':
      return popularTitlesQuery;
    case 'drama':
      return dramaTitlesQuery;
    case 'comedy':
      return comedyTitlesQuery;
    case 'crime':
      return crimeTitlesQuery;
    case 'action':
      return actionTitlesQuery;
    case 'fantasy':
      return fantasyTitlesQuery;
    case 'mystery':
      return mysteryTitlesQuery;
    case 'animation':
      return animTitlesQuery;
    case 'kids':
      return kidsTitlesQuery;
    case 'reality':
      return realityTitlesQuery;
    case 'documentary':
      return docTitlesQuery;
    default:
      return {
        data: 'not found',
        isLoading: null,
        fetchNextPage: null,
        hasNextPage: null,
      };
  }
};

export default useHomeTitles;
