import namespace from '@/app/util/namespace';

export default namespace('auth', {
  getters: ['getLoggedIn', 'getHasProviders', 'getProviders', 'getDisplayName', 'getPhotoUrl', 'getEmail'],
  actions: ['logIn', 'logOut', 'registerAuthStateListener', 'testCurrentAuthState', 'setProviderIds',
    'resetProviderIds', 'setDisplayName', 'resetDisplayName', 'setPhotoUrl', 'resetPhotoUrl', 'setEmail', 'resetEmail','setUser', 'resetUser'],
  mutations: ['SET_LOGGED_IN', 'SET_PROVIDER_IDS', 'SET_DISPLAY_NAME', 'SET_PHOTO_URL', 'SET_EMAIL', 'SET_USER', 'UNSET_USER']
});
