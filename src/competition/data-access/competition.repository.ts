import { Competition } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { BaseRepository } from '../../shared/data-access/base.repository';
import { DatabaseClient } from '../../shared/data-access/database.client';
import { CompetitionDocument } from './competition-document';
import { CompetitionDocumentMapper } from './competition-document.mapper';

@Injectable()
export class CompetitionRepository extends BaseRepository<Competition, CompetitionDocument> {
  constructor(databaseClient: DatabaseClient, mapper: CompetitionDocumentMapper) {
    super(databaseClient, mapper);
  }

  public async list(): Promise<Competition[]> {
    return await this.innerList(CompetitionDocument);
  }

  public async get(id: string): Promise<Competition> {
    const query = new CompetitionDocument();
    query.id = id;
    return await this.innerGet(query);
  }

  public async delete(id: string): Promise<Competition> {
    const query = new CompetitionDocument();
    query.id = id;
    return await this.innerDelete(query);
  }

  public async query(ids: string[]): Promise<Competition[]> {
    return await this.innerQuery(CompetitionDocument, ids);
  }
}
