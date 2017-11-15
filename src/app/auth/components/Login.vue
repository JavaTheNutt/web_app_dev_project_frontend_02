<template>
  <div>
    <password-login></password-login>
  </div>
</template>
<script>
  import {passwordLogin} from '../service/firebaseService';
  import * as Logger from 'loglevel';
  import PasswordLogin from './PasswordLogin';
  export default {
    components: {PasswordLogin},
    name: 'login',
    data(){
      return{};
    },
    methods: {
      async logIn() {
        Logger.info('log in clicked');
        const result = await passwordLogin();
        Logger.info(`login result: ${result}`);
      }
    }
  };
</script>
