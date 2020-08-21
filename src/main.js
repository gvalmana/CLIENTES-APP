import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import {axiosConfig} from '@/config'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.config.productionTip = false
axios.defaults.baseURL = axiosConfig.url
axios.defaults.headers = axiosConfig.headers

// TODO:
function tokenInterceptor() {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}

// TODO:
Vue.use(VueKeyCloak, {
  config: {
    authRealm: "GEASP",
    authClientId: "app-clientes",
    authUrl: "http://localhost:8180/auth",
    logoutRedirectUri: "http://localhost:8081",
  },
  init: {
    onLoad: 'login-required',
  },
  onReady: () => {
   if (Vue.prototype.$keycloak.authenticated) {
        tokenInterceptor();
   }

  new Vue({
    router,
    store,
    vuetify,        
    render: (h) => h(App),
    }).$mount('#app');
  },
});
