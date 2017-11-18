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
import {firebaseKey, logLevel} from './app/config/index';
import http from './app/service/http';
import * as Logger from 'loglevel';
require('font-awesome/css/font-awesome.css');
Logger.setLevel(logLevel);
Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.prototype.$http      = http;
firebase.initializeApp(firebaseKey);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
