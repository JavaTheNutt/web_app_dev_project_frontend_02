import Vue from 'vue';
import Vuex from 'vuex';
import {vuex} from '../app';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test';

export default new Vuex.Store({
  namespaced: true,
  modules: vuex,
  strict: debug
});
