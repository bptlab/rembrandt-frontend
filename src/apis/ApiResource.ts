export default abstract class ApiResource {
  public static async get(id?: string): Promise<any> {
    throw Error('Function has to be implemented by inheriting class.');
  }

  public static async update(id: string, resource: any): Promise<any> {
    throw Error('Function has to be implemented by inheriting class.');
  }

  public static async delete(id: string): Promise<any> {
    throw Error('Function has to be implemented by inheriting class.');
  }
}
