<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <country-select
          :countries="filteredCountries"></country-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import countryList from 'country-list';
  import {mapGetters} from 'vuex';
  import types from '../vuex/types';
  import CountrySelect from './CountrySelect';
  export default{
    name: 'manage-default-countries',
    components:{CountrySelect},
    data(){
      return{
        countries: countryList().getNames()
      };
    },
    computed:{
      ...mapGetters({defaultCountries: types.getters.getDefaultCountries}),
      filteredCountries(){
        return this.countries.filter(country => this.defaultCountries.indexOf(country) === -1);
      }
    }
  };
</script>
