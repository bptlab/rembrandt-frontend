import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';
import { Recipe, createRecipeNullObject } from './Recipe';

export interface OptimizationExecutionObject extends Resource {
  identifier: string;
  startedAt?: Date;
  finishedAt?: Date;
  successful?: boolean;
}

export interface OptimizationExecutionState extends OptimizationExecutionObject {
  ingredient: string;
}

export interface OptimizationExecution extends OptimizationExecutionObject {
  recipe: Recipe;
  processingStates: OptimizationExecutionState[];
}

const serializer = new Serializer('optimizationExecutions', {
  id: 'id',
  attributes: [
    'identifier',
    'recipe',
    'startedAt',
    'finishedAt',
    'successful',
    'processingStates',
  ],
  keyForAttribute: 'camelCase',
});

export const OptimizationExecutions = new CRUDResource<OptimizationExecution>(
  `${config.backendHost}/optimization/executions`,
  serializer,
);

export function createOptimizationExecutionNullObject(): OptimizationExecution {
  return {
    identifier: '',
    recipe: createRecipeNullObject(),
    processingStates: [],
  };
}

