import { defaultAct } from '@hyperremix/song-contest-rater-model';
import { defaultActDocument } from './act-document';
import { ActDocumentMapper } from './act-document.mapper';

describe('ActDocumentMapper', () => {
  let actDocumentMapper: ActDocumentMapper;

  beforeEach(() => {
    actDocumentMapper = new ActDocumentMapper();
  });

  describe('when mapping forwards', () => {
    it('then id is set', () => {
      // act
      const result = actDocumentMapper.mapForwards(defaultAct);

      // assert
      expect(result.id).toBe(defaultAct.id);
    });

    it('then artistName is set', () => {
      // act
      const result = actDocumentMapper.mapForwards(defaultAct);

      // assert
      expect(result.artistName).toBe(defaultAct.artistName);
    });

    it('then songName is set', () => {
      // act
      const result = actDocumentMapper.mapForwards(defaultAct);

      // assert
      expect(result.songName).toBe(defaultAct.songName);
    });
  });

  describe('when mapping backwards', () => {
    it('then id is set', () => {
      // act
      const result = actDocumentMapper.mapBackwards(defaultActDocument);

      // assert
      expect(result.id).toBe(defaultActDocument.id);
    });

    it('then artistName is set', () => {
      // act
      const result = actDocumentMapper.mapForwards(defaultActDocument);

      // assert
      expect(result.artistName).toBe(defaultActDocument.artistName);
    });

    it('then songName is set', () => {
      // act
      const result = actDocumentMapper.mapForwards(defaultActDocument);

      // assert
      expect(result.songName).toBe(defaultActDocument.songName);
    });
  });
});
