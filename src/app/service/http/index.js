import axios from 'axios';
import {backendBaseUrl} from '@/app/config';

export default axios.create({
  baseURL: backendBaseUrl
});
