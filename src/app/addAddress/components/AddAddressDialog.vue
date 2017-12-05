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
            <add-address-form :formInView="isEdit" :defaultCountries="defaultCountries" :cachedDetails="addressDetails" @data-changed="dataChanged"
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
                  <th>{{props.text}}</th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="handleTableRowSelection(props)">
                  <td>
                    <v-checkbox
                      color="primary"
                      hide-details
                      :input-value="props.selected"></v-checkbox>
                  </td>
                  <td>{{props.item.text}}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
        <v-layout row v-if="!loading">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.stop="closeDialog">Dismiss</v-btn>
          <v-btn flat color="accent" v-if="hasPossibleAddresses" @click.stop="addresses=[]">Back</v-btn>
          <v-btn color="primary" :disabled="submitDisabled" @click.stop="submitAddress">Submit</v-btn>
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
        addresses: [],
        addressDetails: {},
        formValid: false,
        saveCountry: false,
        loading: false,
        headers: [{
          text: 'Address',
          value: 'address'
        }],
        selectedAddress: [],
        pagination: {
          rowsPerPage: 10
        },
        address: [],
        formData:{}
      };
    },
    props:{close: Boolean},
    watch:{
      close(newVal){
        if(newVal){
          this.isEdit = false;
        }
      }
    },
    computed: {
      ...mapGetters({defaultCountries: profileTypes.getters.getDefaultCountries}),
      hasPossibleAddresses() {
        return this.addresses.length > 0;
      },
      showPagination() {
        return this.addresses.length >= 10;
      },
      submitDisabled(){
        return (!this.hasPossibleAddresses && !this.formValid) || (this.hasPossibleAddresses && this.selectedAddress.length === 0);
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
        if(!this.hasPossibleAddresses){
          await this.geocodeAddress();
          this.loading   = false;
        }else{
          Logger.info(`emitting address to parent: ${JSON.stringify(this.selectedAddress[0])}`);
          this.$emit('address_selected', this.selectedAddress[0]);
        }
      },
      async geocodeAddress() {
        if (this.saveCountry) {
          await addDefaultCountry(this.addressDetails.country);
        }
        const geocodeResult = await fetchGeocodedAddress(this.addressDetails);
        if (geocodeResult.error) {
          Logger.warn(`error during geocoding, ${JSON.stringify(geocodeResult.error)}`);
          return;
        }
        Logger.info(`fetched results: ${JSON.stringify(geocodeResult)}`);
        this.addresses = Object.assign([], geocodeResult.results.map(address => ({
          text: address.formatted_address,
          loc: address.geometry.location,
          value: false
        })));
      },
      // eslint-disable-next-line consistent-return
      handleTableRowSelection(props) {
        if (this.selectedAddress.length === 0) {
          return props.selected = true;
        }
        if (this.selectedAddress[0].text === props.item.text) {
          return this.selectedAddress = [];
        }
        this.selectedAddress = [];
        //allow ui to refresh before updating model to allow previous to be removed
        this.$nextTick(() => props.selected = true);
      }
    }
  };
</script>
