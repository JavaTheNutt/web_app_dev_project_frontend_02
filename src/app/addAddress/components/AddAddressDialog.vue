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
        <v-layout row>
          <v-flex xs12>
            <add-address-form :formInView="isEdit" :defaultCountries="defaultCountries"></add-address-form>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.stop="isEdit = false">Dismiss</v-btn>
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
  export default {
    components: {AddAddressForm},
    name: 'add_address_dialog',
    data() {
      return {
        isEdit: false
      };
    },
    computed:{
      ...mapGetters({defaultCountries: profileTypes.getters.getDefaultCountries}),
    },
    created() {
      Bus.$on('show_add_address', () => this.isEdit = true);
      Bus.$on('hide_add_address', () => this.isEdit = false);
    },
    watch:{
      /*isEdit(){
        if(!this.isEdit) this.$emit('close');
      }*/
    }
  };
</script>
