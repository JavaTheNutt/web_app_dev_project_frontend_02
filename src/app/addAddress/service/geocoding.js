import axios from 'axios';
import * as Logger from 'loglevel';

const BASE_GEOCODE_URL            = 'https://maps.googleapis.com/maps/api/geocode/json';
export const fetchGeocodedAddress = async addressDetails => await performFetch(createParams(formatAddress(addressDetails)));
const performFetch                = async params => {
  try {
    const geocodeResult = await axios.get(BASE_GEOCODE_URL, {params});
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
const formatAddress               = ({address01, address02, address03, country}) => {
  Logger.info('attempting to format address');
  Logger.info(`first line: ${address01}`);
  let address = address01 + ', ';
  if (address02 && address02.length > 0) {
    Logger.info(`second line found. Second line: ${address02}`);
    address += address02 + ', ';
  }
  if (address03 && address03.length > 0) {
    Logger.info(`Third line found. Third line: ${address03}`);
    address += address03 + ', ';
  }
  Logger.info(`returning ${address + country}`);
  return `${address}${country}`;
};
