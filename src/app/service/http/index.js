import axios from 'axios';
import {backendBaseUrl} from '../../../../config/public';
export default axios.create({
  baseURL: backendBaseUrl
});
