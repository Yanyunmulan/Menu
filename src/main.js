// src/main.js
import Vue from 'vue';
import App from './App.vue';
import store from './store'; // 确保正确导入 store

Vue.config.productionTip = false;

new Vue({
  store, // 确保这里正确地注册了 store
  render: h => h(App),
}).$mount('#app');