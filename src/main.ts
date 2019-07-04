import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Notification from '@/plugins/Notification';
import RecipeModeler from '@/plugins/RecipeModeler';

Vue.config.productionTip = false;

Vue.use(Notification);
Vue.use(RecipeModeler);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
