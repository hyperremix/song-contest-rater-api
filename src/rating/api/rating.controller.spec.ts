import { defaultRating } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import 'reflect-metadata';
import getUuidByString from 'uuid-by-string';
import { RatingController } from './rating.controller';

describe('RatingController', () => {
  let ratingController: RatingController;

  let ratingRepository: any;

  const ratings = [defaultRating, Builder(defaultRating).id('othereid').build()];

  beforeEach(() => {
    ratingRepository = {
      insert: jest.fn(() => Promise.resolve(defaultRating)),
      list: jest.fn(() => Promise.resolve(ratings)),
      get: jest.fn(() => Promise.resolve(defaultRating)),
      update: jest.fn(() => Promise.resolve(defaultRating)),
      delete: jest.fn(() => Promise.resolve(defaultRating)),
      query: jest.fn(() => Promise.resolve([defaultRating])),
    };

    ratingController = new RatingController(ratingRepository);
  });

  describe('when creating', () => {
    it('then the rating is inserted into the repository', async () => {
      // arrange
      const expectedRating = Builder(defaultRating).id(
        getUuidByString(
          `${defaultRating.userId}_${defaultRating.competitionId}_${defaultRating.actId}`
        )
      );

      // act
      await ratingController.create(defaultRating);

      // arrange
      expect(ratingRepository.insert).toHaveBeenCalledWith(expectedRating);
    });

    it('then the rating is returned', async () => {
      // act
      const result = await ratingController.create(defaultRating);

      // arrange
      expect(result).toBe(defaultRating);
    });
  });

  describe('when listing', () => {
    it('then ratings are returned from the repository', async () => {
      // act
      const result = await ratingController.list();

      // arrange
      expect(result).toEqual(ratings);
    });
  });

  describe('when getting', () => {
    it('then the rating is returned from the repository', async () => {
      // act
      const result = await ratingController.get(defaultRating.id);

      // arrange
      expect(result).toEqual(defaultRating);
    });
  });

  describe('when updating', () => {
    it('then the rating is updated in the repository', async () => {
      // act
      await ratingController.update(defaultRating);

      // arrange
      expect(ratingRepository.update).toHaveBeenCalled();
    });

    it('then the rating is returned', async () => {
      // act
      const result = await ratingController.update(defaultRating);

      // arrange
      expect(result).toBe(defaultRating);
    });
  });

  describe('when deleting', () => {
    it('then the deleted rating is returned from the repository', async () => {
      // act
      const result = await ratingController.delete(defaultRating.id);

      // arrange
      expect(result).toEqual(defaultRating);
    });
  });

  describe('when querying', () => {
    it('then acts are returned from the repository', async () => {
      // act
      const result = await ratingController.query([defaultRating.id]);

      // arrange
      expect(result).toEqual([defaultRating]);
    });
  });
});
