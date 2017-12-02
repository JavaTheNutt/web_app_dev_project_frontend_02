<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <p class="headline text-xs-center">Welcome to your Profile page, {{firstName}}</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <user-details-card></user-details-card>
       </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {mapGetters} from 'vuex';
  import authTypes from '@/app/auth/vuex/types';
  import * as Logger from 'loglevel';
  import * as profileService from '../service/profileService';
  import UserDetailsCard from './UserDetailsCard';
  export default {
    components: {UserDetailsCard},
    data() {
      return {
        pageName: 'Profile'
      };
    },
    computed:{
      ...mapGetters({displayName: authTypes.getters.getDisplayName}),
      firstName(){
        Logger.info(`display name: ${this.displayName}`);
        return !this.displayName ? 'unknown': this.displayName.substring(0, this.displayName.indexOf(' '));
      }
    }
  };
</script>
