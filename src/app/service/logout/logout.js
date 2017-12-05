import store from '@/store';
import profileTypes from '@/app/profile/vuex/types';
import authTypes from '@/app/auth/vuex/types';
import {unsubscribeFromCountries} from '@/app/profile/service/profileService';
import * as Logger from 'loglevel';
export const resetStore = () => {
  try {
    unsubscribeFromCountries();
  } catch (e) {
    Logger.warn(`error while unsubscribing from countries: ${e}`);
  }
  store.commit(profileTypes.mutations.RESET_DEFAULT_COUNTRIES);
  store.commit(authTypes.mutations.UNSET_USER);
};
