<template>
  <div style="{margin:20px}">
    <password-login></password-login>
    <social-login></social-login>
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
