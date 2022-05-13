import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';
import useHomeTitles from '../../hooks/react-query/useHomeTitles';
import Container from '../../components/UI/Container/Container';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import TitleInfiniteList from '../../components/Titles/TitleList/TitleInfiniteList';
import TitleTabs from '../../components/Titles/TitleTabs/TitleTabs';

const Home = () => {
  const navigate = useNavigate();
  const [filter] = useSearchParams();

  const [currentTitles, setCurrentTitles] = useState(
    filter.get('genre') || 'popular'
  );

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useHomeTitles(currentTitles);

  useEffect(() => {
    data === 'not found' && navigate('/notfound');
  }, [data, navigate]);

  return (
    <>
      <Header navClassName={'navbar'} hasContainer>
        <div className={styles.hero}>
          <h1 className={styles.title}>Find new TV shows to watch</h1>
          <p className={styles.text}>
            PlanetTV helps you find the perfect TV shows for you!
          </p>
          <Search />
        </div>
      </Header>
      <TitleTabs
        currentTitles={currentTitles}
        setCurrentTitles={setCurrentTitles}
      >
        {data !== 'not found' && (
          <Container>
            <TitleInfiniteList
              key={currentTitles}
              data={data}
              isLoading={isLoading}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          </Container>
        )}
      </TitleTabs>
    </>
  );
};

export default Home;
