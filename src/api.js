const baseUrl = 'https://api.themoviedb.org/3/';
const API_KEY_TMDB = process.env.REACT_APP_TMDB_API_KEY;
const API_KEY_OMDB = process.env.REACT_APP_OMDB_API_KEY;

const genres = `${baseUrl}genre/tv/list?api_key=${API_KEY_TMDB}&language=en-US`;

const posterUrl = posterPath => `http://image.tmdb.org/t/p/w342${posterPath}`;
const backdropUrl = backdropPath =>
  `http://image.tmdb.org/t/p/w780${backdropPath}`;
const actorImgUrl = imagePath => `https://image.tmdb.org/t/p/w185${imagePath}`;

const popularTitles = `${baseUrl}tv/popular?api_key=${API_KEY_TMDB}&language=en-US`;
const titlesByGenre = genreId =>
  `${baseUrl}discover/tv?api_key=${API_KEY_TMDB}&language=en-US&sort_by=vote_count.desc&with_genres=${genreId}`;
const searchTitle = query =>
  `${baseUrl}search/tv?api_key=${API_KEY_TMDB}&language=en-US&query=${query}`;

const titleDetailsTMDB = id =>
  `${baseUrl}tv/${id}?api_key=${API_KEY_TMDB}&append_to_response=videos,credits,recommendations,external_ids`;
const titleDetailsOMDB = id =>
  `https://www.omdbapi.com/?apikey=${API_KEY_OMDB}&i=${id}`;

export {
  genres,
  posterUrl,
  backdropUrl,
  actorImgUrl,
  popularTitles,
  titlesByGenre,
  searchTitle,
  titleDetailsTMDB,
  titleDetailsOMDB,
};
