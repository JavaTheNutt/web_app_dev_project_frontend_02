<template>
  <v-app light>
    <nav-container></nav-container>
    <router-view></router-view>
    <login-dialog v-if="!loggedIn"></login-dialog>
    <confirm-auth-link></confirm-auth-link>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
  import NavContainer from './widgets/navigation/nav/NavContainer';
  import authTypes from './auth/vuex/types';
  import LoginCard from './auth/components/LoginCard.vue';
  import LoginDialog from './auth/components/LoginDialog.vue';
  import RequestPasswordDialog from './auth/components/RequestPasswordDialog';
  import Bus from './events/bus';
  import Snackbar from './widgets/snackbar/snackbar';
  import {mapGetters} from 'vuex';
  import ConfirmAuthLink from './auth/components/ConfirmAuthLink';
  import {addDefaultCountry} from './profile/service/defaultCountries';

  export default {
    components: {
      ConfirmAuthLink,
      Snackbar,
      LoginDialog,
      LoginCard,
      NavContainer,
      RequestPasswordDialog
    },
    computed:{
      ...mapGetters({loggedIn: authTypes.getters.getLoggedIn})
    },
    created() {
      this.$store.dispatch(authTypes.actions.registerAuthStateListener);

    }
  };
</script>
