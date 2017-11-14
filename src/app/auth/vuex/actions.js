import types from './types';
import firebase from 'firebase';
import * as Logger from 'loglevel';

export default {
  [types.actions.registerAuthStateListener]: ({dispatch}) => {
    Logger.info('registering auth state listener');
    firebase.auth().
    onAuthStateChanged(user => dispatch(types.actions.testCurrentAuthState));
  },
  [types.actions.testCurrentAuthState]: ({commit}) => {
    Logger.info('auth state listener triggered');
    const user = firebase.auth().currentUser;
    if (user) {
      Logger.info('no user logged in to firebase, logging out locally');
      return commit(types.mutations.SET_LOGGED_IN, {isLoggedIn: true});
    }
    Logger.info('user logged in to firebase, logging in locally');
    return commit(types.mutations.SET_LOGGED_IN, {isLoggedIn: false});
  }
};
