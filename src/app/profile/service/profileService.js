import firebase from 'firebase';
import 'firebase/firestore';
import {getCurrentUser, getCurrentUserId, updateUserProfilePic} from '@/app/auth/service/firebaseService';
import DefaultProfilePic from '@/assets/defaultProf.png';
import * as Logger from 'loglevel';
import store from '@/store';
import profileTypes from '../vuex/types';
//const db = firebase.firestore();
export const fetchFirebaseProfilePicUrl   = async () => {
  const id = getCurrentUserId();
  if (id.error) {
    return id;
  }
  return await firebase.storage().ref('user').child(`${id}/profilePicture.jpg`).getDownloadURL();
};
export const fetchUserPictureFromFirebase = async (id, ext) => await fetchPhotoRef(id).child(`profilePicture${ext}`).
getDownloadURL();
export const isFirebaseProfilePic         = photoUrl => photoUrl.substring(0, 5) === 'gs://';
export const fetchPhotoRef                = id => firebase.storage().ref('user').child(`${id}/`);
export const savePhoto                    = file => {
  const ext = file.name.substring(file.name.lastIndexOf('.'));
  Logger.info(`file extension: ${ext}`);
  const userId = getCurrentUserId();
  Logger.info(`current user id: ${userId}`);
  const uploadTask = fetchPhotoRef(getCurrentUserId()).child(`profilePicture${ext}`).put(file);
  uploadTask.on('state_changed', async snapshot => {
    if (snapshot.bytesTransferred === snapshot.totalBytes) {
      Logger.info('upload completed');
      const downloadURL = await fetchUserPictureFromFirebase(userId, ext);
      await updateUserProfilePic(downloadURL);
    }
  });
};
export const addDefaultCountries          = async countries => {
  const userRef = fetchUserReference();
  const user    = await userRef.get();
  if (!user.exists) {
    const tmpUser = {countries};
    await userRef.set(tmpUser);
    return;
  }
  //Logger.info(`user: ${JSON.stringify(user)}`);
  let newCountries;
  if (user.data().countries) {
    newCountries = user.data().countries.concat(countries);
  }
  const res = await userRef.set({countries: newCountries || countries});
};
export const addDefaultCountry            = async country => {

  const defaultCountries = Object.assign([], store.getters[profileTypes.getters.getDefaultCountries]);
  if (defaultCountries.indexOf(country) !== -1) {
    Logger.warn('country exists in default countries, returning');
    return;
  }
  defaultCountries.push(country);
  await addDefaultCountries(defaultCountries);
};
export const fetchUserReference           = () => firebase.firestore().collection('users').doc(`${getCurrentUserId()}`);
export const syncDefaultCountries         = () => {
  fetchUserReference()/*.collection('countries')*/.onSnapshot(doc => {
    let countries = [];
    //Logger.info(`country snapshot triggered: ${JSON.stringify(doc)}`);
    /*doc.forEach(country => {
      Logger.info(`getting countries: ${JSON.stringify(country.data())}`);
      countries.push(Object.assign({},country.data()));
    });*/
    if (doc.exists) {
      countries = doc.data().countries;
    }
    store.commit(profileTypes.mutations.SET_DEFAULT_COUNTRIES, {defaultCountries: countries || []});
  });
};
export const unsubscribeFromCountries            = () => fetchUserReference().onSnapshot(() => {
});
export const addAddress                   = async address => {
  const res = await fetchUserReference().collection('addresses').add(address);
};
export const deleteAddress                = async addressId => {
  const res = await fetchUserReference().collection('addresses').doc(addressId).delete();
};
export const fetchPhotoUrl                = () => {
  const user = getCurrentUser();
  if (user.error) {
    return user;
  }
  if (!user.photoURL) {
    return DefaultProfilePic;
  }
  if (isFirebaseProfilePic()) {
    return fetchFirebaseProfilePicUrl();
  }
  return null;
};
