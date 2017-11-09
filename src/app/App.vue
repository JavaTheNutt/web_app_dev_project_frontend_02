<template>
  <v-app light>
  <nav-container></nav-container>
    <v-btn fab color="accent"></v-btn>
    <v-btn fab color="secondary"></v-btn>
    <v-btn fab color="warning"></v-btn>
    <v-btn fab color="error"></v-btn>
    <v-btn fab color="info"></v-btn>
    <v-btn fab color="success"></v-btn>
  </v-app>
</template>

<script>
  import NavContainer from './widgets/navigation/nav/NavContainer';
  export default {
    components: {
      NavContainer},
    data() {
      return {

      };
    }
  };
</script>
