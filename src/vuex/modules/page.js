import * as types from '../type';

const state = {
  isLoading: false,
  loadingText: '加载中',
  direction: 'forward'
};

const mutations = {
  [types.SET_PAGE_LOADING](state, payload) {
    state.isLoading = payload.isLoading;
    if (payload.text) {
      state.loadingText = payload.text
    } else {
      state.loadingText = '加载中';
    }
  },
  [types.SET_PAGE_DIRECTION](state, payload) {
    state.direction = payload.direction
  }
};

const actions = {
  /**
   * 设置页面加载状态
   */
  setPageLoading({
    commit
  }, payload) {
    commit(types.SET_PAGE_LOADING, payload);
  },
  /**
   * 设置页面加载状态
   */
  setPageDirection({
    commit
  }, payload) {
    commit(types.SET_PAGE_DIRECTION, payload);
  }
};

export default {
  state, //状态
  mutations, //对状态做更改（同步）
  actions, //提交mutations,可做异步操作
};
