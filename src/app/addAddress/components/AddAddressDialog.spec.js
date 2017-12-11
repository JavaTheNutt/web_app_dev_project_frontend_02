import AddAddressDialog from './AddAddressDialog';
import Vuex from 'vuex';
import authTypes from '@/app/auth/vuex/types';

const sandbox = sinon.sandbox.create();
describe('AddAddressDialog.vue', () => {
  let getters, store, getLoggedInStub;
  beforeEach(() => {
    getLoggedInStub = sandbox.stub();
    getters         = {
      [authTypes.getters.getLoggedIn]: getLoggedInStub
    };
    store           = new Vuex.store({
      state: {},
      getters
    });
  });
  it('should initialize with the correct data properties', () => {
    expect(AddAddressDialog.data).to.be.a('function');
    const initialData = AddAddressDialog.data();
    expect(initialData.headers).to.eql([{
      text: 'Address',
      value: 'address'
    }]);
    expect(initialData.isEdit).to.be.false;
    expect(initialData.addresses).to.eql([]);
    expect(initialData.addressDetails).ot.eql({});
    expect(initialData.formValid).to.be.false;
    expect(initialData.saveCountry).to.be.false;
    expect(initialData.loading).to.be.false;
    expect(initialData.selectedAddress).to.eql([]);
    expect(initialData.pagination).to.eql({rowsPerPage:10});
    expect(initialData.address).to.eql([]);
    expect(initialData.formData).to.eql({});
    expect(initialData.defaultCountries).to.eql([]);
  });

});
