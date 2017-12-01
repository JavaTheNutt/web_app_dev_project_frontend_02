import localForage from 'localforage';
import * as Logger from 'loglevel';
export const setDisplayName = async displayName => {
  Logger.info(`setting display name to ${displayName}`);
  try {
    await localForage.setItem('displayName', displayName);
  } catch (e) {
    Logger.info(`there was an error saving to localstorage, ${e}`);
  }
};

export const fetchDisplayName = async () => await localForage.getItem('displayName') || {error: 'no display name'};

export const clearDisplayName = async () => await localForage.removeItem('displayName');
