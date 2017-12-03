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
            <add-address-form :formInView="isEdit" :defaultCountries="defaultCountries" @data-changed="dataChanged"
                              @data-invalidated="dataInvalidated"></add-address-form>
          </v-flex>
        </v-layout>
        <v-layout row v-if="hasPossibleAddresses">
          <v-flex xs12>
            <v-data-table
              v-model="selectedAddress"
              :headers="headers"
              :items="addresses"
              :pagination.sync="pagination"
              :hide-actions="!showPagination"
              :hide-header="true"
              item-key="text"
              class="elevation-1">
              <template slot="headers" slot-scope="props">
                <tr>
                  <th>{{props.header}}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td>{{props.item.text}}</td>
                </tr>
              </template>
            </v-data-table>
            <!--<select-address-table
              :addresses="addresses"></select-address-table>-->
          </v-flex>
        </v-layout>
        <v-layout row v-if="!loading">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.stop="closeDialog">Dismiss</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click.stop="submitAddress">Submit</v-btn>
        </v-layout>
        <v-layout row v-if="loading" align-center>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
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
  import SelectAddressTable from './DisplayAddressTable';
  /*
	import SelectAddressTable from './DisplayAddressTable';*/

  export default {
    components: {
      //SelectAddressTable,
      SelectAddressTable,
      AddAddressForm
    },
    name: 'add_address_dialog',
    data() {
      return {
        isEdit: false,
        addresses:[],
        addressDetails: {},
        formValid: false,
        possibleAddresses: [],
        formattedAddresses: [],
        saveCountry: false,
        loading: false,
        headers:[{header:'Address', value: 'address'}],
        selectedAddress:[],
        pagination:{
          rowsPerPage: 10
        }
      };
    },
    computed: {
      ...mapGetters({defaultCountries: profileTypes.getters.getDefaultCountries}),
      hasPossibleAddresses() {
        return this.addresses.length > 0;
      },
      showPagination(){
        return this.addresses.length >= 10;
      }
    },
    created() {
      Bus.$on('show_add_address', () => this.isEdit = true);
      Bus.$on('hide_add_address', () => this.isEdit = false);
    },
    methods: {
      dataChanged(data) {
        this.formValid      = true;
        this.addressDetails = data.addressDetails;
        this.saveCountry    = data.saveCountry;
      },
      dataInvalidated() {
        this.formValid = false;
      },
      closeDialog() {
        Object.assign(this.$data, this.$options.data.call(this));
        this.isEdit = false;
      },
      async submitAddress() {
        this.loading = true;
        if (this.saveCountry) {
          await addDefaultCountry(this.addressDetails.country);
        }
        const geocodeResult = await fetchGeocodedAddress(this.addressDetails);
        if (geocodeResult.error) {
          Logger.warn(`error during geocoding, ${JSON.stringify(geocodeResult.error)}`);
          return;
        }
        Logger.info(`fetched results: ${JSON.stringify(geocodeResult)}`);
        this.possibleAddresses  = geocodeResult.results;
        this.addresses = Object.assign([], this.possibleAddresses.map(address => ({
          text: address.formatted_address,
          loc: address.geometry.location,
          value: false
        })));
        this.formattedAddresses = fetchFormatted(geocodeResult.results);
        this.loading            = false;
      }
    }
  };
</script>
