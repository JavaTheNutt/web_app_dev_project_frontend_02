import namespace from '@/app/util/namespace';

export default namespace('profile',{
  getters: ['getDefaultCountries', 'getDefaultCountryNames'],
  mutations: ['SET_DEFAULT_COUNTRIES', 'RESET_DEFAULT_COUNTRIES', 'ADD_DEFAULT_COUNTRY', 'REMOVE_DEFAULT_COUNTRY']
});
