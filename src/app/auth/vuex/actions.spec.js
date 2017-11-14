import types from './types';
import actions from './actions';

const sandbox = sinon.sandbox.create();
describe('auth actions', () => {
  'use strict';
  let commitStub;
  beforeEach(() => {
    commitStub = sandbox.spy();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('log in', () => {
    it('should correctly set logged in to true', () => {
      actions[types.actions.logIn]({commit: commitStub});
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN,{isLoggedIn:true});
    });
  });
  describe('log out', () => {
    it('should correctly set logged in to false', () => {
      actions[types.actions.logOut]({commit: commitStub});
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN, {isLoggedIn:false});
    });
  });

});
