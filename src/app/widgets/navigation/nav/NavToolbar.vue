<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="emitClick"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="accent" @click.stop="loginClicked">Login</v-btn>
  </v-toolbar>
</template>
<script>
  import NavBus from './nav_bus';
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';

  export default {
    name: 'nav-toolbar',
    methods: {
      emitClick() {
        NavBus.$emit('leftNavToggled');
      },
      loginClicked(){
        Logger.info('login clicked');
        Bus.$emit('login_clicked', true);
      }
    }
  };
</script>
