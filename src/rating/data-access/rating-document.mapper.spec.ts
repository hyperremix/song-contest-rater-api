import { defaultRating } from '@hyperremix/song-contest-rater-model';
import { defaultRatingDocument } from './rating-document';
import { RatingDocumentMapper } from './rating-document.mapper';

describe('RatingDocumentMapper', () => {
  let ratingDocumentMapper: RatingDocumentMapper;

  beforeEach(() => {
    ratingDocumentMapper = new RatingDocumentMapper();
  });

  describe('when mapping forwards', () => {
    it('then id is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.id).toBe(defaultRating.id);
    });

    it('then userId is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.userId).toBe(defaultRating.userId);
    });

    it('then competitionId is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.competitionId).toBe(defaultRating.competitionId);
    });

    it('then actId is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.actId).toBe(defaultRating.actId);
    });

    it('then song is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.song).toBe(defaultRating.song);
    });

    it('then singing is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.singing).toBe(defaultRating.singing);
    });

    it('then show is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.show).toBe(defaultRating.show);
    });

    it('then looks is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.looks).toBe(defaultRating.looks);
    });

    it('then clothes is set', () => {
      // act
      const result = ratingDocumentMapper.mapForwards(defaultRating);

      // assert
      expect(result.clothes).toBe(defaultRating.clothes);
    });
  });

  describe('when mapping backwards', () => {
    it('then id is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.id).toBe(defaultRatingDocument.id);
    });

    it('then userId is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.userId).toBe(defaultRatingDocument.userId);
    });

    it('then competitionId is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.competitionId).toBe(defaultRatingDocument.competitionId);
    });

    it('then actId is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.actId).toBe(defaultRatingDocument.actId);
    });

    it('then song is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.song).toBe(defaultRatingDocument.song);
    });

    it('then singing is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.singing).toBe(defaultRatingDocument.singing);
    });

    it('then show is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.show).toBe(defaultRatingDocument.show);
    });

    it('then looks is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.looks).toBe(defaultRatingDocument.looks);
    });

    it('then clothes is set', () => {
      // act
      const result = ratingDocumentMapper.mapBackwards(defaultRatingDocument);

      // assert
      expect(result.clothes).toBe(defaultRatingDocument.clothes);
    });
  });
});
