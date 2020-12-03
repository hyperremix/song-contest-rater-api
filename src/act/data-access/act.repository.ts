import { BaseRepository } from '../../shared/data-access/base.repository';
import { DocumentMapper } from '../../shared/data-access/document.mapper';
import { Act } from '../model/act';
import { ActDocument } from './act-document';

export class ActRepository extends BaseRepository<Act, ActDocument> {
  constructor(mapper: DocumentMapper<Act, ActDocument>) {
    super(mapper);
  }

  public async list(): Promise<Act[]> {
    return await this.innerList(ActDocument);
  }
}
