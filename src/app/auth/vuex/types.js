import namespace from '@/app/util/namespace';

export default namespace('auth', {
  getters: ['getLoggedIn', 'getHasProviders', 'getProviders'],
  actions: ['logIn', 'logOut', 'registerAuthStateListener', 'testCurrentAuthState', 'setProviderIds', 'resetProviderIds'],
  mutations: ['SET_LOGGED_IN', 'SET_PROVIDER_IDS']
});
