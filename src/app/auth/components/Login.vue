<template>
  <div style="{margin:20px}">
    <v-container grid-list-xl>
      <v-layout>
        <v-flex>
          <password-login></password-login>
          <social-login></social-login>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import {passwordLogin} from '../service/firebaseService';
  import * as Logger from 'loglevel';
  import PasswordLogin from './PasswordLogin';
  import SocialLogin from './SocialLogin.vue';
  export default {
    components: {
      SocialLogin,
      PasswordLogin},
    name: 'login'
  };
</script>
