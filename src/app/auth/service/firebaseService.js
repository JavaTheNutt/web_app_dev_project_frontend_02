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
    Bus.$emit('show_snack', 'Login failed', 'err');
    return false;
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
    Bus.$emit('show_snack', 'Sign up failed', 'err');
    return false;
  }
};
