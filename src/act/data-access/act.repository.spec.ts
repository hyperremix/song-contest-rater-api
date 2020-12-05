import { Builder } from 'builder-pattern';
import { defaultAct } from '../model/act';
import { defaultActDocument } from './act-document';
import { ActRepository } from './act.repository';

describe('ActRepository', () => {
  let actRepository: ActRepository;

  let databaseClient: any;
  let mapper: any;

  beforeEach(() => {
    databaseClient = {
      scan: jest.fn(() => Promise.resolve([defaultActDocument])),
      put: jest.fn(() => Promise.resolve()),
    };

    mapper = {
      mapForwards: jest.fn(() => defaultActDocument),
      mapBackwards: jest.fn(),
    };

    actRepository = new ActRepository(databaseClient, mapper);
  });

  describe('when inserting', () => {
    it('then the act is mapped', async () => {
      // act
      await actRepository.insert(defaultAct);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalled();
    });

    it('then the act document is put into the database', async () => {
      // act
      await actRepository.insert(defaultAct);

      // assert
      expect(databaseClient.put).toHaveBeenCalledWith(defaultActDocument);
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
});
