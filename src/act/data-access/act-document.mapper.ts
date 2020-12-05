import { Injectable, InjectionToken } from 'injection-js';
import { DocumentMapper } from '../../shared/data-access/document.mapper';
import { Act } from '../model/act';
import { ActDocument } from './act-document';

export const ACT_DOCUMENT_MAPPER: InjectionToken<
  DocumentMapper<Act, ActDocument>
> = new InjectionToken('ActDocumentMapperToken');

@Injectable()
export class ActDocumentMapper implements DocumentMapper<Act, ActDocument> {
  public mapManyForward(models: Act[]): ActDocument[] {
    return models.map(this.mapForward);
  }

  public mapForward(model: Act): ActDocument {
    const document = new ActDocument();
    document.id = model.id;
    document.artistName = model.artistName;
    document.songName = model.songName;
    return document;
  }

  public mapManyBackwards(documents: ActDocument[]): Act[] {
    return documents.map(this.mapBackwards);
  }

  public mapBackwards(document: ActDocument): Act {
    return { ...document };
  }
}
