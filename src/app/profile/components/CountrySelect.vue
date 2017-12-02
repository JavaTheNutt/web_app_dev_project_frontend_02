<template>
  <v-select
    :items="countries"
    v-model="selectedCountry"
    label="Please select a country"
    autocomplete></v-select>
</template>
<script>
  export default {
    name: 'country-select',
    props:{countries: Array},
    data(){
      return{
        selectedCountry: ''
      };
    }
  };
</script>
