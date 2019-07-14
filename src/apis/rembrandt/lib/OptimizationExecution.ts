import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';
import { Recipe } from './Recipe';

export interface OptimizationExecutionProcessingState {
  identifier: string;
  startedAt?: Date;
  finishedAt?: Date;
  successful?: boolean;
}

export interface OptimizationExecution extends Resource {
  identifier: string;
  recipe: Recipe;
  startedAt?: Date;
  finishedAt?: Date;
  successful?: boolean;
  processingStates: OptimizationExecutionProcessingState[];
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
