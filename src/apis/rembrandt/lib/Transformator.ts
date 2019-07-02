import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import { ResourceType, ResourceTypeNullObject } from '@/apis/rembrandt/rembrandt';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';


export interface Transformator extends Resource {
  name: string;
  type: string;
  resourceType: ResourceType;
  code: string;
}

const serializer = new Serializer('transformators', {
  id: '_id',
  attributes: [
    'name',
    'transformerType',
    'resourceType',
    'body',
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
    transformerType: '',
    resourceType: ResourceTypeNullObject,
    body: '',
  };
}
