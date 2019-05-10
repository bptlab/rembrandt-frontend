import { Serializer } from 'jsonapi-serializer';

export default abstract class ApiResource {
  // region public static methods
  public static resourceUrl(id?: string) {
    throw Error('Function has to be implemented by inheriting class.');
  }

  public static async create(resource: ApiResource): Promise<ApiResource> {
    throw Error('Function has to be implemented by inheriting class.');
  }

  public static async get(id?: string): Promise<ApiResource | ApiResource[]> {
    throw Error('Function has to be implemented by inheriting class.');
  }

  public static async update(id: string, resource: ApiResource): Promise<void> {
    throw Error('Function has to be implemented by inheriting class.');
  }

  public static async delete(id: string): Promise<void> {
    throw Error('Function has to be implemented by inheriting class.');
  }
  // endregion

  // region private static methods
  protected static serializer(): Serializer {
    throw Error('Function has to be implemented by inheriting class.');
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
