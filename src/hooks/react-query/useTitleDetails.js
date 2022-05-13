import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { titleDetailsTMDB, titleDetailsOMDB } from '../../api';

const getTitleDetails = async titleId => {
  const { data: tmdbData } = await axios.get(titleDetailsTMDB(titleId));
  const { data: omdbData } = await axios.get(
    titleDetailsOMDB(tmdbData.external_ids.imdb_id)
  );

  if (tmdbData.success === false) {
    return tmdbData;
  } else {
    return {
      id: tmdbData.id,
      name: tmdbData.name,
      overview: tmdbData.overview,
      year: tmdbData.first_air_date
        ? new Date(tmdbData.first_air_date).getFullYear()
        : '',
      runtime: omdbData.Runtime?.split(' ')[0],
      language: omdbData.Language,
      rottenTomatoesRating: omdbData.Ratings?.find(
        rating => rating.Source === 'Rotten Tomatoes'
      ),
      imdbRating: omdbData.imdbRating,
      backdropPath: tmdbData.backdrop_path,
      posterPath: tmdbData.poster_path,
      genres: tmdbData.genres?.map(g => g.name),
      trailer:
        tmdbData.videos.results?.find(video => video.type === 'Trailer') ||
        tmdbData.videos.results?.find(video => video.type === 'Clip'),
      seasons: tmdbData.number_of_seasons,
      actors: tmdbData.credits.cast,
      creators: tmdbData.created_by?.map(creator => creator.name),
      similarTitles: tmdbData.recommendations.results,
    };
  }
};

const useTitleDetails = titleId => {
  let navigate = useNavigate();
  return useQuery(['title', titleId], () => getTitleDetails(titleId), {
    useErrorBoundary: error => error.response?.status !== 404,
    onSuccess: data => {
      if (data.success === false && data.status_code === 6)
        navigate('/notfound');
    },
    onError: error => {
      if (error.response?.status === 404) navigate('/notfound');
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 404) {
        return failureCount === 1 ? false : true;
      } else {
        return failureCount === 3 ? false : true;
      }
    },
  });
};

export default useTitleDetails;
