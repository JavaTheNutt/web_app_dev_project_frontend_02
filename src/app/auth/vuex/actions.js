import types from './types';
import firebase from 'firebase';
import * as Logger from 'loglevel';
import router from '@/router';

export default {
  [types.actions.registerAuthStateListener]: ({dispatch}) => {
    Logger.info('registering auth state listener');
    firebase.auth().
    onAuthStateChanged(user => dispatch(types.actions.testCurrentAuthState));
  },
  [types.actions.testCurrentAuthState]: ({commit}) => {
    Logger.info('auth state listener triggered');
    const user = firebase.auth().currentUser;
    if (!user) {
      Logger.info('no user logged in to firebase, logging out locally');
      router.push('/');
      return commit(types.mutations.SET_LOGGED_IN, {isLoggedIn: false});
    }
    Logger.info('user logged in to firebase, logging in locally');
    router.push('/profile');
    return commit(types.mutations.SET_LOGGED_IN, {isLoggedIn: true});
  },
  [types.actions.setProviderIds]: ({commit}, {newProviderId, preferredProviderId, credential}) => commit(types.mutations.SET_PROVIDER_IDS, {
    newProviderId,
    preferredProviderId,
    credential
  }),
  [types.actions.resetProviderIds]: ({commit}) => commit(types.mutations.SET_PROVIDER_IDS, {
    newProviderId: '',
    preferredProviderId: '',
    credential: {}
  })
};
