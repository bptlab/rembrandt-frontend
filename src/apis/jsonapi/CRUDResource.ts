import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import ApiUtils from '@/apis/jsonapi/ApiUtils';

export default class CRUDResource<T extends Resource> {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public resourceUrl: string;
  public serializer: Serializer;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor(resourceUrl: string, serializer: Serializer) {
    this.resourceUrl = resourceUrl;
    this.serializer = serializer;
  }
  // endregion

  // region public methods
  public singleResourceUrl(id: string): string {
    return `${this.resourceUrl}/${id}`;
  }

  public async create(resource: T): Promise<T> {
    return await ApiUtils.postJsonResource(this.resourceUrl, this.serializer, resource);
  }

  public async get(id?: string): Promise<T | T[]> {
    if (id) {
      const singleResourceUrl = this.singleResourceUrl(id);
      return await ApiUtils.getJsonResource(singleResourceUrl);
    }

    return await ApiUtils.getJsonResource(this.resourceUrl);
  }

  public async update(id: string, resource: T): Promise<void> {
    const singleResourceUrl = this.singleResourceUrl(id);
    await ApiUtils.patchJsonResource(singleResourceUrl, this.serializer, resource);
  }

  public async delete(id: string): Promise<void> {
    const singleResourceUrl = this.singleResourceUrl(id);
    await ApiUtils.deleteJsonResource(singleResourceUrl);
  }
  // endregion

  // region private methods
  // endregion
}
