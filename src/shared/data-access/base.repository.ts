import { DataMapper } from '@aws/dynamodb-data-mapper/build/DataMapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { getDatabaseClient } from './database-client.provider';
import { DocumentMapper } from './document.mapper';

export abstract class BaseRepository<T, U> {
  private databaseClient: DataMapper = getDatabaseClient();

  constructor(private mapper: DocumentMapper<T, U>) {}

  public async insert(item: T): Promise<void> {
    await this.databaseClient.put(this.mapper.mapForward(item));
  }

  public abstract list(): Promise<T[]>;

  protected async innerList(valueConstructor: ZeroArgumentsConstructor<U>): Promise<T[]> {
    const result = [];

    for await (const document of this.databaseClient.scan(valueConstructor)) {
      result.push(this.mapper.mapBackwards(document));
    }
    return result;
  }
}
