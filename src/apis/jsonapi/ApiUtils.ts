import { Serializer, Deserializer } from 'jsonapi-serializer';
import { NotificationLevel } from '@/interfaces/Notification';
import ApiError from '@/apis/jsonapi/ApiError';

export default class ApiUtils {
  // region public static methods
  public static async postJsonResource(url: string, serializer: Serializer, resource: any): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: ApiUtils.headers(),
      body: JSON.stringify(serializer.serialize(resource)),
    };
    return ApiUtils.fetchResource(url, requestOptions);
  }

  public static async getJsonResource(url: string): Promise<any> {
    const requestOptions = {
      method: 'GET',
      headers: ApiUtils.headers(),
    };
    return ApiUtils.fetchResource(url, requestOptions);
  }

  public static async patchJsonResource(url: string, serializer: Serializer, resource: any): Promise<void> {
    const requestOptions = {
      method: 'POST',
      headers: ApiUtils.headers(),
      body: JSON.stringify(serializer.serialize(resource)),
    };
    await ApiUtils.fetchResource(url, requestOptions);
  }

  public static async deleteJsonResource(url: string): Promise<void> {
    const requestOptions = {
      method: 'DELETE',
      headers: ApiUtils.headers(),
    };
    await ApiUtils.fetchResource(url, requestOptions);
  }
  // endregion

  // region private static methods
  private static headers(): any {
    return { 'Content-Type': 'application/vnd.api+json' };
  }

  private static async fetchResource(url: string, options: RequestInit): Promise<any> {
    let response;
    try {
      response = await fetch(url, options);
    } catch (e) {
      throw new ApiError('Connection to server failed. Please try again.', e, NotificationLevel.Critical);
    }

    const responseJson = await response.json();

    if (response.status >= 300) {
      const error = responseJson.errors[0];
      throw new ApiError(`${error.status} - ${error.title}`, error.detail, NotificationLevel.Critical);
    }

    const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
    return deserializer.deserialize(responseJson);
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
