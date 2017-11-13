import {expect} from 'chai';
import types from './types';
import mutations from './mutations';

describe('auth mutations', () => {
  describe('SET_LOGGED_IN', () => {
    it('should correctly set logged in to true', () => {
      const state = {
        loggedIn: false
      };
      mutations[types.mutations.SET_LOGGED_IN](state, {isLoggedIn: true});
      expect(state.loggedIn).to.be.true;
    });
    it('should correctly set logged in to false', () => {
      const state = {
        loggedIn: true
      };
      mutations[types.mutations.SET_LOGGED_IN](state, {isLoggedIn: false});
      expect(state.loggedIn).to.be.false;
    });
  });
});
