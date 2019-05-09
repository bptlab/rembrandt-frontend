import { Serializer, Deserializer } from 'jsonapi-serializer';

export default class Utils {
  // region public static methods
  public static async postJsonResource(url: string, serializer: Serializer, resource: any) {
    const postResponse = await fetch(url, {
      method: 'POST',
      headers: Utils.headers(),
      body: serializer.serialize(resource),
    });
    const resourceJson = await postResponse.json();
    const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
    return deserializer.deserialize(resourceJson);
  }

  public static async getJsonResource(url: string): Promise<any> {
    const getResponse = await fetch(url, {
      method: 'GET',
      headers: Utils.headers(),
    });
    const resourceJson = await getResponse.json();
    const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
    return deserializer.deserialize(resourceJson);
  }

  public static async patchJsonResource(url: string, serializer: Serializer, resource: any) {
    const postResponse = await fetch(url, {
      method: 'POST',
      headers: Utils.headers(),
      body: serializer.serialize(resource),
    });
  }

  public static async deleteJsonResource(url: string): Promise<void> {
    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: Utils.headers(),
    });
  }
  // endregion

  // region private static methods
  private static headers() {
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
