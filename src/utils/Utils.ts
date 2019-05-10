import { Serializer, Deserializer } from 'jsonapi-serializer';

export default class Utils {
  // region public static methods
  public static async postJsonResource(url: string, serializer: Serializer, resource: any): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: Utils.headers(),
      body: JSON.stringify(serializer.serialize(resource)),
    };
    return Utils.fetchResource(url, requestOptions);
  }

  public static async getJsonResource(url: string): Promise<any> {
    const requestOptions = {
      method: 'GET',
      headers: Utils.headers(),
    };
    return Utils.fetchResource(url, requestOptions);
  }

  public static async patchJsonResource(url: string, serializer: Serializer, resource: any): Promise<void> {
    const requestOptions = {
      method: 'POST',
      headers: Utils.headers(),
      body: JSON.stringify(serializer.serialize(resource)),
    };
    await Utils.fetchResource(url, requestOptions);
  }

  public static async deleteJsonResource(url: string): Promise<void> {
    const requestOptions = {
      method: 'DELETE',
      headers: Utils.headers(),
    };
    await Utils.fetchResource(url, requestOptions);
  }
  // endregion

  // region private static methods
  private static headers(): any {
    return { 'Content-Type': 'application/vnd.api+json' };
  }

  private static async fetchResource(url: string, options: RequestInit): Promise<any> {
    const response = await fetch(url, options);
    const responseJson = await response.json();

    if (response.status >= 300) {
      return new Promise((resolve, reject) => {
        const error = responseJson.errors[0];
        reject(new Error(`POST request failed with ${error.status} - ${error.title}: ${error.detail}`));
      });
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
