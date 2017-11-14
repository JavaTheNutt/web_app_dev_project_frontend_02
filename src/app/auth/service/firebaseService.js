import firebase from 'firebase';
export const passwordLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (e) {
    return false;
  }
};
