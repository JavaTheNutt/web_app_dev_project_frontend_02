import types from './types';
import actions from './actions';
import firebase from 'firebase';
import * as firebaseService from '../service/firebaseService';
const sandbox = sinon.sandbox.create();

describe('auth actions', () => {
  'use strict';
  let commitStub, authContainer, authStub, registerAuthStateListenerStub, dispatchStub, testAuthStateStub;
  beforeEach(() => {
    commitStub                    = sandbox.spy();
    dispatchStub                  = sandbox.spy();
    registerAuthStateListenerStub = sandbox.stub();
    authContainer                 = {onAuthStateChanged: registerAuthStateListenerStub};
    authStub                      = sandbox.stub(firebase, 'auth').returns(authContainer);
    testAuthStateStub = sandbox.stub(firebaseService, 'testAuthState');
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
      testAuthStateStub.returns(true);
      actions[types.actions.testCurrentAuthState]({commit: commitStub});
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN, {isLoggedIn: true});
    });
    it('should commit false when there is no user logged into firebase', () => {
      testAuthStateStub.returns(false);
      actions[types.actions.testCurrentAuthState]({commit: commitStub});
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN, {isLoggedIn: false});
    });
  });
});
