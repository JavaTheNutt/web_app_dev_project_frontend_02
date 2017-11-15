<template>
  <v-dialog v-model="loginShown" max-width="700px">
    <div><login-card></login-card></div>
  </v-dialog>
</template>
<script>
  import LoginCard from './LoginCard';
  import Bus from '@/app/events/bus';
  export default{
    name: 'login-dialog',
    components:{LoginCard},
    data(){
      return {
        loginShown: false
      };
    },
    created(){
      Bus.$on('login_clicked', showModal => this.loginShown = showModal);
    }
  };
</script>
<style scoped>

</style>
