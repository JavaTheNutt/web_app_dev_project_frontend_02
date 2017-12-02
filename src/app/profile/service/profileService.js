import firebase from 'firebase';
import {getCurrentUser, getCurrentUserId, updateUserProfilePic} from '@/app/auth/service/firebaseService';
import DefaultProfilePic from '@/assets/defaultProf.png';
import * as Logger from 'loglevel';

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
