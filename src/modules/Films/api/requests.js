import axios from '../../Common/api/AxiosInstance';

export const getFilmsList = async () => {
  const response = await axios.get('/films');

  return response.data;
};

export const getFilmById = async id => {
  const response = await axios.get(`/films/${id}`);

  return response.data;
};
