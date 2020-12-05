import { Injectable, InjectionToken } from 'injection-js';
import { DocumentMapper } from '../../shared/data-access/document.mapper';
import { Act } from '../model/act';
import { ActDocument } from './act-document';

export const ACT_DOCUMENT_MAPPER: InjectionToken<
  DocumentMapper<Act, ActDocument>
> = new InjectionToken('ActDocumentMapperToken');

@Injectable()
export class ActDocumentMapper implements DocumentMapper<Act, ActDocument> {
  public mapForwards(model: Act): ActDocument {
    const document = new ActDocument();
    document.id = model.id;
    document.artistName = model.artistName;
    document.songName = model.songName;
    return document;
  }

  public mapBackwards(document: ActDocument): Act {
    return { ...document };
  }
}
