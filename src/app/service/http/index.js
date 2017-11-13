import axios from 'axios';
import {backendBaseUrl} from '../../../../config/private';

export default axios.create({
  baseURL: backendBaseUrl
});
