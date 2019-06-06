import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';
import config from '@/config/config.json';
import { ResourceType } from '@/apis/rembrandt/rembrandt';

export interface ResourceInstanceAttribute {
  name: string;
  value: any;
}

export interface ResourceInstance extends Resource {
  resourceType: ResourceType;
  attributes: ResourceInstanceAttribute[];
}

const serializer = new Serializer('resourceInstance', {
  id: 'id',
  attributes: [
    'attributes',
    'resourceType',
  ],
});

export const ResourceInstances = new CRUDResource<ResourceInstance>(
  `${config.backendHost}/resource-instances`,
  serializer,
);
