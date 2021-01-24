import { Rating } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { DocumentMapper } from 'src/shared/data-access/document.mapper';
import { RatingDocument } from './rating-document';

@Injectable()
export class RatingDocumentMapper implements DocumentMapper<Rating, RatingDocument> {
  public mapForwards(model: Rating): RatingDocument {
    const document = new RatingDocument();
    document.id = model.id;
    document.userId = model.userId;
    document.competitionId = model.competitionId;
    document.actId = model.actId;
    document.song = model.song;
    document.singing = model.singing;
    document.show = model.show;
    document.looks = model.looks;
    document.clothes = model.clothes;
    return document;
  }

  public mapBackwards(document: RatingDocument): Rating {
    return { ...document };
  }
}
