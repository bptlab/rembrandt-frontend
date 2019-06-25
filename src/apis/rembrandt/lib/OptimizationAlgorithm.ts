import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';

export interface DockerConfiguration {
  name: string;
  tag?: string;
  digest?: string;
}

export interface OptimizationAlgorithm extends Resource {
  name: string;
  inputs: string[];
  outputs: string;
  dockerConfig: DockerConfiguration;
}

const serializer = new Serializer('optimizationAlgorithms', {
  id: '_id',
  attributes: [
    'name',
    'inputs',
    'outputs',
    'dockerConfig',
  ],
  keyForAttribute: 'camelCase',
});

export const OptimizationAlgorithms = new CRUDResource<OptimizationAlgorithm>(
  `${config.backendHost}/optimization/algorithms`,
  serializer,
);

export function createOptimizationAlgorithmNullObject() {
  return {
    name: '',
    inputs: [],
    outputs: '',
    dockerConfig: {
      name: '',
      tag: '',
    },
  };
}
