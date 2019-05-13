import { Serializer } from 'jsonapi-serializer';
import ApiResource from '@/apis/ApiResource';
import Utils from '@/utils/Utils';

export interface ResourceInstanceAttribute {
  name: string;
  value: any;
}

export interface ResourceInstance {
  id?: string;
  resourceType?: string;
  attributes: ResourceInstanceAttribute[];
}

export class ResourceInstances extends ApiResource {
  // region public static methods
  public static resourceUrl(id?: string): string {
    if (!id) {
      return 'http://localhost:3000/resource-types';
    }
    return `${ResourceInstances.resourceUrl()}/${id}`;
  }

  public static async create(resource: ResourceInstance): Promise<ResourceInstance> {
    const resourceTypesUrl = ResourceInstances.resourceUrl();
    return await Utils.postJsonResource(resourceTypesUrl, ResourceInstances.serializer(), resource);
  }

  public static async get(id?: string): Promise<ResourceInstance | ResourceInstance[]> {
    if (id) {
      const resourceTypeUrl = ResourceInstances.resourceUrl(id);
      return await Utils.getJsonResource(resourceTypeUrl);
    }

    const resourceTypesUrl = ResourceInstances.resourceUrl();
    return await Utils.getJsonResource(resourceTypesUrl);
  }

  public static async update(id: string, resource: ResourceInstance): Promise<void> {
    const resourceTypeUrl = ResourceInstances.resourceUrl(id);
    await Utils.patchJsonResource(resourceTypeUrl, ResourceInstances.serializer(), resource);
  }

  public static async delete(id: string): Promise<void> {
    const resourceTypeUrl = ResourceInstances.resourceUrl(id);
    await Utils.deleteJsonResource(resourceTypeUrl);
  }
  // endregion

  // region private static methods
  protected static serializer(): Serializer {
    return new Serializer('resourceInstance', {
      id: '_id',
      attributes: [
        'attributes',
        'resourceType',
      ],
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
