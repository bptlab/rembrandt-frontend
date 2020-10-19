import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';

export interface Metric extends Resource {
    name: string;
    query: string;
  }

const serializer = new Serializer('Query', {
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

export const Metrics = new CRUDResource<Metric>(
    `${process.env.VUE_APP_BACKEND_BASE_URL}/organization/resource-types`,
    serializer,
  );

export const MetricNullObject = {
    name: '',
    query: '',
};

export function createMetricNullObject(): Metric {
    return {
      name: '',
      query: '',
    };
  }
