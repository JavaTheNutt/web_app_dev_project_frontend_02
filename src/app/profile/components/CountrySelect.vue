<template>
  <v-container>
    <v-layout row>
      <v-select
        :items="countries"
        v-model="selectedCountry"
        label="Please select a country"
        autocomplete
      ></v-select>
      <v-btn :disabled="!validCountry" color="primary" flat @click.stop="addCountry"><v-icon>done</v-icon></v-btn>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'country-select',
    props: {countries: Array},
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
      }
    }
  };
</script>
