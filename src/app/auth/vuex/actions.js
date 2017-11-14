import types from './types';
import firebase from 'firebase';

export default {
  [types.actions.registerAuthStateListener]: ({dispatch}) => {
    firebase.auth().
    onAuthStateChanged(user => dispatch(types.actions.testCurrentAuthState));
  },
  [types.actions.testCurrentAuthState]: ({commit}) => {
    const user = firebase.auth().currentUser;
    if(user){
      return commit(types.mutations.SET_LOGGED_IN, {isLoggedIn:true});
    }
    return commit(types.mutations.SET_LOGGED_IN, {isLoggedIn: false});
  }
};
