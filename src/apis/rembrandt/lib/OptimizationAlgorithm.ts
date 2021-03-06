import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import { ResourceType, ResourceTypeNullObject } from '@/apis/rembrandt/rembrandt';
import CRUDResource from '@/apis/jsonapi/CRUDResource';

export interface DockerConfiguration {
  name: string;
  tag?: string;
  digest?: string;
}

export interface OptimizationAlgorithm extends Resource {
  name: string;
  inputs: ResourceType[];
  outputs: ResourceType;
  dockerConfig: DockerConfiguration;
}

const serializer = new Serializer('optimizationAlgorithms', {
  id: 'id',
  attributes: [
    'name',
    'inputs',
    'outputs',
    'dockerConfig',
  ],
  keyForAttribute: 'camelCase',
});

export const OptimizationAlgorithms = new CRUDResource<OptimizationAlgorithm>(
  `${process.env.VUE_APP_BACKEND_BASE_URL}/optimization/algorithms`,
  serializer,
);

export function createOptimizationAlgorithmNullObject() {
  return {
    name: '',
    inputs: [],
    outputs: ResourceTypeNullObject,
    dockerConfig: {
      name: '',
      tag: '',
    },
  };
}
