import { Deserializer } from 'jsonapi-serializer';

export default class Utils {
  public static async getJsonResource(url: string): Promise<any> {
    const resourceResponse = await fetch(url);
    const resourceJson = await resourceResponse.json();
    const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
    return deserializer.deserialize(resourceJson);
  }
}
