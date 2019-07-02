import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import { ResourceType, ResourceTypeNullObject } from '@/apis/rembrandt/rembrandt';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';
import { ResourceInstance } from './ResourceInstance';


export interface Transformator extends Resource {
  name: string;
  type: string;
  input: ResourceType;
  output: ResourceInstance[];
}

const serializer = new Serializer('transformators', {
  id: '_id',
  attributes: [
    'name',
    'type',
    'input',
    'output',
  ],
  keyForAttribute: 'camelCase',
});

export const OptimizationAlgorithms = new CRUDResource<Transformator>(
  `${config.backendHost}/optimization/transformators`,
  serializer,
);

export function createTransformatorNullObject() {
  return {
    name: '',
    type: '',
    input: ResourceTypeNullObject,
    output: [],
  };
}
