import axios from 'axios';
import * as Logger from 'loglevel';

const BASE_GEOCODE_URL            = 'https://maps.googleapis.com/maps/api/geocode/json';
export const fetchGeocodedAddress = async addressDetails => await performFetch(createParams(formatAddress(addressDetails)));
const performFetch                = async params => {
  try {
    const geocodeResult = await axios.get(BASE_GEOCODE_URL, params);
    Logger.info('fetch assumed successful');
    return geocodeResult;
  } catch (e) {
    Logger.warn(`error fetching geocode result: ${JSON.stringify(e)}`);
    return {error: e};
  }
};
const createParams                = address => ({
  address,
  key: process.env.MAPS_API_KEY
});
const formatAddress               = ({address1, address2, address3, country}) => {
  Logger.info('attempting to format address');
  Logger.info(`first line: ${address1}`);
  let address = address1 + ', ';
  if (address2 && address2.length > 0) {
    Logger.info(`second line found. Second line: ${address2}`);
    address += address2 + ', ';
  }
  if (address3 && address3.length > 0) {
    Logger.info(`Third line found. Third line: ${address3}`);
    address += address3 + ', ';
  }
  Logger.info(`returning ${address + country}`);
  return `${address}${country}`;
};
