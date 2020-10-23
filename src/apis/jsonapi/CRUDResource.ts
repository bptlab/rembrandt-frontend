import { Serializer } from 'jsonapi-serializer';
import Resource from '@/apis/jsonapi/Resource';
import ApiUtils from '@/apis/jsonapi/ApiUtils';
import { MetricResult } from '../rembrandt/rembrandt';

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

  public async create(resource: T): Promise<T | MetricResult> {
    return ApiUtils.postJsonResource(this.resourceUrl, this.serializer, resource);
  }

  public async get(): Promise<T[]> {
    return ApiUtils.getJsonResource(this.resourceUrl);
  }

  public async getOne(id: string): Promise<T> {
    const singleResourceUrl = this.singleResourceUrl(id);
    return ApiUtils.getJsonResource(singleResourceUrl);
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
