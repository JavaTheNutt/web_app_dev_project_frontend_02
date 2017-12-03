<template>
  <v-dialog v-model="isEdit" max-width="700" persistent>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title primary-title><h3 class="headline mb-0 text-xs-center">Enter your address details</h3>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row v-if="!hasPossibleAddresses">
          <v-flex xs12>
            <add-address-form :formInView="isEdit" :defaultCountries="defaultCountries" @data-changed="dataChanged" @data-invalidated="dataInvalidated"></add-address-form>
          </v-flex>
        </v-layout>
        <v-layout row v-if="hasPossibleAddresses">
          <v-flex xs12>
            <p v-for="address in formattedAddresses" :key="address">{{address}}</p>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.stop="closeDialog">Dismiss</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click.stop="submitAddress">Submit</v-btn>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
  import AddAddressForm from './AddAddressForm';
  import Bus from '@/app/events/bus';
  import {mapGetters} from 'vuex';
  import profileTypes from '@/app/profile/vuex/types';
  import {addDefaultCountry} from '@/app/profile/service/profileService';
  import {fetchGeocodedAddress, fetchFormatted} from '../service/geocoding';
  import * as Logger from 'loglevel';

  export default {
    components: {AddAddressForm},
    name: 'add_address_dialog',
    data() {
      return {
        isEdit: false,
        addressDetails:{},
        formValid: false,
        possibleAddresses:[],
        formattedAddresses:[],
        saveCountry: false
      };
    },
    computed:{
      ...mapGetters({defaultCountries: profileTypes.getters.getDefaultCountries}),
      hasPossibleAddresses(){
        return this.possibleAddresses.length > 0;
      }
    },
    created() {
      Bus.$on('show_add_address', () => this.isEdit = true);
      Bus.$on('hide_add_address', () => this.isEdit = false);
    },
    methods:{
      dataChanged(data){
        this.formValid = true;
        this.addressDetails = data.addressDetails;
        this.saveCountry = data.saveCountry;
      },
      dataInvalidated(){
        this.formValid = false;
      },
      closeDialog(){
        Object.assign(this.$data, this.$options.data.call(this));
        this.isEdit = false;
      },
      async submitAddress(){
        if(this.saveCountry){
          await addDefaultCountry(this.addressDetails.country);
        }
        const geocodeResult = await fetchGeocodedAddress(this.addressDetails);
        if(geocodeResult.error){
          Logger.warn(`error during geocoding, ${JSON.stringify(geocodeResult.error)}`);
          return;
        }
        Logger.info(`fetched results: ${JSON.stringify(geocodeResult)}`);
        this.possibleAddresses = geocodeResult.results;
        this.formattedAddresses = fetchFormatted(geocodeResult.results);
      }
    }
  };
</script>
