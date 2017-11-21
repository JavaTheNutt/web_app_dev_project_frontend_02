import firebase from 'firebase';
import * as Logger from 'loglevel';
import Bus from '@/app/events/bus';


const googleProvider   = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

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

export const signUpWithEmailPassword      = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    Logger.info('sign up assumed successful');
    Bus.$emit('hide_login');
    Bus.$emit('show_snack', 'Sign up succeeded', 'success');
    return true;
  } catch (err) {
    Logger.error(`error while signing up, ${err}`);
    return {error: {message: handleFirebaseError(err.code)}};
  }
};
export const signinWithGoogle             = async () => {
  const result = await /*signinWithThirdPartyPopup(googleProvider)*/ signInWithThridPartyRedirect(googleProvider);
  Logger.info(`result of google sign in ${JSON.stringify(result)}`);
};
export const signinWithFacebook           = async () => {
  const result = await /*signinWithThirdPartyPopup(facebookProvider)*/ signInWithThridPartyRedirect(facebookProvider);
  Logger.info(`result of facebook signin is: ${JSON.stringify(result)}`);
};
export const signInWithThridPartyRedirect = async provider => await firebase.auth().signInWithRedirect(provider);
export const signinWithThirdPartyPopup    = async provider => await firebase.auth().signInWithPopup(provider);
export const handleAuthRedirect           = async () => {
  const result = await firebase.auth().getRedirectResult();
  if (result.credential) {
    Logger.info('redirect contains a credential');
    return;
  }
  Logger.info('result does not contain a credential');
};
export const handleFirebaseError          = errCode => {
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
  case 'auth/account-exists-with-different-credential':
    return 'You already signed into this app using the same email, but from a different provider';
  default:
    return 'An unknown error has occurred';
  }
};
