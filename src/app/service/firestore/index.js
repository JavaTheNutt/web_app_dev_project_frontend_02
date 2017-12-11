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
/*export const fetchCountries = async() => {
  try{
    await firestore().collection('countries')
  }
}*/
export const fetch = async (type, path) => {
  Logger.info(`attempting to fetch ${type} at ${path}`);
  const newPath = fetchBasePath(path);
  if (newPath.error) return newPath;
  Logger.info(`full path: ${newPath}`);
  try {
    const res =  await firestore()[type](newPath).get();
    Logger.info('data assumed fetched');
    if(type === 'doc' && res.exists) return res.data();
    if(type === 'doc' && !res.exists) return {error: 'result does not exist'};
    Logger.info('type is collection');
    Logger.info(`length of collection: ${res.length}`);
    const collection  =[];
    res.forEach(elem => {
      Logger.info(`iterating through collection, current item: ${JSON.stringify(elem)}`);
      collection.push(Object.assign({id: elem.id}, elem.data()));
    });
    return collection;
  } catch (err) {
    Logger.warn(`an error has occurred while fetching data ${JSON.stringify(err)}`);
    return {error: err};
  }
};
export const fetchBasePath = path => {
  const userId = fetchUserId();
  if (userId.error) return userId;
  const basePath  = `users/${userId}`;
  return path ? `${basePath}/${path}` : basePath;
};
export const addItem = async (path, item) => {
  const basePath = fetchBasePath(path);
  if(basePath.error) return basePath;
  Logger.info(`attempting to add item to: ${basePath}`);
  try {
    const res = await firestore().collection(basePath).add(item);
    Logger.info('item assumed added successfully');
    return {data: Object.assign({id: res.id}, item)};
  } catch (e) {
    Logger.warn(`error occurred adding item to firebase, ${e}`);
    return {error: e};
  }
};
export const removeItem = async (path, id) => {
  const basePath = fetchBasePath(path);
  if(basePath.error) return basePath;
  Logger.info(`attempting to remove item ${id} from ${basePath}`);
  try{
    const res = await firestore().doc(`${basePath}/${id}`).delete();
    Logger.info('item assumed deleted successfully');
    return false;
  }catch (err){
    Logger.warn(`there was an error deleting from firebase, ${err}`);
    return {error: err};
  }
};
