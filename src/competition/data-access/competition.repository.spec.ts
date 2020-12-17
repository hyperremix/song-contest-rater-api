import { defaultCompetition } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import { defaultCompetitionDocument } from './competition-document';
import { CompetitionRepository } from './competition.repository';

describe('CompetitionRepository', () => {
  let competitionRepository: CompetitionRepository;

  let databaseClient: any;
  let mapper: any;

  beforeEach(() => {
    databaseClient = {
      scan: jest.fn(() => Promise.resolve([defaultCompetitionDocument])),
      put: jest.fn(() => Promise.resolve(defaultCompetitionDocument)),
      get: jest.fn(() => Promise.resolve(defaultCompetitionDocument)),
      update: jest.fn(() => Promise.resolve(defaultCompetitionDocument)),
      delete: jest.fn(() => Promise.resolve(defaultCompetitionDocument)),
    };

    mapper = {
      mapForwards: jest.fn(() => defaultCompetitionDocument),
      mapBackwards: jest.fn(() => defaultCompetition),
    };

    competitionRepository = new CompetitionRepository(databaseClient, mapper);
  });

  describe('when inserting', () => {
    it('then the competition is mapped', async () => {
      // act
      await competitionRepository.insert(defaultCompetition);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultCompetition);
    });

    it('then the competition document is mapped', async () => {
      // act
      await competitionRepository.insert(defaultCompetition);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultCompetitionDocument);
    });

    it('then the competition document is returned', async () => {
      // act
      const result = await competitionRepository.insert(defaultCompetition);

      // assert
      expect(result).toBe(defaultCompetition);
    });
  });

  describe('when scanning', () => {
    it('then competition documents are mapped', async () => {
      // act
      await competitionRepository.list();

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultCompetitionDocument);
    });

    it('then a list of competitions is returned', async () => {
      // arrange
      const extraCompetitionDocument = Builder(defaultCompetitionDocument).id('otherid').build();
      const extraCompetition = Builder(defaultCompetition).id('otherid').build();

      databaseClient.scan.mockReturnValue([defaultCompetitionDocument, extraCompetitionDocument]);
      mapper.mapBackwards
        .mockReturnValueOnce(defaultCompetition)
        .mockReturnValueOnce(extraCompetition);

      // act
      const result = await competitionRepository.list();

      // assert
      expect(result).toEqual([defaultCompetition, extraCompetition]);
    });
  });

  describe('when getting', () => {
    it('then the competition document is mapped', async () => {
      // act
      await competitionRepository.get(defaultCompetition.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultCompetitionDocument);
    });

    it('then the competition is returned', async () => {
      // act
      const result = await competitionRepository.get(defaultCompetition.id);

      // assert
      expect(result).toBe(defaultCompetition);
    });
  });

  describe('when updating', () => {
    it('then the competition is mapped', async () => {
      // act
      await competitionRepository.update(defaultCompetition);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultCompetition);
    });

    it('then the competition document is mapped', async () => {
      // act
      await competitionRepository.update(defaultCompetition);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultCompetitionDocument);
    });

    it('then the competition is returned', async () => {
      // act
      const result = await competitionRepository.get(defaultCompetitionDocument.id);

      // assert
      expect(result).toBe(defaultCompetition);
    });
  });

  describe('when deleting', () => {
    it('then the competition document is mapped', async () => {
      // act
      await competitionRepository.delete(defaultCompetition.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultCompetitionDocument);
    });

    it('then the deleted competition is returned', async () => {
      // act
      const result = await competitionRepository.delete(defaultCompetition.id);

      // assert
      expect(result).toBe(defaultCompetition);
    });
  });
});
