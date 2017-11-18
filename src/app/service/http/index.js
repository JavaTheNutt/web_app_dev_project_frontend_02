import axios from 'axios';
const config = require('../../../../config/public');
//import {backendBaseUrl} from '../../../../config/public';

export default axios.create({
  baseURL: config.backendBaseUrl
});
