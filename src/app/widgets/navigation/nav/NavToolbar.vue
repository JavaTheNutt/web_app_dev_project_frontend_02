<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="emitClick" v-if="loggedIn"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Finance Tracker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="warning" @click.stop="loginClicked" v-if="!loggedIn" name="loginButton">Login</v-btn>
    <v-menu bottom left v-if="loggedIn">
      <v-btn icon slot="activator" dark>
        <v-icon id="openSignOutMenu">more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click.stop="signOutClicked">
          <v-list-tile-title id="clickSignOut">Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-avatar v-if="loggedIn"><img :src="photoUrl" alt="profile picture"/> </v-avatar>
  </v-toolbar>
</template>
<script>
  import NavBus from './nav_bus';
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';
  import {mapGetters} from 'vuex';
  import authTypes from '@/app/auth/vuex/types';
  import {logOut} from '@/app/auth/service/firebaseService';
  import defaultProfilePic from '@/assets/defaultProf.png';
  export default {
    name: 'nav-toolbar',
    computed:{
      ...mapGetters({loggedIn: authTypes.getters.getLoggedIn, userPhotoUrl: authTypes.getters.getPhotoUrl}),
      photoUrl(){
        return !this.userPhotoUrl || this.userPhotoUrl === '' ? defaultProfilePic: this.userPhotoUrl  ;
      }
    },
    methods: {
      emitClick() {
        NavBus.$emit('leftNavToggled');
      },
      loginClicked(){
        Logger.info('login clicked');
        Bus.$emit('login_clicked', true);
      },
      signOutClicked(){
        Logger.info('sign out clicked');
        logOut();
      }
    }
  };
</script>
