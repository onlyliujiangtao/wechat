import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import page from './modules/page';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { //模块
    user,
    page
  }
});
