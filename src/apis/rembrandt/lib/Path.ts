import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import CRUDResource from '@/apis/jsonapi/CRUDResource';

export interface Path extends Resource {
    path: string;
  }


const serializer = new Serializer('Path', {
    attributes: [
      'path',
    ],
    keyForAttribute: 'camelCase',
  });

export const Paths = new CRUDResource<Path>(
    `${process.env.VUE_APP_BACKEND_BASE_URL}/analysis/readlog`,
    serializer,
  );

export const PathNullObject = {
    path: '',
};

export function createPathNullObject(): Path {
    return {
        path: '',
    };
}
