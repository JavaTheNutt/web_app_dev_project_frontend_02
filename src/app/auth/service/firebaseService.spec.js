import firebase from 'firebase';
import * as firebaseService from './firebaseService';
import Bus from '@/app/events/bus';
import * as Logger from 'loglevel';
Logger.setLevel('silent');
const sandbox = sinon.sandbox.create();
describe('firebaseService', () => {
  let authContainer, authStub, signInWithEmailAndPasswordStub, signUpWithEmailAndPasswordStub, emitStub;
  beforeEach(() => {
    signInWithEmailAndPasswordStub = sandbox.stub();
    signUpWithEmailAndPasswordStub = sandbox.stub();
    authContainer                  = {
      signInWithEmailAndPassword: signInWithEmailAndPasswordStub,
      createUserWithEmailAndPassword: signUpWithEmailAndPasswordStub
    };
    authStub                       = sandbox.stub(firebase, 'auth').returns(authContainer);
    emitStub                       = sandbox.stub(Bus, '$emit');
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('password login', () => {
    'use strict';
    it('should return true for successful password logins', async () => {
      signInWithEmailAndPasswordStub.resolves(true);
      const result = await firebaseService.passwordLogin('joebloggs@test.com', 'zzzzzz');
      expect(emitStub).to.be.calledTwice;
      expect(emitStub).to.be.calledWith('hide_login');
      expect(emitStub).to.be.calledWith('show_snack', 'Login succeeded', 'success');
      expect(result).to.be.true;
    });
    it('should return false for unsuccessful password logins', async () => {
      signInWithEmailAndPasswordStub.throws(Error('an error has occurred'));
      const result = await firebaseService.passwordLogin('joebloggs@test.com', 'zzzzzz');
      expect(result).to.eql({error: {message: 'An unknown error has occurred'}});
    });
  });
  describe('sign up with email and password', () => {
    it('should return true for a successful sign up', async () => {
      signUpWithEmailAndPasswordStub.resolves(true);
      const result = await firebaseService.signUpWithEmailPassword('joebloggs@test.com', 'xxxxxxxx');
      expect(emitStub).to.be.calledWith('hide_login');
      expect(emitStub).to.be.calledWith('show_snack', 'Sign up succeeded', 'success');
      expect(result).to.be.true;
    });
    it('should return true for a successful login', async () => {
      signUpWithEmailAndPasswordStub.throws(Error('an error has occurred'));
      const result = await firebaseService.signUpWithEmailPassword('joebloggs@test.com', 'xxxxxxxx');
      expect(result).to.eql({error: {message: 'An unknown error has occurred'}});
    });
  });
  describe('error handling', () => {
    it('should handle incorrect passwords', () => {
      const result = firebaseService.handleFirebaseError('auth/wrong-password');
      expect(result).to.equal('Password is incorrect');
    });
    it('should handle email address in use errors', () => {
      const result = firebaseService.handleFirebaseError('auth/email-already-in-use');
      expect(result).to.equal('The specified email address is already in use');
    });
    it('should handle malformed email errors', () => {
      const result = firebaseService.handleFirebaseError('auth/invalid-email');
      expect(result).to.equal('The specified email address is invalid');
    });
    it('should handle uer not found errors', () => {
      const result = firebaseService.handleFirebaseError('auth/user-not-found');
      expect(result).to.equal('Email is not registered on the system');
    });
    it('should handle weak password errors', () => {
      const result = firebaseService.handleFirebaseError('auth/weak-password');
      expect(result).to.equal('The specified password is too weak');
    });
    it('should handle unknown errors', () => {
      const result = firebaseService.handleFirebaseError('foo');
      expect(result).to.equal('An unknown error has occurred');
    });
  });
});
