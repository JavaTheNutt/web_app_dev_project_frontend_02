import namespace from '@/app/util/namespace';

export default namespace('auth', {
  getters: ['getLoggedIn', 'getHasProviders', 'getProviders', 'getDisplayName', 'getPhotoUrl'],
  actions: ['logIn', 'logOut', 'registerAuthStateListener', 'testCurrentAuthState', 'setProviderIds',
    'resetProviderIds', 'setDisplayName', 'resetDisplayName', 'setPhotoUrl', 'resetPhotoUrl'],
  mutations: ['SET_LOGGED_IN', 'SET_PROVIDER_IDS', 'SET_DISPLAY_NAME', 'SET_PHOTO_URL']
});
