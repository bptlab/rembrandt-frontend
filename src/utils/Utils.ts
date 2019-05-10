import { Serializer, Deserializer } from 'jsonapi-serializer';

export default class Utils {
  // region public static methods
  public static async postJsonResource(url: string, serializer: Serializer, resource: any): Promise<any> {
    const postResponse = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      referrer: 'no-referrer',
      headers: Utils.headers(),
      body: JSON.stringify(serializer.serialize(resource)),
    });
    const resourceJson = await postResponse.json();

    if (postResponse.status >= 300) {
      return new Promise((resolve, reject) => {
        const error = resourceJson.errors[0];
        reject(new Error(`POST request failed with ${error.status} - ${error.title}: ${error.detail}`));
      });
    }

    const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
    return deserializer.deserialize(resourceJson);
  }

  public static async getJsonResource(url: string): Promise<any> {
    const getResponse = await fetch(url, {
      method: 'GET',
      headers: Utils.headers(),
    });
    const resourceJson = await getResponse.json();

    if (getResponse.status >= 300) {
      return new Promise((resolve, reject) => {
        const error = resourceJson.errors[0];
        reject(new Error(`POST request failed with ${error.status} - ${error.title}: ${error.detail}`));
      });
    }

    const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
    return deserializer.deserialize(resourceJson);
  }

  public static async patchJsonResource(url: string, serializer: Serializer, resource: any): Promise<void> {
    const patchResponse = await fetch(url, {
      method: 'POST',
      headers: Utils.headers(),
      body: JSON.stringify(serializer.serialize(resource)),
    });
    const resourceJson = await patchResponse.json();

    if (patchResponse.status >= 300) {
      return new Promise((resolve, reject) => {
        const error = resourceJson.errors[0];
        reject(new Error(`POST request failed with ${error.status} - ${error.title}: ${error.detail}`));
      });
    }
  }

  public static async deleteJsonResource(url: string): Promise<void> {
    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: Utils.headers(),
    });
    const resourceJson = await deleteResponse.json();

    if (deleteResponse.status >= 300) {
      return new Promise((resolve, reject) => {
        const error = resourceJson.errors[0];
        reject(new Error(`POST request failed with ${error.status} - ${error.title}: ${error.detail}`));
      });
    }
  }
  // endregion

  // region private static methods
  private static headers(): any {
    return { 'Content-Type': 'application/vnd.api+json' };
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
