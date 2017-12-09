import {addItem, fetchCollection} from '../../service/firestore';
import store from '@/store';
import types from '../vuex/types';
import * as Logger from 'loglevel';

export const fetchDefaultCountries = async () => {
  const user = await fetchCollection('countries');
  if (user.error) return user;
  return user.countries || [];
};
export const setDefaultCountries   = async () => {
  let countries = await fetchDefaultCountries();
  if (countries.error) return countries;
  Logger.info(`countries fetched: ${JSON.stringify(countries)}`);
  countries = mapCountries(countries);
  return store.commit(types.mutations.SET_DEFAULT_COUNTRIES, countries);
};
export const mapCountries          = countries => countries.map(country => country.text);
export const addDefaultCountry     = async country => {
  Logger.info(`add default country triggered for ${country}`);
  const res = await addItem('countries', {text: country});
  return res;
};
export const updateDefaultCountries = newCountries => {

};
