<template>
  <v-card>
    <div class="dialogCard">
      <login></login>
    </div>
  </v-card>
</template>
<script>
  import Login from './Login';
  export default{
    name: 'login-card',
    components: {Login}
  };
</script>
<style scoped>
  .dialogCard{
    padding: 20px;
  }
</style>
