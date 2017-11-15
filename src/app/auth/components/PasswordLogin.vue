<template>
  <form novalidate ref="loginForm" v-model="formValid">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="emailField"
            label="Enter your email address"
            v-model="email"
            type="email"
            required
            v-validate="'required|email'"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            ref="emailField"></v-text-field>
        </v-flex>
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
            ref="passwordField"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-btn :disabled="!formValid" color="warning" class="white--text" @click.stop="logIn">Log In</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  import {passwordLogin} from '../service/firebaseService';
  import * as Logger from 'loglevel';
  import {validate as emailValidator} from 'email-validator';
  import Bus from '@/app/events/bus';
//
  export default {
    name: 'password-login',
    data() {
      return {
        email: '',
        password: '',
        passwordShown: false
      };
    },
    methods: {
      async logIn() {
        Logger.info('log in clicked');
        if (this.formValid) {
          Logger.info('form has no errors');
          const result = await passwordLogin(this.email, this.password);
          //Bus.$emit('show_snack', result ? 'Login successful':'Login failed');
          Logger.info(`login result: ${result}`);
          return;
        }
        Logger.info('the form has errors');
      }
    },
    computed:{
      formValid(){
        return this.fields.email.dirty && this.fields.password.dirty && this.errors.collect('email').length + this.errors.collect('password').length === 0;
      }
    }
  };
</script>
<style scoped>
  .form-flex-container {
    display: flex;
    flex-direction: column;
  }

  .loginForm {
    margin: 20px;
  }
</style>
