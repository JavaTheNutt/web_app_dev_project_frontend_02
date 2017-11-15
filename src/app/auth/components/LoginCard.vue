<template>
  <v-card>
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
