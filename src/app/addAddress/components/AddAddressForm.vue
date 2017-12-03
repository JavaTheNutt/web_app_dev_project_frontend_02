<template>
  <form novalidate>
    <v-container fluid grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="address01Field"
            label="Address Line One"
            v-model="addressDetails.line01"
            required
            data-vv-name="address01"
            v-validate="'required|min:5'"
            :error-messages="errors.collect('address01')"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            name="address02Field"
            label="Address Line Two"
            v-model="addressDetails.line02"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            name="address03Field"
            label="Address Line Three"
            v-model="addressDetails.line03"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-layout row>
            <v-checkbox label="Select new country" v-model="newCountrySelected" color="primary"
                        :disabled="hasNoDefault"></v-checkbox>
            <v-checkbox label="Save as default" v-model="saveAsDefault" color="primary"
                        :disabled="!saveAsDefaultEnabled"></v-checkbox>
          </v-layout>
        </v-flex>
        <v-flex v-if="hasSingleDefault && !showCountrySelect">
          Default Country: {{defaultCountries[0]}}
        </v-flex>
        <v-flex v-else-if="showCountrySelect">
          <country-select
            :countries="countriesToShow"
            @countryAdded="countrySelected"
          ></country-select>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  import * as Logger from 'loglevel';
  import countryList from 'country-list';
  import {mapGetters} from 'vuex';
  import profileTypes from '@/app/profile/vuex/types';
  import CountrySelect from '../../profile/components/CountrySelect';

  export default {
    components: {CountrySelect},
    name: 'add-address-form',
    data() {
      return {
        addressDetails: {
          line01: '',
          line02: '',
          line03: '',
          country: '',
        },
        fullCountries: countryList().getNames(),
        newCountrySelected: false,
        saveAsDefault: false
      };
    },
    computed: {
      ...mapGetters({defaultCountries: profileTypes.getters.getDefaultCountries}),
      hasSingleDefault() {
        return this.defaultCountries.length === 1;
      },
      hasNoDefault() {
        return this.defaultCountries.length === 0;
      },
      countriesToShow() {
        return this.newCountrySelected || this.hasNoDefault ? this.filteredCountries : this.defaultCountries;
      },
      showCountrySelect() {
        return !this.hasSingleDefault || this.newCountrySelected;
      },
      filteredCountries() {
        return this.fullCountries.filter(country => this.defaultCountries.indexOf(country) === -1);
      },
      saveAsDefaultEnabled() {
        return this.hasNoDefault || (!this.hasNoDefault && this.newCountrySelected);
      }
    },
    mounted(){
      this.saveAsDefault = this.hasNoDefault;
    },
    watch: {
      newCountrySelected(newVal) {
        this.saveAsDefault = newVal;
      }
    },
    methods: {
      countrySelected(country) {
        this.country = country;
      }
    }
  };
</script>
