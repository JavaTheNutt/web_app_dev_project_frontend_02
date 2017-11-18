<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Login/Sign Up to access this site</h3>
    </v-card-title>
    <div class="dialogCard">
      <login></login>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click.stop="closeClicked">close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Login from './Login';
  import Bus from '@/app/events/bus';
  export default{
    name: 'login-card',
    components: {Login},
    methods:{
      closeClicked(){
        Bus.$emit('login_clicked', false);
      }
    }
  };
</script>
<style scoped>
  .dialogCard{
    padding: 20px;
  }
</style>
