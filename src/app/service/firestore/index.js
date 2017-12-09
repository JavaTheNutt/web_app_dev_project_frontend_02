import {firestore} from 'firebase';
import {fetchUserId} from '../../auth/service/firebaseService';
import * as Logger from 'loglevel';

export const fetchCollection            = async path => await fetch('collection', path);
export const fetchCollectionSync = (path, callback) => fetchSync('collection', path, callback);
export const fetchDoc            =async  path => await fetch('doc', path);
export const fetchDocSync        = (path, callback) => fetchSync('doc', path, callback);
export const fetchSync           = (type, path, callback) => {
  const userId = fetchUserId();
  if(userId.error)return userId;
  try {
    return firestore()[type](`users/${userId}/${path}`).onSnapshot(callback);
  } catch (err) {
    Logger.warn(`an error has occurred while fetching data ${JSON.stringify(err)}`);
    return {error: err};
  }
};
export const fetch = async (type, path) => {
  const userId = fetchUserId();
  if (userId.error) return userId;
  try {
    const basePath = `users/${userId}`;
    const newPath = path ? `${basePath}/${path}` : basePath;
    const res =  await firestore()[type](newPath).get();
    if(type === 'doc') return res.data();
    const collection  =[];
    res.forEach(elem => {
      Logger.info(`iterating through collection, current item: ${JSON.stringify(elem)}`);
      collection.push(elem).data();
    });
    return collection;
  } catch (err) {
    Logger.warn(`an error has occurred while fetching data ${JSON.stringify(err)}`);
    return {error: err};
  }
};

