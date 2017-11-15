<template>
  <v-app light>
    <nav-container></nav-container>
    <v-btn fab color="accent" @click.stop="loginClicked">login</v-btn>
    <router-view></router-view>
    <login-dialog></login-dialog>
  </v-app>
</template>

<script>
  import NavContainer from './widgets/navigation/nav/NavContainer';
  import authTypes from './auth/vuex/types';
  import LoginCard from './auth/components/LoginCard.vue';
  import LoginDialog from './auth/components/LoginDialog.vue';
  import Bus from './events/bus';

  export default {
    components: {
      LoginDialog,
      LoginCard,
      NavContainer
    },
    data(){
      return{
        loginShown: false
      };
    },
    methods:{
      loginClicked(){
        Bus.$emit('login_clicked', true);
      }
    },
    created() {
      this.$store.dispatch(authTypes.actions.registerAuthStateListener);
    }
  };
</script>
