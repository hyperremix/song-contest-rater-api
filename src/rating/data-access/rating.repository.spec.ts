import { defaultRating } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import { defaultRatingDocument } from './rating-document';
import { RatingRepository } from './rating.repository';

describe('RatingRepository', () => {
  let ratingRepository: RatingRepository;

  let databaseClient: any;
  let mapper: any;

  beforeEach(() => {
    databaseClient = {
      scan: jest.fn(() => Promise.resolve([defaultRatingDocument])),
      put: jest.fn(() => Promise.resolve(defaultRatingDocument)),
      get: jest.fn(() => Promise.resolve(defaultRatingDocument)),
      update: jest.fn(() => Promise.resolve(defaultRatingDocument)),
      delete: jest.fn(() => Promise.resolve(defaultRatingDocument)),
    };

    mapper = {
      mapForwards: jest.fn(() => defaultRatingDocument),
      mapBackwards: jest.fn(() => defaultRating),
    };

    ratingRepository = new RatingRepository(databaseClient, mapper);
  });

  describe('when inserting', () => {
    it('then the rating is mapped', async () => {
      // act
      await ratingRepository.insert(defaultRating);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultRating);
    });

    it('then the rating document is mapped', async () => {
      // act
      await ratingRepository.insert(defaultRating);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultRatingDocument);
    });

    it('then the rating document is returned', async () => {
      // act
      const result = await ratingRepository.insert(defaultRating);

      // assert
      expect(result).toBe(defaultRating);
    });
  });

  describe('when scanning', () => {
    it('then rating documents are mapped', async () => {
      // act
      await ratingRepository.list();

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultRatingDocument);
    });

    it('then a list of ratings is returned', async () => {
      // arrange
      const extraRatingDocument = Builder(defaultRatingDocument).id('otherid').build();
      const extraRating = Builder(defaultRating).id('otherid').build();

      databaseClient.scan.mockReturnValue([defaultRatingDocument, extraRatingDocument]);
      mapper.mapBackwards.mockReturnValueOnce(defaultRating).mockReturnValueOnce(extraRating);

      // act
      const result = await ratingRepository.list();

      // assert
      expect(result).toEqual([defaultRating, extraRating]);
    });
  });

  describe('when getting', () => {
    it('then the rating document is mapped', async () => {
      // act
      await ratingRepository.get(defaultRating.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultRatingDocument);
    });

    it('then the rating is returned', async () => {
      // act
      const result = await ratingRepository.get(defaultRating.id);

      // assert
      expect(result).toBe(defaultRating);
    });
  });

  describe('when updating', () => {
    it('then the rating is mapped', async () => {
      // act
      await ratingRepository.update(defaultRating);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultRating);
    });

    it('then the rating document is mapped', async () => {
      // act
      await ratingRepository.update(defaultRating);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultRatingDocument);
    });

    it('then the rating is returned', async () => {
      // act
      const result = await ratingRepository.get(defaultRatingDocument.id);

      // assert
      expect(result).toBe(defaultRating);
    });
  });

  describe('when deleting', () => {
    it('then the rating document is mapped', async () => {
      // act
      await ratingRepository.delete(defaultRating.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultRatingDocument);
    });

    it('then the deleted rating is returned', async () => {
      // act
      const result = await ratingRepository.delete(defaultRating.id);

      // assert
      expect(result).toBe(defaultRating);
    });
  });

  describe('when querying', () => {
    it('then rating documents are mapped', async () => {
      // act
      await ratingRepository.query([defaultRating.id]);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultRatingDocument);
    });

    it('then a list of ratings is returned', async () => {
      // arrange
      const extraRatingDocument = Builder(defaultRatingDocument).id('otherid').build();
      const extraRating = Builder(defaultRating).id('otherid').build();

      databaseClient.scan.mockReturnValue([defaultRatingDocument, extraRatingDocument]);
      mapper.mapBackwards.mockReturnValueOnce(defaultRating).mockReturnValueOnce(extraRating);

      // act
      const result = await ratingRepository.query([defaultRating.id, extraRating.id]);

      // assert
      expect(result).toEqual([defaultRating, extraRating]);
    });
  });
});
