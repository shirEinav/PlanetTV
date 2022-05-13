import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoApps } from 'react-icons/io5';
import styles from './Watchlist.module.scss';
import { ReactComponent as NoResults } from '../../assets/empty-illustration.svg';
import useAuthContext from '../../hooks/auth/useAuthContext';
import useWatchlistTitles from '../../hooks/react-query/useWatchlistTitles';
import Header from '../../components/Header/Header';
import Container from '../../components/UI/Container/Container';
import Footer from '../../components/Footer/Footer';
import SearchWatchlist from '../../components/Search/SearchWatchlist';
import TitleCard from '../../components/Titles/TitleCard/TitleCard';
import TitleCardSkeleton from '../../components/Titles/TitleCard/TitleCardSkeleton';
import TitleListWrapper from '../../components/Titles/TitleList/TitleListWrapper/TitleListWrapper';
import Button from '../../components/UI/Button/Button';

const Watchlist = () => {
  const { user } = useAuthContext();
  const [query, setQuery] = useState('');

  const { data, isLoading, isFetchedAfterMount, refetch, isRefetching } =
    useWatchlistTitles(user.uid);

  const filterdTitles = data?.filter(item => {
    if (!query) {
      return item;
    } else {
      return item.name.toLowerCase().includes(query.toLowerCase());
    }
  });

  return (
    <>
      <Container isMainContainer>
        <Header navClassName='navbar-filled'>
          <div className={styles.bgWrapper}>
            <Container>
              <h1 className={styles.heading}>Watchlist</h1>
              <SearchWatchlist query={query} setQuery={setQuery} />
            </Container>
          </div>
        </Header>
        <Container>
          <div className={styles.content}>
            {(isLoading || !isFetchedAfterMount) && (
              <TitleListWrapper>
                {[...Array(20)].map((_, i) => (
                  <TitleCardSkeleton key={i} />
                ))}
              </TitleListWrapper>
            )}

            {!isLoading && isFetchedAfterMount && data.length === 0 && (
              <div className={styles.noResults}>
                <NoResults className={styles.illustration} />
                <h2 className={styles.noResultsHeading}>
                  Your watchlist is empty
                </h2>
                <p className={styles.noResultsText}>
                  Keep track of the shows you want to watch by adding them to
                  your watchlist.
                </p>
                <Button btnClasses={['primary']} isLink url='/'>
                  <IoApps /> Browse popular
                </Button>
              </div>
            )}

            {!isLoading &&
              isFetchedAfterMount &&
              filterdTitles.length === 0 &&
              data.length > 0 && (
                <div className={styles.noResults}>
                  <NoResults className={styles.illustration} />
                  <h2 className={styles.noResultsHeading}>No results Found</h2>
                  <p className={styles.noResultsText}>
                    Found no results for your search "{query}" in your watchlist
                  </p>
                </div>
              )}

            {!isLoading && isFetchedAfterMount && filterdTitles.length > 0 && (
              <TitleListWrapper hasLayoutAnimation>
                <AnimatePresence>
                  {filterdTitles.map(item => {
                    return (
                      <motion.div
                        layout
                        key={item.id}
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <TitleCard
                          titleType='watchlist'
                          id={item.id}
                          name={item.name}
                          year={item.year}
                          posterPath={item.posterPath}
                          genresString={item.genres}
                          refetchTitles={refetch}
                          isRefetching={isRefetching}
                        />
                      </motion.div>
                    );
                  })}
                  ;
                </AnimatePresence>
              </TitleListWrapper>
            )}
          </div>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Watchlist;
