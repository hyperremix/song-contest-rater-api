import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import { Injectable } from 'injection-js';

@Injectable()
export class DatabaseClient {
  constructor(private dataMapper: DataMapper) {}

  public async put<T>(item: T): Promise<T> {
    return await this.dataMapper.put(item);
  }

  public async scan<T>(valueConstructor: ZeroArgumentsConstructor<T>): Promise<T[]> {
    const result = [];

    for await (const document of this.dataMapper.scan(valueConstructor)) {
      result.push(document);
    }

    return result;
  }

  public async get<T>(item: T): Promise<T> {
    return await this.dataMapper.get(item);
  }

  public async update<T>(item: T): Promise<T> {
    return await this.dataMapper.update(item);
  }

  public async delete<T>(item: T): Promise<T> {
    return await this.dataMapper.delete(item);
  }
}
