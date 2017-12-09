<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <country-select
          :countries="filteredCountries"
          :has-button="true"
          @countryAdded="addCountry"
        ></country-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-chip v-for="country in currentCountries" :key="country" close @input="removeCountry(country)">
        {{country}}
      </v-chip>
    </v-layout>
  </v-container>
</template>
<script>
  import countryList from 'country-list';
  import {fetchDoc} from '../../service/firestore';
  import {fetchCountries} from '../service/profileService';
  import types from '../vuex/types';
  import CountrySelect from './CountrySelect';
  import * as Logger from 'loglevel';

  export default {
    name: 'manage-default-countries',
    components: {CountrySelect},
    data() {
      return {
        countries: countryList().getNames(),
        newCountries: [],
        initialCountries: [],
        countriesToBeRemoved: [],
        currentCountries:[]
      };
    },
    computed: {
      filteredCountries() {
        return this.countries.filter(country => this.currentCountries.indexOf(country) === -1);
      },
      countriesChanged() {
        const sortedDefault = Object.assign([], this.currentCountries).sort((a, b) => a >= b ? -1 : 1);
        const sortedInitial = this.initialCountries.sort((a, b) => a >= b ? -1 : 1);
        if (sortedDefault.length !== sortedInitial.length) {
          return true;
        }
        for (let i = 0; i < sortedInitial.length; i++) {
          if (sortedDefault[i] !== sortedInitial[i]) {
            return true;
          }
        }
        return false;
      }
    },
    methods: {
      addCountry(country) {
        this.currentCountries.push(country);
        this.triggerChange();
      },
      triggerChange(){
        this.$emit('countryAdded', this.countriesChanged, this.currentCountries);
      },
      removeCountry(country){
        this.currentCountries = this.currentCountries.filter(countryToBeRemoved => countryToBeRemoved !== country);
        this.triggerChange();
      }
    },
    async mounted() {
      const defaultCountries = await fetchCountries();
      Logger.info(`default countries: ${JSON.stringify(defaultCountries)}`);
      this.initialCountries = Object.assign([], defaultCountries);
      this.currentCountries = Object.assign([], this.initialCountries);
    }
  };
</script>
