import firebase from 'firebase';
import * as Logger from 'loglevel';
import Bus from '@/app/events/bus';
export const passwordLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    Logger.info('login assumed succeeded');
    Bus.$emit('show_snack', 'Login succeeded');
    return true;
  } catch (e) {
    Logger.error(`login failed: ${e}`);
    Bus.$emit('show_snack', 'Login failed');
    return false;
  }
};
