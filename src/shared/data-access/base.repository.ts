import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { DatabaseClient } from './database.client';
import { DocumentMapper } from './document.mapper';

export abstract class BaseRepository<T, U> {
  constructor(private databaseClient: DatabaseClient, private mapper: DocumentMapper<T, U>) {}

  public async insert(item: T): Promise<T> {
    const result = await this.databaseClient.put(this.mapper.mapForwards(item));
    return this.mapper.mapBackwards(result);
  }

  public abstract list(): Promise<T[]>;

  protected async innerList(valueConstructor: ZeroArgumentsConstructor<U>): Promise<T[]> {
    return (await this.databaseClient.scan(valueConstructor)).map((document: U) =>
      this.mapper.mapBackwards(document)
    );
  }

  public abstract get(id: string): Promise<T>;

  public async innerGet(query: U): Promise<T> {
    const result = await this.databaseClient.get(query);
    return this.mapper.mapBackwards(result);
  }
}
