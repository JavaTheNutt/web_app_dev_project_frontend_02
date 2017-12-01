<template>
  <v-dialog v-model="requestPasswordShown" max-width="700px">
   <v-card>
     <v-card-title primary-title>
       <h3 class="headline mb-0">{{heading}}</h3>
     </v-card-title>
     <v-container fluid grid-list-md text-xs-center>
       <v-layout column>
         <v-flex>
           <v-text-field
             name="passwordField"
             label="Enter your Password"
             hint="At least 6 characters"
             v-model="password"
             :type="passwordShown ? 'text' : 'password'"
             min="6"
             required
             :append-icon="passwordShown ? 'visibility_off': 'visibility'"
             :append-icon-cb="()=>(passwordShown = !passwordShown)"
             v-validate="'required|min:6'"
             data-vv-name="password"
             :error-messages="errors.collect('password')"
             ref="password"></v-text-field>
         </v-flex>
       </v-layout>
     </v-container>
   </v-card>
  </v-dialog>
</template>
<script>
  import Bus from '@/app/events/bus';

  export default {
    name: 'request-password-dialog',
    data() {
      return {
        requestPasswordShown: false,
        heading: 'Please enter your password to continue',
        passwordShown: false,
        password: ''
      };
    },
    created() {
      Bus.$on('request_password', showModal => this.requestPasswordShown = showModal);
      Bus.$on('hide_request_password', () => this.requestPasswordShown = false);
    }
  };
</script>
<style scoped>

</style>
