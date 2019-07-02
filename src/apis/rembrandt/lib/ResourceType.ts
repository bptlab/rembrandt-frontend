import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';

export interface ResourceTypeAttribute {
  dataType: string;
  name: string;
  required: boolean;
  id?: string;
}

export interface ResourceType extends Resource {
  parentType?: ResourceType;
  name: string;
  abstract: boolean;
  eponymousAttribute?: string;
  attributes: ResourceTypeAttribute[];
}

const serializer = new Serializer('resourceType', {
  id: 'id',
  attributes: [
    'name',
    'abstract',
    'eponymousAttribute',
    'attributes',
    'parentType',
  ],
  keyForAttribute: 'camelCase',
});

export const ResourceTypes = new CRUDResource<ResourceType>(
  `${config.backendHost}/organization/resource-types`,
  serializer,
);

export const ResourceTypeNullObject = {
  name: '',
  abstract: true,
  attributes: [],
};
