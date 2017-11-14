<template>
  <v-btn color="accent" @click="logIn">Click to login</v-btn>
</template>
<script>
  import {passwordLogin} from '../service/firebaseService';
  import * as Logger from 'loglevel';
  export default {
    name: 'login',
    methods: {
      async logIn() {
        Logger.info('log in clicked');
        const result = await passwordLogin();
        Logger.info(`login result: ${result}`);
      }
    }
  };
</script>
