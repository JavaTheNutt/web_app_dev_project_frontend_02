<template>
  <v-app light>
    <nav-container></nav-container>
    <v-btn fab color="accent" @click.stop="loginShown = !loginShown">login</v-btn>
    <router-view></router-view>
    <v-dialog v-model="loginShown" max-width="500px">
      <login-card></login-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import NavContainer from './widgets/navigation/nav/NavContainer';
  import authTypes from './auth/vuex/types';
  import LoginCard from './auth/components/LoginCard.vue';

  export default {
    components: {
      LoginCard,
      NavContainer
    },
    data(){
      return{
        loginShown: false
      };
    },
    created() {
      this.$store.dispatch(authTypes.actions.registerAuthStateListener);
    }
  };
</script>
