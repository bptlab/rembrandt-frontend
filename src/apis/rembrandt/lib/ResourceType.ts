import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';

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
  `${process.env.VUE_APP_BACKEND_BASE_URL}/organization/resource-types`,
  serializer,
);

export const ResourceTypeNullObject = {
  name: '',
  abstract: true,
  attributes: [],
};
