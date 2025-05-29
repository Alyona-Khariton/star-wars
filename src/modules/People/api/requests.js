import axios from '../../Common/api/AxiosInstance';

export const getPeopleList = async () => {
  const response = await axios.get('/people');

  return response.data;
};

export const getPeopleById = async id => {
  const response = await axios.get(`/people/${id}`);

  return response.data;
};
