import firebase from 'firebase';
import * as Logger from 'loglevel';
import Bus from '@/app/events/bus';
import store from '@/store';
import types from '../vuex/types';
import router from '@/router';
import {syncDefaultCountries} from '@/app/profile/service/profileService';
import {resetStore} from '../../service/logout/logout';
import {setDefaultCountries} from '../../profile/service/defaultCountries';

const googleProvider   = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const passwordLogin                                = async (email, password) => {
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
export const logOut                                       = () => firebase.auth().signOut();
export const updateProfile                                = details => {

};
export const updateUserName                               = async displayName => {
  const result = await updateUserProfile({displayName});
  if (result.error) {
    Logger.warn(`there was an error updating the users display name. ${JSON.stringify(result.error)}`);
    return result;
  }
  Logger.info('user assumed updated');
  return true;
};
export const updateUserProfilePic                         = async picUrl => {
  const result = await updateUserProfile({photoURL: picUrl});
  if (result.error) {
    Logger.warn(`there was an error updating the users display name. ${JSON.stringify(result.error)}`);
    return result;
  }
  Logger.info('user assumed updated');
  return true;
};
export const updateUserProfile                            = async details => {
  Logger.info('attempting to fetch user');
  const user = getCurrentUser();
  if (user.error) {
    Logger.warn(`there was an error fetching the user: ${JSON.stringify(user.error)}`);
    return user;
  }
  try {
    const result = await user.updateProfile(details);
    Logger.info('user updated successfully');
    return updateLocalProfile(user);
  } catch (e) {
    Logger.warn(`there was an error updating the user: ${e}`);
    return {error: e};
  }
};
export const getCurrentUserId                             = () => {
  const user = getCurrentUser();
  if (user.error) {
    return user;
  }
  return user.uid;
};
export const getCurrentUser                               = () => firebase.auth().currentUser || {error: 'there is no user logged in'};
export const testAuthState                                = user => {
  const loggedInUser = updateLocalProfile(user);
  router.push(loggedInUser ? '/profile' : '/');
  return loggedInUser;
};
export const updateLocalProfile                           = user => {
  if (!user) {
    Logger.info('no user logged in to firebase, logging out locally');
    resetStore();
    return false;
  }
  const details = {
    displayName: user.displayName,
    photoUrl: user.photoURL,
    email: user.email
  };

  Logger.info(`details: ${JSON.stringify(details)}`);
  store.dispatch(types.actions.setUser, {userDetails: details});
  setDefaultCountries();
  //syncDefaultCountries();
  Logger.info('user logged in to firebase, logging in locally');
  return true;
};
export const fetchProfilePicture                          = user => {
  Logger.info(`fetching photo from: ${JSON.stringify(user)}`);
  return user.photoURL || '';
};
export const signUpWithEmailPassword                      = async (email, password) => {
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
export const signinWithGoogle                             = async () => {
  try {
    const result = await signinWithThirdPartyPopup(googleProvider) /*signInWithThridPartyRedirect(googleProvider)*/;
    Logger.info(`result of google sign in ${JSON.stringify(result)}`);
  } catch (e) {
    Logger.warn('there was an error while logging in');
    handleSignInError(e, 'google.com');
  }
};
export const signinWithFacebook                           = async () => {
  try {
    const result = await signinWithThirdPartyPopup(facebookProvider) /*signInWithThridPartyRedirect(facebookProvider)*/;
    Logger.info(`result of facebook signin is: ${JSON.stringify(result)}`);
  } catch (e) {
    Logger.warn('there was an error while logging in');
    handleSignInError(e, 'facebook.com');
  }
};
export const handleAccountLink                            = async () => {
  try {
    const providerDetails = store.getters[types.getters.getProviders];
    const providerId      = providerDetails.preferredProviderId;
    Logger.info(`provider id: ${providerId}`);
    const provider = fetchProviderFromID(providerId);
    Logger.info(`provider: ${JSON.stringify(provider)}`);
    const result = await firebase.auth().signInWithPopup(provider);
    Logger.info(`result of signing in with initial account: ${JSON.stringify(result)}`);
    Logger.info(`credential: ${JSON.stringify(providerDetails.credential)}`);
    //fixme: this errors with an empty object
    const linkResult = await result.user.link(providerDetails.credential);
    Logger.info(`result of link: ${JSON.stringify(linkResult)}`);
  } catch (err) {
    Logger.warn(`error while linking account, ${JSON.stringify(err)}`);
  } finally {
    store.dispatch(types.actions.resetProviderIds);
  }
};
export const signInWithThridPartyRedirect                 = async provider => await firebase.auth().
signInWithRedirect(provider);
export const signinWithThirdPartyPopup                    = async provider => await firebase.auth().
signInWithPopup(provider);
export const handleAuthRedirect                           = async () => {
  const result = await firebase.auth().getRedirectResult();
  if (result.credential) {
    Logger.info('redirect contains a credential');
    return;
  }
  if (result.error) {
    Logger.warn('result contains an error');
    return;
  }
  Logger.info('result does not contain a credential or an error');
};
export const handleSignInError                            = (error, providerId) => {
  if (error.code === 'auth/account-exists-with-different-credential') {
    return handleAuthExistsWithDifferentCredentialError(error, providerId);
  }
  return handleFirebaseError(error);
};
export const handleAuthExistsWithDifferentCredentialError = async (error, providerId) => {
  Logger.info(`auth exists with different cred, error: ${JSON.stringify(error)}`);
  const providers = await fetchProviders(error.email);
  store.dispatch(types.actions.setProviderIds, {
    newProviderId: providerId,
    preferredProviderId: providers[0],
    credential: error.credential
  });
  Bus.$emit('confirm_account_link');
};
export const fetchUserId                                  = () => {
  if (!firebase.auth().currentUser) {
    return {error: 'no user logged in'};
  }
  return firebase.auth().currentUser.uid;
};
export const fetchProviderNameFromId                      = id => {
  switch (id) {
  case 'google.com':
    return 'Google';
  case 'facebook.com':
    return 'Facebook';
  default:
    return {error: 'invalid provider'};
  }
};
export const fetchProviderFromID                          = id => {
  switch (id) {
  case 'google.com':
    return new firebase.auth.GoogleAuthProvider();
  case 'facebook.com':
    return new firebase.auth.FacebookAuthProvider();
  default:
    return {error: 'invalid provider'};
  }
};
export const fetchProviders                               = async email => {
  try {
    return await firebase.auth().fetchProvidersForEmail(email);
  } catch (err) {
    return {error: err};
  }
};
export const handleFirebaseError                          = errCode => {
  switch (errCode) {
  case 'auth/user-not-found':
    return 'Email is not registered on the system';
  case 'auth/wrong-password':
    return 'Password is incorrect';
  case 'auth/email-already-in-use':
    return 'The specified email address is already in use';
  case 'auth/invalid-email':
    return 'The specified email address is invalid';
  case 'auth/weak-password':
    return 'The specified password is too weak';
  case 'auth/account-exists-with-different-credential':
    return 'You already signed into this app using the same email, but from a different provider';
  default:
    return 'An unknown error has occurred';
  }
};
