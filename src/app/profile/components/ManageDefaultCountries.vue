<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <country-select
          :countries="filteredCountries"
          @countryAdded="addCountry"
        ></country-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-chip v-for="country in mergedCountries" :key="country">{{country}}</v-chip>
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
        countries: countryList().getNames(),
        newCountries: [],
        initialCountries: []
      };
    },
    computed:{
      ...mapGetters({defaultCountries: types.getters.getDefaultCountries}),
      filteredCountries(){
        return this.countries.filter(country => this.mergedCountries.indexOf(country) === -1);
      },
      mergedCountries(){
        return this.defaultCountries.concat(this.newCountries);
      },
      countriesChanged(){
        const sortedDefault = Object.assign([], this.newCountries).sort((a, b) =>  a >= b ? -1 : 1);
        const sortedInitial = this.initialCountries.sort((a, b) =>  a >= b ? -1 : 1);
        if(sortedDefault.length !== sortedInitial.length){
          return true;
        }
        for(let i = 0; i < sortedInitial.length; i++){
          if(sortedDefault[i] !== sortedInitial[i]) return true;
        }
        return false;
      }
    },
    methods:{
      addCountry(country){
        this.newCountries.push(country);
        this.$emit('countryAdded', this.countriesChanged);
      }
    },
    mounted(){
      this.initialCountries = Object.assign([], this.defaultCountries);
    }
  };
</script>
