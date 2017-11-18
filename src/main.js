// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import './stylus/main.styl';
import App from './app/App';
import router from './router';
import store from './store';
import firebase from 'firebase';

import http from './app/service/http';
import * as Logger from 'loglevel';
require('font-awesome/css/font-awesome.css');
Logger.setLevel('trace');
Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.prototype.$http      = http;
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
