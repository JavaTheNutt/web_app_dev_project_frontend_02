import localForage from 'localforage';
export const forage = localForage.createInstance({
  name: 'forage',
  driver: localForage.LOCALSTORAGE
});
