import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.POKE_URL,
});

api.interceptors.response.use(res => {
  return res.data;
});

export default api;
