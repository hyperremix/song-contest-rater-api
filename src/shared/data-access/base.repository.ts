import { DataMapper } from '@aws/dynamodb-data-mapper/build/DataMapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { DynamoDB } from 'aws-sdk';
import { DocumentMapper } from './document.mapper';

const databaseClient = new DataMapper({ client: new DynamoDB() });

export abstract class BaseRepository<T, U> {
  constructor(private mapper: DocumentMapper<T, U>) {}

  public async insert(item: T): Promise<void> {
    await databaseClient.put(this.mapper.mapForward(item));
  }

  public abstract list(): Promise<T[]>;

  protected async innerList(valueConstructor: ZeroArgumentsConstructor<U>): Promise<T[]> {
    const result = [];

    for await (const document of databaseClient.scan(valueConstructor)) {
      result.push(this.mapper.mapBackwards(document));
    }
    return result;
  }
}
