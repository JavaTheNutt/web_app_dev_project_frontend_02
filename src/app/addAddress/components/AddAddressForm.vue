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
        <v-flex v-if="hasSingleDefault">
          Default Country: {{defaultCountries[0]}}
        </v-flex>
        <v-flex v-else-if="hasNoDefault">
          <country-select
            :countries="fullCountries"
            @countryAdded="countrySelected"
          ></country-select>
        </v-flex>
        <v-flex v-else>
          <country-select
            :countries="defaultCountries"
            @countryAdded="countrySelected"></country-select>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>

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
          fullCountries: countryList().getNames()
        }
      };
    },
    computed: {
      ...mapGetters({defaultCountries: profileTypes.getters.getDefaultCountries}),
      hasSingleDefault() {
        return this.defaultCountries.length === 1;
      },
      hasNoDefault() {
        return this.defaultCountries.length === 0;
      }
    },
    methods: {
      countrySelected(country) {
        this.country = country;
      }
    }
  };
</script>
