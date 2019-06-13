import Vue from 'vue';
import Router from 'vue-router';
import Types from './views/Types.vue';
import Type from './views/Type.vue';
import CreateType from './views/CreateType.vue';
import CreateInstance from './views/CreateInstance.vue';
import Resources from './views/Resources.vue';
import Resource from './views/Resource.vue';
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
      path: '/resources/create/',
      name: 'create-resource',
      component: CreateInstance,
    },
    {
      path: '/resources/create/:typeId',
      name: 'create-resource',
      component: CreateInstance,
    },
    {
      path: '/resources/:id',
      name: 'resource',
      component: Resource,
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
