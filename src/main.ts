import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Notification from '@/plugins/Notification';

Vue.config.productionTip = false;

Vue.use(Notification);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
