<template>
  <v-app light>
    <nav-container></nav-container>
    <router-view></router-view>
    <login-dialog v-if="!loggedIn"></login-dialog>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
  import NavContainer from './widgets/navigation/nav/NavContainer';
  import authTypes from './auth/vuex/types';
  import {handleAuthRedirect} from './auth/service/firebaseService';
  import LoginCard from './auth/components/LoginCard.vue';
  import LoginDialog from './auth/components/LoginDialog.vue';
  import Bus from './events/bus';
  import Snackbar from './widgets/snackbar/snackbar';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      Snackbar,
      LoginDialog,
      LoginCard,
      NavContainer
    },
    computed:{
      ...mapGetters({loggedIn: authTypes.getters.getLoggedIn})
    },
    created() {
      this.$store.dispatch(authTypes.actions.registerAuthStateListener);
      handleAuthRedirect();
    }
  };
</script>
