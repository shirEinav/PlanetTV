import { useQuery } from 'react-query';
import axios from 'axios';
import { genres } from '../../api';

const getGenres = async () => {
  const { data } = await axios.get(genres);
  return data;
};

const useGenres = () => {
  return useQuery('genres', getGenres, {
    staleTime: Infinity,
    useErrorBoundary: false,
  });
};

export default useGenres;
