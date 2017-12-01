import types from './types';

export default {
  [types.getters.getLoggedIn]: state => state.loggedIn,
  [types.getters.getHasProviders]: state => state.linkAccounts.preferredProviderId.length > 0 && state.linkAccounts.newProviderId.length > 0,
  [types.getters.getProviders]: state => state.linkAccounts,
  [types.getters.getDisplayName]: state => state.user.displayName
};
