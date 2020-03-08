import Vue from 'vue';
import Vuex from 'vuex';
import attachCognitoModule from '@vuetify/vuex-cognito-module';

Vue.use(Vuex);

const set = property => (store, payload) => (store[property] = payload);

const store = new Vuex.Store({
  state: {
    email: '',
    password: '',
    isLoading: false,
    user: null,
    snackbar: {},
  },
  mutations: {
    setEmail: set('email'),
    setPassword: set('password'),
    setIsLoading: set('isLoading'),
    setUser: set('user'),
    setSnackbar: set('snackbar'),
  },
  getters: {
    getEmail: state => {
      return state.email;
    },
    getPassword: state => {
      return state.password;
    },
  },
  actions: {
    async checkAuth({ commit, state, dispatch }) {
      return await dispatch('cognito/fetchSession');
    },
    handleError({ commit }, error) {
      commit('setSnackbar', {
        type: 'error',
        msg: error.message,
        timeout: 8000,
      });
    },
  },
  modules: {},
});

attachCognitoModule(store, {
  userPoolId: process.env.VUE_APP_USER_POOL_ID,
  identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
  userPoolWebClientId: process.env.VUE_APP_CLIENT_ID,
  region: process.env.VUE_APP_REGION
}, 'cognito');

export default store;
