import httpErrors from 'http-errors';
import { DatabaseClient } from './database.client';
import { DocumentMapper } from './document.mapper';

export abstract class BaseRepository<T, U> {
  constructor(private databaseClient: DatabaseClient, private mapper: DocumentMapper<T, U>) {}

  public async insert(item: T): Promise<T> {
    const result = await this.databaseClient.put(this.mapper.mapForwards(item));
    return this.mapper.mapBackwards(result);
  }

  public abstract list(): Promise<T[]>;

  protected async innerList(type: { new (): U }): Promise<T[]> {
    return (await this.databaseClient.scan(type)).map((document: U) =>
      this.mapper.mapBackwards(document)
    );
  }

  public abstract get(id: string): Promise<T>;

  protected async innerGet(query: U): Promise<T> {
    try {
      const result = await this.databaseClient.get(query);
      return this.mapper.mapBackwards(result);
    } catch (error) {
      throw new httpErrors.NotFound(`No item found for query: ${JSON.stringify(query)}`);
    }
  }

  public async update(item: T): Promise<T> {
    await this.get(item['id']);
    const result = await this.databaseClient.update(this.mapper.mapForwards(item));
    return this.mapper.mapBackwards(result);
  }

  public abstract delete(id: string): Promise<T>;

  protected async innerDelete(query: U): Promise<T> {
    const result = await this.databaseClient.delete(query);
    return this.mapper.mapBackwards(result);
  }
}
