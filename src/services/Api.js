import axios from 'axios';

export const getItems = (query, page) => {
  const key = '15538572-d05d000357c1b063d561e0ca7';
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(url);
};

