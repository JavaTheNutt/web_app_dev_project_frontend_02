import firebase from 'firebase';
import * as Logger from 'loglevel';
export const passwordLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    Logger.info('login assumed succeeded');
    return true;
  } catch (e) {
    Logger.error(`login failed: ${e}`);
    return false;
  }
};
