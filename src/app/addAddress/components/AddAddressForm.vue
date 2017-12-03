<template>
  <form novalidate>
    <v-container fluid grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="address01Field"
            label="Address Line One"
            v-model="addressDetails.address01"
            required
            data-vv-name="address01"
            v-validate="'required|min:5'"
            :error-messages="errors.collect('address01')"
            type="text"
            @input="emitFormData"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            name="address02Field"
            label="Address Line Two"
            v-model="addressDetails.address02"
            type="text"
            @input="emitFormData"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            name="address03Field"
            label="Address Line Three"
            v-model="addressDetails.address03"
            type="text"
            @input="emitFormData"
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
        <v-flex v-if="showCountrySelect">
          <country-select
            :countries="countriesToShow"
            @countryAdded="countrySelected"
          ></country-select>
        </v-flex>
        <v-flex v-if="addressDetails.country !== ''">
          <p><strong>Selected Country</strong> <em>{{addressDetails.country}}</em></p>
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
          address01: '',
          address02: '',
          address03: '',
          country: '',
        },
        fullCountries: countryList().getNames(),
        newCountrySelected: false,
        saveAsDefault: false
      };
    },
    props: {
      formInView: Boolean,
      defaultCountries: Array
    },
    computed: {
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
      },
      address01HasNoErrors() {
        return this.errors.collect('address01').length === 0 && this.fields.address01.dirty;
      },
      formValid() {
        return this.address01HasNoErrors && this.addressDetails.country !== '';
      }
    },
    mounted() {
      this.saveAsDefault = this.hasNoDefault;
      this.$nextTick(function () {
        this.addressDetails.country = this.defaultCountries.length === 1 ? this.defaultCountries[0] : '';
      });
    },
    watch: {
      newCountrySelected(newVal) {
        this.saveAsDefault = newVal;
        if (!newVal) {
          this.addressDetails.country = this.defaultCountries.length === 1 ? this.defaultCountries[0] :
            this.addressDetails.country;
        }
      },
      formInView(newVal) {
        if (!newVal) {
          return this.resetValues();
        }
        return this.addressDetails.country = this.defaultCountries.length > 0 ? this.defaultCountries[0] : '';
      }
    },
    methods: {
      countrySelected(country) {
        this.addressDetails.country = country;
        this.emitFormData();
      },
      resetValues() {
        //found at: https://stackoverflow.com/a/40856312/4108556 resets data object to initial
        Object.assign(this.$data, this.$options.data.call(this));
        //found at: https://github.com/baianat/vee-validate/issues/285
        this.$nextTick(function () {
          const self = this;
          Object.keys(this.fields).some(key => {
            self.$validator.flag(key, {
              untouched: true,
              dirty: false
            });
          });
          this.errors.clear();
        });
      },
      emitFormData() {
        if (this.formValid) {
          Logger.info('form is valid, emiting data');
          return this.$emit('data-changed', this.addressDetails);
        }
        return this.$emit('data-invalidated');
      }
    }
  };
</script>
