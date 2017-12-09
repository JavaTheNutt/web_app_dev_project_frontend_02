import {fetchDoc} from '../../service/firestore';
import store from '@/store';
import types from '../vuex/types';
import * as Logger from 'loglevel';
export const fetchDefaultCountries = async() => {
  const user = await fetchDoc();
  if(user.error) return user;
  return user.countries || [];
};
export const setDefaultCountries =  async () => {
  const countries = await fetchDefaultCountries();
  if(countries.error) return countries;
  Logger.info(`countries fetched: ${JSON.stringify(countries)}`);
  return store.commit(types.mutations.SET_DEFAULT_COUNTRIES, countries);
};
export const addDefaultCountry = country => {

};
