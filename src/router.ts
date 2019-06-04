import Vue from 'vue';
import Router from 'vue-router';
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
      redirect: '/resources',
    },
    {
      path: '/resources',
      name: 'resources',
      component: Resources,
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
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});
