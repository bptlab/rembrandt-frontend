import { Serializer } from 'jsonapi-serializer';
import ApiResource from '@/apis/ApiResource';
import Utils from '@/utils/Utils';

export interface ResourceTypeAttribute {
  dataType: string;
  name: string;
  required: boolean;
}

export interface ResourceType {
  id?: string;
  parentType?: string;
  name: string;
  abstract: boolean;
  attributes: ResourceTypeAttribute[];
}

export class ResourceTypes extends ApiResource {
  // region public static methods
  public static resourceTypesUrl(): string {
    return 'http://localhost:3000/resource-types';
  }

  public static resourceTypeUrl(id: string): string {
    return `${ResourceTypes.resourceTypesUrl()}/${id}`;
  }

  public static async create(resource: ResourceType): Promise<ResourceType> {
    const resourceTypesUrl = ResourceTypes.resourceTypesUrl();
    return await Utils.postJsonResource(resourceTypesUrl, ResourceTypes.serializer(), resource);
  }

  public static async get(id?: string): Promise<ResourceType | ResourceType[]> {
    if (id) {
      const resourceTypeUrl = ResourceTypes.resourceTypeUrl(id);
      return await Utils.getJsonResource(resourceTypeUrl);
    }

    const resourceTypesUrl = ResourceTypes.resourceTypesUrl();
    return await Utils.getJsonResource(resourceTypesUrl);
  }

  public static async update(id: string, resource: ResourceType): Promise<void> {
    const resourceTypeUrl = ResourceTypes.resourceTypeUrl(id);
    await Utils.patchJsonResource(resourceTypeUrl, ResourceTypes.serializer(), resource);
  }

  public static async delete(id: string): Promise<void> {
    const resourceTypeUrl = ResourceTypes.resourceTypeUrl(id);
    await Utils.deleteJsonResource(resourceTypeUrl);
  }
  // endregion

  // region private static methods
  private static serializer(): Serializer {
    return new Serializer('resourceType', {
      id: '_id',
      attributes: [
        'name',
        'abstract',
        'attributes',
        'parentType',
      ],
      keyForAttribute: 'camelCase',
    });
  }
  // endregion

  // region public members
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
