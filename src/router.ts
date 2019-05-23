import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Types from './views/Types.vue';
import Type from './views/Type.vue';
import CreateType from './views/CreateType.vue';
import Resources from './views/Resources.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/types',
      name: 'types',
      component: Types,
    },
    {
      path: '/types/create',
      name: 'create-type',
      component: CreateType,
    },
    {
      path: '/types/:id',
      name: 'type',
      component: Type,
    },
    {
      path: '/resources',
      name: 'resources',
      component: Resources,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});
