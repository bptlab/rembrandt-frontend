import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import { ResourceType, ResourceTypeNullObject } from '@/apis/rembrandt/rembrandt';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';


export interface Transformer extends Resource {
  name: string;
  transformerType: string;
  resourceType: ResourceType;
  body: string;
}

const serializer = new Serializer('transformators', {
  id: 'id',
  attributes: [
    'name',
    'transformerType',
    'resourceType',
    'body',
  ],
  keyForAttribute: 'camelCase',
});

export const Transformers = new CRUDResource<Transformer>(
  `${config.backendHost}/optimization/transformers`,
  serializer,
);

export function createTransformerNullObject() {
  return {
    name: '',
    transformerType: '',
    resourceType: ResourceTypeNullObject,
    body: '',
  };
}
