<template>
  <v-app light>
    <nav-container></nav-container>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import NavContainer from './widgets/navigation/nav/NavContainer';
  export default {
    components: {
      NavContainer
    }
  };
</script>
