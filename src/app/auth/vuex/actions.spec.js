import types from './types';
import actions from './actions';
import firebase from 'firebase';

const sandbox = sinon.sandbox.create();

describe('auth actions', () => {
  'use strict';
  let commitStub, authContainer, authStub, registerAuthStateListenerStub, dispatchStub;
  beforeEach(() => {
    commitStub                    = sandbox.spy();
    dispatchStub                  = sandbox.spy();
    registerAuthStateListenerStub = sandbox.stub();
    authContainer                 = {onAuthStateChanged: registerAuthStateListenerStub};
    authStub                      = sandbox.stub(firebase, 'auth').returns(authContainer);
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('register auth state listener', () => {
    it('should register an auth state listener', () => {
      actions[types.actions.registerAuthStateListener]({dispatch: dispatchStub});
      expect(registerAuthStateListenerStub).to.be.calledOnce;
    });
  });
  describe('test current auth state', () => {
    it('should commit true when there is a user logged into firebase', () => {
      authContainer.currentUser = {name: 'joe bloggs'};
      actions[types.actions.testCurrentAuthState]({commit: commitStub});
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN, {isLoggedIn: true});
    });
    it('should commit false when there is no user logged into firebase', () => {
      actions[types.actions.testCurrentAuthState]({commit: commitStub});
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN, {isLoggedIn: false});
    });
  });
});
