import firebase from 'firebase';
import * as Logger from 'loglevel';
import Bus from '@/app/events/bus';

export const passwordLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    Logger.info('login assumed succeeded');
    Bus.$emit('hide_login');
    Bus.$emit('show_snack', 'Login succeeded', 'success');
    return true;
  } catch (e) {
    Logger.error(`login failed: ${e}`);
    return {error: {message: handleFirebaseError(e.code)}};
  }
};
export const logOut        = () => firebase.auth().signOut();

export const signUpWithEmailPassword = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    Logger.info('sign up assumed successful');
    Bus.$emit('hide_login');
    Bus.$emit('show_snack', 'Sign up succeeded', 'success');
    return true;
  } catch (err) {
    Logger.error(`error while signing up, ${err}`);
    //Bus.$emit('show_snack', handleFirebaseError(err.code), 'err');
    return {error: {message: handleFirebaseError(err.code)}};
  }
};
export const handleFirebaseError     = errCode => {
  switch (errCode) {
  case 'auth/user-not-found':
    return 'Email is not registered on the system';
    break;
  case 'auth/wrong-password':
    return 'Password is incorrect';
    break;
  case 'auth/email-already-in-use':
    return 'The specified email address is already in use';
    break;
  case 'auth/invalid-email':
    return 'The specified email address is invalid';
    break;
  case 'auth/weak-password':
    return 'The specified password is too weak';
    break;
  default:
    return 'An unknown error has occurred';
  }
};
