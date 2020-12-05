import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { DocumentMapper } from './document.mapper';

export abstract class BaseRepository<T, U> {
  constructor(private databaseClient: DataMapper, private mapper: DocumentMapper<T, U>) {}

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
