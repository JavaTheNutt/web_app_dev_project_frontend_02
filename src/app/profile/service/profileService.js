import firebase from 'firebase';
import {getCurrentUserId, getCurrentUser} from '@/app/auth/service/firebaseService';
import DefaultProfilePic from '@/assets/defaultProf.png';
export const fetchFirebaseProfilePicUrl = async () => {
  const id = getCurrentUserId();
  if(id.error){
    return id;
  }
  return await firebase.storage().ref('user').child(`${id}/ProfilePic.jpg`).getDownloadURL();
};

export const isFirebaseProfilePic = photoUrl => photoUrl.substring(0, 5) === 'gs://';

export const fetchPhotoUrl = () => {
  const user = getCurrentUser();
  if(user.error){
    return  user;
  }
  if(!user.photoURL){
    return DefaultProfilePic;
  }
  if(isFirebaseProfilePic()){
    return fetchFirebaseProfilePicUrl();
  }
  return null;
};
