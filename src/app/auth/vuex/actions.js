import types from './types';
import firebase from 'firebase';
import * as Logger from 'loglevel';
import * as firebaseService from '../service/firebaseService';

export default {
  [types.actions.registerAuthStateListener]: ({dispatch}) => {
    Logger.info('registering auth state listener');
    firebase.auth().
    onAuthStateChanged(user => dispatch(types.actions.testCurrentAuthState));
  },
  [types.actions.testCurrentAuthState]: ({commit}) => {
    Logger.info('auth state listener triggered');
    return commit(types.mutations.SET_LOGGED_IN, {isLoggedIn: firebaseService.testAuthState(firebase.auth().currentUser)});

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
