import { Inject, Injectable } from 'injection-js';
import { BaseRepository } from '../../shared/data-access/base.repository';
import { DatabaseClient } from '../../shared/data-access/database.client';
import { DocumentMapper } from '../../shared/data-access/document.mapper';
import { Act } from '../model/act';
import { ActDocument } from './act-document';
import { ACT_DOCUMENT_MAPPER } from './act-document.mapper';

@Injectable()
export class ActRepository extends BaseRepository<Act, ActDocument> {
  constructor(
    databaseClient: DatabaseClient,
    @Inject(ACT_DOCUMENT_MAPPER) mapper: DocumentMapper<Act, ActDocument>
  ) {
    super(databaseClient, mapper);
  }

  public async list(): Promise<Act[]> {
    return await this.innerList(ActDocument);
  }
}
