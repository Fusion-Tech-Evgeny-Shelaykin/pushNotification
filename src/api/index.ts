import axios from 'axios';
import config from '../config';

const poke = axios.create({
  baseURL: config.POKE_URL,
});

export default {
  poke,
};
