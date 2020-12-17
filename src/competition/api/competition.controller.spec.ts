import { defaultCompetition } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import 'reflect-metadata';
import { CompetitionController } from './competition.controller';

describe('CompetitionController', () => {
  let competitionController: CompetitionController;

  let competitionRepository: any;

  const competitions = [defaultCompetition, Builder(defaultCompetition).id('otherid').build()];

  beforeEach(() => {
    competitionRepository = {
      insert: jest.fn(() => Promise.resolve(defaultCompetition)),
      list: jest.fn(() => Promise.resolve(competitions)),
      get: jest.fn(() => Promise.resolve(defaultCompetition)),
      update: jest.fn(() => Promise.resolve(defaultCompetition)),
      delete: jest.fn(() => Promise.resolve(defaultCompetition)),
    };

    competitionController = new CompetitionController(competitionRepository);
  });

  describe('when creating', () => {
    it('then the competition is inserted into the repository', async () => {
      // act
      await competitionController.create(defaultCompetition);

      // arrange
      expect(competitionRepository.insert).toHaveBeenCalled();
    });

    it('then the competition is returned', async () => {
      // act
      const result = await competitionController.create(defaultCompetition);

      // arrange
      expect(result).toBe(defaultCompetition);
    });
  });

  describe('when listing', () => {
    it('then competitions are returned from the repository', async () => {
      // act
      const result = await competitionController.list();

      // arrange
      expect(result).toEqual(competitions);
    });
  });

  describe('when getting', () => {
    it('then the competition is returned from the repository', async () => {
      // act
      const result = await competitionController.get(defaultCompetition.id);

      // arrange
      expect(result).toEqual(defaultCompetition);
    });
  });

  describe('when updating', () => {
    it('then the competition is updated in the repository', async () => {
      // act
      await competitionController.update(defaultCompetition);

      // arrange
      expect(competitionRepository.update).toHaveBeenCalled();
    });

    it('then the competition is returned', async () => {
      // act
      const result = await competitionController.update(defaultCompetition);

      // arrange
      expect(result).toBe(defaultCompetition);
    });
  });

  describe('when deleting', () => {
    it('then the deleted competition is returned from the repository', async () => {
      // act
      const result = await competitionController.delete(defaultCompetition.id);

      // arrange
      expect(result).toEqual(defaultCompetition);
    });
  });
});
