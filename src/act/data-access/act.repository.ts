import { Act } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { BaseRepository } from '../../shared/data-access/base.repository';
import { DatabaseClient } from '../../shared/data-access/database.client';
import { ActDocument } from './act-document';
import { ActDocumentMapper } from './act-document.mapper';

@Injectable()
export class ActRepository extends BaseRepository<Act, ActDocument> {
  constructor(databaseClient: DatabaseClient, mapper: ActDocumentMapper) {
    super(databaseClient, mapper);
  }

  public async list(): Promise<Act[]> {
    return await this.innerList(ActDocument);
  }

  public async get(id: string): Promise<Act> {
    const query = new ActDocument();
    query.id = id;
    return await this.innerGet(query);
  }

  public async delete(id: string): Promise<Act> {
    const query = new ActDocument();
    query.id = id;
    return await this.innerDelete(query);
  }
}
