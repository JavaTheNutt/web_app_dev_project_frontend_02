import types from './types';
import * as Logger from 'loglevel';
export default {
  [types.mutations.SET_DEFAULT_COUNTRIES]:(state, {defaultCountries}) => state.defaultCountries = defaultCountries,
  [types.mutations.RESET_DEFAULT_COUNTRIES]: state => state.defaultCountries = [],
  [types.mutations.ADD_DEFAULT_COUNTRY]: (state, {country}) => {
    Logger.info(`current default countries: ${state.defaultCountries}`);
    if(!state.defaultCountries) state.defaultCountries = [];
    state.defaultCountries.push(country);
  },
  [types.mutations.REMOVE_DEFAULT_COUNTRY]: (state, {country}) => state.defaultCountries = state.defaultCountries.filter(defaultCountry => defaultCountry !== country)
};
