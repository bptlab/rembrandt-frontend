import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config';

export interface ResourceTypeAttribute {
  dataType: string;
  name: string;
  required: boolean;
}

export interface ResourceType extends Resource {
  parentType?: string;
  name: string;
  abstract: boolean;
  attributes: ResourceTypeAttribute[];
}

const serializer = new Serializer('resourceType', {
  id: '_id',
  attributes: [
    'name',
    'abstract',
    'attributes',
    'parentType',
  ],
  keyForAttribute: 'camelCase',
});

export const ResourceTypes = new CRUDResource<ResourceType>(
  `${config.backendHost}/resource-types`,
  serializer,
);
