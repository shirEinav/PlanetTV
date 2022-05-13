import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useGenres from '../../../hooks/react-query/useGenres';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import TitleListWrapper from './TitleListWrapper/TitleListWrapper';
import TitleCard from '../TitleCard/TitleCard';
import TitleCardSkeleton from '../TitleCard/TitleCardSkeleton';
import Spinner from '../../UI/Spinner/Spinner';

const TitleInfiniteList = ({ data, isLoading, fetchNextPage, hasNextPage }) => {
  const { data: genreList } = useGenres();

  const loaderRef = useRef();

  useIntersectionObserver({
    rootMargin: '100px',
    target: loaderRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  if (isLoading && !data) {
    return (
      <TitleListWrapper>
        {[...Array(20)].map((_, i) => (
          <TitleCardSkeleton key={i} />
        ))}
      </TitleListWrapper>
    );
  }

  return (
    <>
      {data && genreList && (
        <TitleListWrapper hasAnimation>
          {data.pages.map(page =>
            page.results.map(result => (
              <TitleCard
                key={result.id}
                id={result.id}
                firstAirDate={result.first_air_date}
                name={result.name}
                posterPath={result.poster_path}
                genreIds={result.genre_ids}
                genreList={genreList?.genres}
              />
            ))
          )}
        </TitleListWrapper>
      )}

      {isLoading || (hasNextPage && data.pages.length > 0) ? (
        <Spinner ref={loaderRef} />
      ) : null}
    </>
  );
};

TitleInfiniteList.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  hasNextPage: PropTypes.bool,
};

export default TitleInfiniteList;
