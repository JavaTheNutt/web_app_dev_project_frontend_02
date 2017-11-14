<template>
  <v-app light>
    <nav-container></nav-container>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import NavContainer from './widgets/navigation/nav/NavContainer';
  import authTypes from './auth/vuex/types';
  export default {
    components: {
      NavContainer
    },
    created(){
      this.$store.dispatch(authTypes.actions.registerAuthStateListener);
    }
  };
</script>
