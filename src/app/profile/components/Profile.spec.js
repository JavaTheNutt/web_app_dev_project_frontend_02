import Profile from '@/app/profile/components/Profile';
import AddressDetailsCard from '@/app/profile/components/AddressDetailsCard';
import UserDetailsCard from '@/app/profile/components/UserDetailsCard';
import Vue from 'vue';
import Vuex from 'vuex';
import {createLocalVue, shallow} from 'vue-test-utils';
import types from '@/app/auth/vuex/types';

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.config.silent = true;
const sandbox     = sinon.sandbox.create();
describe('Profile.vue', () => {
  let getters, store, getDisplayNameStub;
  beforeEach(() => {
    getDisplayNameStub = sandbox.stub();
    getters            = {
      [types.getters.getDisplayName]: getDisplayNameStub
    };
    store              = new Vuex.Store({
      state: {},
      getters
    });
  });
  it('should display the users name when it exists', () => {
    getDisplayNameStub.returns('Joe Bloggs');
    const wrapper = shallow(Profile, {
      store,
      localVue
    });
    const header  = wrapper.find('.text-xs-center');
    expect(wrapper.contains('p')).to.be.true;
    expect(header.text()).to.equal('Welcome to your Profile page, Joe');
  });
  it('should print "unknown" when no name exists', () => {
    const wrapper = shallow(Profile, {
      store,
      localVue
    });
    const header  = wrapper.find('.text-xs-center');
    expect(wrapper.contains('p')).to.be.true;
    expect(header.text()).to.equal('Welcome to your Profile page, unknown');
  });
  it('should contain an AddressDetailsCard component', () => {
    const wrapper = shallow(Profile, {
      store,
      localVue
    });
    const addressDetailsComponent = wrapper.find(AddressDetailsCard);
    expect(addressDetailsComponent.is(AddressDetailsCard)).to.be.true;
  });
  it('should contain a UserDetailsCard component', () => {
    const wrapper = shallow(Profile, {
      store,
      localVue
    });
    const addressDetailsComponent = wrapper.find(UserDetailsCard);
    expect(addressDetailsComponent.is(UserDetailsCard)).to.be.true;
  });
  it('should correctly extract the first name from the surname', () => {
    getDisplayNameStub.returns('Joe Bloggs');
    const wrapper = shallow(Profile, {
      store,
      localVue
    });
    expect(Profile.computed).to.be.an('object');
    expect(wrapper.vm.firstName).to.equal('Joe');
  });
  it('should render with the correct data properties', () => {
    expect(Profile.data).to.be.a('function');
    const initialData = Profile.data();
    expect(initialData.pageName).to.equal('Profile');
  });
});
