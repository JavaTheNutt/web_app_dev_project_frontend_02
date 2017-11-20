<template>
  <div>
    <div class="btn-container">
      <v-btn dark color="error" fab @click.stop="signInWithGoogle"><i class="fa fa-google fa-3x"></i></v-btn>
      <v-btn dark color="primary" @click.stop="signInWithFacebook" fab><i class="fa fa-facebook fa-3x"></i></v-btn>
    </div>
  </div>
</template>
<script>
import {signinWithGoogle, signinWithFacebook} from '../service/firebaseService';
export default {
  name: 'social-login',
  methods:{
    async signInWithGoogle(){
      await signinWithGoogle();
    },
    async signInWithFacebook(){
      await signinWithFacebook();
    }
  }
};
</script>
<style scoped>
.btn-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
