import firebase from 'firebase';
import * as firebaseService from './firebaseService';
import {handleSignInError} from './firebaseService';
import Bus from '@/app/events/bus';
import * as Logger from 'loglevel';
import * as logout from '@/app/service/logout/logout';
import * as defaultCountries from '@/app/profile/service/defaultCountries';
import store from '@/store';
import authTypes from '../vuex/types';

Logger.setLevel('silent');
const sandbox = sinon.sandbox.create();
describe('firebaseService', () => {
  let authContainer, logoutStub, authStub, currentUser, signInWithEmailAndPasswordStub, signUpWithEmailAndPasswordStub,
    emitStub, signOutStub, setDefaultCountriesStub, dispatchStub, fetchProvidersForEmailStub, gettersStub,
    signInWithPopupStub, linkStub;
  beforeEach(() => {
    signInWithEmailAndPasswordStub = sandbox.stub();
    signUpWithEmailAndPasswordStub = sandbox.stub();
    signOutStub                    = sandbox.stub();
    fetchProvidersForEmailStub     = sandbox.stub();
    signInWithPopupStub            = sandbox.stub();
    linkStub = sandbox.stub();
    currentUser                    = {
      uid: 'someuidhere',
      displayName: 'joe bloggs',
      email: 'joe@bloggs.com',
      photoURL: 'http://somepictuserlocation.com'
    };
    authContainer                  = {
      signInWithEmailAndPassword: signInWithEmailAndPasswordStub,
      createUserWithEmailAndPassword: signUpWithEmailAndPasswordStub,
      signOut: signOutStub,
      currentUser,
      fetchProvidersForEmail: fetchProvidersForEmailStub,
      signInWithPopup: signInWithPopupStub
    };
    authStub                       = sandbox.stub(firebase, 'auth').returns(authContainer);
    emitStub                       = sandbox.stub(Bus, '$emit');
    logoutStub                     = sandbox.stub(logout, 'resetStore');
    dispatchStub                   = sandbox.stub(store, 'dispatch');
    gettersStub                    = sandbox.stub(store, 'getters').value({
      [authTypes.getters.getProviders]: {
        preferredProviderId: 'google.com',
        credential: 'iamacredential'
      }});
    setDefaultCountriesStub        = sandbox.stub(defaultCountries, 'setDefaultCountries');
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
    it('should handle account exists with different credentials errors', () => {
      const result = firebaseService.handleFirebaseError('auth/account-exists-with-different-credential');
      expect(result).to.equal('You already signed into this app using the same email, but from a different provider');
    });
    it('should handle unknown errors', () => {
      const result = firebaseService.handleFirebaseError('foo');
      expect(result).to.equal('An unknown error has occurred');
    });
  });
  describe('log out', () => {
    it('shoud always trigger a log out', () => {
      firebaseService.logOut();
      expect(signOutStub).to.be.calledOnce;
    });
  });
  describe('get current user', () => {
    it('should return the user when its availible', () => {
      const user = firebaseService.getCurrentUser();
      expect(user).to.eql(currentUser);
    });
    it('should return an error when no user is logged in', () => {
      authContainer.currentUser = undefined;
      const user                = firebaseService.getCurrentUser();
      expect(user).to.eql({error: 'there is no user logged in'});
    });
  });
  describe('get current user id', () => {
    it('should return the users id when the user is logged in', () => {
      const result = firebaseService.getCurrentUserId();
      expect(result).to.equal('someuidhere');
    });
    it('should return an error when there is no user logged in', () => {
      authContainer.currentUser = undefined;
      const result              = firebaseService.getCurrentUserId();
      expect(result).to.eql({error: 'there is no user logged in'});
    });
  });
  describe('update local profile', () => {
    it('should reset the store when there is no user logged in', () => {
      firebaseService.updateLocalProfile();
      expect(logoutStub).to.be.calledOnce;
    });
    it('should dispatch the user details to the store and set the default countries', () => {
      firebaseService.updateLocalProfile(currentUser);
      expect(dispatchStub).to.be.calledOnce;
      expect(dispatchStub).to.be.calledWith(authTypes.actions.setUser, {
        userDetails: {
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL,
          email: currentUser.email
        }
      });
      expect(setDefaultCountriesStub).to.be.calledOnce;
    });
  });
  describe('fetchProfilePicture', () => {
    it('should return the url of the users profile picture when it exists', () => {
      const result = firebaseService.fetchProfilePicture(currentUser);
      expect(result).to.equal(currentUser.photoURL);
    });
    it('should return an empty string when there is no profile pictire availiable', () => {
      currentUser.photoURL = undefined;
      const result         = firebaseService.fetchProfilePicture(currentUser);
      expect(result).to.equal('');
    });
  });
  describe('fetch provider name from id', () => {
    it('should return "Google" when it recieves "google.com"', () => {
      const result = firebaseService.fetchProviderNameFromId('google.com');
      expect(result).to.eql('Google');
    });
    it('should return "Facebook" when it recieves "facebook.com"', () => {
      const result = firebaseService.fetchProviderNameFromId('facebook.com');
      expect(result).to.eql('Facebook');
    });
    it('should return an error when it recieves an invalid provider id', () => {
      const result = firebaseService.fetchProviderNameFromId('foo');
      expect(result).to.eql({error: 'invalid provider'});
    });
  });
  describe('fetch provider from id', () => {
    it('should return a GoogleProvider when it recieves "google.com"', () => {
      const result = firebaseService.fetchProviderFromID('google.com');
      expect(result).to.eql(new firebase.auth.GoogleAuthProvider());
    });
    it('should return a FaceBookProvider when it recieves "facebook.com"', () => {
      const result = firebaseService.fetchProviderFromID('facebook.com');
      expect(result).to.eql(new firebase.auth.FacebookAuthProvider());
    });
    it('should return an error when it recieves an invalid provider id', () => {
      const result = firebaseService.fetchProviderFromID('foo');
      expect(result).to.eql({error: 'invalid provider'});
    });
  });
  describe('fetch providers', () => {
    it('should handle a successful fetch', async () => {
      fetchProvidersForEmailStub.withArgs('joebloggs@test.com').resolves(['google.com']);
      const result = await firebaseService.fetchProviders('joebloggs@test.com');
      expect(result).to.eql(['google.com']);
    });
    it('should handle errors', async () => {
      const error = new Error('im an error');
      fetchProvidersForEmailStub.throws(error);
      const result = await firebaseService.fetchProviders('joebloggs@test.com');
      expect(result).to.eql({error});
    });
  });
  describe('handle sign in error', () => {
    it('should handle auth exists with different credentials errors', async () => {
      fetchProvidersForEmailStub.withArgs('joebloggs@test.com').resolves(['google.com']);
      const error  = {
        email: 'joebloggs@test.com',
        code: 'auth/account-exists-with-different-credential',
        credential: 'iamacredential'
      };
      const result = await handleSignInError(error, 'facebook.com');
      expect(dispatchStub).to.be.calledWith(authTypes.actions.setProviderIds, {
        newProviderId: 'facebook.com',
        preferredProviderId: 'google.com',
        credential: 'iamacredential'
      });
    });
    it('should handle normal errors', async () => {
      const result = await handleSignInError({code: 'auth/user-not-found'});
      expect(result).to.equal('Email is not registered on the system');
    });
    it('should handle unknown errors', async () => {
      const result = await handleSignInError({code: 'foo'});
      expect(result).to.equal('An unknown error has occurred');
    });
  });
  describe('handle account link',  () => {
    it('should link accounts successfully',async () => {
      signInWithPopupStub.resolves({user:{link: linkStub}});
      await firebaseService.handleAccountLink();
      expect(signInWithPopupStub).to.be.calledOnce;
      expect(linkStub).to.be.calledWith('iamacredential');
      expect(dispatchStub).to.be.calledWith(authTypes.actions.resetProviderIds);
    });
  });
});
