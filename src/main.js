import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

let app;

store.dispatch('checkAuth')
  .catch(() => {})
  .finally(() => {
    if (!app) {
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app')
    }
  });
