<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <p class="headline text-xs-center">Welcome to your Profile page</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <p class="body-1">
          Welcome to your personal profile page, {{firstName}}. There's not much here right now, but make sure to check back later!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {mapGetters} from 'vuex';
  import authTypes from '@/app/auth/vuex/types';
  import * as Logger from 'loglevel';
  export default {
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
