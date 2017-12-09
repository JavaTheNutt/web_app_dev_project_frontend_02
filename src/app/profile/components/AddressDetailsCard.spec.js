import AddressDetailsCard from './AddressDetailsCard';
import {createLocalVue, shallow} from 'vue-test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import types from '@/app/auth/vuex/types';
import * as profileService from '../service/profileService';

const sandbox = sinon.sandbox.create();
const localVue = createLocalVue();
localVue.use(Vuex);
describe('UserDetailsCard.vue', () => {
  let getLoggedInStub, getters, state, store, fetchUserReferenceStub, onSnapshotStub;
  beforeEach(() => {
    getLoggedInStub = sandbox.stub();
    fetchUserReferenceStub = sandbox.stub(profileService, 'fetchUserReference');
    onSnapshotStub = sandbox.stub();
    fetchUserReferenceStub.returns({onSnapshot: onSnapshotStub});
    getters={
      [types.getters.getLoggedIn]: getLoggedInStub
    };
    state={};
    store = new Vuex.Store({
      state,
      getters
    });
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('mounted', () => {
    it('should not fetch a user reference when not logged in',() => {
      getLoggedInStub.returns(false);
      const wrapper  = shallow(AddressDetailsCard, {
        store,
        localVue
      });
      expect(fetchUserReferenceStub).to.not.be.called;
    });
    it('should fetch a user reference when logged in',() => {
      getLoggedInStub.returns(false);
      const wrapper  = shallow(AddressDetailsCard, {
        store,
        localVue
      });
      expect(fetchUserReferenceStub).to.not.be.called;
    });
  });
});
