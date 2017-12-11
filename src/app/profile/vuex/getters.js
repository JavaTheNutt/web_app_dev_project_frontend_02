import types from './types';

export default {
  [types.getters.getDefaultCountries]: state => state.defaultCountries,
  [types.getters.getDefaultCountryNames]: state => state.defaultCountries.map(country => country.text)
};
