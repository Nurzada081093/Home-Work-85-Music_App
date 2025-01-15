import axios from 'axios';
import { apiUrl } from './globalConstants.ts';

const axiosRequest = axios.create({
  baseURL: apiUrl,
});

export default axiosRequest;