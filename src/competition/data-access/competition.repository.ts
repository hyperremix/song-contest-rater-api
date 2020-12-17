import { Competition } from '@hyperremix/song-contest-rater-model';
import { Inject, Injectable } from 'injection-js';
import { BaseRepository } from '../../shared/data-access/base.repository';
import { DatabaseClient } from '../../shared/data-access/database.client';
import { DocumentMapper } from '../../shared/data-access/document.mapper';
import { CompetitionDocument } from './competition-document';
import { COMPETITION_DOCUMENT_MAPPER } from './competition-document.mapper';

@Injectable()
export class CompetitionRepository extends BaseRepository<Competition, CompetitionDocument> {
  constructor(
    databaseClient: DatabaseClient,
    @Inject(COMPETITION_DOCUMENT_MAPPER) mapper: DocumentMapper<Competition, CompetitionDocument>
  ) {
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
}
