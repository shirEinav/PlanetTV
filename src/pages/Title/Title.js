import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Title.module.scss';
import useTitleDetails from '../../hooks/react-query/useTitleDetails';

import Header from '../../components/Header/Header';
import Spinner from '../../components/UI/Spinner/Spinner';
import TitleActorList from '../../components/Titles/TitleActorList/TitleActorList';
import TitleSlider from '../../components/Titles/TitleSlider/TitleSlider';
import TitleTrailerModal from '../../components/Titles/TitleTrailerModal/TitleTrailerModal';
import TitleDetails from '../../components/Titles/TitleDetails/TitleDetails';
import Footer from '../../components/Footer/Footer';

const Title = () => {
  const { id } = useParams();

  const { data, isLoading } = useTitleDetails(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const similarTitles = data?.similarTitles?.slice(0, 12);

  if (isLoading) {
    return (
      <>
        <Header navClassName={'navbar'} />
        <div className={styles.loaderWrapper}>
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      <Header navClassName={'navbar'}>
        {data && <TitleDetails title={data} setIsModalOpen={setIsModalOpen} />}
      </Header>
      {isModalOpen && (
        <TitleTrailerModal
          trailer={data.trailer}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {data && data.actors?.length !== 0 && (
        <TitleActorList actorList={data.actors} />
      )}
      {similarTitles?.length !== 0 && (
        <TitleSlider
          titles={similarTitles}
          totalSlides={
            similarTitles.length <= 4 ? 1 : similarTitles.length <= 8 ? 2 : 3
          }
        />
      )}
      {!isLoading && <Footer />}
    </>
  );
};

export default Title;
