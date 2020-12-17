import { defaultCompetition } from '@hyperremix/song-contest-rater-model';
import { defaultCompetitionDocument } from './competition-document';
import { CompetitionDocumentMapper } from './competition-document.mapper';

describe('CompetitionDocumentMapper', () => {
  let competitionDocumentMapper: CompetitionDocumentMapper;

  beforeEach(() => {
    competitionDocumentMapper = new CompetitionDocumentMapper();
  });

  describe('when mapping forwards', () => {
    it('then id is set', () => {
      // act
      const result = competitionDocumentMapper.mapForwards(defaultCompetition);

      // assert
      expect(result.id).toBe(defaultCompetition.id);
    });

    it('then countryName is set', () => {
      // act
      const result = competitionDocumentMapper.mapForwards(defaultCompetition);

      // assert
      expect(result.countryName).toBe(defaultCompetition.countryName);
    });

    it('then cityName is set', () => {
      // act
      const result = competitionDocumentMapper.mapForwards(defaultCompetition);

      // assert
      expect(result.cityName).toBe(defaultCompetition.cityName);
    });

    it('then description is set', () => {
      // act
      const result = competitionDocumentMapper.mapForwards(defaultCompetition);

      // assert
      expect(result.description).toBe(defaultCompetition.description);
    });

    it('then startTime is set', () => {
      // act
      const result = competitionDocumentMapper.mapForwards(defaultCompetition);

      // assert
      expect(result.startTime).toBe(defaultCompetition.startTime);
    });

    it('then imageUrl is set', () => {
      // act
      const result = competitionDocumentMapper.mapForwards(defaultCompetition);

      // assert
      expect(result.imageUrl).toBe(defaultCompetition.imageUrl);
    });

    it('then actIds is set', () => {
      // act
      const result = competitionDocumentMapper.mapForwards(defaultCompetition);

      // assert
      expect(result.actIds).toBe(defaultCompetition.actIds);
    });
  });

  describe('when mapping backwards', () => {
    it('then id is set', () => {
      // act
      const result = competitionDocumentMapper.mapBackwards(defaultCompetitionDocument);

      // assert
      expect(result.id).toBe(defaultCompetitionDocument.id);
    });

    it('then countryName is set', () => {
      // act
      const result = competitionDocumentMapper.mapBackwards(defaultCompetitionDocument);

      // assert
      expect(result.countryName).toBe(defaultCompetitionDocument.countryName);
    });

    it('then cityName is set', () => {
      // act
      const result = competitionDocumentMapper.mapBackwards(defaultCompetitionDocument);

      // assert
      expect(result.cityName).toBe(defaultCompetitionDocument.cityName);
    });

    it('then description is set', () => {
      // act
      const result = competitionDocumentMapper.mapBackwards(defaultCompetitionDocument);

      // assert
      expect(result.description).toBe(defaultCompetitionDocument.description);
    });

    it('then startTime is set', () => {
      // act
      const result = competitionDocumentMapper.mapBackwards(defaultCompetitionDocument);

      // assert
      expect(result.startTime).toBe(defaultCompetitionDocument.startTime);
    });

    it('then imageUrl is set', () => {
      // act
      const result = competitionDocumentMapper.mapBackwards(defaultCompetitionDocument);

      // assert
      expect(result.imageUrl).toBe(defaultCompetitionDocument.imageUrl);
    });

    it('then actIds is set', () => {
      // act
      const result = competitionDocumentMapper.mapBackwards(defaultCompetitionDocument);

      // assert
      expect(result.actIds).toBe(defaultCompetitionDocument.actIds);
    });
  });
});
