

import { createStore } from 'vuex';


export default createStore({
  state: {
    isLoggedIn: false,
    userType: null,
  },
  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    SET_USER_TYPE(state, userType) {
      state.userType = userType;
    }
  },
  actions: {
    login({ commit },userType) {
     
      commit('SET_LOGIN_STATUS', true);
      commit('SET_USER_TYPE',userType);
    },
    logout({ commit }) {
   
      commit('SET_LOGIN_STATUS', false);
      commit('SET_USER_TYPE', null);
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userType: state=> state.userType,
  },
});