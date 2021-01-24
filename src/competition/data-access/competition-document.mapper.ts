import { Competition } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { DocumentMapper } from 'src/shared/data-access/document.mapper';
import { CompetitionDocument } from './competition-document';

@Injectable()
export class CompetitionDocumentMapper implements DocumentMapper<Competition, CompetitionDocument> {
  public mapForwards(model: Competition): CompetitionDocument {
    const document = new CompetitionDocument();
    document.id = model.id;
    document.cityName = model.cityName;
    document.countryName = model.countryName;
    document.description = model.description;
    document.startTime = model.startTime;
    document.imageUrl = model.imageUrl;
    document.actIds = model.actIds;
    document.ratingIds = model.ratingIds;
    return document;
  }

  public mapBackwards(document: CompetitionDocument): Competition {
    return { ...document };
  }
}
