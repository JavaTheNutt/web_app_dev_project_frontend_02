import {addItem, fetchCollection, removeItem} from '../../service/firestore';
import store from '@/store';
import types from '../vuex/types';
import * as Logger from 'loglevel';
import {firestore} from 'firebase';
import {getCurrentUserId} from '../../auth/service/firebaseService';

// eslint-disable-next-line arrow-body-style
export const fetchDefaultCountries2 = () => {
// eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    const userId = getCurrentUserId();
    if(userId.error) return userId;
    Logger.info(`fetching record for ${userId}`);
    const userRef = firestore().collection('users').doc(userId);
    userRef.get().then(user => {
      if(!user.exists) return resolve({error: 'user does not exist'});
      Logger.info(`user exists: ${JSON.stringify(user.data())}`);
      Logger.info(`user id: ${user.id}`);
      return resolve(user.data().countries);
    });
  });
};
export const fetchDefaultCountries = async () => {
  try {
    const userId = getCurrentUserId();
    if(userId.error) return userId;
    Logger.info(`fetching record for ${userId}`);
    const userRef = firestore().doc(`users/${userId}`).collection('countries');
    const user = await userRef.get();

    const collection = [];
    user.forEach(snapshot => {
      Logger.info(`iterating through collection: ${snapshot.id} => ${JSON.stringify(snapshot.data())}`);
      collection.push(Object.assign({id: snapshot.id}, snapshot.data()));
    });
    /*Logger.info(`user exists: ${JSON.stringify(user.data())}`);
    Logger.info(`user id: ${user.id}`);*/
    return collection;
  }catch(err){
    Logger.warn(`error fetching default countries: ${err}`);
    return {error: err};
  }
};
export const setDefaultCountries   = async () => {
  const countries = await fetchDefaultCountries();
  if (countries.error) return countries;
  Logger.info(`countries fetched: ${JSON.stringify(countries)}`);
  return store.commit(types.mutations.SET_DEFAULT_COUNTRIES, {defaultCountries: countries});
};
export const mapCountries          = countries => countries.map(country => country.text);
export const addDefaultCountry     = async country => {
  Logger.info(`add default country triggered for ${country}`);
  const res = await addItem('countries', {text: country});
  if(!res.error) {
    Logger.info(`item added successfully, data: ${JSON.stringify(res.data)}`);
    store.commit(types.mutations.ADD_DEFAULT_COUNTRY, {country: res.data});
  }
  return res;
};
export const removeDefaultCountry = async countryId => {
  Logger.info(`attempting to remove default country ${countryId}`);
  const res = await removeItem('countries', countryId);
  if(!res.error){
    Logger.info('country assumed removed successfully');
    store.commit(types.mutations.REMOVE_DEFAULT_COUNTRY, {countryId});
  }
  return res;
};
export const updateDefaultCountries = async newCountries => {
  const oldCountries = Object.assign([], store.getters[types.getters.getDefaultCountries]);
  const countriesToBeRemoved = oldCountries.filter(country => newCountries.indexOf(country.text) === -1);
  Logger.info(`countries to be removed: ${JSON.stringify(countriesToBeRemoved)}`);
  if(countriesToBeRemoved.length > 0){
    Logger.info('there are countries to be removed');
    for (const country of countriesToBeRemoved){
      Logger.info(`attempting to remove country: ${JSON.stringify(country)}`);
      const result = await removeDefaultCountry(country.id);
      Logger.info(`result of removal is ${result}`);
    }
  }
  const countriesToBeAdded = newCountries.filter(country => oldCountries.map(elem => elem.text).indexOf(country) === -1);
  Logger.info(`countries to be added: ${countriesToBeAdded}`);
  if(countriesToBeAdded.length > 0){
    Logger.info('there are countries to be added');
    for(const country of countriesToBeAdded){
      const result = await addDefaultCountry(country);
      Logger.info(`result is ${JSON.stringify(result)}`);
    }
  }
};
