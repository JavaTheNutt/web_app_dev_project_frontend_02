import types from './types';
export default {
  [types.mutations.SET_DEFAULT_COUNTRIES]:(state, {defaultCountries}) => state.defaultCountries = defaultCountries
};
