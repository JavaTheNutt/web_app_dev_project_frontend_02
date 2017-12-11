import types from './types';
import * as Logger from 'loglevel';
export default {
  [types.mutations.SET_DEFAULT_COUNTRIES]:(state, {defaultCountries}) => state.defaultCountries = defaultCountries,
  [types.mutations.RESET_DEFAULT_COUNTRIES]: state => state.defaultCountries = [],
  [types.mutations.ADD_DEFAULT_COUNTRY]: (state, {country}) => {
    Logger.info(`current default countries: ${state.defaultCountries}`);
    if(!state.defaultCountries) state.defaultCountries = [];
    if(state.defaultCountries.findIndex(defaultCountry => country.text === defaultCountry.text) === -1) state.defaultCountries.push(country);
  },
  [types.mutations.REMOVE_DEFAULT_COUNTRY]: (state, {countryId}) => state.defaultCountries = state.defaultCountries.filter(defaultCountry => {
    Logger.info(`testing if ${defaultCountry.id} is equal to ${countryId}`);
    return defaultCountry.id !== countryId;
  })
};
