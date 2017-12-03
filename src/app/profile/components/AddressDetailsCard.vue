<template>
  <v-card>
    <v-container fluid>
      <v-layout align-center column class="pb-0 mb-0 pt-0 pb-0">
        <v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-title primary-title><h3 class="headline mb-0 pb-0 text-xs-center">Addresses</h3></v-card-title>
        </v-flex>
        <!--<v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-text subtitle><p class="subheading mt-0 pt-0 text-xs-center"><em>{{email}}</em></p></v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-avatar size="128px"><img :src="photoUrl" alt="profile picture"/></v-avatar>
        </v-flex>-->
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn fab color="accent" dark @click.stop="addAddress">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
    <add_address_dialog></add_address_dialog>
  </v-card>
</template>
<script>
  import Add_address_dialog from '../../addAddress/components/AddAddressDialog';
  import Bus from '@/app/events/bus';
  export default {
    components: {Add_address_dialog},
    name: 'address-details-card',
    data(){
      return {
        isEdit: false
      };
    },
    methods:{
      addAddress(){
        Bus.$emit('show_add_address');
      }
    }
  };
</script>
