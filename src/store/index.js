

import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    userType: null,
    user: {
      fname: '',
    },
  },
  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    SET_USER_TYPE(state, userType) {
      state.userType = userType;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, { userType, fname }) {
      commit('SET_LOGIN_STATUS', true);
      commit('SET_USER_TYPE', userType);
      commit('SET_USER', { fname });
    },
    logout({ commit }) {
      commit('SET_LOGIN_STATUS', false);
      commit('SET_USER_TYPE', null);
      commit('SET_USER', { fname: '' });
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userType: state => state.userType,
    userName: state => state.user.fname,
  },
});

