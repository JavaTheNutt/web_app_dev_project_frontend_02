<template>
  <v-card class="elevation-16">
    <v-container fluid>
      <v-layout align-center column class="pb-0 mb-0 pt-0 pb-0">
        <v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-title primary-title><h3 class="headline mb-0 pb-0 text-xs-center">Addresses</h3></v-card-title>
        </v-flex>
      </v-layout>
      <v-card  v-if="addresses.length >0" v-for="address in addresses" :key="address.text">
        <v-container fluid>
          <v-layout align-center>
            <v-flex xs12>
              <v-card-title primary-title class="text-xs-center"><h3 class="headline">{{address.text}}</h3></v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="deleteAddress(address.id)">
                  <v-icon>delete forever</v-icon>
                </v-btn>
                <v-btn icon @click.stop="address.mapShown = !address.mapShown">
                  <v-icon>{{address.mapShown ? 'visibility' : 'visibility off'}}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
        <v-slide-y-transition>
          <v-card-media v-show="address.mapShown">
            <gmap-map :center="{lat:address.loc.lat, lng:address.loc.lng}" :zoom="20" style="height:300px; width:100%">
              <gmap-marker :position="{lat:address.loc.lat, lng:address.loc.lng}">
              </gmap-marker>
            </gmap-map>
          </v-card-media>
        </v-slide-y-transition>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn fab color="accent" dark @click.stop="addAddress">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
    <add_address_dialog @address_selected="saveAddress"></add_address_dialog>
  </v-card>
</template>
<script>
  import Add_address_dialog from '../../addAddress/components/AddAddressDialog';
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';
  import * as profileService from '../service/profileService';
  import firebase from 'firebase';
  import {mapGetters} from 'vuex';
  import authTypes from '@/app/auth/vuex/types';

  export default {
    components: {Add_address_dialog},
    name: 'address-details-card',
    data() {
      return {
        isEdit: false,
        addresses: []
      };
    },
    computed: {
      ...mapGetters({loggedIn: authTypes.getters.getLoggedIn})
    },
    watch: {
      //if this page is loaded before login state is updated, attempts to attach a listener to the collection will fail
      loggedIn(newVal) {
        Logger.info('logged in watcher triggered in address details component');
        if (newVal) {
          profileService.fetchUserReference().collection('addresses').onSnapshot(doc => {
            this.addresses = [];
            doc.forEach(address => this.addresses.push(Object.assign({mapShown: false, id: address.id}, address.data())));
          });
        }
      }
    },
    methods: {
      addAddress() {
        this.isEdit = true;
        Bus.$emit('show_add_address');
      },
      saveAddress(address) {
        Logger.info(`address: ${JSON.stringify(address)}`);
        profileService.addAddress(address);
      },
      deleteAddress(addressId){
        Logger.info(`attempting to delete address with id ${addressId}`);
        profileService.deleteAddress(addressId);
      }
    },
    mounted(){
      if(this.loggedIn){
        profileService.fetchUserReference().collection('addresses').onSnapshot(doc => {
          this.addresses = [];
          doc.forEach(address => this.addresses.push(Object.assign({mapShown: false, id: address.id}, address.data())));
        });
      }
    }
  };
</script>
