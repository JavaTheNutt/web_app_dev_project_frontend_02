import types from './types';
import * as Logger from 'loglevel';

export default {
  [types.mutations.SET_LOGGED_IN]: (state, {isLoggedIn}) => state.loggedIn = isLoggedIn,
  [types.mutations.SET_PROVIDER_IDS]: (state, {newProviderId, preferredProviderId, credential}) => {
    Logger.info(`mutation new provider id: ${newProviderId}`);
    state.linkAccounts.newProviderId       = newProviderId;
    state.linkAccounts.preferredProviderId = preferredProviderId;
    state.linkAccounts.credential          = credential;
  },
  [types.mutations.SET_DISPLAY_NAME]: (state, {userDisplayName}) => state.user.displayName = userDisplayName
};
