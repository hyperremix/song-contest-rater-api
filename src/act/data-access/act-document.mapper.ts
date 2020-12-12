import { Act } from '@hyperremix/song-contest-rater-model';
import { Injectable, InjectionToken } from 'injection-js';
import { DocumentMapper } from '../../shared/data-access/document.mapper';
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
