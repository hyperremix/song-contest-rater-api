import { User } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { BaseRepository } from '../../shared/data-access/base.repository';
import { DatabaseClient } from '../../shared/data-access/database.client';
import { UserDocument } from './user-document';
import { UserDocumentMapper } from './user-document.mapper';

@Injectable()
export class UserRepository extends BaseRepository<User, UserDocument> {
  constructor(databaseClient: DatabaseClient, mapper: UserDocumentMapper) {
    super(databaseClient, mapper);
  }

  public async list(): Promise<User[]> {
    return await this.innerList(UserDocument);
  }

  public async get(id: string): Promise<User> {
    const query = new UserDocument();
    query.id = id;
    return await this.innerGet(query);
  }

  public async delete(id: string): Promise<User> {
    const query = new UserDocument();
    query.id = id;
    return await this.innerDelete(query);
  }

  public async query(ids: string[]): Promise<User[]> {
    return this.innerQuery(UserDocument, ids);
  }
}
