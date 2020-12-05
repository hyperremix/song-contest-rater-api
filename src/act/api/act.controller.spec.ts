import { Builder } from 'builder-pattern';
import 'reflect-metadata';
import { defaultAct } from '../model/act';
import { ActController } from './act.controller';

describe('ActController', () => {
  let actController: ActController;

  let actRepository: any;

  const acts = [defaultAct, Builder(defaultAct).id('otherid').build()];

  beforeEach(() => {
    actRepository = {
      insert: jest.fn(),
      list: jest.fn(() => Promise.resolve(acts)),
    };

    actController = new ActController(actRepository);
  });

  describe('when creating', () => {
    it('then the act is inserted into the repository', async () => {
      // act
      await actController.create(defaultAct);

      // arrange
      expect(actRepository.insert).toHaveBeenCalled();
    });
  });

  describe('when listing', () => {
    it('then acts are returned from the repository', async () => {
      // arrange
      // act
      const result = await actController.list();

      // arrange
      expect(result).toEqual(acts);
    });
  });
});
