import Vue from 'vue';
import Router from 'vue-router';
import Types from './views/Types.vue';
import Type from './views/Type.vue';
import CreateType from './views/CreateType.vue';
import CreateInstance from './views/CreateInstance.vue';
import EditInstance from './views/EditInstance.vue';
import Resources from './views/Resources.vue';
import Resource from './views/Resource.vue';
import Algorithms from './views/Algorithms.vue';
import Algorithm from './views/Algorithm.vue';
import CreateAlgorithm from './views/CreateAlgorithm.vue';
import Transformers from './views/Transformers.vue';
import Transformer from './views/Transformer.vue';
import CreateTransformer from './views/CreateTransformer.vue';
import EditTransformer from './views/EditTransformer.vue';
import CreateRecipe from './views/CreateRecipe.vue';
import Recipe from './views/Recipe.vue';
import Recipes from './views/Recipes.vue';
import Execution from './views/Execution.vue';
import Executions from './views/Executions.vue';
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
      path: 'organization/resources/edit/:instanceId',
      name: 'edit-resource',
      component: EditInstance,
    },
    {
      path: '/organization/resources/:id',
      name: 'resource',
      component: Resource,
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
      path: '/optimization/algorithms',
      name: 'algorithms',
      component: Algorithms,
    },
    {
      path: '/optimization/algorithms/create',
      name: 'create-algorithm',
      component: CreateAlgorithm,
    },
    {
      path: '/optimization/algorithms/:id',
      name: 'algorithm',
      component: Algorithm,
    },
    {
      path: '/optimization/transformers',
      name: 'transformers',
      component: Transformers,
    },
    {
      path: '/optimization/transformers/create',
      name: 'create-transformer',
      component: CreateTransformer,
    },
    {
      path: 'organization/transformers/edit/:transformerId',
      name: 'edit-transformer',
      component: EditTransformer,
    },
    {
      path: '/optimization/transformers/:id',
      name: 'transformer',
      component: Transformer,
    },
    {
      path: '/optimization/recipes',
      name: 'recipes',
      component: Recipes,
    },
    {
      path: '/optimization/recipes/create',
      name: 'create-recipe',
      component: CreateRecipe,
    },
    {
      path: '/optimization/recipes/:id',
      name: 'recipe',
      component: Recipe,
    },
    {
      path: '/optimization/executions',
      name: 'executions',
      component: Executions,
    },
    {
      path: '/optimization/executions/:id',
      name: 'execution',
      component: Execution,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});
