import { Rating } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { BaseRepository } from '../../shared/data-access/base.repository';
import { DatabaseClient } from '../../shared/data-access/database.client';
import { RatingDocument } from './rating-document';
import { RatingDocumentMapper } from './rating-document.mapper';

@Injectable()
export class RatingRepository extends BaseRepository<Rating, RatingDocument> {
  constructor(databaseClient: DatabaseClient, mapper: RatingDocumentMapper) {
    super(databaseClient, mapper);
  }

  public async list(): Promise<Rating[]> {
    return await this.innerList(RatingDocument);
  }

  public async get(id: string): Promise<Rating> {
    const query = new RatingDocument();
    query.id = id;
    return await this.innerGet(query);
  }

  public async delete(id: string): Promise<Rating> {
    const query = new RatingDocument();
    query.id = id;
    return await this.innerDelete(query);
  }

  public async query(ids: string[]): Promise<Rating[]> {
    return await this.innerQuery(RatingDocument, ids);
  }
}
