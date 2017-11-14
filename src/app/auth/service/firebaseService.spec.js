import firebase from 'firebase';
import * as firebaseService from './firebaseService';

const sandbox = sinon.sandbox.create();
describe('firebaseService', () => {
  let authContainer, authStub, signInWithEmailAndPasswordStub;
  beforeEach(() => {
    signInWithEmailAndPasswordStub = sandbox.stub();
    authContainer                  = {signInWithEmailAndPassword: signInWithEmailAndPasswordStub};
    authStub                       = sandbox.stub(firebase, 'auth').returns(authContainer);
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('password login', () => {
    'use strict';
    it('should return true for successful password logins', async () => {
      signInWithEmailAndPasswordStub.resolves(true);
      const result = await firebaseService.passwordLogin('joebloggs@test.com', 'zzzzzz');
      expect(result).to.be.true;
    });
    it('should return false for unsuccessful password logins', async () => {
      signInWithEmailAndPasswordStub.throws(Error('an error has occurred'));
      const result = await firebaseService.passwordLogin('joebloggs@test.com', 'zzzzzz');
      expect(result).to.be.false;
    });
  });
});
