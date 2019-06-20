import Vue from 'vue';
import Router from 'vue-router';
import Types from './views/Types.vue';
import Type from './views/Type.vue';
import CreateType from './views/CreateType.vue';
import CreateInstance from './views/CreateInstance.vue';
import EditInstance from './views/EditInstance.vue';
import Resources from './views/Resources.vue';
import Resource from './views/Resource.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/organization',
    },
    {
      path: '/organization',
      name: 'organization',
      redirect: '/organization/resources',
    },
    {
      path: '/organization/resources',
      name: 'resources',
      component: Resources,
    },
    {
      path: '/organization/resources/create',
      name: 'create-resource',
      component: CreateInstance,
    },
    {
      path: '/organization/resources/create/:typeId',
      name: 'create-resource-id',
      component: CreateInstance,
    },
    {
      path: '/organization/resources/:id',
      name: 'resource',
      component: Resource,
    },
    {
      path: 'organization/resources/edit/:instanceId',
      name: 'edit-resource',
      component: EditInstance,
    },
    {
      path: '/organization/types',
      name: 'types',
      component: Types,
    },
    {
      path: '/organization/types/create',
      name: 'create-type',
      component: CreateType,
    },
    {
      path: '/organization/types/:id',
      name: 'type',
      component: Type,
    },
    {
      path: '/optimization',
      name: 'optimization',
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});
