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
    it('should add a country to the array when it is empty', () => {
      const state = {
        defaultCountries: []
      };
      mutations[types.mutations.ADD_DEFAULT_COUNTRY](state, {country: 'Ireland'});
      expect(state.defaultCountries).to.eql(['Ireland']);
    });
    it('should add a country to the array if it is not empty', () => {
      const state = {
        defaultCountries: ['Ireland', 'Spain']
      };
      mutations[types.mutations.ADD_DEFAULT_COUNTRY](state, {country: 'Brazil'});
      expect(state.defaultCountries).to.eql(['Ireland','Spain', 'Brazil']);
    });
    it('should not add a country if that country already exists in the list', () => {
      const state = {
        defaultCountries: ['Ireland', 'Spain']
      };
      mutations[types.mutations.ADD_DEFAULT_COUNTRY](state, {country: 'Ireland'});
      expect(state.defaultCountries).to.eql(['Ireland','Spain']);
    });
  });
  describe('remove country', () => {
    it('should remove a country from the list, when it already exists', () => {
      const state = {
        defaultCountries: ['Ireland', 'Spain']
      };
      mutations[types.mutations.REMOVE_DEFAULT_COUNTRY](state, {country: 'Ireland'});
      expect(state.defaultCountries).to.eql(['Spain']);
    });
    it('should leave the list unchanged when the country is not in the list', () => {
      const state = {
        defaultCountries: ['Ireland', 'Spain']
      };
      mutations[types.mutations.REMOVE_DEFAULT_COUNTRY](state, {country: 'Brazil'});
      expect(state.defaultCountries).to.eql(['Ireland', 'Spain']);
    });
    it('should leave the list unchanged when it is empty', () => {
      const state = {
        defaultCountries: []
      };
      mutations[types.mutations.REMOVE_DEFAULT_COUNTRY](state, {country: 'Brazil'});
      expect(state.defaultCountries).to.eql([]);
    });
  });
});
