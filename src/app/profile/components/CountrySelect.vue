<template>
  <v-container>
    <v-layout row>
      <v-select
        :items="countries"
        v-model="selectedCountry"
        label="Please select a country"
        autocomplete
        @input="inputTriggered"
      ></v-select>
      <v-btn v-if="hasButton" :disabled="!validCountry" color="primary" flat @click.stop="addCountry"><v-icon>done</v-icon></v-btn>
    </v-layout>
  </v-container>
</template>
<script>
  import * as Logger from 'loglevel';
  export default {
    name: 'country-select',
    props: {countries: Array, hasButton: Boolean},
    data() {
      return {
        selectedCountry: ''
      };
    },
    computed:{
      validCountry(){
        return this.countries.indexOf(this.selectedCountry) !== -1;
      }
    },
    methods:{
      addCountry(){
        this.$emit('countryAdded', this.selectedCountry);
      },
      inputTriggered(){
        Logger.info(`input triggered, selected country: ${this.selectedCountry}`);
        if(!this.hasButton) this.addCountry();
      }
    }
  };
</script>
