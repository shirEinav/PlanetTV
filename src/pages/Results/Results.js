import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Results.module.scss';
import useSearchResults from '../../hooks/react-query/useSearchResults';

import Container from '../../components/UI/Container/Container';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import TitleInfiniteList from '../../components/Titles/TitleList/TitleInfiniteList';
import Footer from '../../components/Footer/Footer';

const Results = () => {
  const [query] = useSearchParams();

  const { data, isLoading, fetchNextPage, hasNextPage } = useSearchResults(
    query.get('q')
  );

  if (data && data.pages[0].results.length === 0) {
    return (
      <>
        <Header navClassName={'navbar-filled'} hasContainer>
          <div className={styles.searchHeader}>
            <Search type='top' initValue={query.get('q')} />
          </div>
          <div className={styles.resultsHeader}>
            <h1 className={`${styles.heading}`}>No results found</h1>
            <p className={styles.text}>
              We couldn't find any results for your search
              <span className={styles.highlighted}>{` ${query.get('q')}`}</span>
            </p>
          </div>
        </Header>
      </>
    );
  }

  return (
    <>
      <Container isMainContainer>
        <Header navClassName={'navbar-filled'} hasContainer>
          <div className={styles.searchHeader}>
            <Search type='top' initValue={query.get('q')} />
          </div>
          <div className={styles.resultsHeader}>
            {data ? (
              <>
                <h1 className={`${styles.heading}`}>{query.get('q')}</h1>
                <p className={styles.text}>
                  {data?.pages[0].total_results} results found for
                  <span className={styles.highlighted}>
                    {` "${query.get('q')}"`}
                  </span>
                </p>
              </>
            ) : (
              <>
                <div
                  className={`${styles.skeleton} ${styles.skeletonHeading}`}
                ></div>
                <div
                  className={`${styles.skeleton} ${styles.skeletonText}`}
                ></div>
              </>
            )}
          </div>
        </Header>
        <Container>
          <TitleInfiniteList
            data={data}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </Container>
      </Container>
      {!hasNextPage && !isLoading && <Footer />}
    </>
  );
};

export default Results;
