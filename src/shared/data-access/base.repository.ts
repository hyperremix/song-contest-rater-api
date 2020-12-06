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

  public async innerGet(query: U): Promise<T> {
    const result = await this.databaseClient.get(query);
    return this.mapper.mapBackwards(result);
  }

  public async update(item: T): Promise<T> {
    const result = await this.databaseClient.update(this.mapper.mapForwards(item));
    return this.mapper.mapBackwards(result);
  }

  public abstract delete(id: string): Promise<T>;

  public async innerDelete(query: U): Promise<T> {
    const result = await this.databaseClient.delete(query);
    return this.mapper.mapBackwards(result);
  }
}
