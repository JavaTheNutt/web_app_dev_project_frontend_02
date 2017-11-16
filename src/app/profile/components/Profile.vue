<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <p class="headline text-xs-center">Welcome to your Profile page</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <p class="body-1">
          This is your personal profile page. There's not much here right now, but make sure to check back later!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        pageName: 'Profile'
      };
    },
    created() {

    }
  };
</script>
