import namespace from '@/app/util/namespace';

export default namespace('auth', {
  getters: ['getLoggedIn'],
  actions:['logIn', 'logOut'],
  mutations: ['SET_LOGGED_IN']
});
