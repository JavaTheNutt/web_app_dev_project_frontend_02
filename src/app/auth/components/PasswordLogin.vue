<template>
  <form novalidate>
    <div class="form-flex-container">
      <div class="form-flex-container--field"><v-text-field
        name="emailField"
        label="Enter your email address"
        v-model="email"
        type="email"
        :rules="[validationRules.required, validationRules.emailValidator]"></v-text-field></div>
      <div class="form-flex-container--field"><v-text-field
        name="passwordField"
        label="Enter your Password"
        hint="At least 6 characters"
        v-model="password"
        :type="passwordShown ? 'text' : 'password'"
        min="6"
        :append-icon="passwordShown ? 'visibility_off': 'visibility'"
        :append-icon-cb="()=>(passwordShown = !passwordShown)"
        :rules="[validationRules.required, validationRules.passwordLength]"></v-text-field></div>
      <v-btn color="accent" dark @click="logIn">Click to login</v-btn>
    </div>
  </form>
</template>
<script>
  import {passwordLogin} from '../service/firebaseService';
  import * as Logger from 'loglevel';
  import {validate as emailValidator} from 'email-validator';

  export default {
    name: 'password-login',
    data() {
      return {
        email: '',
        password: '',
        passwordShown: false,
        validationRules: {
          required: value => !!value || 'Field is required',
          emailValidator: value => emailValidator(value) || 'Email is in invalid format',
          passwordLength: value => value.length > 5 || 'Password must be at least 6 characters'
        }
      };
    },
    methods: {
      async logIn() {
        Logger.info('log in clicked');
        const result = await passwordLogin();
        Logger.info(`login result: ${result}`);
      }
    }
  };
</script>
<style scoped>
  .form-flex-container{
    display: flex;
  }
  @media all and (max-width: 500px) {
    .form-flex-container {
      flex-direction: column;
    }
    .form-flex-container--field {
      width: 100%;
      flex-direction: column;
    }
  }

  @media all and (min-width: 500px) {
    .form-flex-container {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .form-flex-container--field {
      margin: 10px;
      width: 40%;
    }
  }
</style>
