import { defaultAct } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import { defaultActDocument } from './act-document';
import { ActRepository } from './act.repository';

describe('ActRepository', () => {
  let actRepository: ActRepository;

  let databaseClient: any;
  let mapper: any;

  beforeEach(() => {
    databaseClient = {
      scan: jest.fn(() => Promise.resolve([defaultActDocument])),
      put: jest.fn(() => Promise.resolve(defaultActDocument)),
      get: jest.fn(() => Promise.resolve(defaultActDocument)),
      update: jest.fn(() => Promise.resolve(defaultActDocument)),
      delete: jest.fn(() => Promise.resolve(defaultActDocument)),
    };

    mapper = {
      mapForwards: jest.fn(() => defaultActDocument),
      mapBackwards: jest.fn(() => defaultAct),
    };

    actRepository = new ActRepository(databaseClient, mapper);
  });

  describe('when inserting', () => {
    it('then the act is mapped', async () => {
      // act
      await actRepository.insert(defaultAct);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultAct);
    });

    it('then the act document is mapped', async () => {
      // act
      await actRepository.insert(defaultAct);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultActDocument);
    });

    it('then the act document is returned', async () => {
      // act
      const result = await actRepository.insert(defaultAct);

      // assert
      expect(result).toBe(defaultAct);
    });
  });

  describe('when scanning', () => {
    it('then act documents are mapped', async () => {
      // act
      await actRepository.list();

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultActDocument);
    });

    it('then a list of acts is returned', async () => {
      // arrange
      const extraActDocument = Builder(defaultActDocument).id('otherid').build();
      const extraAct = Builder(defaultAct).id('otherid').build();

      databaseClient.scan.mockReturnValue([defaultActDocument, extraActDocument]);
      mapper.mapBackwards.mockReturnValueOnce(defaultAct).mockReturnValueOnce(extraAct);

      // act
      const result = await actRepository.list();

      // assert
      expect(result).toEqual([defaultAct, extraAct]);
    });
  });

  describe('when getting', () => {
    it('then the act document is mapped', async () => {
      // act
      await actRepository.get(defaultAct.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultActDocument);
    });

    it('then the act is returned', async () => {
      // act
      const result = await actRepository.get(defaultAct.id);

      // assert
      expect(result).toBe(defaultAct);
    });
  });

  describe('when updating', () => {
    it('then the act is mapped', async () => {
      // act
      await actRepository.update(defaultAct);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultAct);
    });

    it('then the act document is mapped', async () => {
      // act
      await actRepository.update(defaultAct);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultActDocument);
    });

    it('then the act is returned', async () => {
      // act
      const result = await actRepository.get(defaultActDocument.id);

      // assert
      expect(result).toBe(defaultAct);
    });
  });

  describe('when deleting', () => {
    it('then the act document is mapped', async () => {
      // act
      await actRepository.delete(defaultAct.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultActDocument);
    });

    it('then the deleted act is returned', async () => {
      // act
      const result = await actRepository.delete(defaultAct.id);

      // assert
      expect(result).toBe(defaultAct);
    });
  });

  describe('when querying', () => {
    it('then act documents are mapped', async () => {
      // act
      await actRepository.query([defaultAct.id]);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultActDocument);
    });

    it('then a list of acts is returned', async () => {
      // arrange
      const extraActDocument = Builder(defaultActDocument).id('otherid').build();
      const extraAct = Builder(defaultAct).id('otherid').build();

      databaseClient.scan.mockReturnValue([defaultActDocument, extraActDocument]);
      mapper.mapBackwards.mockReturnValueOnce(defaultAct).mockReturnValueOnce(extraAct);

      // act
      const result = await actRepository.query([defaultAct.id, extraAct.id]);

      // assert
      expect(result).toEqual([defaultAct, extraAct]);
    });
  });
});
