import mutations from './mutations';
import types from './types';

describe('profile mutations', () => {
  describe('set countries', () => {
    it('should set the countries correctly', () => {
      const state = {
        defaultCountries: []
      };
      mutations[types.mutations.SET_DEFAULT_COUNTRIES](state, {defaultCountries: ['Ireland', 'Spain']});
      expect(state.defaultCountries).to.eql(['Ireland', 'Spain']);
    });
  });
  describe('reset countries', () => {
    it('should set default countries to an empty array', () => {
      const state = {
        defaultCountries: ['Ireland', 'Spain']
      };
      mutations[types.mutations.RESET_DEFAULT_COUNTRIES](state);
      expect(state.defaultCountries).to.eql([]);
    });
  });
  describe('add country', () => {
    it('should add a country to the array', () => {
      const state = {
        defaultCountries: []
      };
      mutations[types.mutations.ADD_DEFAULT_COUNTRY](state, {country: 'Ireland'});
      expect(state.defaultCountries).to.eql(['Ireland']);
    });
  });
  describe('remove country', () => {
    it('should remove a country from the list', () => {
      const state = {
        defaultCountries: ['Ireland', 'Spain']
      };
      mutations[types.mutations.REMOVE_DEFAULT_COUNTRY](state, {country: 'Ireland'});
      expect(state.defaultCountries).to.eql(['Spain']);
    });
  });
});
