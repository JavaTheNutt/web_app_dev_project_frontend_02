<template>
  <v-card class="elevation-16">
    <v-container fluid>
      <v-layout align-center column class="pb-0 mb-0 pt-0 pb-0">
        <v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-title primary-title><h3 class="headline mb-0 pb-0 text-xs-center">Addresses</h3></v-card-title>
        </v-flex>
      </v-layout>
      <v-card v-if="addresses.length >0" v-for="address in addresses" :key="address.text" class="my-5 elevation-10">
        <v-container fluid>
          <v-layout align-center column>
            <v-flex xs12>
              <v-card-title primary-title class="text-xs-center"><h3 class="headline">{{address.text}}</h3>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="deleteAddressClicked(address)">
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
      <v-card-text v-if="addresses.length === 0" class="text-xs-center"><p>There are no addresses to display</p></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn fab color="accent" dark @click.stop="addAddress">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
    <add_address_dialog @address_selected="saveAddress" :close="itemSaved"></add_address_dialog>
    <v-layout row justify-center>
      <v-dialog v-model="confirmAddressDeletion" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Delete Address?</v-card-title>
          <v-card-text>Are you sure you wish to delete this address?</v-card-text>
          <v-card-text>{{addressToBeDeleted.text}}</v-card-text>
          <v-card-actions v-if="!confirmDeleteLoading">
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" flat @click.native="handleConfirmDeletion(false)">Cancel</v-btn>
            <v-btn color="primary darken-1" flat @click.native="handleConfirmDeletion(true)">Delete</v-btn>
          </v-card-actions>
          <v-card-actions v-if="confirmDeleteLoading">
            <v-spacer></v-spacer>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-card>
</template>
<script>
  import Add_address_dialog from '../../addAddress/components/AddAddressDialog';
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';
  import * as profileService from '../service/profileService';
  import {fetchCollectionSync} from '../../service/firestore';
  import firebase from 'firebase';
  import {mapGetters} from 'vuex';
  import authTypes from '@/app/auth/vuex/types';

  export default {
    components: {Add_address_dialog},
    name: 'address-details-card',
    data() {
      return {
        isEdit: false,
        addresses: [],
        confirmAddressDeletion: false,
        addressToBeDeleted: {},
        itemSaved: false,
        confirmDeleteLoading: false,
        unsubscribeAddresses(){}
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
          fetchCollectionSync('addresses', this.snapshotUpdated);
          /*profileService.fetchUserReference().collection('addresses').onSnapshot(doc => {
            this.addresses = [];
            doc.forEach(address => this.addresses.push(Object.assign({
              mapShown: false,
              id: address.id
            }, address.data())));
          });*/
        }
      }
    },
    methods: {
      addAddress() {
        this.itemSaved = false;
        Bus.$emit('show_add_address');
      },
      async saveAddress(address) {
        Logger.info(`address: ${JSON.stringify(address)}`);
        await  profileService.addAddress(address);
        this.itemSaved = true;
      },
      async deleteAddress(addressId) {
        this.confirmDeleteLoading = true;
        Logger.info(`attempting to delete address with id ${addressId}`);
        await profileService.deleteAddress(addressId);
        this.addressToBeDeleted = {};
        this.confirmDeleteLoading = false;
        this.confirmAddressDeletion = false;
      },
      async handleConfirmDeletion(isDelete) {
        if (isDelete) {
          await this.deleteAddress(this.addressToBeDeleted.id);
        }
        this.confirmAddressDeletion = false;
      },
      deleteAddressClicked(address) {
        this.addressToBeDeleted = address;
        this.confirmAddressDeletion = true;
      },
      snapshotUpdated(doc){
        this.addresses = [];
        doc.forEach(address => this.addresses.push(Object.assign({
          mapShown: false,
          id: address.id
        }, address.data())));
      }
    },
    mounted() {
      if (this.loggedIn) {
        this.unsubscribeAddresses = fetchCollectionSync('addresses', this.snapshotUpdated);
        /*profileService.fetchUserReference().collection('addresses').onSnapshot(doc => {
          this.addresses = [];
          doc.forEach(address => this.addresses.push(Object.assign({
            mapShown: false,
            id: address.id
          }, address.data())));
        });*/
      }
    },
    destroyed(){
      Logger.info('Address details card destroyed');
      this.unsubscribeAddresses();
      //profileService.unsyncFromCollection('addresses');
    }
  };
</script>
