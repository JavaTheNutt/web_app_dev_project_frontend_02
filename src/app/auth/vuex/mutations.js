import types from './types';

export default {
  [types.mutations.SET_LOGGED_IN]: (state, {isLoggedIn}) => state.loggedIn = isLoggedIn
};
