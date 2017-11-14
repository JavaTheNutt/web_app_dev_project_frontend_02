import namespace from '@/app/util/namespace';

export default namespace('auth', {
  getters: ['getLoggedIn'],
  actions:['logIn', 'logOut', 'registerAuthStateListener', 'testCurrentAuthState'],
  mutations: ['SET_LOGGED_IN']
});
