import firebase from 'firebase';
import {getCurrentUser, getCurrentUserId, updateUserProfilePic} from '@/app/auth/service/firebaseService';
import DefaultProfilePic from '@/assets/defaultProf.png';
import * as Logger from 'loglevel';
import store from '@/store';
import profileTypes from '../vuex/types';
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
export const addDefaultCountry            = async country => {
  const userRef = fetchUserReference();
  const user    = await userRef.get();
  user.countries.push(country);
  const res = await userRef.set({countries: user.countries});
};
export const fetchUserReference           = () => firebase.firestore().doc(`users/${getCurrentUserId()}`);
export const syncDefaultCountries         = () => {
  fetchUserReference().onSnapshot(doc => {
    store.commit(profileTypes.mutations.SET_DEFUALT_COUNTRIES, doc.data.countries);
  });
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
