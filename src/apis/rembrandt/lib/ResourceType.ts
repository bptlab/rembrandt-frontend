import ApiResource from '@/apis/ApiResource';
import Utils from '@/utils/Utils';

export interface ResourceTypeAttribute {
  dataType: string;
  name: string;
  required: boolean;
}

export interface ResourceType {
  id: string;
  name: string;
  abstract: boolean;
  attributes: ResourceTypeAttribute[];
}

// tslint:disable-next-line: max-classes-per-file
export class ResourceTypes extends ApiResource {
  public static async get(id?: string): Promise<ResourceType> {
    const resourceTypesUrl = 'http://localhost:3000/resource-types';

    if (id) {
      const resourceTypeUrl = `${resourceTypesUrl}/${id}`;
      return await Utils.getJsonResource(resourceTypeUrl);
    }

    return await Utils.getJsonResource(resourceTypesUrl);
  }
}
