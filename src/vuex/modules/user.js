import * as types from '../type';

const state = {
  // 用户登录信息
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
};

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({
    commit
  }, res) {
    localStorage.setItem('userInfo', JSON.stringify(res));
    commit(types.SET_USER_INFO, res);
    console.log('用户信息录入');
  },
};

const getters = {
  userInfo: state => state.userInfo,
};

const mutations = {
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res;
  },
};

export default {
  state, //状态
  actions, //提交mutations,可做异步操作
  getters, //对数据进行一些操作
  mutations //对状态做更改（同步）
};
